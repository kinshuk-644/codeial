const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const port = 3000;

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayout);
// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: "Codeial",
    // TODO change the secret key before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express route for the routes 
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
})