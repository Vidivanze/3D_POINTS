window.onload = function () {
  init();
};

let sceneInstance;
let loadedModel;
let group;

//Mouse movement
const mouse = new THREE.Vector2();
let windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

function init() {
  // Scene instance
  sceneInstance = new SceneInit("myCanvas");
  sceneInstance.initialize();
  sceneInstance.animate();

  group = new THREE.Group();

  let loader = new THREE.GLTFLoader();
  loader.load("./assets/test_IO.gltf", (model) => {
    if (model) {
      model.scene.scale.setScalar(0.2);

      const polygons = model.scene.children[0].children;
      for (let i = 0; i < polygons.length; i ++) {
        points(polygons[i].position);
      };
      
      sceneInstance.scene.add( group );
      loadedModel = model.scene;
    }
  });

  document.addEventListener( 'mousemove', onMouseMove, false );

  animate();
}

//Points generation
function points(position){
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ));
  
  const material = new THREE.PointsMaterial( { color: 0x888888 } );
  const point = new THREE.Points( geometry, material );

  group.add( point );
}

function onMouseMove(event) {
  mouse.x = ( event.clientX - windowHalf.x );
  mouse.y = ( event.clientY - windowHalf.y );
}

function animate() {
  if(loadedModel) {
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, (mouse.y * Math.PI) / 3000, 0.1)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, (mouse.x * Math.PI) / 4000, 0.1)
  }
  requestAnimationFrame(animate);
}
