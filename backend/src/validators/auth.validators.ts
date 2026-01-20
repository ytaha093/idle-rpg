import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .exists().withMessage("username is required")
    .isString().withMessage("username must be a string")
    .isAlphanumeric().withMessage("username must be letters and numbers only")
    .trim()
    .isLength({ min: 3 }).withMessage("username too short"),

  body("password")
    .exists().withMessage("password is required")
    .isString().withMessage("password must be a string")
    .isLength({ min: 6 }).withMessage("password too short"),

  body("email")
    .optional()
    .isEmail().withMessage("invalid email"),
];

export const loginValidator = [
  body("username")
    .exists().withMessage("username is required")
    .isString().withMessage("Invalid username")
    .isLength({ min: 1 }).withMessage("username too short"),

  body("password")
    .exists().withMessage("password is required")
    .isString().withMessage("Invalid password")
    .isLength({ min: 1 }).withMessage("password is required"),
];
