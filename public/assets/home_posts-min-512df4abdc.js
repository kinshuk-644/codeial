{let t=function(){let t=$("#new-post-form");t.submit(function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){let o=e(t.data.post);$("#posts-list-container").prepend(o),n($(" .post-header .delete-post-button",o)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})},e=function(t){return $(`<div id="post-${t._id}" class="post-container">\n        <div class="post-header">\n                <div style="display: flex;align-items: center;">\n                        <img style="width: 50px;" src="https://res.cloudinary.com/dilxqj69w/image/upload/v1627114103/5336880_oygcgf.png" alt="user-photo">\n                        &ensp;<p style="color: white;">${t.user.name}</p>\n                </div>\n            \n                <a class="delete-post-button" style="color:rgb(231, 128, 128);" href="/posts/destroy/${t._id}"><i class="far fa-times-circle"></i></a>\n                \n        </div>\n\n        <p>${t.content}</p>\n\n        \x3c!--show the count of zero likes on this dynamically created post --\x3e\n        <br>\n        <small>               \n            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">\n                0 Likes\n            </a>\n        </small>\n        \n        <div class="comments-container">\n                <h1>Comments</h1>\n\n                <div id="post-comments-${t._id}" class="comments">\n                    \n                </div>\n\n                <form id="post-${t._id}-comments-form" action="/comments/create" method="POST">\n                        <input type="text" name="content" placeholder="Type here to add comment..." required>\n                        <input type="hidden" name="post" value="${t._id}">\n                        <button type="submit">Comment</button>\n                </form>\n        </div>\n    </div>`)},n=function(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})},o=function(){$("#posts-list-container>.post-container").each(function(){let t=$(this),e=$(" .post-header .delete-post-button",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)})};t(),o()}