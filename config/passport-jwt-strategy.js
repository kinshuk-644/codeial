const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
// extract the jwt from the header
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // encryption or decryption key 
    secretOrKey: 'codeial'
};

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log("Error in finding user from JWT");
            return;
        }

        if(user){
            return done(null, user);
        }

        else{
            return done(null, false);
        }
    });
}));

module.exports = passport;