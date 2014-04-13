$(document).ready(function(){
var playerField = "<li><input type='text' name='players[]' placeholder='Player Name'></li>"

$(".add_player").on("click", function(event) {
    $("#player_list").append(playerField);
 });

});

