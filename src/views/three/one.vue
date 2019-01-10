<template>
  <div id="container"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";

@Component({
  components: {}
})
export default class One extends Vue {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();

  createView() {
    this.renderer.setClearColor(0xeeeeee);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    let axes = new THREE.AxesHelper(20);
    this.scene.add(axes);

    let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    this.scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    this.scene.add(cube);

    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x7777ff,
      wireframe: true
    });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    this.scene.add(sphere);

    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    console.log("all right");
    let dom = document.getElementById("container")!;
    dom.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
  }

  init() {
    this.createView();
  }

  mounted() {
    this.init();
  }
}
</script>
