


// Make an instance of two and place it on the page.
var elem = document.getElementById('draw-shapes');
console.log(elem);
// console.log(document.getElementById('here'));
var params = { width: 285, height: 200 };
var two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
// var circle = two.makeCircle(72, 100, 50);
// var rect = two.makeRectangle(213, 100, 100, 100);
radius = 50

var p = two.makeCircle(400, 400, radius / 4);
var l = two.makeCircle(400, 400, radius / 4);
var r = two.makeCircle(200, 100, radius / 4);


var anchor1 = new Two.Anchor(5,5,0,0,0,0)

// The object returned has many stylable properties:
// circle.fill = '#FF8000';
// circle.stroke = 'orangered'; // Accepts all valid css color
// circle.linewidth = 5;

// rect.fill = 'rgb(0, 200, 255)';
// rect.opacity = 0.75;
// rect.noStroke();

// Don't forget to tell two to render everything
// to the screen
two.update();
