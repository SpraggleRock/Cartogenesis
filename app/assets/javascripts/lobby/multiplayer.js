function Multiplayer(slug) {
  this.dispatcher = new WebSocketRails('localhost:3000/websocket');
  this.channel = this.dispatcher.subscribe(slug);
}

Multiplayer.prototype.update = function(eventName, callback) {
  this.channel.bind(eventName, function(data){
    callback(data);
  });
}

$(function(){
  console.log("this worked")
    socket = new Multiplayer(document.URL);
    socket.update('new_player', log);
});

function log(data) {
  console.log("have joined the channel!! " + data);
}
