const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session-cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

const port = 3000;

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayout);
// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo-store is used to store the session-cookie in the db
app.use(session({
    name: "Codeial",
    // TODO change the secret key before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development'
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// write it after the session 
app.use(flash());
app.use(customMware.setFlash);

// use express route for the routes 
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
})