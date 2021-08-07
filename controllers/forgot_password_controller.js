const User = require("../models/user");
const ResetPasswordToken = require("../models/resetPasswordToken");
const resetPasswordMailer = require("../mailers/reset_password_mailer");
const resetPasswordEmailWorker = require("../workers/reset_password_email_worker");
const queue = require("../config/kue");
const crypto = require("crypto");

module.exports.getEmailAddress = function(req, res){
    return res.render('forgot_password', {
        title: "Reset Password"
    });
};

module.exports.checkYourEmail = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(user){

            let token = await ResetPasswordToken.create({
                user: user,
                accessToken: crypto.randomBytes(20).toString('hex'),
                isValid: true
            });

            // resetPasswordMailer.resetPassword(user);
            let job = queue.create('reset_password_emails', token).save(function(err){
                if(err){
                    console.log("Error in sending to the queue ",err);
                    return;
                }

                console.log("job enqueued", job.id);
            });

            return res.render('forgot_password_check_email', {
                title: "Check Your Email",
                email: user.email
            });
        }

        else{
            return res.render('forgot_password_check_email',{
                title: "Check Your Email",
                error: "Invalid Email Address"
            });
        }
    }

    catch(err){
        console.log(err);
        return res.redirect("back");
    }
};

module.exports.newPassword = function(req, res){
    ResetPasswordToken.findOne({accessToken: req.params.accessToken}, function(err, token){
        if(err){
            console.log(err);
            return res.redirect("back");
        }

        return res.render('new_password', {
            title: "New Password",
            new_url: req.params.accessToken,
            is_valid: token.isValid
        });
    });
};

module.exports.changePassword = async function(req, res){
    try{
        let {accessToken} = req.params;
    
        if(req.body.password != req.body.confirmPassword){
            req.flash('error', "Passwords do not match");
            return res.redirect("back");
        }
    
        else{
            let token = await ResetPasswordToken.findOne({accessToken: accessToken});
            token = await token.populate('user').execPopulate();
            token.isValid = false;
            token.save();
            
            await User.findByIdAndUpdate(token.user._id,{password: req.body.password});
            req.flash('success', "Password Changed");
            return res.redirect("/users/sign-in");
        }
    }

    catch(err){
        console.log(err);
        return res.redirect("back");
    }
};