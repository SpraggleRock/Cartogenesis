function format_coords(coord_string_array) {
    var coord_array = coord_string_array.map(function(coord_string){
      return coord_string.split(',');
    });
    var formatted_coord_array = coord_array.map(function(coord){
      return {'a': parseInt(coord[0]), 'b': parseInt(coord[1]), 'c': parseInt(coord[2]) }
    });
    return formatted_coord_array;
  }

  function snapshotTiles() {
  for(var i = 1; i <= $('g').children().length; i++){
    var path = $("path:nth-child("+i+")")
    createdTiles.push(new Tile(20, path.attr("coordinates"), path.attr("terrain")));
  }
}

function Tile(radius, coordinates, terrain) {
  this.radius = radius
  this.coordinates = coordinates
  this.terrain = terrain
}

function generateNewMap(){

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
    return hex_data
}