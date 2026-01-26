const express = require("express");
const CommunityController = require("../controllers/communityController");

const router = express.Router();

router.get("/", CommunityController.getCommunityData);

module.exports = router;