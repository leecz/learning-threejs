<template>
  <div id="container">
    <button @click="upgrade">加入材质、光源和阴影</button>
    <button @click="createView">基本材质</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as THREE from "three";

import {GUI} from 'dat.gui';


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
  cube: any = {}
  step = 0
  sphere: any = {}

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
    this.cube = cube

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
    this.sphere = sphere

    this.scene.add(sphere);

    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    console.log("all right");
    let dom = document.getElementById("container")!;
    dom.appendChild(this.renderer.domElement);
    this.renderScene()
  }
  upgrade() {
    this.renderer.setClearColor(new THREE.Color(0xee, 0xee, 0xee));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMapEnabled = true

    let axes = new THREE.AxesHelper(20);
    this.scene.add(axes);

    let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    this.scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true
    this.cube = cube

    this.scene.add(cube);

    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff,
    });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true
    this.sphere = sphere

    this.scene.add(sphere);

    let spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set( -40, 60, -10)
    spotLight.castShadow = true
    this.scene.add(spotLight)

    this.camera.position.x = -30;
    this.camera.position.y = 40;
    this.camera.position.z = 30;
    this.camera.lookAt(this.scene.position);

    console.log("all right");
    let dom = document.getElementById("container")!;
    dom.appendChild(this.renderer.domElement);
    this.renderScene()
  }

  rotationCube() {
    this.cube.rotation.x += this.controls.rotationSpeed
    this.cube.rotation.y += this.controls.rotationSpeed
    this.cube.rotation.z += this.controls.rotationSpeed
  }
  bounusSphere() {
    this.step += this.controls.bouncingSpeed
    this.sphere.position.x = 20 + (10 * (Math.cos(this.step)))
    this.sphere.position.y = 2 + (10 * Math.abs(Math.sin(this.step)))
  }
  renderScene() {
    this.rotationCube()
    this.bounusSphere()
    window.requestAnimationFrame(this.renderScene)
    this.renderer.render(this.scene, this.camera)
  }


  controls = {
    rotationSpeed:  0.02,
    bouncingSpeed: 0.03
  }
  gui = new GUI()


  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
  init() {
    this.gui.add(this.controls, 'rotationSpeed', 0, 0.5)
    this.gui.add(this.controls, 'bouncingSpeed', 0, 0.5)
  }

  mounted() {
    this.init()
    window.addEventListener('resize', this.onResize, false)
  }
}
</script>
