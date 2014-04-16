$(".games.play").ready(function(){
  var slugLength = 30;
  var radius = 300;
  var board;
  var createdTiles = [];
  var svg = d3.select(".play_game_svg_container").append("svg")
   .attr("width", 2*radius)
   .attr("height", 2*radius);
  var g = d3.select("svg").append("g")
    .attr("transform", "translate(" + [radius,radius] + ")");
  var lineFunction = d3.svg.line()
    .x(function(d){ return d.x;})
    .y(function(d){ return d.y;})
    .interpolate("linear");
  var gameID = $('.games.play').attr("id");
  var chronicleID = $('.chronicle_id').attr("id");

  socket = new Multiplayer(document.URL.slice(-slugLength));

  socket.update('end_turn', refresh);

  function refresh(data) {
    location.reload();
  }

  function Tile(radius, coordinates, terrain) {
    this.radius = radius;
    this.coordinates = coordinates;
    this.terrain = terrain;
  }

  function snapshotTiles() {
    for(var i = 1; i <= $('g').children().length; i++){
      var path = $("path:nth-child("+i+")");
      createdTiles.push(new Tile(20, path.attr("coordinates"), path.attr("terrain")));
    }
  }

  function format_coords(coord_string_array) {
    var coord_array = coord_string_array.map(function(coord_string){
      return coord_string.split(',');
    });
    var formatted_coord_array = coord_array.map(function(coord){
      return {'a': parseInt(coord[0]), 'b': parseInt(coord[1]), 'c': parseInt(coord[2]) }
    });
    return formatted_coord_array;
  }

  function drawHexes(hexes) {
    j = 0;
    hexes.forEach(function(hex){
    hexShow = g.append("path")
      .attr("d", lineFunction(hex).concat("Z"))
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("terrain", board[j].terrain)
      .attr("fill", getColor(board[j].terrain, allTools))
      .attr("tile_id", board[j].id)
      .attr("board_id", board[0].board_id)

      j++;
    });
  }

  $.getJSON( '/board/'+ gameID, function(data){
    var tiles=[];
    board = data;
    $.each(data, function(k, v){
      tiles.push(v.coordinates);
    });
    formatted_tiles = format_coords(tiles);
    var hex_data = formatted_tiles.map(function(tile){
      return genHexData(genHexVertices(25), hexToCartesian(tile, 25));
    });
    drawHexes(hex_data);
  });

  $('svg').on('click', function(event){
      console.log('holy shit i clicked');
      $.ajax({
        type: 'PATCH',
        url: '/board/1/',
        data: JSON.stringify(updateQueue),
        accept: 'application/json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(){
          console.log('success');
          updateQueue = [];
        },
        error: function(){
          console.log(JSON.stringify(updateQueue));
        }
      });
    });

  $('.end_turn').on("submit", function(event){
    snapshotTiles();
    $.ajax({
      type: "POST",
      url: '/turn_log',
      data: JSON.stringify({turn_log: {board_json: createdTiles,
             documentation: $('#turn_log_documentation').val(),
             game_id: gameID}
            }),
      accept: 'application/json',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    });
  });
});
