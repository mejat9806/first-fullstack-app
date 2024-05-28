import jwt from "jsonwebtoken";
export const verifyJWT = (req, res, next) => {
    let token;
    if ((req.headers.Authorization || req.headers.Authorization) &&
        (req.headers.Authorization || req.headers.Authorization).startsWith("Bearer")) {
        token = (req.headers.Authorization || req.headers.Authorization).split(" ")[1];
    }
    else if (req.cookies.token || req.cookies.refreshToken) {
        token = req.cookies.token || req.cookies.refreshToken;
    }
    if (!token) {
        return next(res
            .status(401)
            .json("You are not logged in! Please log in to get access."));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
            return res
                .status(401)
                .json("You are not logged in! Please log in to get access.");
        }
        req.user = decode;
        next();
    });
};
