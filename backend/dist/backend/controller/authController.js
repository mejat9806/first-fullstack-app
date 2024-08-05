import dotenv from "dotenv";
dotenv.config();
import { User } from "../model/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import multer from "multer";
import * as crypto from "crypto";
import sharp from "sharp";
import { Email } from "../utils/email.js";
import { createSendToken, signToken } from "../utils/tokenGeneration.js";
import ResetPassword from "../../client/emails/ResetPassword.js";
import WelcomeEmail from "../../client/emails/welcomEmail.js";
import { filterObjectsForUpdate } from "../utils/filterObject.js";
import { Comment } from "../model/commentModel.js";
import { Like } from "../model/likeModel.js";
import { Post } from "../model/postModel.js";
import { Bookmark } from "../model/bookMarkModel.js";
import { Follower } from "../model/followerModel.js";
import { Reply } from "../model/replyModel.js";
export const registerUser = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    //check if name .password and email was entered
    if (!name) {
        return res.json({ error: "name is required" });
    }
    if (!password || password.length < 6) {
        return res.json({
            error: `password is required and should be atleast 6 characters long`,
        });
    }
    const exist = await User.findOne({ email });
    if (exist) {
        return AppError("email is taken", 401);
    }
    // const hashedPaswords = await hashPaswords(password);
    const user = await User.create({
        name,
        email,
        password,
    });
    const url = `${req.protocol}://socialmedia-650u.onrender.com`;
    const pageUrl = `${req.protocol}://socialmedia-650u.onrender.com`;
    const message = "Welcome to my app";
    const type = "welcome";
    const html = WelcomeEmail({ name: user.name.split(" ")[0], url }); // No need to provide actual HTML content
    await new Email(user, url, pageUrl, message, type, html).sendWelcome();
    return res.json(user);
});
export const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //!step for check login credential
    //!1) check email and password if it exists
    if (!email || !password) {
        const err = AppError("please provide email and password", 400);
        return next(err); //finish because we want to stop the function here
    }
    //!
    //!2) check is the user exist password is correct
    const user = await User.findOne({ email: email })
        .select("+password +isValidated")
        .populate({
        path: "likePosts",
        model: "Like",
        select: "-user",
        populate: {
            path: "post",
            model: "Post",
            populate: {
                path: "author",
                model: "User",
                select: "-password -joinDate -posts",
            },
        },
    })
        .populate({ path: "posts", model: "Post" })
        .populate({ path: "bookmark", model: "BookMark" })
        .populate({
        path: "followers",
        model: "Follower",
        populate: {
            path: "user",
            model: "User",
        },
    })
        .populate({
        path: "following",
        model: "Follower",
        populate: { path: "followedUser", model: "User" },
    }); //select use to get the password from DB eventhough they are on selected by default refer to password in userModel
    // (user.isValidated); //! this is for validation turn back on later
    // if (user.isValidated === false) {
    //   return next(AppError('Please check your email for validation', 401));
    // }
    if (!user || !(await user.comparePassword(password, user.password))) {
        const err = AppError("please provide correct Email or password  ", 401);
        return next(err);
    }
    //!3) if everything ok ,send the token to client
    createSendToken(user, 200, res);
});
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, //https
        sameSite: "lax", //cross site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false, //https
        sameSite: "lax", //cross site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "send" });
};
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(AppError("please upload a image file only ", 400), false);
    }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
// export const uploadUserPhoto = upload.single("profileImage");
export const uploadImage = upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
]);
export const resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.user) {
        return next(AppError("please login", 401));
    }
    if (!req.files) {
        return next();
    }
    const files = req.files;
    if (files.profileImage && files.profileImage.length > 0) {
        req.body.profileImage = `user=${req.user.id}-${Date.now()}.webp`;
        await sharp(files.profileImage[0].buffer)
            .toFormat("webp")
            .webp({ quality: 100 })
            .toFile(`public/img/posts/${req.body.profileImage}`);
    }
    if (files.bannerImage && files.bannerImage.length > 0) {
        req.body.bannerImage = `userBanner=${req.user.id}-${Date.now()}.webp`;
        await sharp(files.bannerImage[0].buffer)
            .toFormat("webp")
            .webp({ quality: 100 })
            .toFile(`public/img/posts/${req.body.bannerImage}`);
    }
    next();
});
export const updateMe = catchAsync(async (req, res, next) => {
    const user = req.user;
    const files = req.files;
    if (!user) {
        return next(AppError("please login", 401));
    }
    const currentUser = await User.findById(user.id);
    if (currentUser?.changedPasswordAfter(user.iat)) {
        return next(AppError("user change password recently", 401));
    }
    if (req.body.name < 5) {
        return next(AppError("Invalid username need atleast 5 characters", 401));
    }
    const filterBody = filterObjectsForUpdate(req.body, "name", "email", "bio", "imagePublicIds", "profileImagePublicId", "bannerImagePublicId");
    if (req.body.profileImagePublicId) {
        filterBody.profileImage = `https://${process.env.CLOUDINARYURL}${req.body.profileImagePublicId}`;
    }
    if (req.body.bannerImagePublicId) {
        filterBody.bannerImage = `https://${process.env.CLOUDINARYURL}${req.body.bannerImagePublicId}`;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user?.id, filterBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json(updatedUser);
});
export const isLogin = catchAsync(async (req, res, next) => {
    const user = req.user;
    const currentUser = await User.findById(user?.id);
    if (currentUser?.changedPasswordAfter(user?.iat)) {
        return next(AppError("user change password recently", 401));
    }
    const profile = await User.findById(user?.id)
        .select("-password -passwordResetExpired -passwordResetToken")
        .populate({
        path: "likePosts",
        model: "Like",
        select: "-user",
        populate: {
            path: "post",
            model: "Post",
            populate: {
                path: "author",
                model: "User",
                select: "-password -joinDate -posts",
            },
        },
    })
        .populate({ path: "posts", model: "Post" })
        .populate({ path: "bookmark", model: "BookMark" })
        .populate({
        path: "followers",
        model: "Follower",
        populate: {
            path: "user",
            model: "User",
        },
    })
        .populate({
        path: "following",
        model: "Follower",
        populate: { path: "followedUser", model: "User" },
    });
    res.status(200).json(profile);
});
export const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }); //this will get the user by email
    if (!user) {
        return next(AppError("user not found", 404));
    } //this is use to save the reset token
    const resetToken = user.createPasswordResetToken(); //this will create the reset token using the methods
    await user.save({ validateBeforeSave: false }); //this is use to save the reset token
    try {
        const resetPageUrl = `${req.protocol}://socialmedia-650u.onrender.com/${resetToken}`; //this will get the url
        const type = "reset";
        const resetURL = `${req.protocol}://${req.get("host")}/api/auth/resetPassword/${resetToken}`; //this will get the url to send the the password reset
        const message = `forgot your password? Submit a PATCH request with your new password and password Confirm to ${resetPageUrl}.\n if you did not forget your password ,pls ignore this message`;
        const html = ResetPassword({
            name: user.name.split(" ")[0],
            url: resetPageUrl,
        });
        await new Email(user, resetPageUrl, resetURL, message, type, html).sendPasswordReset();
        res.status(200).json({
            status: "success",
            message: "your reset token  password email have been send",
            resetToken,
        });
    }
    catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpired = undefined;
        await user.save({ validateBeforeSave: false });
        return next(AppError("There wass a error while sending a email ", 500));
    }
});
export const resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpired: { $gt: Date.now() }, //this use to compare the expire time
    });
    if (!user) {
        return next(AppError("Token is invalid or expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirmed = req.body.passwordConfirmed;
    user.passwordResetExpired = undefined;
    user.passwordResetToken = undefined;
    await user.save();
    const token = signToken(user._id);
    res.status(200).json({ status: "success", token });
});
export const updatePassword = catchAsync(async (req, res, next) => {
    if (!req.user) {
        return next(AppError("Please Log in ", 401));
    }
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
        return next(AppError("User did not exist", 404));
    }
    if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
        return next(AppError("Password  is not the same", 404));
    }
    user.password = req.body.password;
    user.passwordConfirmed = req.body.passwordConfirmed;
    await user.save();
    res.status(200).json({ status: "woriking", user });
});
export const deleteAccount = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
    const loginUserFollow = await Follower.find({ user: userId });
    const loginUserLikePost = await Like.find({ user: userId });
    const postsData = await Post.find({ author: userId });
    await Comment.deleteMany({ user: userId });
    await Reply.deleteMany({ user: userId });
    Promise.all(postsData.map(async (post) => {
        await Like.deleteMany({ post: post.id });
        await Bookmark.deleteMany({ post: post.id });
    }));
    Promise.all(loginUserFollow.map(async (userFollowing) => {
        await User.updateMany({ following: userFollowing.id }, { $pull: { following: userFollowing.id }, $inc: { followCount: -1 } });
        await User.updateMany({ followers: userFollowing.id }, {
            $pull: { followers: userFollowing.id },
            $inc: { followerCount: -1 },
        });
    }));
    Promise.all(loginUserLikePost.map(async (userLikePost) => {
        await Like.deleteMany({ user: userLikePost.user });
        await Bookmark.deleteMany({ user: userLikePost.user });
        await User.updateMany({ likePosts: userLikePost.id }, { $pull: { likePosts: userLikePost.id } });
        await Post.updateMany({ likes: userLikePost.id }, {
            $pull: { likes: userLikePost.id },
            $inc: { likesCount: -1 },
        });
    }));
    await Post.deleteMany({ author: userId });
    // await User.updateMany(
    //   { following: userId },
    //   { $pull: { following: userId }, $inc: { followCount: -1 } },
    // );
    // await User.updateMany(
    //   { followers: userId },
    //   { $pull: { followers: userId }, $inc: { followCount: -1 } },
    // );
    await Follower.deleteMany({
        $or: [{ user: userId }, { followedUser: userId }],
    });
    // await User.findByIdAndDelete(userId);
    res.status(200).json({ status: "user deleted" });
});
