const express = require("express");
const router = express.Router();

const forgotPasswordController = require("../controllers/forgot_password_controller");

router.get('/enter-email', forgotPasswordController.getEmailAddress);
router.post('/check-email', forgotPasswordController.checkYourEmail);
router.get('/:accessToken', forgotPasswordController.newPassword);
router.post('/:accessToken', forgotPasswordController.changePassword);

module.exports = router;