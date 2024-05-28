export const AppError = (message, statusCode) => {
    const status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    const err = new Error(message);
    err.statusCode = statusCode;
    err.status = status;
    err.isOperational = true;
    return err;
};
