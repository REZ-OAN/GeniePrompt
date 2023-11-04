import mongoose from "mongoose";

// model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: ["true", "username must be given"],
    },
    email: {
        type: String,
        required: [true, "email must be given"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password must be given"],
        minlength: [6, "password minimum 6 characters"],
    },
    subscription: {
        type: String,
        default: "",
    },
});

const User = mongoose.model("User", userSchema);

export default User;
