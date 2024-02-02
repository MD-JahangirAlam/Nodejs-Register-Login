const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../dataBase/db_model");

// for user register and inside other::::::::::::::::::::::::::::::::::::::::::::::::

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const emailExist = await userModel.findOne({ userEmail: email });
        if (emailExist)
            return res.status(401).json({ message: "user email already exist" });
        const newPassword = await bcrypt.hash(password, 10);
        const userDoc = {
            userName: name,
            userEmail: email,
            userPassword: newPassword,
        };
        const newUser = await userModel.create(userDoc);
        res.json({ message: "regiser is sucessed" });
    } catch (error) {
        res.status(404).json({ message: "mongoose server is error" });
    }
};

//for user login and set cooki parser jwt auth :::::::::::::::::::::::::::::::::::::::::
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password))
        return res.status(401).json({ message: "user input require now" });

    try {
        const currentUserLoginValue = await userModel.findOne({ userEmail: email });

        if (!currentUserLoginValue)
            return res.status(401).json({ message: "user email dose not exist" });

        const { userEmail, userName, userPassword, _id } = currentUserLoginValue;
        const valiedPass = bcrypt.compareSync(password, userPassword);
        if (!valiedPass)
            return res.status(401).json({ message: "user password dose not exist" });
        const userLoginToken = jwt.sign(
            { userName: userName, id: _id },
            process.env.LOGIN_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );
        res.status(200).json({ userLoginToken: userLoginToken, userInfo: currentUserLoginValue });
    } catch (error) { }
};

// for user get porfile after login set cookie jwt ::::::::::::::::::::::::::::::::::::::
const userProfile = async (req, res) => {
    res
        .status(200)
        .json({ message: "user is authorized", userInfo: req.userValue });
};

module.exports = { register, userLogin, userProfile };
