const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method 
exports.resetPassword = (token) => {
    let htmlString = nodeMailer.renderTemplate({token: token}, '/reset_password/reset_password.ejs');

    nodeMailer.transporter.sendMail({
        from: 'codeialsocial@gmail.com',
        to: token.user.email,
        subject: "Reset Your Password",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("Error in sending mail ", err);
            return;
        }

        console.log("Message sent", info);
        return;
    });
};