const User = require("../models/user");
const Friendship = require("../models/friendship");
const fs = require("fs");
const path = require("path");
const { exists } = require("../models/user");

// let's keep this not of async/await type since there is only 1 level of nesting
module.exports.profile = async function(req,res){
    try{
        let user = await User.findById(req.params.id);
        let are_friends_or_not = null;

        let friendship = await Friendship.findOne({from_user: req.user._id, to_user: user._id});
        let friendshipr = await Friendship.findOne({from_user: user._id, to_user: req.user._id});

        if(friendship || friendshipr){
            are_friends_or_not = true;
        }
        else{
            are_friends_or_not = false;
        }
        
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user,
            are_friends_or_not: are_friends_or_not
        });
        
    }

    catch(err){
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);

            // we cant access req.body with multi-form data , so use multer statics 
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log(`*****Multer error: ${err}`);
                }

                else{
                    user.name = req.body.name;
                    user.email = req.body.email;
                
                    if(req.file){
                        // check if avatar already exists, if yes then first delete the prev avatar from storage 
                        if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }

                        // saves the path of the uploaded file into the avatar field of user in the db
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }

                    user.save();
                    return res.redirect("back");
                }
            });
        }

        catch(err){
            req.flash('error', err);
            return res.redirect("back");
        }
    }
    
    else{
        req.flash('error', "You cannot update other user's details");
        return res.status(401).send('Unauthorized');
    }
};

// render the sign up page 
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
};

// render the sign in page 
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
};

// get the sign up data 
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', "Passwords do not match");
        return res.redirect("back");
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error', err);
            return res.redirect("back");
        }

        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    req.flash('error', err);
                    return res.redirect("back");
                }

                req.flash('success', "User created successfully");
                return res.redirect("/users/sign-in");
            });
        }

        else{
            req.flash('error', "User already exists");
            return res.redirect("back");
        }
    });
};

// sign in and create a session for the user 
module.exports.createSession = function(req,res){
    req.flash('success', "Logged in Successfully");
    return res.redirect("/");
};

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', "You have logged out");

    return res.redirect("/");
};  