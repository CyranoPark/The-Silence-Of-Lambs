import * as THREE from 'three';
import optimerRegular from '../font/optimer_bold.typeface.json';
import {
  titleSceneWidth,
  titleSceneHeight
} from '../../Constants/Style';
export default class StartScene {
  constructor() {
    // CAMERA
    this.camera = new THREE.PerspectiveCamera( 50, titleSceneWidth / titleSceneHeight, 0.1, 2000 );
    this.camera.position.set( 0, 200, 500 );
    this.cameraTarget = new THREE.Vector3( 0, 100, 0 );
    this.camera.lookAt(this.cameraTarget);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xffffff );
    this.scene.fog = new THREE.Fog( 0xffffff, 250, 1400 );

    this.axes = new THREE.AxisHelper(100);
    this.scene.add(this.axes);

    this.addLight();
    this.loadFont();
  }

  addLight() {
    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    dirLight.position.set( 0, 0, 1 ).normalize();
    this.scene.add( dirLight );

    const pointLight = new THREE.PointLight( 0xffffff, 1.5 );
    pointLight.position.set( 0, 100, 90 );
    this.scene.add( pointLight );
  }

  loadFont() {
    const loader = new THREE.FontLoader();
    const font = loader.parse(optimerRegular);
    const textGeometry = new THREE.TextGeometry( 'The Silence Of Lambs', {
      font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5
    });
    const textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    const textMesh = new THREE.Mesh( textGeometry, textMaterial );
    textMesh.position.x = -540;
    textMesh.position.y = 100;
    textMesh.position.z = 0;

    this.scene.add(textMesh);
  }
}
