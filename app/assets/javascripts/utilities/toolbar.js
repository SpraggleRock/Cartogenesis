function Tool(args){
  this.type = args.type;
  this.color = args.color;
}

var toolData = [{
  type: 'grassland',
  color: '#99FF33'},
  {type: 'desert',
  color: '#DBB84D'
}]

function loadTools(){
   return toolData.map(function(args){
      return new Tool(args);
   })
}


function curTool() {
  $('#toolbar')
}
$(function () {
  $.each(loadTools(), function(){
    $('#toolbar').append("<div id='"+ this.type + "'data-color='" + this.color + "' style='width: 10px; background: " + this.color +";'></div>");
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
