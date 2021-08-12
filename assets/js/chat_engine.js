class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // change (to resolve error)
        this.socket = io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] });

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log("connection established using sockets ..");

            // sending a request to join a room named codeial 
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined ', data);
            });
        });
    }
}