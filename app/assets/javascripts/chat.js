function Chat() {
  this.dispatcher = new WebSocketRails('localhost:3000/websocket');
};
Chat.prototype.setUpChat = function() {
  this.receiveAndDisplay();
  this.chatWindowOpenClose();
  this.hookUpWebSocketsToSendMessage();
}
Chat.prototype.sendChatMessage = function(message) {
  var message = { text: message };
  this.dispatcher.trigger('chat_messages.broadcast', message );
}
Chat.prototype.receiveAndDisplay = function() {
  this.dispatcher.bind('chat_messages.notification', function(message) {
    $('#chat_window').append("<p>"+message.text+"</p>");
  });
}
Chat.prototype.chatWindowOpenClose = function() {
    $('#chat_window').show();
    $('.chat_form').show();
}
Chat.prototype.hookUpWebSocketsToSendMessage = function() {
  $('.chat_form').on('submit', function(event){
    event.preventDefault();
    var message = $('#chat_input').val();
    this.sendChatMessage(message);
  }.bind(this));
}
$(function(event){
  chat = new Chat();
  chat.setUpChat();
});

