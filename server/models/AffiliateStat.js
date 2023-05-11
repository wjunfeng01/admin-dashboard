import mongoose from "mongoose";

// CREATE A NEW SCHEMA FOR USERS COLLECTION
const AffiliateStatSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Types.ObjectId, ref: "User"},
        affiliateSales: {
            type: [mongoose.Types.ObjectId],
            ref: "Transaction"
        }
    }, {timestamps: true}
);

// CREATE THE PRODUCT MODEL USER USING THE SCHEMA ABOVE
const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;