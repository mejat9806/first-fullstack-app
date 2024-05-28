import { Post } from "../model/postModel.js";
import { User } from "../model/userModel.js";
import { apiFeatures } from "../utils/apiFeature.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { deleteImage } from "../utils/deleteIMG.js";
export const getAllPost = catchAsync(async (req, res, next) => {
    const allPostFilter = await apiFeatures(Post, req, "author", "name  profileImage ");
    const allPost = await allPostFilter;
    allPost.forEach((post) => {
        // this will loop through and delete the posts array from the author array
        if (post.author && post.author.posts) {
            delete post.author.posts;
        }
    });
    res.status(200).json({
        data: allPost,
    });
});
// export const getAllPost = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const allPost = await Post.find()
//     .populate({
//       path: "author",
//       select: "name email profileImage active",
//     })
//     .lean();
//   allPost.forEach((post) => {
//     // this will loop through and delete the posts array from the author array
//     if (post.author && (post.author as any).posts) {
//       delete (post.author as any).posts;
//     }
//   });
//   res.status(200).json({
//     data: allPost,
//   });
// };
export const getOnePost = catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    console.log(postId);
    const post = await Post.findById(postId).select("-__v ").populate("author");
    res.status(200).json(post);
});
//!this will save the data to memory
const multerStorege = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(AppError("please upload a image file only ", 400), false);
        return;
    }
};
const upload = multer({
    storage: multerStorege,
    fileFilter: multerFilter,
});
export const uploadPostImage = upload.fields([{ name: "image", maxCount: 4 }]);
export const resizePostImage = catchAsync(async (req, res, next) => {
    const files = req.files;
    console.log(files, "here file check");
    // Check if files were uploaded
    if (!files || !files.image) {
        // No files uploaded, proceed to the next middleware
        return next();
    }
    req.body.image = [];
    const user = req.user;
    await Promise.all(files.image.map(async (image, i) => {
        const fileName = `post-${user.id}-${Date.now()}-${uuidv4()}-${i + 1}.webp`;
        await sharp(files.image[i].buffer)
            .toFormat("webp")
            .webp({ quality: 95 })
            .toFile(`public/img/posts/${fileName}`);
        req.body.image.push(fileName);
    }));
    console.log(req.body, "add post image");
    next();
});
export const createAPost = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const { title, detail, image } = req.body;
    try {
        if (!req.user) {
            return next(AppError("User not authenticated", 401));
        }
        const user = req.user;
        req.body.author = user.id;
        console.log(req.user);
        // Create new Post document
        const newPost = await Post.create({ title, detail, image });
        await User.findByIdAndUpdate(req.body.author.id, { $push: { posts: newPost._id } });
        res.status(200).json({ data: newPost });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
export const deletePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    const imagePaths = post?.image;
    await Post.findByIdAndDelete(req.params.postId);
    if (Array.isArray(imagePaths)) {
        imagePaths.forEach((imagePath) => {
            deleteImage(imagePath, next);
        });
    }
    res.status(200).json({ message: "delete work" });
});
