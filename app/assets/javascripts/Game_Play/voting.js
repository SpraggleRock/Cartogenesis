$(".games.play").ready(function(){
  $("#end_game").on("submit", function(event){
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: '/vote',
      data: {1: "true"},
      accept: 'application/json',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(){
        alert('Sent update info succesfully');
      },
      complete: function(){
        alert('request went through.');
      }
    });
  });
});
