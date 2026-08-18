import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

/**
 * Runs after an express-validator validation chain. If any check failed,
 * short-circuits the request with a 422 instead of letting bad data reach
 * the controller.
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
    }));

    throw new ApiError(422, "Validation failed", extractedErrors);
};
