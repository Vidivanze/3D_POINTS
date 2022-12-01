window.onload = function () {
  init();
};


function init() {
  // SCENE
  const sceneInstance = new SceneInit("myCanvas");
  sceneInstance.initialize();
  sceneInstance.animate();

  let loader = new THREE.GLTFLoader();
  loader.load("./assets/test_montagne.glb", (model) => {
    if (model) {
      model.scene.scale.setScalar(0.2);

      let polygons = model.scene.children[0].children;
      for (let i = 0; i < polygons.length; i ++) {
        points(polygons[i].position);
      };
      loadedModel = model.scene;
    }
  });

  render();
  animate();

  function animate() {
    requestAnimationFrame(animate);
  }

  function render() {
    sceneInstance.render();
  }

  //Points
  function points(position){
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ));
    
    const material = new THREE.PointsMaterial( { color: 0x888888 } );
    const points = new THREE.Points( geometry, material );

    sceneInstance.scene.add( points );

    animate();
  }
}
