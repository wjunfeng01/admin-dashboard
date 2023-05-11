import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

//async waits for loading prompts so app doesnt crash
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    //input params from frontend is stored in ID
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      //grabs user ID, convert to right format and matches to ID in transaction
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        //looks from a foreign field afSales, find matching ID to user ID, and return as AfSales
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    //finds the proper affiliate sale price based on the affiliated stats aka id
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        //grabs the appropriate transaction by id
        return Transaction.findById(id);
      })
    );

    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
