import * as THREE from 'three';
import {
  sceneBackgroundColor,
  sceneWidth,
  sceneHeight
} from '../../constants/style';

export default class StartScene {
  constructor() {
    // CAMERA
    this.camera = new THREE.PerspectiveCamera(20, sceneWidth / sceneHeight, 0.1, 2000);
    this.camera.position.set(30, 5, 40);
    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(this.cameraTarget);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(sceneBackgroundColor);
    this.scene.fog = new THREE.Fog(0xffffff, 250, 1400);

    this.addLight();
    this.addPlane();
  }

  addPlane() {
    const planeGeometry = new THREE.CircleGeometry(40, 100);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x009933 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    // plane.castShadow = true;
    plane.rotation.x = -0.5 * Math.PI;

    this.scene.add(plane);
  }

  addLight() {
    const directLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directLight1.position.set(9.5, 8.2, 8.3);
    this.scene.add(directLight1);

    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    this.scene.add(light);
  }
}
