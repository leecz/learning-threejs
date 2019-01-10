<template>
  <div class="perio-local">
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

@Component({})
export default class PerioLocal extends Vue {
  table = tableData;
  // three 三件套
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  renderer = new THREE.CSS3DRenderer();

  // 存储元素单元div
  objects: any[] = [];
  targets: TargetMap = { table: [], sphere: [], helix: [], grid: [] };

  generateElement() {
    for (let i = 0; i < this.table.length; i += 5) {
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
    }
  }
  init() {
    this.camera.position.z = 3000;
    this.generateElement();
  }
  mounted() {
    this.init();
  }
}
</script>

<style>
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

