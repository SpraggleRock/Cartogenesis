function PolarCoordinate(r,t) {
  this.r = r;
  this.t = t;
 }
PolarCoordinate.prototype.convertToCartesian = function() {
  return new CartesianCoordinate( this.r * Math.cos(this.t), this.r * Math.sin(this.t) );
}

PolarCoordinate.prototype.formatForLine = function(translation_vector) {
  return this.convertToCartesian().formatForLine(translation_vector);
}

function CartesianCoordinate(x,y) {
  this.x = x;
  this.y = y;
}

CartesianCoordinate.prototype.formatForLine = function (translation_vector) {
  return { "x" : this.x + translation_vector[0], "y" : this.y + translation_vector[1] }
}

function randomR(maxRadius) {
  return Math.random() * maxRadius / .9 + maxRadius / 2;
}
// the nth subangle should be n * 2 Math.PI/ numPOints
//[[random r, 0], [random r, 2pi/numPOints], [ random r, 4pi/numpoints], etc... ]
var numPoints = 30

function genPolarCoordinates(maxRadius) {
  pcoords = []
  for(i=0; i < numPoints; i++){
    pcoords.push([randomR(maxRadius), (i * 2 * Math.PI / numPoints)])
  }
  return pcoords
}

function genLineData(pcoordsArray, translation_vector) {
  return pcoordsArray.map(function(pair) {
    pcoords = new PolarCoordinate(pair[0], pair[1]);
    return pcoords.formatForLine(translation_vector);
  });
}
