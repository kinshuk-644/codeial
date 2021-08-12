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
        this.socket.on('connect', function(){
            console.log("connection established using sockets ..");
        });
    }
}