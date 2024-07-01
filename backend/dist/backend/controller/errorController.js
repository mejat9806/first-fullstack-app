import util from "util"; // Import util module for inspecting circular structures
import { AppError } from "../utils/appError.js";
function handleCastErrorDB(error) {
  const message = ` invalid ${error.path}: ${error.value}`;
  return AppError(message, 401);
}
function handleDuplicateData(error) {
  const value = Object.values(error.keyValue)[0]; //this will work with any duplicate value
  const message = `Duplicate field value: ${value}. Use another value.`;
  return AppError(message, 400);
}
function handleValidationErrorDB(err) {
  console.log(err, "here");
  const error = Object.values(err.errors).map((val) => val.message);
  const message = `invalid input data ${error.join(", ")}`;
  return AppError(message, 400);
}
function handleJsonWebTokenErrorDB() {
  return AppError("Something when wrong ,please log in again ", 401);
}
const sendErrorDev = (req, res, err) => {
  //this of the api like postman
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      err: err,
      message: err.message,
      error: util.inspect(err, { depth: null }), // Inspect the error object to avoid circular references
    });
  }
};
const sendErrorProd = (req, res, err) => {
  // For API requests
  if (req.originalUrl.startsWith("/api")) {
    // Operational error: Send specific error message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Programming or unknown error: Don't leak error details
      return res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  } else {
    // For rendering requests
    if (err.isOperational) {
      return res.status(err.statusCode).render("error", {
        title: "Something went wrong",
        msg: err.message,
      });
    } else {
      // Programming or unknown error: Don't leak error details
      return res.status(err.statusCode).render("error", {
        title: "Something went wrong",
        msg: "Please try again",
      });
    }
  }
};

export { sendErrorProd };

export function globalErrorHandler(
  err, //this come from AppError
  req,
  res,
  next,
) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(req, res, err);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message; //add the message to the error
    //let error = Object.create(err);
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateData(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJsonWebTokenErrorDB();
    }
    sendErrorProd(req, res, err);
  }
}
