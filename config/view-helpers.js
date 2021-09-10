const env = require("./environment");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        // console.log(filePath);
        if(env.name == 'development'){
            return '/' + filePath;
        }

        // if(filePath[0]=='c'){
        //     var filePathNew = filePath.substr(4);
        //     return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePathNew];
        // }

        if(filePath[0]=='j'){
            var filePathNew = filePath.substr(3);
            return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePathNew];
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}