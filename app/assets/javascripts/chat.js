console.log('in chat.js');
var dispatcher = new WebSocketRails('localhost:3000/websocket');

dispatcher.on_open = function(data) {
  console.log('Connection has been established', data);
}

$(function(event){
console.log('jQuery!');
  receiveAndDisplay();
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

  $('.chat_form').on('submit', function(event){
    event.preventDefault();
    var message = $('#chat_input').val();
    sendChatMessage(message);
  });
});


function sendChatMessage(message) {
  var message = { text: message };
  dispatcher.trigger('chat_messages.broadcast', message );
  console.log('sent message: ' + message.text);
}

function receiveAndDisplay() {
  console.log('in receiveAndDisplay()')
  dispatcher.bind('chat_messages.notification', function(message) {
    console.log(message);

    $('#chat_window').append("<p>"+message.text+"</p>");
  })
}
