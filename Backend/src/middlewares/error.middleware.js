import mongoose from "mongoose";
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

/**
 * Central error handler. Every route uses asyncHandler, so any thrown error
 * (ApiError or otherwise) ends up here via next(err) instead of crashing
 * the process or leaking an HTML stack trace to API clients.
 */
const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        // Normalize Mongoose errors and anything unexpected into an ApiError
        // so every response from this API has the same JSON shape.
        let statusCode = error.statusCode || 500;
        let message = error.message || "Something went wrong";

        if (error instanceof mongoose.Error.ValidationError) {
            statusCode = 400;
            message = Object.values(error.errors)
                .map((val) => val.message)
                .join(", ");
        } else if (error instanceof mongoose.Error.CastError) {
            statusCode = 400;
            message = `Invalid value for field "${error.path}"`;
        } else if (error.code === 11000) {
            // Duplicate key error
            statusCode = 409;
            const field = Object.keys(error.keyValue || {})[0];
            message = field
                ? `${field} already exists`
                : "Duplicate field value entered";
        } else if (error instanceof multer.MulterError) {
            statusCode = 400;
            message =
                error.code === "LIMIT_FILE_SIZE"
                    ? "File is too large"
                    : `File upload error: ${error.message}`;
        } else if (error.name === "JsonWebTokenError") {
            statusCode = 401;
            message = "Invalid token";
        } else if (error.name === "TokenExpiredError") {
            statusCode = 401;
            message = "Token has expired";
        }

        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    const response = {
        success: error.success,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    return res.status(error.statusCode).json(response);
};

export { errorHandler };
