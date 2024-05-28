import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { User } from "../model/userModel.js";
export const validateEmail = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    if (!email) {
        return next(AppError("Please input email that associate to the account", 404));
    }
    const user = await User.findOne({ email });
    if (user) {
        res.json({ isValid: true });
    }
    else {
        res.json({ isValid: false });
    }
});
