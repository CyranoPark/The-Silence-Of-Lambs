import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import moment from 'moment';
import _ from 'lodash';

import GameScene from '../../models/Scene/GameScene';
import Lamb from '../../models/objects/Lamb';
import Boy from '../../models/objects/Boy';

import Logo from './Logo';
import Clock from './Clock';
import HintList from './HintList';
import SelectBox from './SelectBox';


import {
  sceneWidth,
  sceneHeight
} from '../../constants/style';
import { name, lambColor, lambSize } from '../../constants/game';
import './Play.scss';

export default class Play extends Component {
  constructor(props) {
    super(props);

    this.targetLambs = [];
    this.sceneCenter = new THREE.Vector3(0, 1.7, 0);
    this.playScene = React.createRef();
    this.state = {
      time: '00:00:00',
      selectedLamb: null
    };
  }

  componentDidMount() {
    this.renderScene();
    // this.startTimer();
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('click', this.onMouseClick);
  }

  renderScene = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneWidth, sceneHeight);
    this.playScene.current.appendChild(renderer.domElement);

    this.gameScene = new GameScene();
    renderer.domElement.addEventListener( 'click', this.raycast, false );

    this.placeObject();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    const controls = new OrbitControls( this.gameScene.camera, renderer.domElement );
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('click', this.onMouseClick, false);

    const animate = () => {
      const clickedHex = 0xff0000;

      requestAnimationFrame(animate);

      this.raycasterRender();

      this.targetLambs.forEach(lamb => {
        if (lamb.group.uuid === this.state.selectedLamb) {
          lamb.jump(0.05);
          this.groupChangeColor(lamb.group, clickedHex);
          return;
        }
        const currentPosition = lamb.group.position;
        const isOutPasture = currentPosition.distanceTo(this.sceneCenter) > 35;
        const isCollisionBoy = currentPosition.distanceTo(this.boy.group.position) < 3;
        const collisionLambs = this.targetLambs.filter(anotherLamb => {
          if (anotherLamb.group.uuid === lamb.group.uuid) {
            return false;
          }
          return currentPosition.distanceTo(anotherLamb.group.position) < 3
        });

        if (isOutPasture || collisionLambs.length || isCollisionBoy) {
          lamb.group.translateZ(-1);
          lamb.group.rotation.y = THREE.Math.radToDeg(Math.random() * 2 * Math.PI);
        }

        lamb.walk(Math.random() * 0.03);
      });

      if (this.boy.group.position.distanceTo(this.sceneCenter) > 35) {
        this.boy.group.translateZ(-1);
        this.boy.group.rotation.y =  THREE.Math.radToDeg(Math.random() * 2 * Math.PI);
      }
      this.boy.walk(0.03);

      controls.update();
      renderer.render( this.gameScene.scene, this.gameScene.camera );
    }

    animate();
  };

  placeObject = () => {
    this.objPositions = selectPosition();
    this.characters = selectLambCharacter();
    this.objPositions.forEach((position, i) => {
      if (i === 0) {
        this.boy = new Boy();
        this.gameScene.scene.add(this.boy.group);
        this.boy.group.position.x = position.x
        this.boy.group.position.z = position.z
        return;
      }

      const lamb = new Lamb('lamb', this.characters[i - 1].color, this.characters[i - 1].size);
      lamb.group.position.x = position.x;
      lamb.group.position.y = position.y + this.characters[i - 1].size - 1;
      lamb.group.position.z = position.z;
      lamb.group.rotation.y = Math.PI * Math.random() * 2;
      this.targetLambs.push(lamb);
      this.gameScene.scene.add(lamb.group);
    });

    function selectPosition () {
      const positionArr = [];

      while (positionArr.length < 17) {
        const positionX = (_.random(0, 10) * 4) - 20;
        const positionY = 1.7;
        const positionZ = (_.random(0, 10) * 4) - 20;
        const newPosition = new THREE.Vector3(positionX, positionY, positionZ);
        const isValidPosition = positionArr.filter(el => {
          if (el.x === newPosition.x && el.z === newPosition.z) {
            return true;
          }
          return false;
        });

        if (!isValidPosition.length) {
          positionArr.push(newPosition);
        }
      }
      return positionArr;
    }

    function selectLambCharacter () {
      const characters = [];
      lambColor.forEach(color => {
        lambSize.forEach(size => {
          characters.push({
            color: color.code,
            size: size.size
          });
        });
      });
      return _.shuffle(characters);
    }

  }

  raycasterRender = () => {
    this.gameScene.camera.updateMatrixWorld();
    this.raycaster.setFromCamera(this.mouse, this.gameScene.camera);
    this.intersects = this.raycaster.intersectObjects(this.gameScene.scene.children, true);
    if (this.intersects.length > 0) {
      this.targetLambs.forEach(lamb => {
        const selectedHex = 0xddd000;
        const commonHex = 0x000000;
        this.groupChangeColor(lamb.group, commonHex);

        if (this.intersects[0].object.parent === lamb.group) {
          return this.groupChangeColor(this.intersects[0].object.parent, selectedHex);
        }
      });
    }
  };

  killLamb = () => {
    const targetLamb = _.remove(this.targetLambs, lamb => lamb.group.uuid === this.state.selectedLamb);
    const commonHex = 0x000000;
    this.groupChangeColor(targetLamb[0].group, commonHex);
    targetLamb[0].reset();
    targetLamb[0].died();
  };

  onMouseMove = event => {
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  };

  onMouseClick = () => {
    const commonHex = 0x000000;

    if (this.intersects.length > 0) {
      let isLambClicked = false;
      const clickedObjId = this.intersects[0].object.parent.uuid;
      this.targetLambs.forEach(lamb => {
        if (lamb.group.uuid === this.state.selectedLamb) {
          lamb.reset();
          this.groupChangeColor(lamb.group, commonHex);
        }
        if (lamb.group.uuid === clickedObjId) {
          isLambClicked = true;
        }
      });

      if (isLambClicked) {
        this.setState({ selectedLamb: clickedObjId });
      } else {
        this.setState({ selectedLamb: null });
      }
    }
  };

  groupChangeColor = (group, hex) => {
    group.children.forEach(obj => {
      if (obj.type === 'Group') {
        return this.groupChangeColor(obj, hex);
      }
      obj.material.emissive.setHex(hex);
    });
  }

  startTimer = () => {
    let counter = 1;

    this.timer = setInterval(() => this.setState({
      time: moment().minute(0).second(0).millisecond(counter++ * 50).format('mm:ss:SS')
    }), 50);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({
      time: '00:00:00'
    })
  };

  render() {
    const { userName } = this.props;
    return (
      <>
        <div>
          <Logo userName={userName} />
          <Clock
            time={this.state.time}
            onStartTimer={this.startTimer}
          />
          <HintList />
          {this.state.selectedLamb ? <SelectBox onKillButtonClick={this.killLamb}/> : null}
        </div>
        <div id='game-field' ref={this.playScene} />
      </>
    );
  }
}
