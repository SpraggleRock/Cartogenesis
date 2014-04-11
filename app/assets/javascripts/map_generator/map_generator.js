$(document).ready(function(){

  var radius = 300;
  var fakeHexDatas = [ {'a':0,'b':0,'c':0}, {'a':1, 'b':0 , 'c':-1}, {'a':-1, 'b':1, 'c':0},
  {'a':-1, 'b':0, 'c':1},{'a':0, 'b':1, 'c':-1}, {'a':0, 'b':-1, 'c':1},{'a':1, 'b':-1, 'c':0}, {'a':0,'b':-2,'c':2}]
  // var vertices = genLineData(genRandomPolarCoordinates(radius), [radius, radius]);

  hexagon = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[0], 25))
  hexagon2 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[1], 25))
  hexagon3 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[2], 25))
  hexagon4 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[3], 25))
  hexagon5 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[4], 25))
  hexagon6 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[5], 25))
  hexagon7 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[6], 25))
  hexagon8 = genHexData(genHexVertices(25), hexToCartesian(fakeHexDatas[7], 25))

  console.log(hexToCartesian(fakeHexDatas[0], 25))
  console.log(hexToCartesian(fakeHexDatas[1], 25))

  myGrid = [hexagon, hexagon2, hexagon3, hexagon4, hexagon5, hexagon6, hexagon7, hexagon8]

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

  //Darws line and appends it to the svg
  // var lineShow = svg.append("path")
  //   .attr("d", lineFunction(hexagon).concat("Z"))
  //   .attr("stroke", "black")
  //   .attr("stroke-width", 1)
  //   .attr("fill", "beige");

  //Draws hexes and appends them to svg
  function drawHexes(hexes) {
    hexes.forEach(function(hex){
    hexShow = g.append("path")
      .attr("d", lineFunction(hex).concat("Z"))
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("fill", "beige")
    });
  }

  drawHexes(myGrid);
})



