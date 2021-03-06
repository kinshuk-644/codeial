const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require("../models/like");
const commentsMailer = require("../mailers/comments_mailer");
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
                    
            post.comments.unshift(comment);
            post.save();

            // Similar for comments to fetch the user's id!
            comment = await comment.populate('user', 'name email').execPopulate();

            // email the user who has made the comment 
            // commentsMailer.newComment(comment);
            let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log("Error in sending to the queue ",err);
                    return;
                }

                console.log("job enqueued", job.id);
            });

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success', "Comment published");
            return res.redirect("back");
        }
    }

    catch(err){
        req.flash('error', err);
        return res.redirect("back");
    }
};

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        let postId = comment.post;
            
        let post = await Post.findById(postId);
        if(post.user == req.user.id || comment.user == req.user.id){
            comment.remove();
    
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            
            // destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            
            req.flash('success', "Comment deleted");
            return res.redirect("back");
        }
    
        else{
            req.flash('error', "You cannot delete this comment");
            return res.redirect("back");
        }
    }

    catch(err){
        req.flash('error', err);
        return res.redirect("back");
    }
};