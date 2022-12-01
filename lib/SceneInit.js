class SceneInit {
  constructor(canvasId) {
    // Required elements
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // Camera params;
    this.width = window.innerWidth - (window.innerWidth * 0.3);
    this.height = window.innerHeight - (window.innerHeight * 0.3);
    this.fov = 50;
    this.nearPlane = 0.01;
    this.farPlane = 5000;
    this.canvasId = canvasId;
    this.controls = undefined;

    // Lighting
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    const canvas = document.getElementById(this.canvasId);

    // SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    
    // CAMERA
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.width / this.height,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.set(0, 10, 300);

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // CONTROLS
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = false;

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
 
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
