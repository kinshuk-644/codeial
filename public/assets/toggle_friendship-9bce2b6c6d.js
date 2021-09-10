// create a class to toggle friendships when a link is clicked, using AJAX
class ToggleFriendship{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriendship();
    }


    toggleFriendship(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing, it looks like the same as promises
            $.ajax({
                type: 'GET',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                if (data.data.deleted == true){
                    $(self).html(`Add Friend`);
                }else{
                    $(self).html(`Remove Friend`);
                }
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}