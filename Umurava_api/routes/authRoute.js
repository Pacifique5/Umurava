const express = require("express");
const AuthController = require("../controllers/authController");
const { body } = require("express-validator");
const validate = require("../middleware/validateMiddleware");

const router = express.Router();

// Validation rules
const signupValidation = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required")
];

const loginValidation = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
];

router.post("/signup", signupValidation, validate, AuthController.signup);
router.post("/login", loginValidation, validate, AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", AuthController.getMe);

module.exports = router;