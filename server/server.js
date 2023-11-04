// dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/dbconnect.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
// routes
import authRoutes from "./routes/authRoutes.js";
import huggingfaceRoutes from "./routes/hugginfaceRoutes.js";
// esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use(express.static(path.join(__dirname, "../client/build")));

//listen server
const PORT = process.env.PORT || 8080;

// api routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/huggingface", huggingfaceRoutes);
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});
