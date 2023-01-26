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
    this.nearPlane = 0.1;
    this.farPlane = 600;
    this.canvasId = canvasId;

    // Lighting
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    const canvas = document.getElementById(this.canvasId);

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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

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
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
