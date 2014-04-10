var pc;


describe('coastline', function(){
  beforeEach(function(){
    pc = new PolarCoordinate(1, Math.PI);
    pc2 = new PolarCoordinate(0, Math.PI);
    pcs = [pc,pc2];
    cc = new CartesianCoordinate(-1, 0);
    cc2 = new CartesianCoordinate(1, 0);
    ccs = [cc,cc2];
  });

  xit("Appends an svg tag to the body", function(){
    console.log(document);
    expect(document.getElementsByTagName('svg')).toEqual('<svg width="1200" height="1200"></svg>')
  });

  describe ('PolarCoordinate', function() {
    it("properly converts a polar coordinate to a cartesian coordinate", function() {
      var roundedConversion = pc.convertToCartesian();
      roundedConversion.y = Math.round(roundedConversion.y);
      expect(roundedConversion).toEqual(new CartesianCoordinate(-1,0))
    });
  });

  describe('CartesianCoordinate', function() {
    it("should convert one cartesian ordered pair into a line datum", function(){
      expect(cc.formatForLine([100,100])).toEqual({"x":99,"y":100});
    });
  });
  describe("Line generation", function(){
    it("should convert a list of polar coordinates into line data", function(){
      lineData =  genLineData(pcs, [100,100]);
        for (var i = 10; i < lineData.length; i++) {
          expect(lineData[i]).toEqual(pcs[i].formatForLine([100,100]));
        }
    });
  });
});
