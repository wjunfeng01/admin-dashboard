import mongoose from "mongoose";

// CREATE A NEW SCHEMA FOR USERS COLLECTION
const ProductSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        description: String,
        Category: String,
        rating: Number,
        supply: Number,
    }, {timestamps: true}
);

// CREATE THE PRODUCT MODEL USER USING THE SCHEMA ABOVE
const Product = mongoose.model("Product", ProductSchema);
export default Product;