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
  var slug = document.URL.slice(-8);//be sure to change game_play...js if you change this.
  socket = new Multiplayer(slug);
  socket.update('new_player', appendPlayer);
});

function appendPlayer(data) {
  var parsedData = $.parseJSON(data);
  $('#waiting_room').append("<li>" + parsedData.username + " as: " + parsedData.player_name + "</li>");
}
