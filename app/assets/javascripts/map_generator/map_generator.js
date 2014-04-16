$(".games.new").ready(function(){

  var radius = 300;
  var board_id;
  var createdTiles = [];

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

  function drawHexes(hexes, tiles) {
    i = 0;
    hexes.forEach(function(hex){
    hexShow = g.append("path")
      .attr("d", lineFunction(hex).concat("Z"))
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("terrain", 'ocean')
      .attr("fill", "#0000FF")
      .attr("coordinates", tiles[i])

      i++;
    });
  }

function snapshotTiles() {
  for(var i = 1; i <= $('g').children().length; i++){
    var path = $("path:nth-child("+i+")")
    createdTiles.push(new Tile(20, path.attr("coordinates"), path.attr("terrain")));
  }
}

  $('#accept_board').on("click", function(event) {
    event.preventDefault();
    snapshotTiles();
    $.ajax({
      type: "POST",
      url: '/games',
      data: JSON.stringify(createdTiles),
      accept: 'application/json',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(response){
       window.location.href = '/join/' + response.slug
      }
    });
  });

function Tile(radius, coordinates, terrain) {
  this.radius = radius
  this.coordinates = coordinates
  this.terrain = terrain
}
//new Tile(25, terrainOptions[Math.floor((3 * Math.random()))],
// var terrainOptions = ["ocean", "ocean", "desert"]
  $('#generate_map').on("click", function(event){
    event.preventDefault();
    var tiles = [];
    var boardSize = 7;
    for (var i = -boardSize; Math.abs(i) <= boardSize; i++){
      for (var j = -boardSize; Math.abs(j) <= boardSize; j++){
        for (var k = -boardSize; Math.abs(k) <= boardSize; k++){
          if(i+j+k == 0){
            coordinates = i.toString()+", "+j.toString()+", "+k.toString();
            tiles.push(coordinates);
          }
        }
      }
    }
    formatted_tiles = format_coords(tiles)
    var hex_data = formatted_tiles.map(function(tile){
      hold = genHexData(genHexVertices(20), hexToCartesian(tile, 20))
      return hold
    });
    drawHexes(hex_data, tiles);

  });
});
