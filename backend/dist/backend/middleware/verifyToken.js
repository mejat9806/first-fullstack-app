import jwt from "jsonwebtoken";
export const verifyJWT = (req, res, next) => {
    let token;
    if ((req.headers.Authorization || req.headers.Authorization) &&
        (req.headers.Authorization || req.headers.Authorization).startsWith("Bearer")) {
        token = (req.headers.Authorization || req.headers.Authorization).split(" ")[1];
    }
    else if (req.cookies.refreshToken) {
        token = req.cookies.refreshToken;
    }
    console.log(req.cookies.refreshToken, "cookies");
    if (!token) {
        console.log("token no detected");
        return next(res
            .status(401)
            .json("You are not logged in! Please log in to get access."));
    }
    jwt.verify(token, process.env.REFRESH_JWT_SECRET, (err, decode) => {
        if (err) {
            return res
                .status(401)
                .json("You are not logged in! Please log in to get access.");
        }
        req.user = decode;
        console.log("token no detected");
        console.log(req.user);
        next();
    });
};
