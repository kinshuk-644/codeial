const mongoose = require("mongoose");

const resetPasswordTokenSchema = new mongoose.Schema({
    // token belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    accessToken: {
        type: String,
        required: true
    },

    isValid: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const ResetPasswordToken = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);

module.exports = ResetPasswordToken;