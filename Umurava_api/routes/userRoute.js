const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/", UserController.getProfile);
router.put("/", UserController.updateProfile);
router.get("/dashboard-stats", UserController.getDashboardStats);

module.exports = router;