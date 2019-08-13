// global THREE
function main() {
  const canvas = document.querySelector('#stretcher');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 40; // fov stand for field of view
  const aspect = 2; // canvas default setting
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 120;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  const objects = [];
  const spread = 15;

  function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoublSide
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);
    return material;
  }

  function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  function addLineGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  {
    const loader = new THREE.FontLoader();
    loader.load(
      'node_modules/three/examples/fonts/helvetiker_bold.typeface.json',
      font => {
        const geometry = new THREE.TextBufferGeometry('ADAMOORE.NET', {
          font: font,
          size: 8.0,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.15,
          bevelSize: 0.3,
          bevelSegments: 5
        });
        const mesh = new THREE.Mesh(geometry, createMaterial());
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

        const parent = new THREE.Object3D();
        parent.add(mesh);

        addObject(-1, 1, parent);
      }
    );
  }
  {
    const loader2 = new THREE.FontLoader();
    loader2.load(
      'node_modules/three/examples/fonts/helvetiker_bold.typeface.json',
      font => {
        const geometry = new THREE.TextBufferGeometry('three.js exercise', {
          font: font,
          size: 8.0,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.15,
          bevelSize: 0.3,
          bevelSegments: 5
        });
        const mesh = new THREE.Mesh(geometry, createMaterial());
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

        const parent = new THREE.Object3D();
        parent.add(mesh);

        addObject(0, -1, parent);
      }
    );
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  function render(time) {
    time *= 0.001; // converting time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    objects.forEach((obj, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
