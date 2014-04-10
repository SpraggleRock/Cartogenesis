function Tool(color){
  this.color = color;
}





function curTool() {
  $('#toolbar')
}
$(function () {
  $.each(['#99FF33', '#DBB84D'], function(){
    $('#toolbar').append("<div data-color='" + this + "' style='width: 10px; background: " + this +";'></div>");
  });
  currentTool();
  $('path').on('click', function(event){
    $(this).attr("fill", currentTool());
  });
});


function currentTool() {
  $("#toolbar").on('click', 'div', function(){
    console.log(this);
    return $(this);
  });
}

// console.log(currentTool())
