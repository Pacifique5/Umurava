const express = require("express");
const ContactController = require("../controllers/contactController");
const { body } = require("express-validator");
const validate = require("../middleware/validateMiddleware");

const router = express.Router();

const contactValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").notEmpty().withMessage("Message is required")
];

router.post("/", contactValidation, validate, ContactController.submitContact);

module.exports = router;