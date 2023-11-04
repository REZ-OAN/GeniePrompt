import errorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    //mongoose cast error
    if (error.name === "castError") {
        const msg = "Resource Not Found";
        error = new errorResponse(msg, 404);
    }
    //duplicate key error
    if (error.code === 11000) {
        const msg = "Duplicate Field Value Detected";
        error = new errorResponse(msg, 400);
    }
    // mongoose validation
    if (error.name === "ValidationError") {
        const msg = Object.values(error.errors).map((val) => val.message);
        error = new errorResponse(msg, 400);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Side Error",
        });
    }
};

export default errorHandler;
