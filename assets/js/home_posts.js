{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                    deletePost($(' .post-header .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<div id="post-${post._id}" class="post-container">
        <div class="post-header">
                <div style="display: flex;align-items: center;">
                        <img style="width: 50px;" src="https://res.cloudinary.com/dilxqj69w/image/upload/v1627114103/5336880_oygcgf.png" alt="user-photo">
                        &ensp;<p style="color: white;">${post.user.name}</p>
                </div>
            
                <a class="delete-post-button" style="color:rgb(231, 128, 128);" href="/posts/destroy/${post._id}"><i class="far fa-times-circle"></i></a>
                
        </div>

        <p>${post.content}</p>
        
        <div class="comments-container">
                <h1>Comments</h1>

                <div id="post-comments-${post._id}" class="comments">
                    
                </div>

                <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type here to add comment..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <button type="submit">Comment</button>
                </form>
        </div>
    </div>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>.post-container').each(function(){
            let self = $(this);
            let deleteButton = $(' .post-header .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}