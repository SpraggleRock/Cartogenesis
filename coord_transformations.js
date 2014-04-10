function PolarCoordinate(r,t) {
  this.r = r;
  this.t = t;
 }
PolarCoordinate.prototype.convertToCartesian = function() {
  return new CartesianCoordinate( this.r * Math.cos(this.t), this.r * Math.sin(this.t) );
}

PolarCoordinate.prototype.formatForLine = function() {
  return this.convertToCartesian().formatForLine();
}

function CartesianCoordinate(x,y) {
  this.x = x;
  this.y = y;
}
CartesianCoordinate.prototype.formatForLine = function () {
  return { "x" : this.x, "y" : this.y }
}

function randomR(maxRadius) {
  return Math.random() * maxRadius;
}
// the nth subangle should be n * 2 Math.PI/ numPOints
//[[random r, 0], [random r, 2pi/numPOints], [ random r, 4pi/numpoints], etc... ]
var numPoints = 10

function genPolarCoordinates(maxRadius) {
  pcoords = []
  for(i=0; i < numPoints; i++){
    pcoords.push([randomR(maxRadius), (i * 2 * Math.PI / numPoints)])
  }
  return pcoords
}

function genLineData(pcoordsArray) {
  return pcoordsArray.map(function(pair) {
    pcoords = new PolarCoordinate(pair[0], pair[1]);
    return pcoords.formatForLine();
  });
}
