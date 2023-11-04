import express from "express";
import {
    loginController,
    logoutController,
    registerController,
} from "../controller/authController.js";

/// creating router object
const router = express.Router();

// routes

// registration
router.post("/register", registerController);

//login
router.post("/login", loginController);

//logout
router.post("/logout", logoutController);
export default router;
