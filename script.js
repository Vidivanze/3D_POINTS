window.onload = function () {
  init();
};


function init() {
  // SCENE
  const sceneInstance = new SceneInit("myCanvas");
  sceneInstance.initialize();
  sceneInstance.animate();

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
