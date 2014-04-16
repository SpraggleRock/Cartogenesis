  $('#landmark_modal').ready(function(){
    $('#landmark_modal').easyModal({
      top: 200,
      overlay: 0.4,
      overlayClose: false,
      onClose: function(){

      }
    });
  })


  function Tool(args){
    this.type = args.type;
    this.color = args.color;
    this.cost = args.cost;
  }

  var updateQueue = [];
  var selectedTool;

  var terrainToolData = [{
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
    cost: 3}]

  var creationToolData = [
    {type: 'city', color: '', cost : 10}
  ]

  function loadTerrainTools(){
     return terrainToolData.map(function(args){
        return new Tool(args);
     })
  }

  function currentTerrainTool(allTools) {
    $("#tToolbar").on('click', 'div', function(){

      for(i=0; i < allTools.length; i++){
        if (allTools[i].type == this.id)
          selectedTool = allTools[i]
      }
    });
  }

  function loadCreationTools(){
     return creationToolData.map(function(args){
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
    $("#another_tool").on('click', 'div', function(){
      for(i=0; i < allTools.length; i++){
        if (allTools[i].type == this.id)
          selectedTool = allTools[i]
      }
    });
  }

  function getColor(toolType, Tools){
    var myTool = "string";
    Tools.forEach(function(tool){
      if(tool.type == toolType){
        myTool = tool.color
      }
    })
    return myTool
  }

  var terrainTools = loadTerrainTools();
  var creationTools = loadCreationTools();
  var holdTools = terrainTools.concat(creationTools)
  var allTools = []

  holdTools.forEach(function(tool){
    allTools.push(tool)
  })

$("#game_page").ready(function () {

    var activePlayer = $(".active_player")
    var activePlayerPoints = $('#points_to_s').val();
    console.log(activePlayerPoints);
    $.each(terrainTools, function(){
      $('#toolbar').append("<div id='"+ this.type + "'data-color='" + this.color + "' style='width: 10px; background-color: " + this.color +";'></div>");
    });
    $.each(creationTools, function(){
      $('#another_tool').append("<div id='"+ this.type + "'data-color='" + this.color + "' style='width: 20px; background-color: " + this.color +";'>" + this.type +"</div>");
    });
    currentTool(allTools);

    function startHover(){
      var hold;
      return hold = $('svg').on('mouseenter', 'path', function(event){
        if(($(this).attr("terrain") != selectedTool.type) && (activePlayerPoints >= selectedTool.cost)){
          $(this).attr("fill", selectedTool.color)
          $(this).attr("terrain", selectedTool.type);
          activePlayerPoints = activePlayerPoints - selectedTool.cost
          updateQueue.push(({id: $(this).attr("tile_id"), terrain: $(this).attr("terrain")}))
          $('#points_to_s').val(activePlayerPoints.toString());
        }
      })
    }
    $('svg').on('mousedown','path', function(event){
      if(selectedTool.type == 'city' && activePlayerPoints >= selectedTool.cost){
        event.preventDefault()
        $('#landmark_modal').trigger('openModal');
        tile_id = $(this).attr("tile_id")
        console.log(tile_id)
        selectedTool.type = $(this).attr("terrain")
        selectedTool.color = $(this).attr("fill")
        activePlayerPoints = activePlayerPoints - selectedTool.cost
        $('#tile_info').val(tile_id)
      }
      startHover().bind()
      if(($(this).attr("terrain") != selectedTool.type) && (activePlayerPoints >= selectedTool.cost)){
          $(this).attr("fill", selectedTool.color)
          $(this).attr("terrain", selectedTool.type);
          updateQueue.push(({id: $(this).attr("tile_id"), terrain: $(this).attr("terrain")}))
          activePlayerPoints = activePlayerPoints - selectedTool.cost
          $('#points_to_s').val(activePlayerPoints.toString());
        }

    });

    $('a.close').on('click', function(){
      data = {name: $('#landmark_name').val(),
              description: $('#landmark_description').val(),
              tile_id: $('#tile_info').val()}
      $.ajax({
        type: 'POST',
        url: '/landmark/',
        data: data,
        success: function(){
          console.log(data)
          console.log('landmark data sent!')
        }
      })
    })

    $(document).on('mouseup', function(event){
      $('svg').unbind('mouseenter')
    });

  });