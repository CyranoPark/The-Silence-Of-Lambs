import React, { Component } from 'react';
import * as THREE from 'three';
import {
  sceneWidth,
  sceneHeight
} from '../../Constants/Style';

export default class Scene extends Component {
  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      100,
      sceneWidth / sceneHeight,
      0.1,
      2000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  componentDidMount(){
    this.camera.position.z = 10;
    this.camera.lookAt(this.scene.position);

    //ADD RENDERER
    
    this.renderer.setClearColor('#ffffff');
    this.renderer.setSize(sceneWidth, sceneHeight);
    this.mount.appendChild(this.renderer.domElement);

    const planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
    const planeMaterial = new THREE.MeshPhongMaterial({color: 0xdddddd});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    this.scene.add(plane);

    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
    this.scene.add(light);

    const directLight1 = new THREE.DirectionalLight(0xffd798, 0.8);
    directLight1.castShadow = true;
    directLight1.position.set(9.5, 8.2, 8.3);
    this.scene.add(directLight1);

    const directLight2 = new THREE.DirectionalLight(0xc9ceff, 0.5);
    directLight2.castShadow = true;
    directLight2.position.set(-15.8, 5.2, 8);
    this.scene.add(directLight2);

    this.start();
  }

  componentWillUnmount(){
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  render(){
    return(
      <div
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
