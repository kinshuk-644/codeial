const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
                    
            post.comments.push(comment);
            post.save();
            return res.redirect("back");
        }
    }

    catch(err){
        console.log(`Error: ${err}`);
        return;
    }
};

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        let postId = comment.post;
            
        let post = await Post.findById(postId);
        if(post.user == req.user.id || comment.user == req.user.id){
            comment.remove();
    
            let updated_post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            return res.redirect("back");
        }
    
        else{
            return res.redirect("back");
        }
    }

    catch(err){
        console.log(`Error: ${err}`);
        return;
    }
};