<template>
  <div class="perio">
    <div id="container"></div>
    <div id="menu">
      <button id="table">TABLE</button>
      <button id="sphere">SPHERE</button>
      <button id="helix">HELIX</button>
      <button id="grid">GRID</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";
import tableData from "./table";
import "three/examples/js/renderers/CSS3DRenderer.js";
import "three/examples/js/controls/TrackballControls.js";
const TWEEN = require("@tweenjs/tween.js");

interface TargetMap {
  table: (any)[];
  sphere: (any)[];
  helix: (any)[];
  grid: (any)[];
}
@Component({
  components: {}
})
export default class PerioLocal extends Vue {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  renderer = new THREE.CSS3DRenderer();
  controls: any;
  table = tableData;
  objects: any[] = [];
  targets: TargetMap = { table: [], sphere: [], helix: [], grid: [] };

  init() {
    this.camera.position.z = 3000;

    for (var i = 0; i < this.table.length; i += 5) {
      let element = document.createElement("div");
      element.className = "element";
      element.style.backgroundColor =
        "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

      let number = document.createElement("div");
      number.className = "number";
      number.textContent = i / 5 + 1 + "";
      element.appendChild(number);

      let symbol = document.createElement("div");
      symbol.className = "symbol";
      symbol.textContent = this.table[i] + "";
      element.appendChild(symbol);

      let details = document.createElement("div");
      details.className = "details";
      details.innerHTML = this.table[i + 1] + "<br>" + this.table[i + 2];
      element.appendChild(details);

      let object = new THREE.CSS3DObject(element);
      object.position.x = Math.random() * 4000 - 2000;
      object.position.y = Math.random() * 4000 - 2000;
      object.position.z = Math.random() * 4000 - 2000;
      this.scene.add(object);

      this.objects.push(object);

      //

      let targetObject = new THREE.Object3D();
      targetObject.position.x = this.table[i + 3] * 140 - 1260;
      targetObject.position.y = -(this.table[i + 4] * 180) + 990;

      this.targets.table.push(targetObject);
    }

    // sphere
    let vector = new THREE.Vector3();
    for (let i = 0, l = this.objects.length; i < l; i++) {
      let phi = Math.acos(-1 + (2 * i) / l);
      let theta = Math.sqrt(l * Math.PI) * phi;

      let object = new THREE.Object3D();

      object.position.x = 800 * Math.cos(theta) * Math.sin(phi);
      object.position.y = 800 * Math.sin(theta) * Math.sin(phi);
      object.position.z = 800 * Math.cos(phi);

      vector.copy(object.position).multiplyScalar(2);

      object.lookAt(vector);

      this.targets.sphere.push(object);
    }

    // helix

    let vector2 = new THREE.Vector3();

    for (let i = 0, l = this.objects.length; i < l; i++) {
      let phi = i * 0.175 + Math.PI;

      let object = new THREE.Object3D();

      object.position.x = 900 * Math.sin(phi);
      object.position.y = -(i * 8) + 450;
      object.position.z = 900 * Math.cos(phi);

      vector2.x = object.position.x * 2;
      vector2.y = object.position.y;
      vector2.z = object.position.z * 2;

      object.lookAt(vector2);

      this.targets.helix.push(object);
    }

    // grid

    for (let i = 0; i < this.objects.length; i++) {
      let object = new THREE.Object3D();

      object.position.x = (i % 5) * 400 - 800;
      object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
      object.position.z = Math.floor(i / 25) * 1000 - 2000;

      this.targets.grid.push(object);
    }

    ////////////////
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.position = "absolute";
    let dom = document.getElementById("container")!;
    dom.appendChild(this.renderer.domElement);

    let controls = new THREE.TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls = controls;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener("change", this.renderThings);

    let button = document.getElementById("table")!;
    button.addEventListener(
      "click",
      event => {
        this.transform(this.targets.table, 2000);
      },
      false
    );

    let button1 = document.getElementById("sphere")!;
    button1.addEventListener(
      "click",
      event => {
        this.transform(this.targets.sphere, 2000);
      },
      false
    );

    let button2 = document.getElementById("helix")!;
    button2.addEventListener(
      "click",
      event => {
        this.transform(this.targets.helix, 2000);
      },
      false
    );

    let button3 = document.getElementById("grid")!;
    button3.addEventListener(
      "click",
      event => {
        this.transform(this.targets.grid, 2000);
      },
      false
    );

    this.transform(this.targets.table, 2000);

    //

    window.addEventListener("resize", this.onWindowResize, false);
  }
  transform(targets: (any)[], duration: number) {
    TWEEN.removeAll();

    for (let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];
      let target = targets[i];

      new TWEEN.Tween(object.position)
        .to(
          { x: target.position.x, y: target.position.y, z: target.position.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

      new TWEEN.Tween(object.rotation)
        .to(
          { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    }

    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(this.renderThings)
      .start();
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderThings();
  }
  animate() {
    requestAnimationFrame(this.animate);

    TWEEN.update();

    this.controls.update();
  }

  renderThings() {
    this.renderer.render(this.scene, this.camera);
  }

  mounted() {
    console.log("period mounted");
    this.init();
    this.animate();
  }
}
</script>
<style >
html,
body {
  height: 100%;
}

body {
  background-color: #000000;
  margin: 0;
  font-family: Helvetica, sans-serif;
  overflow: hidden;
}

a {
  color: #ffffff;
}

#info {
  position: absolute;
  width: 100%;
  color: #ffffff;
  padding: 5px;
  font-family: Monospace;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
}

#menu {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  text-align: center;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
  border: 1px solid rgba(127, 255, 255, 0.75);
}

.element .number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

button {
  color: rgba(127, 255, 255, 0.75);
  background: transparent;
  outline: 1px solid rgba(127, 255, 255, 0.75);
  border: 0px;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: rgba(0, 255, 255, 0.5);
}
button:active {
  color: #000000;
  background-color: rgba(0, 255, 255, 0.75);
}
</style>
