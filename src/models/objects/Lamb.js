import * as THREE from 'three';
import optimerRegular from 'three/examples/fonts/droid/droid_sans_regular.typeface.json';

export default class Lamb {
  constructor(name, color, size, isLamb) {
    this.group = new THREE.Group();
    this.group.scale.x = size;
    this.group.scale.y = size;
    this.group.scale.z = size;

    this.group.position.y = size * 1.7;

    this.woolMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 1,
      flatShading: true
    });
    this.skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaf8b,
      roughness: 1,
      flatShading: true
    });
    this.darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4b4553,
      roughness: 1,
      flatShading: true
    });
    this.bloodMaterial = new THREE.MeshStandardMaterial({
      color: 0xaf111c,
      roughness: 1,
      flatShading: true
    });
    this.wolfBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 1,
      flatShading: true
    });

    this.name = name;
    this.size = size;
    this.color = color;
    this.isLamb = isLamb;

    this.vAngle = 110;
    this.lambPosition = this.group.position.z;
    this.isDirectionZ = true;

    this.drawBody();
    this.drawHead();
    this.drawLegs();
    this.drawName(this.name);
  }

  rad(degrees) {
    return degrees * (Math.PI / 180);
  }

  drawBody() {
    const bodyGeometry = new THREE.IcosahedronGeometry(1.7, 0);
    this.body = new THREE.Mesh(bodyGeometry, this.woolMaterial);
    this.body.castShadow = true;
    this.body.receiveShadow = true;

    this.group.add(this.body);
  }

  drawHead() {
    this.head = new THREE.Group();
    this.head.position.set(0, 0.65, 1.6);
    this.head.rotation.x = this.rad(-20);
    this.group.add(this.head);

    const foreheadGeometry = new THREE.BoxGeometry(0.7, 0.6, 0.7);
    this.forehead = new THREE.Mesh(foreheadGeometry, this.skinMaterial);
    this.forehead.castShadow = true;
    this.forehead.receiveShadow = true;
    this.forehead.position.y = -0.15;
    this.head.add(this.forehead);

    const faceGeometry = new THREE.CylinderGeometry(0.5, 0.15, 0.4, 4, 1);
    this.face = new THREE.Mesh(faceGeometry, this.skinMaterial);
    this.face.castShadow = true;
    this.face.receiveShadow = true;
    this.face.position.y = -0.65;
    this.face.rotation.y = this.rad(45);
    this.head.add(this.face);

    const woolGeometry = new THREE.BoxGeometry(0.84, 0.46, 0.9);
    this.wool = new THREE.Mesh(woolGeometry, this.woolMaterial);
    this.wool.position.set(0, 0.12, 0.07);
    this.wool.rotation.x = this.rad(20);
    this.head.add(this.wool);

    const rightEyeGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.06, 6);
    this.rightEye = new THREE.Mesh(rightEyeGeometry, this.darkMaterial);
    this.rightEye.castShadow = true;
    this.rightEye.receiveShadow = true;
    this.rightEye.position.set(0.35, -0.48, 0.33);
    this.rightEye.rotation.set(this.rad(130.8), 0, this.rad(-45));
    this.head.add(this.rightEye);

    this.leftEye = this.rightEye.clone();
    this.leftEye.position.x = -this.rightEye.position.x;
    this.leftEye.rotation.z = -this.rightEye.rotation.z;
    this.head.add(this.leftEye);

    const rightEarGeometry = new THREE.BoxGeometry(0.12, 0.5, 0.3);
    rightEarGeometry.translate(0, -0.25, 0);
    this.rightEar = new THREE.Mesh(rightEarGeometry, this.skinMaterial);
    this.rightEar.castShadow = true;
    this.rightEar.receiveShadow = true;
    this.rightEar.position.set(0.35, -0.12, -0.07);
    this.rightEar.rotation.set(this.rad(20), 0, this.rad(50));
    this.head.add(this.rightEar);

    this.leftEar = this.rightEar.clone();
    this.leftEar.position.x = -this.rightEar.position.x;
    this.leftEar.rotation.z = -this.rightEar.rotation.z;
    this.head.add(this.leftEar);
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

  drawName(name) {
    const loader = new THREE.FontLoader();
    const font = loader.parse(optimerRegular);
    const textGeometry = new THREE.TextGeometry(name, {
      font,
      size: 0.5,
      height: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.02,
    });
    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    this.nameTag = new THREE.Mesh(textGeometry, textMaterial);
    this.nameTag.position.x = -1;
    this.nameTag.position.y = 2;
    this.group.add(this.nameTag);
  }

  drawDeadEyes() {
    this.head.remove(this.rightEye);
    this.head.remove(this.leftEye);

    const rightDeadEyeGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.1);
    this.rightDeadEye = new THREE.Mesh(rightDeadEyeGeometry, this.darkMaterial);
    this.rightDeadEye.castShadow = true;
    this.rightDeadEye.receiveShadow = true;
    this.rightDeadEye.position.set(0, -0.48, 0.4);
    this.rightDeadEye.rotation.set(0, 0, this.rad(-45));
    this.head.add(this.rightDeadEye);

    this.leftDeadEye = this.rightDeadEye.clone();
    this.leftDeadEye.position.x = -this.rightDeadEye.position.x;
    this.leftDeadEye.rotation.z = -this.rightDeadEye.rotation.z;
    this.head.add(this.leftDeadEye);
  }

  drawBlood() {
    const bloodGeometry = new THREE.CircleGeometry(5, 100);
    this.bloodField = new THREE.Mesh(bloodGeometry, this.bloodMaterial);
    this.bloodField.position.x = (this.size - 1) * 0.4 - 1;
    this.bloodField.rotation.y = this.rad(90);
    this.group.add(this.bloodField);
  }

  jump(speed) {
    this.vAngle += speed;
    this.group.position.y = Math.sin(this.vAngle) + 1.58 + this.size;

    const legRotation = Math.sin(this.vAngle) * Math.PI / 6 + 0.4;

    this.frontRightLeg.rotation.z = legRotation;
    this.backRightLeg.rotation.z = legRotation;
    this.frontLeftLeg.rotation.z = -legRotation;
    this.backLeftLeg.rotation.z = -legRotation;

    const earRotation = Math.sin(this.vAngle) * Math.PI / 3 + 1.5;

    this.rightEar.rotation.z = earRotation;
    this.leftEar.rotation.z = -earRotation;
  }

  walk(speed) {
    this.vAngle += speed;

    this.group.translateZ(speed * 0.5);
    const legRotation = Math.sin(this.vAngle) * Math.PI / 6 + 0.4;

    this.frontRightLeg.rotation.x = -legRotation;
    this.backRightLeg.rotation.x = legRotation;
    this.frontLeftLeg.rotation.x = -legRotation;
    this.backLeftLeg.rotation.x = legRotation;

    const earRotation = Math.sin(this.vAngle) * Math.PI / 3 + 1.5;
    this.rightEar.rotation.z = earRotation;
    this.leftEar.rotation.z = -earRotation;
  }

  died(callback) {
    let timer = 10;
    let frameNum = 100;
    const initPosition = this.group.position.x;
    const dieAnimation = () => {
      this.group.position.x -= 1.6 / frameNum;
      this.group.position.y -= 0.6 / frameNum;
      this.group.rotation.z += 1.55 / frameNum;

      if (this.group.position.x < initPosition - 1.63) {
        this.drawDeadEyes();
        this.drawBlood();
        callback();
        return;
      }
      setTimeout(dieAnimation, timer);
    }
    setTimeout(dieAnimation, timer);
  }

  changeWolf() {
    const wolfBodyGeometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 33);
    this.wolfBody = new THREE.Mesh(wolfBodyGeometry, this.wolfBodyMaterial);
    this.wolfBody.position.set(0, 0.12, 0.07);
    this.wolfBody.rotation.x = this.rad(90);
    this.group.remove(this.body);
    this.group.remove(this.head);
    this.group.remove(this.nameTag);
    this.group.add(this.wolfBody);
    this.drawName('WOLF');
  }

  reset() {
    this.group.position.y = this.size * 1.7;

    this.frontRightLeg.rotation.z = 0;
    this.backRightLeg.rotation.z = 0;
    this.frontLeftLeg.rotation.z = 0;
    this.backLeftLeg.rotation.z = 0;

    this.rightEar.rotation.z = 0;
    this.leftEar.rotation.z = 0;
  }
}
