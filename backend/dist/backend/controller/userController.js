import { User } from "../model/userModel.js";
export const getAlluser = async (req, res, next) => {
    try {
        const amountOfDoc = await User.countDocuments();
        const allUser = await User.find();
        if (!allUser) {
            return res.status(404).json({ message: "No user found." });
        }
        res.status(200).json({ amountOfDoc, data: allUser });
    }
    catch (error) { }
};
export const getUser = async (req, res, next) => {
    try {
        const authorId = req.params.id;
        if (!req.params.id) {
            return res.status(404).json({ message: "No user found." });
        }
        const allUser = await User.findById(req.params.id).populate("posts");
        console.log(allUser);
        res.status(200).json({ data: allUser });
    }
    catch (error) {
        next();
    }
};
