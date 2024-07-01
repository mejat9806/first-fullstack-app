export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
//this code make us write less tryCatch blocks
// catchAsync will wrap the controller so if error is thrown it will go to error handler
//catch error come from app error
