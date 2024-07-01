export const AppError = (message, statusCode) => {
    const status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    const err = new Error(message);
    err.statusCode = statusCode;
    err.status = status;
    err.isOperational = true;
    return err;
};
//this will return and error object for next middleware error handling   because if next(err) it will skip any other non error middleware
