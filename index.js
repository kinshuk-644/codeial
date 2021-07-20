const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");

const port = 3000;

app.use(express.static('./assets'));

app.use(expressLayout);
// extract style and scripts from sub pages into the layout 
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true);

// use express route for the routes 
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
})