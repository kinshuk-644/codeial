const express = require("express");

const router = express.Router();
const friendshipsController = require("../controllers/friendships_controller");

router.get('/toggle-friendship', friendshipsController.toggleFriendship);

module.exports = router;