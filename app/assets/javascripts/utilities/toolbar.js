function Tool(args){
  this.type = args.type;
  this.color = args.color;
}

var updateQueue = [];

var selectedTool;


var toolData = [{
  type: 'grassland',
  color: '#99FF33'},
  {type: 'desert',
  color: '#DBB84D'},
  {type: 'tundra',
  color: '#B8E6E6'},
  {type: 'forest',
  color: '#006600'},
  {type: 'mountain',
  color: '#999999'},
  {type: 'ocean',
  color: '#0000FF'}]

function loadTools(){
   return toolData.map(function(args){
      return new Tool(args);
   })
}

function currentTool(allTools) {
  $("#toolbar").on('click', 'div', function(){
    for(i=0; i < allTools.length; i++){
      if (allTools[i].type == this.id)
        selectedTool = allTools[i]
    }
  });
}

function getColor(terrainType, Tools){
  var myTool = "string";
  Tools.forEach(function(tool){
    if(tool.type == terrainType){
      myTool = tool.color
    }
  })
  return myTool
}

var allTools = loadTools();

$(function () {

  $.each(allTools, function(){
    $('#toolbar').append("<div id='"+ this.type + "'data-color='" + this.color + "' style='width: 10px; background-color: " + this.color +";'></div>");
  });
  currentTool(allTools);

  function startHover(){
    var hold;
    return hold = $('svg').on('mouseenter', 'path', function(evet){
      if($(this).attr("terrain") != selectedTool.type){
        $(this).attr("fill", selectedTool.color)
        $(this).attr("terrain", selectedTool.type);
        updateQueue.push(({id: $(this).attr("tile_id"), terrain: $(this).attr("terrain")}))
      }
    })
  }
  $('svg').on('mousedown','path', function(event){
    startHover().bind()
    if($(this).attr("terrain") != selectedTool.type){
        $(this).attr("fill", selectedTool.color)
        $(this).attr("terrain", selectedTool.type);
        updateQueue.push(({id: $(this).attr("tile_id"), terrain: $(this).attr("terrain")}))
      }
  });

  $(document).on('mouseup', function(event){
    $('svg').unbind('mouseenter')
  });

});
