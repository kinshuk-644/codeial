const queue = require("../config/kue");

const resetPasswordMailer = require("../mailers/reset_password_mailer");

queue.process('reset_password_emails', function(job, done){
    console.log("email worker is processing a job ", job.data);

    resetPasswordMailer.resetPassword(job.data);

    done();
});