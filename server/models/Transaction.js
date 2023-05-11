import mongoose from "mongoose";

// CREATE A NEW SCHEMA FOR USERS COLLECTION
const TransactionSchema = new mongoose.Schema(
    {
        userId: String,
        cost: String,
        products: {
            type: [mongoose.Types.ObjectId],
            of: Number
        }
    }, {timestamps: true}
);

// CREATE THE PRODUCT MODEL USER USING THE SCHEMA ABOVE
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;