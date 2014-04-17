function Chat() {
  this.dispatcher = new WebSocketRails('localhost:3000/websocket');
  this.channels = {};
};
Chat.prototype.setUpGlobalChat = function() {
  this.receiveAndDisplay();
  this.chatWindow();
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
Chat.prototype.displayChatWindow = function() {
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



Chat.prototype.setUpChannelChat = function(channel_name) {
  var chat_channel = this.createChannel(channel_name);
  this.channelReceiveAndDisplay(chat_channel);
  console.log('display chat window');
  this.displayChatWindow();
  this.channelHookUpWebSocketsToSendMessage(chat_channel);
}
Chat.prototype.createChannel = function(channel_name) {
  var channel = this.dispatcher.subscribe(channel_name);
  this.channels[channel_name] = channel;
  return channel;
}
Chat.prototype.channelReceiveAndDisplay = function(channel) {
  channel.bind('notification', function(message) {
    $('#chat_window').append("<p>"+message.text+"</p>");
  });
}
// Chat.prototype.setUpChannel = function(channel_name) {
//   this.addChannel(channel_name);
//   //var slug should be available from multiplayer.js
// }

Chat.prototype.channelSendChatMessage = function(channel, message) {
  var message = { text: message };
  channel.trigger('notification', message );
}
Chat.prototype.channelHookUpWebSocketsToSendMessage = function(channel) {
  $('.chat_form').on('submit', function(event){
    event.preventDefault();
    var message = $('#chat_input').val();
    console.log(message);
    this.channelSendChatMessage(channel, message);
  }.bind(this));
}

// $(function(event){
//   $('#join_game').on('click', function(event) {
//     $('.game.play').ready(function() {
//       chat = new Chat();
//       chat.setUpChannelChat(slug);
//       debugger
//   });
  // chat = new Chat();
  // chat.setUpGlobalChat();
// });






















