import { NextFunction, Request, Response } from "express";
import util from "util"; // Import util module for inspecting circular structures
import { AppError } from "../utils/appError.js";

function handleCastErrorDB(error: any) {
  const message = `Invalid ${error.path}: ${error.value}`;
  return AppError(message, 401);
}

function handleDuplicateData(error: any) {
  const value = Object.values(error.keyValue)[0];
  const message = `Duplicate field value: ${value}. Use another value.`;
  return AppError(message, 400);
}

function handleValidationErrorDB(err: any) {
  const errors = Object.values(err.errors).map((val: any) => val.message);
  const message = `Invalid input data: ${errors.join(", ")}`;
  return AppError(message, 400);
}

function handleJsonWebTokenErrorDB() {
  return AppError("Something went wrong, please log in again", 401);
}

const sendErrorDev = (req: Request, res: Response, err: any) => {
  // Check if the request is for an API endpoint
  if (req.originalUrl.startsWith("/api")) {
    // Send JSON response
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: util.inspect(err, { depth: null }), // Inspect the error object to avoid circular references
    });
  }

  // For non-API requests, handle differently as needed (rendering, etc.)
  // Example below assumes rendering an error page
  return res.status(err.statusCode).render("error", {
    title: "Error",
    message: err.message,
  });
};

const sendErrorProd = (req: Request, res: Response, err: any) => {
  // Handle production errors differently (similar logic as before)
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  } else {
    if (err.isOperational) {
      return res.status(err.statusCode).render("error", {
        title: "Something went wrong",
        message: err.message,
      });
    } else {
      return res.status(err.statusCode).render("error", {
        title: "Something went wrong",
        message: "Please try again",
      });
    }
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

    // Handle specific error types
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

    // Call sendErrorProd with the modified error object
    sendErrorProd(req, res, error); // Ensure 'error' is passed, not 'err'
  }
}
