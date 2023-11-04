import userModel from "../models/userModel.js";
import errorResponse from "../utils/errorResponse.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// JWT token
export const sendToken = (user, statusCode, res) => {
    const { _id: idx } = user;
    const accessToken = JWT.sign({ id: idx }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });
    const refreshToken = JWT.sign({ id: idx }, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });
    res.cookie("refreshToken", `${refreshToken}`, {
        maxAge: 86400 * 7000,
        httpOnly: true,
    });
    res.status(statusCode).json({
        success: true,
        token: accessToken,
    });
};

// registration
export const registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        //existence of the user
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return next(new errorResponse("Email is Already Registered", 500));
        }
        // hashpassword

        const hashedPassword = await bcrypt.hash(password, 15);
        // creating user
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });
        sendToken(user, 201, res);
    } catch (error) {
        console.log(
            `logging from authController registrationController ${error}`
        );
        next(error);
    }
};

// login
export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return next(
                new errorResponse(
                    "email and password field must be filled",
                    500
                )
            );
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return next(new errorResponse("Email Not Registered", 401));
        }
        // password checking
        const { password: passwordU } = user;

        const isMatch = await bcrypt.compare(password, passwordU);
        if (!isMatch) {
            return next(new errorResponse("Password Invalid", 401));
        }
        //res
        sendToken(user, 200, res);
    } catch (error) {
        console.log(`logging from authController loginController ${error}`);
        next(error);
    }
};
export const logoutController = async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json({
        success: true,
        message: "Logout Successfull",
    });
};
