const Friendship = require("../models/friendship");
const User = require("../models/user");

module.exports.toggleFriendship = async function(req, res){
    try{
        // url //friendships/toggle-friendship/?id=abcdc (id of the user on profile page)
        let deleted = false;

        let from_user_id = req.user._id;
        let {to_user_id} = req.query;
        let from_user_obj = await User.findById(from_user_id);
        let to_user_obj = await User.findById(to_user_id);

        let friendship = await Friendship.findOne({from_user: from_user_id, to_user: to_user_id});
        let friendshipr = await Friendship.findOne({from_user: to_user_id, to_user: from_user_id});

        console.log(friendship);
        console.log(friendshipr);

        // if friendship exists then remove the friendship 
        if(friendship || friendshipr){
            if(friendship){
                from_user_obj.friendships.pull(friendship._id);
                to_user_obj.friendships.pull(friendship._id);
                from_user_obj.save();
                to_user_obj.save();

                friendship.remove();
            }

            else if(friendshipr){
                from_user_obj.friendships.pull(friendshipr._id);
                to_user_obj.friendships.pull(friendshipr._id);
                from_user_obj.save();
                to_user_obj.save();

                friendshipr.remove();
            }

            deleted = true;
        }

        // else create a friendship 
        else{
            let new_friendship = await Friendship.create({
                from_user: from_user_id,
                to_user: to_user_id
            });

            // console.log(new_friendship); 

            from_user_obj.friendships.push(new_friendship._id);
            to_user_obj.friendships.push(new_friendship._id);
            from_user_obj.save();
            to_user_obj.save(); 
        }

        return res.status(200).json({
            message: "Request Successful",
            data: {
                deleted: deleted
            }
        });
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};