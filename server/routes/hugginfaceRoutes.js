import express from "express";
import {
    promptController,
    summaryController,
} from "../controller/huggingfaceController.js";

const router = express.Router();

//route
router.post("/summary", summaryController);
router.post("/promptgen", promptController);
export default router;
