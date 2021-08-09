const mongoose = require("mongoose");

// instead of configuring multer globally we are configuring it specific to a user 
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    avatar: {
        type: String
    },

    friendships: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Friendship'
        }
    ]
} , {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH))
    },
    filename: function (req, file, cb) {
    //   fieldname is the name attribute of the form 
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

// static methods 
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;