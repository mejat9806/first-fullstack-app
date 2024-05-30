import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import * as crypto from "crypto";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minlength: 5,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        validate: [validator.isEmail, "must be a valid email"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    passwordConfirmed: String,
    profileImage: { type: String, default: "defaultUser.svg" },
    active: { type: Boolean, default: true, select: false },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
// Define the comparePassword method
userSchema.pre("save", async function (next) {
    // Hash password before saving
    if (!this.isModified("password"))
        return next(); //this will check if there is no a change for the password
    this.password = await bcrypt.hash(this.password, 12); //this will hash the password
    this.passwordConfirmed = undefined; //this will set the passwordConfirmed to undefined after saving
    next();
});
userSchema.pre("save", function (next) {
    // This middleware will run when the password is modified, except when a new user is created.
    // It updates the passwordChangedAt field to the current date and time minus 1000 milliseconds.
    if (!this.isModified("password") || this.isNew)
        return next(); //if there is no change to the password
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});
userSchema.methods.comparePassword = async function (inputPassword, passFromDB) {
    return bcrypt.compare(inputPassword, passFromDB);
};
// Explicitly type the 'this' context as a Mongoose query object for query middleware hooks
userSchema.pre(/^find/, function (next) {
    this.populate({
        path: "posts",
    });
    next();
});
userSchema.pre(/^find/, function (next) {
    //use type Query for query middleware
    this.find({ active: { $ne: false } });
    next();
});
userSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
    //this will update the password after change time
    if (this.passwordChangedAt) {
        //if the the current document has the passwordChangedAt property
        const chnagedTimeStamp = parseInt((this.passwordChangedAt.getTime() / 1000).toString(), //this will gert the change time in milliseconds
        10);
        return JWTtimestamp < chnagedTimeStamp; //this
    }
    return false;
};
userSchema.methods.createPasswordResetToken = function () {
    const randRestToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(randRestToken)
        .digest("hex");
    console.log(this.passwordResetToken, "in model");
    this.passwordResetExpired = new Date(Date.now() + 10 * 60 * 1000);
    return randRestToken;
};
export const User = mongoose.model("User", userSchema);