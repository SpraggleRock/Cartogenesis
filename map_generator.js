var width = 960,
    height = 500

var numPoints = 100

 var svg = d3.select("body").append("svg")
     .attr("width", width)
     .attr("height", height);

 //create line
 var lineFunction = d3.svg.line()
    .x(function(d){ return d.x;})
    .y(function(d){ return d.y;})
    .interpolate("linear");

  var lineShow = svg.append("path")
  .attr("d", lineFunction(vertices))
  .attr("stroke", "red")
  .attr("stroke-width", 4)
  .attr("fill", "none");
