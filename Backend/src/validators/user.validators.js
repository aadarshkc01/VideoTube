import { body } from "express-validator"

const registerUserValidator = () => [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be 3-30 characters")
        .matches(/^[a-zA-Z0-9_.]+$/).withMessage("Username can only contain letters, numbers, underscores and dots"),
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is invalid"),
    body("fullName")
        .trim()
        .notEmpty().withMessage("Full name is required"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
]

const loginUserValidator = () => [
    body("email").optional().trim().isEmail().withMessage("Email is invalid"),
    body("username").optional().trim(),
    body("password").notEmpty().withMessage("Password is required"),
]

const changePasswordValidator = () => [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword")
        .notEmpty().withMessage("New password is required")
        .isLength({ min: 8 }).withMessage("New password must be at least 8 characters"),
]

const updateAccountDetailsValidator = () => [
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
]

export {
    registerUserValidator,
    loginUserValidator,
    changePasswordValidator,
    updateAccountDetailsValidator,
}
