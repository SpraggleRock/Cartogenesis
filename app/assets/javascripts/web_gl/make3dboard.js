$( document ).ready(function() {
  $( '#3d' ).ready(function(){
    var board3d = [];


    var grabBoard = $.getJSON( '/board/'+ 10, function(data){
      data.forEach(function(datum){
        board3d.push(datum['terrain'])
      })
    });

  grabBoard.complete(function(){

    var stats = new Stats();
    stats.setMode(1); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

  document.body.appendChild( stats.domElement );
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / 2 / window.innerHeight , 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth / 2, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // testVerts = genHexData(genHexVertices(1),);
    generateNewMap();
    var hex_data = formatted_tiles.map(function(tile){
        hold = genHexData(genHexVertices(20), hexToCartesian(tile, 20))
        return hold
      });

      function makeHex(vertices, radius, terrain){
        var side1 = new THREE.Geometry();
        var side2 = new THREE.Geometry();
        
        //cache materials instead of making them every time
        if(terrain == 'ocean'){
          var material = new THREE.MeshLambertMaterial( { color: '#0000ff' } );
          z = -1
          console.log('ocean')
        }
        else if(terrain == 'grassland'){
          var material = new THREE.MeshLambertMaterial( { color: '#99FF33' } );
          z = 5
          console.log('grassland')
        }
        else if(terrain == 'desert'){
          var material = new THREE.MeshLambertMaterial( { color: '#DBB84D' } );
          z = 5
        }
        else if(terrain == 'tundra'){
          var material = new THREE.MeshLambertMaterial( { color: '#B8E6E6' } );
          z = 3
        }
        else if(terrain == 'forest'){
          var material = new THREE.MeshLambertMaterial( { color: '#006600' } );
          z = 8
        }
        else if(terrain == 'mountain'){
          var material = new THREE.MeshLambertMaterial( { color: '#999999' } );
          z = 30
        }


        material.side = THREE.DoubleSide;


        vertices.forEach(function(vert){
          point = new THREE.Vector3(vert.x, vert.y, z);
          //point2 = new THREE.Vector3(vert.x, vert.y, 0 - 20);
          side1.vertices.push( point );
          //side2.vertices.push( point2);
        });

        var i = 1;
        vertices.forEach(function(vert){
          side1.faces.push( new THREE.Face3(0, i, i+1))
          //side2.faces.push( new THREE.Face3(0, i, i+1))
          if(i == 5){
            i = 1;
          }
          else{
          i++
          }
        })

        //THREE.GeometryUtils.merge(side1, side2)

        //facesToCreate1 = [[1,2,8],[2,3,9],[3,4,10],[4,5,11],[5,6,12],[6,7,13]]
        //facesToCreate2 = [[2,8,9],[3,9,10],[4,10,11],[5,11,12],[6,12,13],[7,13,1]]

        //for(i=0;i<6;i++){
          //side1.faces.push( new THREE.Face3(facesToCreate1[i][0],facesToCreate1[i][1],facesToCreate1[i][2]))
          //side1.faces.push( new THREE.Face3(facesToCreate2[i][0],facesToCreate2[i][1],facesToCreate2[i][2]))
        //}

        side1.computeCentroids();
        side1.computeFaceNormals();
        side1.computeVertexNormals();

        var hex1 = new THREE.Mesh( side1, material );

        return hex1;
      }
    var boardHexes = []
    function makeBoard(hex_data){
      k = 0
      hex_data.forEach(function(hex_object){
        boardHexes.push(makeHex(hex_object, 0, board3d[k]))
        k++;
      })
      return boardHexes
    }
    
    makeBoard(hex_data);

    boardHexes.forEach(function(hex){
      hex.side = THREE.DoubleSide;
      scene.add( hex );
    })

    var pointLight = new THREE.PointLight(0xffffff, 1.5, 0);
    scene.add( pointLight )

    controls = new THREE.OrbitControls(camera);

    pointLight.position.z = 150
    camera.position.z = 5;

    function render() {
      stats.begin();
      controls.update();
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      stats.end();
    }
    render();
    })
  })
})