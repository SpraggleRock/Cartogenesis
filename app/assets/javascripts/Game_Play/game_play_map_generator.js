$(".games.play").ready(function(){

  var radius = 300;
  var board;

  var svg = d3.select("body").append("svg")
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
    j = 0;
    hexes.forEach(function(hex){
    hexShow = g.append("path")
      .attr("d", lineFunction(hex).concat("Z"))
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("terrain", board[j].terrain)
      .attr("fill", getColor(board[j].terrain, allTools))
      .attr("tile_id", board[j].id)

      i++;
      j++;
    });
  }
  var gameID = $('.games.play').attr("id");

  $.getJSON( '/board/'+ gameID, function(data){
    var tiles=[];
    board = data;
    $.each(data, function(k, v){
      tiles.push(v.coordinates);
    });
    formatted_tiles = format_coords(tiles)
    var hex_data = formatted_tiles.map(function(tile){
      hold = genHexData(genHexVertices(25), hexToCartesian(tile, 25))
      return hold
    });
    drawHexes(hex_data);
  });

  $('#end_turn').on("submit", function(event){
    event.preventDefault();

    $.ajax({
      type: "PATCH",
      url: '/board/' + board[0].board_id ,
      data: JSON.stringify(updateQueue),
      accept: 'application/json',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(){
        alert('Sent update info succesfully');
      }
    });
  });
});

  //Darws line and appends it to the svg
  // var lineShow = svg.append("path")
  //   .attr("d", lineFunction(hexagon).concat("Z"))
  //   .attr("stroke", "black")
  //   .attr("stroke-width", 1)
  //   .attr("fill", "beige");

  //Draws hexes and appends them to svg

  //  var fakeHexDatas = [ {'a':0,'b':0,'c':0}, {'a':1, 'b':0 , 'c':-1}, {'a':-1, 'b':1, 'c':0},
  //   {'a':-1, 'b':0, 'c':1},{'a':0, 'b':1, 'c':-1}, {'a':0, 'b':-1, 'c':1},{'a':1, 'b':-1, 'c':0}, {'a':0,'b':-2,'c':2},
  //   {'a':0,'b':2,'c':2},{'a':2,'b':-2,'c':0},{'a':1,'b':1,'c':-2},{'a':2,'b':0,'c':-2}]
  // // var vertices = genLineData(genRandomPolarCoordinates(radius), [radius, radius]);

  // hexagon = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[0], 25))
  // hexagon2 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[1], 25))
  // hexagon3 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[2], 25))
  // hexagon4 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[3], 25))
  // hexagon5 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[4], 25))
  // hexagon6 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[5], 25))
  // hexagon7 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[6], 25))
  // hexagon8 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[7], 25))
  // hexagon9 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[8], 25))
  // hexagon10 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[9], 25))
  // hexagon11 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[10], 25))
  // hexagon12 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[11], 25))

  //  myGrid = [hexagon, hexagon2, hexagon3, hexagon4, hexagon5, hexagon6, hexagon7, hexagon8,
  //  hexagon9,hexagon10,hexagon11,hexagon12]

  //  console.log("here = " + myGrid[0])

