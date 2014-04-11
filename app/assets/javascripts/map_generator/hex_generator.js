//basic hex <polygon points="20,-11 20,11 0,22 -20,11 -20,-11 0,-22 " fill="#0000FF" id='tile.id'></polygon>
function genHexVertices(radius) {
  hexVerts = []
  for(i=0; i <= 6; i++){
    hexVerts.push([radius, (i * 2 * Math.PI / 6)])
  }
  return hexVerts
}

function hexToCartesian(hexCoord, radius) {
   //cc = [(50 * (hexCoord.a + .5 * (hexCoord.b - hexCoord.c))),(50 * Math.sqrt(3) / 2 *( hexCoord.b + hexCoord.c))];
   //cc = [ 2*hexCoord.a + hexCoord.b - hexCoord.c, -Math.sqrt(3) * ( hexCoord.b + hexCoord.c ) ];
   cc = [ ((radius * -3 / 2) * hexCoord.c), ((( Math.sqrt(3) * radius) / 2) * hexCoord.a + ((radius * Math.sqrt(3) / -2) * hexCoord.b))]
   return cc//.map(function(coord) { return 25 * coord } );
}

function genHexData(pcoordsArray, translation_vector) {
  return pcoordsArray.map(function(pair) {
    pcoords = new PolarCoordinate(pair[0], pair[1]);
    return pcoords.formatForLine(translation_vector);
  });
}
