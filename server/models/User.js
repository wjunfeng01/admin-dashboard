import mongoose from "mongoose";

// CREATE A NEW SCHEMA FOR USERS COLLECTION
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        transactions: Array,
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "admin"
        },
    },
    { timestamps: true}
);

// CREATE THE MODEL USER USING THE SCHEMA ABOVE
const User = mongoose.model("User", UserSchema);
export default User;