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
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        // populate the likes of every post on the home page 
        .populate('likes');

        let users = await User.find({});

        let friends = [];

        if(req.user){
            let cur_user = await User.findById(req.user.id)
            .populate({
                path: 'friendships',
                populate: {
                    path: 'from_user'
                }
            })
            .populate({
                path: 'friendships',
                populate: {
                    path: 'to_user'
                },
            });

            for(let i of cur_user.friendships){
            // .id is for string and ._id is for object , this is very important else errors can occur
                if(i.from_user.id == cur_user.id){
                    friends.push(i.to_user);
                }
                else{
                    friends.push(i.from_user);
                }
            }
        }

        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users,
            friends: friends
        });
    }

    catch(err){
        console.log(`Error: ${err}`);
        return;
    }
    
};