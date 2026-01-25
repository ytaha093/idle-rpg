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

export const trainAttributeValidator = [
  body("attribute")
    .exists().withMessage("trainingAttribute is required")
    .isIn(['Health', 'Attack', 'Defense', 'Accuracy', 'Dodge', 'Gold_Rush', 'Mining', 'Woodcutting', 'Quarrying', 'Clan_Boost'])
    .withMessage("Invalid training attribute")
]

export const gatheringValidator = [
  body("type")
    .exists().withMessage("type is required")
    .isIn(['Mining', 'Woodcutting', 'Quarrying'])
    .withMessage("Invalid gathering type")
]