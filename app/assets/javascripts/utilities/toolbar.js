$('#create_game_page').ready(function () {

function Tool(args){
  this.type = args.type;
  this.color = args.color;
  this.cost = args.cost;
}

var updateQueue = [];
var selectedTool;

var toolData = [{
  type: 'grassland',
  color: '#99FF33',
  cost: 3},
  {type: 'desert',
  color: '#DBB84D',
  cost: 3},
  {type: 'tundra',
  color: '#B8E6E6',
  cost: 3},
  {type: 'forest',
  color: '#006600',
  cost: 3},
  {type: 'mountain',
  color: '#999999',
  cost: 3},
  {type: 'ocean',
  color: '#0000FF',
  cost: 3},
  {type: 'volcanic',
    color: '#8A2E00',
    cost: 3}]

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

  $.each(allTools, function(){
    $('#toolbar').append("<div id='"+ this.type + "'data-color='" + this.color + "' style='width: 10px; background-color: " + this.color +";'></div>");
  });
  currentTool(allTools);

  function startHover(){
    var hold;
    return hold = $('svg').on('mouseenter', 'path', function(event){
      if($(this).attr("terrain") != selectedTool.type){
        $(this).attr("fill", selectedTool.color)
        $(this).attr("terrain", selectedTool.type);
        updateQueue.push(({id: $(this).attr("tile_id"), terrain: $(this).attr("terrain"), coordinates: $(this).attr("coordinates")}))
      }
    })
  }
  $('svg').on('mousedown','path', function(event){
    startHover().bind()
    if($(this).attr("terrain") != selectedTool.type){
        $(this).attr("fill", selectedTool.color)
        $(this).attr("terrain", selectedTool.type);
        updateQueue.push(({id: $(this).attr("tile_id"), terrain: $(this).attr("terrain"), coordinates: $(this).attr("coordinates")}))
      }
  });

  $(document).on('mouseup', function(event){
    $('svg').unbind('mouseenter')
  });

});
