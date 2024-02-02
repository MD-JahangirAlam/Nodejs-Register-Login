const jwt = require("jsonwebtoken");
const userModel = require("../dataBase/db_model");
const authUser = (req, res, next) => {
    const headerUserToken = req.headers.authorization;

    if (!headerUserToken)
        return res.status(401).json({ message: "you are not authorized" });

    const userToken = headerUserToken.split(" ")[1];
    jwt.verify(userToken, process.env.LOGIN_TOKEN_SECRET, (err, decode) => {
        if (err)
            return res
                .status(401)
                .json({ message: "you are not authorized and do not get access" });

        userModel
            .findById(decode.id)
            .then((data) => {
                req.userValue = data;
                next();
            })
            .catch((err) => {
                if (err)
                    return res
                        .status(401)
                        .json({ message: "you are not authorized and do not get value" });
            });
    });
};

module.exports = { authUser };
