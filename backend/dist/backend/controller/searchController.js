import { catchAsync } from "../utils/catchAsync";
import { User } from "../model/userModel";
import { Post } from "../model/postModel";
import { AppError } from "../utils/appError";
import sanitizeHtml from "sanitize-html";
export const search = catchAsync(async (req, res, next) => {
    const { q } = req.query;
    console.log(search);
    if (!search) {
        return next(AppError("search query required", 401));
    }
    const cleanInput = sanitizeHtml(q);
    const searchRegex = new RegExp(cleanInput, "i");
    console.log(searchRegex);
    const resultUser = await User.find({ name: searchRegex });
    const resultPost = await Post.find({ title: searchRegex });
    res.json({ resultUser, resultPost });
});
