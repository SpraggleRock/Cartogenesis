function Chat() {
  this.dispatcher = new WebSocketRails('localhost:3000/websocket');
};

// Chat.prototype.init = function() {
//   this.dispatcher.on_open = function(data) { console.log('Connection has been established', data)};
// }
Chat.prototype.setUpChat = function() {
  this.receiveAndDisplay();
  this.chatWindowOpenClose();
  this.hookUpWebSocketsToSendMessage();
}
Chat.prototype.sendChatMessage = function(message) {
  var message = { text: message };
  this.dispatcher.trigger('chat_messages.broadcast', message );
  console.log('sent message: ' + message.text);
}
Chat.prototype.receiveAndDisplay = function() {
  console.log('in receiveAndDisplay()')
  this.dispatcher.bind('chat_messages.notification', function(message) {
    console.log(message);
    $('#chat_window').append("<p>"+message.text+"</p>");
  });
}
Chat.prototype.chatWindowOpenClose = function() {
  console.log("in chat open,close");
  $('#open_chat').on('click', function(event){
    event.preventDefault();
    $('#chat_window').show();
    $('.chat_form').show();
    $(this).hide();
    $('#close_chat').show();
  });
  $('#close_chat').on('click', function(event){
    event.preventDefault();
    $('#chat_window').hide();
    $('.chat_form').hide();
    $(this).hide();
    $('#open_chat').show();
  });
}
Chat.prototype.hookUpWebSocketsToSendMessage = function() {
  console.log('hooking up websockets');
  $('.chat_form').on('submit', function(event){
    event.preventDefault();
    var message = $('#chat_input').val();
    this.sendChatMessage(message);
  }.bind(this));
}




// console.log('in chat.js');
// var dispatcher = new WebSocketRails('localhost:3000/websocket');

// dispatcher.on_open = function(data) {
//   console.log('Connection has been established', data);
// }




$(function(event){
  chat = new Chat();
  chat.setUpChat();
//   // $('#open_chat').on('click', function(event){
//   //   event.preventDefault();
//   //   $('#chat_window').show();
//   //   $('.chat_form').show();
//   //   $(this).hide();
//   //   $('#close_chat').show();
//   // });
//   // $('#close_chat').on('click', function(event){
//   //   event.preventDefault();
//   //   $('#chat_window').hide();
//   //   $('.chat_form').hide();
//   //   $(this).hide();
//   //   $('#open_chat').show();
//   // });
//   // $('.chat_form').on('submit', function(event){
//   //   event.preventDefault();
//   //   var message = $('#chat_input').val();
//   //   sendChatMessage(message);
//   // });
});


// // function sendChatMessage(message) {
// //   var message = { text: message };
// //   dispatcher.trigger('chat_messages.broadcast', message );
// //   console.log('sent message: ' + message.text);
// // }

// // function receiveAndDisplay() {
// //   console.log('in receiveAndDisplay()')
// //   dispatcher.bind('chat_messages.notification', function(message) {
// //     console.log(message);

// //     $('#chat_window').append("<p>"+message.text+"</p>");
// //   });
// // }
