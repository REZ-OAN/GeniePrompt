// dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/dbconnect.js";
import errorHandler from "./middlewares/errorMiddleware.js";
// routes
import authRoutes from "./routes/authRoutes.js";
import huggingfaceRoutes from "./routes/hugginfaceRoutes.js";

//configure the env
dotenv.config();

// mongo connection
connectDB();
// rest object
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);

//listen server
const PORT = process.env.PORT || 8080;

// api routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/huggingface", huggingfaceRoutes);
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});
