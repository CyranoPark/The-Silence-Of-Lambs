import * as THREE from 'three';
import optimerRegular from 'three/examples/fonts/droid/droid_sans_regular.typeface.json';

export default class titleText {
  constructor(title) {
    this.loader = new THREE.FontLoader();
    this.font = this.loader.parse(optimerRegular);
    this.textGeometry = new THREE.TextGeometry(title, {
      font: this.font,
      size: 1,
      height: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.04
    });
    this.textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    this.textMesh = new THREE.Mesh(this.textGeometry, this.textMaterial);
  }
};
