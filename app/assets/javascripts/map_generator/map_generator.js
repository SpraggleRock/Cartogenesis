$(".games.new").ready(function(){

  var radius = 300;
  var board;

  var svg = d3.select(".svg_container").append("svg")
   .attr("width", 2*radius)
   .attr("height", 2*radius)

  var g = d3.select("svg").append("g")
    .attr("transform", "translate(" + [radius,radius] + ")")

   //create line
  var lineFunction = d3.svg.line()
    .x(function(d){ return d.x;})
    .y(function(d){ return d.y;})
    .interpolate("linear");

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
    i = 1;
    hexes.forEach(function(hex){
    hexShow = g.append("path")
      .attr("d", lineFunction(hex).concat("Z"))
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("terrain", 'ocean')
      .attr("fill", "#0000FF")
      // .attr("tile_id", (i + (169 * board[0].board_id) - 169))

      i++;
    });
  }

  $('#accept_board').on("submit", function(event){
    $.ajax({
      type: "PATCH",
      url: '/board/'+ board[0].board_id,
      data: JSON.stringify(updateQueue),
      accept: 'application/json',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(){
        alert('Sent update info succesfully');
      }
    });
  });


// function Tile(radius, coordinates, terrain) {
//   this.radius = radius
//   this.coordinates = coordinates
//   this.terrain = terrain
// }
//new Tile(25, terrainOptions[Math.floor((3 * Math.random()))],
// var terrainOptions = ["ocean", "ocean", "desert"]
  $('#generate_map').on("click", function(event){
    event.preventDefault();
    console.log("hey");
    var tiles = [];
    var boardSize = 50
    for (var i = -boardSize; Math.abs(i) <= boardSize; i++){
      for (var j = -boardSize; Math.abs(j) <= boardSize; j++){
        for (var k = -boardSize; Math.abs(k) <= boardSize; k++){
          if(i+j+k == 0){
            tiles.push(i.toString()+", "+j.toString()+", "+k.toString());
          }
        }
      }
    }
    formatted_tiles = format_coords(tiles)
    var hex_data = formatted_tiles.map(function(tile){
      hold = genHexData(genHexVertices(20), hexToCartesian(tile, 20))
      return hold
    });
    console.log(tiles);
    drawHexes(hex_data);

    //

    // $.getJSON( '/create_board', function(data){
    //   var tiles=[];
    //   board = data;
    //   $.each(data, function(k, v){
    //     tiles.push(v.coordinates);
    //   });
    //   formatted_tiles = format_coords(tiles)
    //   var hex_data = formatted_tiles.map(function(tile){
    //     hold = genHexData(genHexVertices(20), hexToCartesian(tile, 20))
    //     return hold
    //   });
    //   console.log(board);
    //   drawHexes(hex_data);
    // });
  });
});
