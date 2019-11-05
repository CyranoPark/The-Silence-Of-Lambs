import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import moment from 'moment';

import GameScene from '../../models/Scene/GameScene';
import Lamb from '../../models/objects/Lamb';
import Boy from '../../models/objects/Boy';

import Logo from './Logo';
import Clock from './Clock';
import HintList from './HintList';


import {
  sceneWidth,
  sceneHeight
} from '../../constants/style';
import './Play.scss';
import { booleanTypeAnnotation, thisExpression } from '@babel/types';

export default class Play extends Component {
  constructor(props) {
    super(props);

    this.targetLambs = [];
    this.playScene = React.createRef();
    this.state = {
      time: '00:00:00'
    };
  }

  componentDidMount() {
    this.renderScene();
    // this.startTimer();
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
    const animate = () => {
      requestAnimationFrame(animate);
      this.objPositions.forEach((position, i) => {
        if (i === 0) {
          return;
        }
        const startPosition = new THREE.Vector3();
        startPosition.setFromMatrixPosition(this.targetLambs[i - 1].group.matrix)
        // this.targetLambs[i - 1].jump(Math.random() * 0.1)
        this.targetLambs[i - 1].walk(Math.random() * 0.09, position);
      });

      controls.update();
      this.raycasterRender();
      renderer.render( this.gameScene.scene, this.gameScene.camera );
    }

    animate();
  };

  placeObject = () => {
    this.objPositions = selectPosition();
    this.objPositions.forEach((position, i) => {
      if (i === 0) {
        this.boy = new Boy();
        this.gameScene.scene.add(this.boy.threegroup);
        this.boy.threegroup.position.x = position.x
        this.boy.threegroup.position.z = position.z
        return;
      }
      const lamb = new Lamb();
      lamb.group.position.x = position.x;
      lamb.group.position.y = position.y;
      lamb.group.position.z = position.z;
      lamb.group.rotation.y = Math.PI * Math.random() * 2;
      this.targetLambs.push(lamb);
      this.gameScene.scene.add(lamb.group);
    });

    function selectPosition () {
      const positionArr = [];

      while (positionArr.length < 21) {
        const positionX = Math.ceil(Math.random() * 10) * 5 - 25;
        const positionY = 1.7;
        const positionZ = Math.ceil(Math.random() * 10) * 5 - 25;
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
  }

  raycasterRender = () => {
    this.gameScene.camera.updateMatrixWorld();
    this.raycaster.setFromCamera(this.mouse, this.gameScene.camera);
    const intersects = this.raycaster.intersectObjects(this.gameScene.scene.children, true);
    if (intersects.length > 0) {
      for (let i = 0; i < this.targetLambs.length; i++) {
        const selectedHex = 0xddd000;
        const commonHex = 0x000000;

        groupChangeColor(this.targetLambs[i].group, commonHex);

        if (intersects[0].object.parent === this.targetLambs[i].group) {
          return groupChangeColor(intersects[0].object.parent, selectedHex);
        }
      }
    }

    function groupChangeColor(group, hex) {
      group.children.forEach(obj => {
        if (obj.type === 'Group') {
          return groupChangeColor(obj, hex);
        }
        obj.material.emissive.setHex(hex);
      });
    }
  };

  onMouseMove = (event) => {
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  };

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
        </div>
        <div id='game-field' ref={this.playScene} />
      </>
    );
  }
}
