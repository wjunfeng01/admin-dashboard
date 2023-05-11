import mongoose from "mongoose";

// CREATE A NEW SCHEMA FOR USERS COLLECTION
const ProductStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        data: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

// CREATE THE MODEL USER USING THE SCHEMA ABOVE
const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;
