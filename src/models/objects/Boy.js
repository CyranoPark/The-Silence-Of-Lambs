import * as THREE from 'three';

export default class Boy {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.y = 2;

    this.vAngle = 110;

    this.hatMat = new THREE.MeshLambertMaterial({
      color: 0xBA833E,
      flatShading: true,
    });

    this.skinMat = new THREE.MeshLambertMaterial({
      color: 0xe0bea5,
      flatShading: true,
    });

    this.darkMat = new THREE.MeshLambertMaterial({
      color: 0x333333,
      flatShading: true,
    });

    this.eyeMat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      flatShading: true
    });

    this.legMat = new THREE.MeshLambertMaterial({
      color: 0xbb7344,
      flatShading: true
    });

    this.clothMat = new THREE.MeshLambertMaterial({
      color: 0xc91d2b,
      flatShading: true
    });

    this.legsMat = new THREE.MeshLambertMaterial({
      color: 0x5f0976,
      flatShading: true
    });

    this.shoesMat = new THREE.MeshLambertMaterial({
      color: 0x907637,
      flatShading: true
    });

    this.drawHead();
    this.drawBody();
  }

  rad(degrees) {
    return degrees * (Math.PI / 180);
  }

  deg(rad) {
    return rad * (180 / Math.PI);
  }

  drawHead() {
    //head
    const head = new THREE.BoxGeometry(300, 350, 280);
    this.head = new THREE.Mesh(head, this.skinMat);
    this.head.position.x = 0;
    this.head.position.y = 1.7;
    this.head.position.z = 0;

    //glasses
    const glass = new THREE.CircleGeometry(60, 78, 10);
    //Retinas Left
    this.glassLeft = new THREE.Mesh(glass, this.eyeMat);
    this.glassLeft.position.x = -80;
    this.glassLeft.position.y = 4;
    this.glassLeft.position.z = 160;

    //Retinas Right
    this.glassRight = new THREE.Mesh(glass, this.eyeMat);
    this.glassRight.position.x = 80;
    this.glassRight.position.y = 4;
    this.glassRight.position.z = 160;

    //glass middle
    const glassM = new THREE.BoxGeometry(40, 10, 10);
    this.glassM = new THREE.Mesh(glassM, this.darkMat);
    this.glassM.position.x = 0;
    this.glassM.position.y = 5;
    this.glassM.position.z = 155;

    //Retinas
    const retina = new THREE.BoxGeometry(25, 25, 5);
    //Retinas Left
    this.retinaLeft = new THREE.Mesh(retina, this.darkMat);
    this.retinaLeft.position.x = -80;
    this.retinaLeft.position.y = 5;
    this.retinaLeft.position.z = 168;
    //Retinas Right
    this.retinaRight = new THREE.Mesh(retina, this.darkMat);
    this.retinaRight.position.x = 80;
    this.retinaRight.position.y = 5;
    this.retinaRight.position.z = 168;

    //lip
    const lip = new THREE.BoxGeometry(40, 20, 10);
    this.lip = new THREE.Mesh(lip, this.darkMat);
    this.lip.position.x = 0;
    this.lip.position.z = 162;
    this.lip.position.y = -120;

    //Hat
    const hatTop = new THREE.BoxGeometry(320, 120, 290);
    this.hatTop = new THREE.Mesh(hatTop, this.hatMat);
    this.hatTop.position.x = 0;
    this.hatTop.position.z = 0;
    this.hatTop.position.y = 180;

    const hatBottom = new THREE.CylinderGeometry(400, 400, 30);
    this.hatBottom = new THREE.Mesh(hatBottom, this.hatMat);
    this.hatBottom.position.x = 0;
    this.hatBottom.position.z = 0;
    this.hatBottom.position.y = 120;

    // group elements

    this.head.add(this.hatTop);
    this.head.add(this.hatBottom);
    this.head.add(this.glassM);
    this.head.add(this.glassLeft);
    this.head.add(this.glassRight);
    this.head.add(this.retinaLeft);
    this.head.add(this.retinaRight);
    this.head.add(this.lip);


    this.head.scale.x = 0.005
    this.head.scale.y = 0.005
    this.head.scale.z = 0.005

    this.group.add(this.head);
  }

  drawBody() {
    //body
    const body = new THREE.BoxGeometry(300, 250, 300);
    this.body = new THREE.Mesh(body, this.clothMat);
    this.body.position.x = 0;
    this.body.position.y = 0;
    this.body.position.z = 0;

    const shoulder = new THREE.BoxGeometry(400, 100, 300);
    this.shoulder = new THREE.Mesh(shoulder, this.clothMat);
    this.shoulder.position.x = 0;
    this.shoulder.position.y = 100;
    this.shoulder.position.z = 0;

    //arms

    const arm = new THREE.BoxGeometry(50, 250, 100);

    this.armLeft = new THREE.Mesh(arm, this.clothMat);
    this.armLeft.position.x = 170;
    this.armLeft.position.y = 0;
    this.armLeft.position.z = 0;

    this.armRight = new THREE.Mesh(arm, this.clothMat);
    this.armRight.position.x = -170;
    this.armRight.position.y = 0;
    this.armRight.position.z = 0;


    // hands

    const hand = new THREE.BoxGeometry(50, 50, 50);

    this.handLeft = new THREE.Mesh(hand, this.skinMat);
    this.handLeft.position.x = 0;
    this.handLeft.position.y = -150;
    this.handLeft.position.z = 20;
    this.armLeft.add(this.handLeft);

    this.handRight = new THREE.Mesh(hand, this.skinMat);
    this.handRight.position.x = 0;
    this.handRight.position.y = -150;
    this.handRight.position.z = 20;
    this.armRight.add(this.handRight);

    const stick = new THREE.BoxGeometry(20, 20, 1000);
    this.stick = new THREE.Mesh(stick, this.darkMat);
    this.stick.position.z = 200
    this.handRight.add(this.stick);

    //legs

    const leftLeg = new THREE.BoxGeometry(100, 300, 150);
    this.leftLeg = new THREE.Mesh(leftLeg, this.legsMat);
    this.leftLeg.position.x = 80;
    this.leftLeg.position.y = -200;
    this.leftLeg.position.z = 0;

    const rightLeg = new THREE.BoxGeometry(100, 300, 150);
    this.rightLeg = new THREE.Mesh(rightLeg, this.legsMat);
    this.rightLeg.position.x = -80;
    this.rightLeg.position.y = -200;
    this.rightLeg.position.z = 0;

    //shoes

    const leftShoe = new THREE.BoxGeometry(100, 50, 200);
    this.leftShoe = new THREE.Mesh(leftShoe, this.shoesMat);
    this.leftShoe.position.x = 0;
    this.leftShoe.position.y = -200;
    this.leftShoe.position.z = 10;
    this.leftLeg.add(this.leftShoe);

    const rightShoe = new THREE.BoxGeometry(100, 50, 200);
    this.rightShoe = new THREE.Mesh(rightShoe, this.shoesMat);
    this.rightShoe.position.x = 0;
    this.rightShoe.position.y = -200;
    this.rightShoe.position.z = 10;
    this.rightLeg.add(this.rightShoe);


    this.body.add(this.shoulder);
    this.body.add(this.armLeft);
    this.body.add(this.armRight);
    this.body.add(this.rightLeg);
    this.body.add(this.leftLeg);

    this.body.scale.x = 0.005
    this.body.scale.y = 0.005
    this.body.scale.z = 0.005
    this.group.add(this.body);
  }

  walk(speed) {
    this.vAngle += speed;

    this.group.translateZ(speed);
    const legRotation = Math.cos(this.vAngle) * Math.PI / 6;
    const armRotation = Math.cos(this.vAngle) * Math.PI / 6;

    this.armRight.rotation.x = -armRotation;
    this.leftLeg.rotation.x = legRotation;

    this.armLeft.rotation.x = armRotation;
    this.rightLeg.rotation.x = -legRotation;
  }

  moveToTarget(target) {
    this.group.position.x = target.position.x + 5;
    this.group.position.z = target.position.z;
    this.group.rotation.y = this.rad(270);
  }

  hit() {
    let timer = 10;
    let frameNum = 100;
    const hitAnimation = () => {
      frameNum++;
      const armRotation = Math.cos(frameNum) * Math.PI / 4;
      this.armRight.rotation.x = -armRotation;
    }
    const hitAction = setInterval(hitAnimation, timer);
    setTimeout(() => {
      clearInterval(hitAction);
      this.group.rotation.y += this.rad(180);
    }, 1000);
  }

  reset() {
    this.armRight.rotation.x = 0;
    this.leftLeg.rotation.x = 0;
    this.armLeft.rotation.x = 0;
    this.rightLeg.rotation.x = 0;
  }
}
