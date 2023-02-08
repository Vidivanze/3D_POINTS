class SceneInit {
  constructor(canvasId) {
    // Required elements
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    this.stats = undefined;

    // Camera params;
    //this.width = window.innerWidth - (window.innerWidth * 0.3);
    //this.height = window.innerHeight - (window.innerHeight * 0.3);
    this.width = 1920;
    this.height = 1080;
    this.fov = 50;
    this.nearPlane = 0.1;
    this.farPlane = 600;
    this.canvasId = canvasId;

    // Lighting
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    const canvas = document.getElementById(this.canvasId);

    //STATS
    this.stats = new Stats();
    this.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );

    // SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000425);
    
    // CAMERA
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.set(0, 0, 350);

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild(this.renderer.domElement);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  onWindowResize() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
 
  animate() {
    this.stats.begin();
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.end();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
