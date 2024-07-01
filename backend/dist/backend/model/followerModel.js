import mongoose from "mongoose";
const followSchema = new mongoose.Schema({
    followedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
export const Follower = mongoose.model("Follower", followSchema);
