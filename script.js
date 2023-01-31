window.onload = function () {
  init();
  animate();
};

// Scene
let sceneInstance;
let loader;
let loadedModel;
let group;
let fog;

// Animations
let mixer;
let clock;

// Mouse movement
const mouse = new THREE.Vector2();
let windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );


function init(file) {
  if ( !file ) file = 'test_IO_anim.gltf';
  if(sceneInstance){
    sceneInstance.scene.remove(sceneInstance.scene.children); 
  }
  
  clock = null;
  group = null;
  loader = null;
  loadedModel = null;

  // Scene instance elements
  sceneInstance = new SceneInit("myCanvas");
  sceneInstance.initialize();
  sceneInstance.animate();
  clock = new THREE.Clock();
  group = new THREE.Group();

  // Fog
  let fog = new THREE.Fog(0x000425, 300, 520);
  sceneInstance.scene.fog = fog;

  // Model loader
  loader = new THREE.GLTFLoader();
  loader.load("./assets/"+file, ( model ) => {
    if ( model ) {
      const polygons = model.scene.children[0].children;
      // Replace each polygons by a point
      for (let i = 0; i < polygons.length; i ++) {
        points(polygons[i].position, i);
      };
      loadedModel = model.scene;

      sceneInstance.scene.add( group );
      group.scale.setScalar(0.5);

      // Load animations
      if( model.animations ) animations( model.animations );
    }
  });
  document.addEventListener( 'mousemove', onMouseMove, false );
}

function animate() {
  requestAnimationFrame(animate);

  if(loadedModel) {
    group.rotation.x = THREE.MathUtils.lerp( group.rotation.x, (mouse.y * Math.PI) / 3000, 0.1 );
    group.rotation.y = THREE.MathUtils.lerp( group.rotation.y, (mouse.x * Math.PI) / 4000, 0.1 );
    if ( mixer ) mixer.update( clock.getDelta());
  }

  sceneInstance.render()
}


//Points generation
function points(position, i){
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ));

  const mesh = new THREE.PointsMaterial( { color: 0x60BAE9, fog: true } );
  const point = new THREE.Points( geometry, mesh );
  point.name = "Polygon_"+i
  group.add( point );
}

// Points animation
function animations(animations) {
  group.animations = animations;
  mixer = new THREE.AnimationMixer( group );

  const clip = animations[0];
  const action = mixer.clipAction( clip );
  action.play();
}

// Mouse movement
function onMouseMove(event) {
  mouse.x = ( event.clientX - windowHalf.x );
  mouse.y = ( event.clientY - windowHalf.y );
}