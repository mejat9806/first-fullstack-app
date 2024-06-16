export const AppError = (message: string, statusCode: number) => {
  const status = `${statusCode}`.startsWith("4") ? "fail" : "error";
  const err = new Error(message);
  (err as any).statusCode = statusCode;
  (err as any).status = status;
  (err as any).isOperational = true;
  return err;
};

//this will return and error object for next middleware error handling   because if next(err) it will skip any other non error middleware
