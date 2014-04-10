var radius = 200;

var vertices = genLineData(genPolarCoordinates(radius), [radius, radius]);

var svg = d3.select("body").append("svg")
   .attr("width", 2*radius)
   .attr("height", 2*radius);

 //create line
var lineFunction = d3.svg.line()
  .x(function(d){ return d.x;})
  .y(function(d){ return d.y;})
  .interpolate("linear");

var lineShow = svg.append("path")
.attr("d", lineFunction(vertices).concat("z"))
.attr("stroke", "blue")
.attr("stroke-width", 4)
.attr("fill", "green");
