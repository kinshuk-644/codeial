const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log("Error in creating a post");
            return;
        }

        return res.redirect("back");
    });
};

// delete a post and all its associated comments but the user can only delete the posts posted by him/her. 
module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){

        // use req.user.id instead of req.user._id to convert it into string and then compare
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect("back");
            });
        }

        else{
            return res.redirect("back");
        }
    });
};