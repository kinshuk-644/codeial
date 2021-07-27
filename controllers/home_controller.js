const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // Method 1 which handles each error separately 
    // pre-populate the user of each post
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){

    //     User.find({}, function(err, users){
    //         return res.render('home',{
    //             title: "Codeial | Home",
    //             posts: posts,
    //             all_users: users
    //         });
    //     });
    // });

    // Method 2 using async, await to make code clean and catch any error using 1 line of code
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }

    catch(err){
        console.log(`Error: ${err}`);
        return;
    }
    
};