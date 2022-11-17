window.onload = function () {
  init();
};

let loadedModel;

function init() {
  // SCENE
  const sceneInstance = new SceneInit("myCanvas");
  sceneInstance.initialize();
  sceneInstance.animate();

  const width = window.innerWidth;
  const height = window.innerHeight;

  /* 
    // LIGHTS 
    const light = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set(1050, 50, 50 );
    scene.add( light );

    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set(300, 0, 0);
    scene.add( dirLight );
    
    var dirLight2 = new THREE.DirectionalLight( 0xffffff );
    dirLight2.position.set(-300, 0, 0);
    scene.add( dirLight2 );

    var dirLight3 = new THREE.DirectionalLight( 0xffffff );
    dirLight3.position.set(0, 300, 0);
    scene.add( dirLight3 );

    var dirLight4 = new THREE.DirectionalLight( 0xffffff );
    dirLight4.position.set( 0, -300, 0);
    scene.add( dirLight4 );

    var dirLight5 = new THREE.DirectionalLight( 0xffffff );
    dirLight5.position.set( 0, 0, 300);
    scene.add( dirLight5 );

    var dirLight6 = new THREE.DirectionalLight( 0xffffff );
    dirLight6.position.set( 0, 0, -300);
    scene.add( dirLight6 );

    // HELPERS 
    const helper = new THREE.DirectionalLightHelper( dirLight, 5 );
    scene.add( helper );
    const helper2 = new THREE.DirectionalLightHelper( dirLight2, 5 );
    scene.add( helper2 );
    const helper3 = new THREE.DirectionalLightHelper( dirLight3, 5 );
    scene.add( helper3 );
    const helper4 = new THREE.DirectionalLightHelper( dirLight4, 5 );
    scene.add( helper4 );
    const helper5 = new THREE.DirectionalLightHelper( dirLight5, 5 );
    scene.add( helper5 );
    const helper6 = new THREE.DirectionalLightHelper( dirLight6, 5 );
    scene.add( helper6 ); */

  // SHAPE
  const shapeGeometry = new THREE.BufferGeometry();
  let vertices = new Float32Array([]);

  let loader = new THREE.GLTFLoader();

  loader.load('./assets/shape.gltf', (gltf) => {
    if (gltf) {
        gltf.scene.rotation.z = Math.PI / 24;
        gltf.scene.rotation.y = Math.PI / 12;
        gltf.scene.position.y = 0.2;
        gltf.scene.scale.setScalar(0.9);
        vertices = gltf.scene.children[0].geometry.attributes.position.array;
    }
    loadedModel = gltf.scene;
    sceneInstance.scene.add(loadedModel);
  });

  const pointsMaterial = new THREE.PointsMaterial( {

    color: 0x0080ff,
    map: new THREE.TextureLoader().load("./assets/dot.png"),
    size: 1,
    alphaTest: 0.5

} );

const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

const points = new THREE.Points( pointsGeometry, pointsMaterial );
sceneInstance.scene.add( points );

// convex hull

const meshMaterial = new THREE.MeshLambertMaterial( {
    color: 0xffffff,
    opacity: 0.5,
    transparent: true
} );

const meshGeometry = new THREE.ConvexGeometry( vertices );

const mesh1 = new THREE.Mesh( meshGeometry, meshMaterial );
mesh1.material.side = THREE.BackSide; // back faces
mesh1.renderOrder = 0;
sceneInstance.scene.add( mesh1 );

const mesh2 = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
mesh2.material.side = THREE.FrontSide; // front faces
mesh2.renderOrder = 1;
sceneInstance.scene.add( mesh2 );

  animate();
}

function animate() {
  requestAnimationFrame(animate);
}
