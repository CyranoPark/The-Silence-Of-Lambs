import * as THREE from 'three';

export default class Boy {
  constructor() {
    this.threegroup = new THREE.Group();
    this.threegroup.position.y = 2
    this.informalSmokingMat = "#ffc107";
    this.informalLegsMat = "#755b0b";
    this.informalZipperMat = "#755b0b";
    this.informalShoesMat = "#907637";

    this.formalSmokingMat = "#333";
    this.formalLegsMat = "#222";
    this.formalZipperMat = "white";
    this.formalShoesMat = "#585858";

    this.hatMat = new THREE.MeshLambertMaterial({
      color: "#BA833E",
      shading: THREE.FlatShading,
    });

    this.skinMat = new THREE.MeshLambertMaterial({
        color: "#e0bea5",
        shading: THREE.FlatShading,
    });

    this.pupilaMat = new THREE.MeshLambertMaterial({
        color: "#333",
        shading: THREE.FlatShading,
    });

    this.lipMat = new THREE.MeshLambertMaterial({
        color: "#333",
        shading: THREE.FlatShading,
    });

    this.eyeMat = new THREE.MeshLambertMaterial({
        color: "white",
        shading: THREE.FlatShading
    });

    this.bearMat = new THREE.MeshLambertMaterial({
        color: "#bb7344",
        shading: THREE.FlatShading
    });

    this.zipperMat = new THREE.MeshLambertMaterial({
        color: "#bb7344",
        shading: THREE.FlatShading
    });

    this.smokingMat = new THREE.MeshLambertMaterial({
        color: "#c91d2b",
        shading: THREE.FlatShading
    });

    this.legsMat = new THREE.MeshLambertMaterial({
        color: "#5f0976",
        shading: THREE.FlatShading
    });

    this.shoesMat = new THREE.MeshLambertMaterial({
        color: this.formalShoesMat,
        shading: THREE.FlatShading
    });
    this.drawHead();
  }

  drawHead() {
    //head
    var head = new THREE.BoxGeometry(300, 350, 280);
    this.head = new THREE.Mesh(head, this.skinMat);
    this.head.position.x = 0;
    this.head.position.y = 1.7;
    this.head.position.z = 0;


    //glasses
    var glass = new THREE.CircleGeometry(60, 78, 10);
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
    var glassu = new THREE.BoxGeometry(40, 10, 10);
    //Retinas Left
    this.glassu = new THREE.Mesh(glassu, this.pupilaMat);
    this.glassu.position.x = 0;
    this.glassu.position.y = 5;
    this.glassu.position.z = 155;

    //Retinas
    var retina = new THREE.BoxGeometry(25, 25, 5);
    //Retinas Left
    this.retinaLeft = new THREE.Mesh(retina, this.pupilaMat);
    this.retinaLeft.position.x = -80;
    this.retinaLeft.position.y = 5;
    this.retinaLeft.position.z = 168;
    //Retinas Right
    this.retinaRight = new THREE.Mesh(retina, this.pupilaMat);
    this.retinaRight.position.x = 80;
    this.retinaRight.position.y = 5;
    this.retinaRight.position.z = 168;

    //beard
    var beard = new THREE.BoxGeometry(140, 130, 10);
    this.beard = new THREE.Mesh(beard, this.bearMat);
    this.beard.position.x = 0;
    this.beard.position.z = 160;
    this.beard.position.y = -140;

    //mout
    var mout = new THREE.BoxGeometry(90, 60, 50);
    this.mout = new THREE.Mesh(mout, this.skinMat);
    this.mout.position.x = 0;
    this.mout.position.z = 155;
    this.mout.position.y = -130;

    //lip
    var lip = new THREE.BoxGeometry(40, 20, 10);
    this.lip = new THREE.Mesh(lip, this.lipMat);
    this.lip.position.x = 0;
    this.lip.position.z = 162;
    this.lip.position.y = -120;

    //Hat
    var hatTop = new THREE.BoxGeometry(320, 120, 290);
    this.hatTop = new THREE.Mesh(hatTop, this.hatMat);
    this.hatTop.position.x = 0;
    this.hatTop.position.z = 0;
    this.hatTop.position.y = 180;

    var hatBottom = new THREE.CylinderGeometry(400, 400, 30);
    this.hatBottom = new THREE.Mesh(hatBottom, this.hatMat);
    this.hatBottom.position.x = 0;
    this.hatBottom.position.z = 0;
    this.hatBottom.position.y = 120;

    //body

    var body = new THREE.BoxGeometry(300, 250, 300);
    this.body = new THREE.Mesh(body, this.smokingMat);
    this.body.position.x = 0;
    this.body.position.y = 0;
    this.body.position.z = 0;

    //arms

    var arm = new THREE.BoxGeometry(50, 250, 100);

    this.armLeft = new THREE.Mesh(arm, this.smokingMat);
    this.armLeft.position.x = -170;
    this.armLeft.position.y = 0;
    this.armLeft.position.z = 0;

    this.armRight = new THREE.Mesh(arm, this.smokingMat);
    this.armRight.position.x = 170;
    this.armRight.position.y = 0;
    this.armRight.position.z = 0;


    // hands

    var hand = new THREE.BoxGeometry(50, 50, 50);

    this.handLeft = new THREE.Mesh(hand, this.skinMat);
    this.handLeft.position.x = -170;
    this.handLeft.position.y = -150;
    this.handLeft.position.z = 20;

    this.handRight = new THREE.Mesh(hand, this.skinMat);
    this.handRight.position.x = 170;
    this.handRight.position.y = -150;
    this.handRight.position.z = 20;

    //zipper

    var zipper = new THREE.BoxGeometry(80, 250, 10);
    this.zipper = new THREE.Mesh(zipper, this.zipperMat);
    this.zipper.position.x = 0;
    this.zipper.position.y = 0;
    this.zipper.position.z = 300;

    //legs

    var leftLeg = new THREE.BoxGeometry(100, 300, 200);
    this.leftLeg = new THREE.Mesh(leftLeg, this.legsMat);
    this.leftLeg.position.x = 80;
    this.leftLeg.position.y = -200;
    this.leftLeg.position.z = 0;

    var rightLeg = new THREE.BoxGeometry(100, 300, 200);
    this.rightLeg = new THREE.Mesh(rightLeg, this.legsMat);
    this.rightLeg.position.x = -80;
    this.rightLeg.position.y = -200;
    this.rightLeg.position.z = 0;

    //legsMiddle

    var legsM = new THREE.BoxGeometry(10, 130, 5);
    this.legsM = new THREE.Mesh(legsM, this.zipperMat);
    this.legsM.position.x = 0;
    this.legsM.position.y = -280;
    this.legsM.position.z = 48;

    //shoes

    var leftShoe = new THREE.BoxGeometry(100, 50, 200);
    this.leftShoe = new THREE.Mesh(leftShoe, this.shoesMat);
    this.leftShoe.position.x = 80;
    this.leftShoe.position.y = -400;
    this.leftShoe.position.z = 10;

    var rightShoe = new THREE.BoxGeometry(100, 50, 200);
    this.rightShoe = new THREE.Mesh(rightShoe, this.shoesMat);
    this.rightShoe.position.x = -80;
    this.rightShoe.position.y = -400;
    this.rightShoe.position.z = 10;


    // group elements

    this.head.add(this.hatTop);
    this.head.add(this.hatBottom);

    this.head.add(this.glassu);
    this.head.add(this.glassLeft);
    this.head.add(this.glassRight);
    this.head.add(this.retinaLeft);
    this.head.add(this.retinaRight);
    // this.head.add(this.beard);
    // this.head.add(this.mout);
    this.head.add(this.lip);

    this.body.add(this.armLeft);
    this.body.add(this.armRight);
    // this.body.add(this.zipper);
    this.body.add(this.handLeft);
    this.body.add(this.handRight);
    this.body.add(this.rightLeg);
    this.body.add(this.leftLeg);
    // this.body.add(this.legsM);
    this.body.add(this.leftShoe);
    this.body.add(this.rightShoe);

    this.head.scale.x = 0.005
    this.body.scale.x = 0.005
    this.head.scale.y = 0.005
    this.body.scale.y = 0.005
    this.head.scale.z = 0.005
    this.body.scale.z = 0.005

    this.threegroup.add(this.head);
    this.threegroup.add(this.body);
  }
}
