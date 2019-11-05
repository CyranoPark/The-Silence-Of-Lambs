import * as THREE from 'three';

export default class Lamb {
  constructor() {
    this.group = new THREE.Group();

    this.woolMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      shading: THREE.FlatShading
    });
    this.skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaf8b,
      roughness: 1,
      shading: THREE.FlatShading
    });
    this.darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4b4553,
      roughness: 1,
      shading: THREE.FlatShading
    });

    this.vAngle = 110;
    this.lambPosition = this.group.position.z;
    this.isDirectionZ = true;

    this.drawBody();
    this.drawHead();
    this.drawLegs();
  }

  rad(degrees) {
    return degrees * (Math.PI / 180);
  }

  drawBody() {
    const bodyGeometry = new THREE.IcosahedronGeometry(1.7, 0);
    const body = new THREE.Mesh(bodyGeometry, this.woolMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    this.group.add(body);
  }

  drawHead() {
    const head = new THREE.Group();
    head.position.set(0, 0.65, 1.6);
    head.rotation.x = this.rad(-20);
    this.group.add(head);

    const foreheadGeometry = new THREE.BoxGeometry(0.7, 0.6, 0.7);
    const forehead = new THREE.Mesh(foreheadGeometry, this.skinMaterial);
    forehead.castShadow = true;
    forehead.receiveShadow = true;
    forehead.position.y = -0.15;
    head.add(forehead);

    const faceGeometry = new THREE.CylinderGeometry(0.5, 0.15, 0.4, 4, 1);
    const face = new THREE.Mesh(faceGeometry, this.skinMaterial);
    face.castShadow = true;
    face.receiveShadow = true;
    face.position.y = -0.65;
    face.rotation.y = this.rad(45);
    head.add(face);

    const woolGeometry = new THREE.BoxGeometry(0.84, 0.46, 0.9);
    const wool = new THREE.Mesh(woolGeometry, this.woolMaterial);
    wool.position.set(0, 0.12, 0.07);
    wool.rotation.x = this.rad(20);
    head.add(wool);

    const rightEyeGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.06, 6);
    const rightEye = new THREE.Mesh(rightEyeGeometry, this.darkMaterial);
    rightEye.castShadow = true;
    rightEye.receiveShadow = true;
    rightEye.position.set(0.35, -0.48, 0.33);
    rightEye.rotation.set(this.rad(130.8), 0, this.rad(-45));
    head.add(rightEye);

    const leftEye = rightEye.clone();
    leftEye.position.x = -rightEye.position.x;
    leftEye.rotation.z = -rightEye.rotation.z;
    head.add(leftEye);

    const rightEarGeometry = new THREE.BoxGeometry(0.12, 0.5, 0.3);
    rightEarGeometry.translate(0, -0.25, 0);
    this.rightEar = new THREE.Mesh(rightEarGeometry, this.skinMaterial);
    this.rightEar.castShadow = true;
    this.rightEar.receiveShadow = true;
    this.rightEar.position.set(0.35, -0.12, -0.07);
    this.rightEar.rotation.set(this.rad(20), 0, this.rad(50));
    head.add(this.rightEar);

    this.leftEar = this.rightEar.clone();
    this.leftEar.position.x = -this.rightEar.position.x;
    this.leftEar.rotation.z = -this.rightEar.rotation.z;
    head.add(this.leftEar);
  }

  drawLegs() {
    const legGeometry = new THREE.CylinderGeometry(0.3, 0.15, 1, 4);
    legGeometry.translate(0, -0.5, 0);
    this.frontRightLeg = new THREE.Mesh(legGeometry, this.darkMaterial);
    this.frontRightLeg.castShadow = true;
    this.frontRightLeg.receiveShadow = true;
    this.frontRightLeg.position.set(0.7, -0.8, 0.5);
    this.frontRightLeg.rotation.x = this.rad(-12);
    this.group.add(this.frontRightLeg);

    this.frontLeftLeg = this.frontRightLeg.clone();
    this.frontLeftLeg.position.x = -this.frontRightLeg.position.x;
    this.frontLeftLeg.rotation.z = -this.frontRightLeg.rotation.z;
    this.group.add(this.frontLeftLeg);

    this.backRightLeg = this.frontRightLeg.clone();
    this.backRightLeg.position.z = -this.frontRightLeg.position.z;
    this.backRightLeg.rotation.x = -this.frontRightLeg.rotation.x;
    this.group.add(this.backRightLeg);

    this.backLeftLeg = this.frontLeftLeg.clone();
    this.backLeftLeg.position.z = -this.frontLeftLeg.position.z;
    this.backLeftLeg.rotation.x = -this.frontLeftLeg.rotation.x;
    this.group.add(this.backLeftLeg);
  }

  jump(speed) {
    this.vAngle += speed;
    this.group.position.y = Math.sin(this.vAngle) + 2.58;

    const legRotation = Math.sin(this.vAngle) * Math.PI / 6 + 0.4;

    this.frontRightLeg.rotation.z = legRotation;
    this.backRightLeg.rotation.z = legRotation;
    this.frontLeftLeg.rotation.z = -legRotation;
    this.backLeftLeg.rotation.z = -legRotation;

    const earRotation = Math.sin(this.vAngle) * Math.PI / 3 + 1.5;

    this.rightEar.rotation.z = earRotation;
    this.leftEar.rotation.z = -earRotation;
  }

  walk(speed, position) {
    this.vAngle += speed;

    const currentPosition = new THREE.Vector3();
    currentPosition.setFromMatrixPosition(this.group.matrixWorld);
    console.log(this.group.rotation.y);
    if (currentPosition.distanceTo(new THREE.Vector3(0, 1.7, 0)) > 35) {
      this.group.translateZ(-0.5);
      this.group.rotation.y =  THREE.Math.radToDeg(Math.random() * 2 * Math.PI);
    }

    this.group.translateZ(speed);
    const legRotation = Math.sin(this.vAngle) * Math.PI / 6 + 0.4;

    this.frontRightLeg.rotation.x = -legRotation;
    this.backRightLeg.rotation.x = legRotation;
    this.frontLeftLeg.rotation.x = -legRotation;
    this.backLeftLeg.rotation.x = legRotation;

    const earRotation = Math.sin(this.vAngle) * Math.PI / 3 + 1.5;
    this.rightEar.rotation.z = earRotation;
    this.leftEar.rotation.z = -earRotation;
  }
}
