import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    // get products from Product DB using the model created
    const products = await Product.find();

    // cycle through DB to get products with stats via ID
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        //match foreign key with local key
        const stat = await ProductStat.find({
          productId: product._id,
        });
        //return an array of objects with combined product and stat info
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    //grabs the page, sort, and search fields from the frontend
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      //parses the string into an object of sort,
      const sortParsed = JSON.parse(sort);
      //return sort 1 for asc and -1 for desc
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      //check for fields based on user's input fields to be sent to mongo for query
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    //transactions have a limited number, but we still want the total no. of query (total documents in DB)
    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    //sends info back to frontend
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    //converts country ID from 2 letters to 3 letters
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      //counting the no. of times a country is called using if else
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    //object.entries dictates to from a key value pair. map cycles through
    //mappedLocations and returning it to NIVO format required
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
