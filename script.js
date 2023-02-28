window.onload = function () {
  init();
  animate();
};

// Scene
let sceneInstance;
let loader;
let group;
let fog;

// Points
let pointMesh = new THREE.PointsMaterial( { color: 0x60BAE9, fog: true , size: 0.7 } );

// Animations
let mixer;
let clock;

// Mouse movement
const mouse = new THREE.Vector2();
let windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

// Change current model and refresh scene and her elements
function changeModel( file ) {
  sceneInstance.scene.remove.apply(sceneInstance.scene, sceneInstance.scene.children);
  sceneInstance = null;
  group = null;
  loader = null;
  loadedModel = false;
  clock = null;
  mixer = null;

  init( file );
}

function init( file ) {
  if ( !file ) file = 'test_IO.glb';

  // Scene instance elements
  sceneInstance = new SceneInit("canvas");
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
      group.scale.setScalar(0.5);
      sceneInstance.scene.add( group );
      loader = null;

      // Load animations
      if( model.animations ) animations( model.animations );
    }
  });
  document.getElementById('canvas').addEventListener( 'mousemove', onMouseMove, false );
}

function animate() {
  requestAnimationFrame(animate);

  if ( mixer ) mixer.update( clock.getDelta());
}

//Points generation
function points(position, i){
  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ));

  let point = new THREE.Points( geometry, pointMesh );
  point.name = "Polygon_"+i
  group.add( point );
  geometry = null;
  point = null;
}

// Points animation
function animations(animations) {
  group.animations = animations;
  mixer = new THREE.AnimationMixer( group );

  const clip = animations[0];
  const action = mixer.clipAction( clip );
  
  action.setLoop(THREE.LoopPingPong, 3);
  action.startAt(2)
  action.setDuration(2);
  action.clampWhenFinished = true;
  action.enable = true;
  action.play();
}

// Mouse movement
function onMouseMove(event) {
  mouse.x = ( event.clientX - windowHalf.x );
  mouse.y = ( event.clientY - windowHalf.y );
  group.rotation.x = THREE.MathUtils.lerp( group.rotation.x, (mouse.y * Math.PI) / 3000, 0.1 );
  group.rotation.y = THREE.MathUtils.lerp( group.rotation.y, (mouse.x * Math.PI) / 4000, 0.1 );
}