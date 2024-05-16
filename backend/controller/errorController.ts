import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import util from "util"; // Import util module for inspecting circular structures

function handleCastErrorDB(error: any) {
  const message = ` invalid ${error.path}: ${error.value}`;
  return AppError(message, 401);
}
function handleDuplicateData(error: any) {
  console.log(error, "here");
  const value = Object.values(error.keyValue)[0]; //this will work with any duplicate value
  const message = `Duplicate field value: ${value}. Use another value.`;
  return AppError(message, 400);
}
function handleValidationErrorDB(err: any) {
  console.log(err);
  const error = Object.values(err.errors).map((val: any) => val.message);
  const message = `invalid input data ${error.join(", ")}`;
  return AppError(message, 400);
}
function handleJsonWebTokenErrorDB() {
  return AppError("Something when wrong ,please log in again ", 401);
}
const sendErrorDev = (req: Request, res: Response, err: any) => {
  if (req.originalUrl.startsWith("/api")) {
    // Use util.inspect to inspect objects with circular references
    const errorString = util.inspect(err, { showHidden: false, depth: null });

    // Return the error message instead of the circular error object
    return res.status(err.statusCode);
  }
};

const sendErrorProd = (req: Request, res: Response, err: any) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Exclude circular properties or stringify selectively
    const errorWithoutCircular = {
      status: "error",
      message: "Something went wrong",
    };
    // Log the error without circular references
    console.error("Error without circular references:", errorWithoutCircular);
    return res.status(500).json(errorWithoutCircular);
  }
};

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
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
    if (error.name === "handleValidationErrorDB") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJsonWebTokenErrorDB();
    }
    sendErrorProd(req, res, err);
  }
}
