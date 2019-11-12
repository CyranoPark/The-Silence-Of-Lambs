import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import _ from 'lodash';

import GameScene from '../../models/Scene/GameScene';
import Lamb from '../../models/objects/Lamb';
import Boy from '../../models/objects/Boy';

import Logo from './Logo';
import Clock from './Clock';
import HintList from './HintList';
import SelectBox from './SelectBox';
import RockPaperScissors from './RockPaperScissors';
import MissonCompleteModal from './MissonCompleteModal';

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import deathBgm from '../../asset/audio/death.mp3';
import bgm from '../../asset/audio/bgm.mp3';

import {
  durationToMillisecond,
  millisecondToDuration,
  checkResultRockPaperScissorsGame
} from '../../utils';
import {
  sceneWidth,
  sceneHeight,
  selectedLambHex,
  hoveredLambHex,
  commonHex
} from '../../constants/style';
import { CLEAR_GAME } from '../../constants/status';
import { lambColor, lambSize, WIN } from '../../constants/game';
import './Play.scss';

export default class Play extends Component {
  constructor(props) {
    super(props);

    this.lamsNumber = 15;
    this.targetLambs = [];

    this.sceneCenter = new THREE.Vector3(0, 1.7, 0);
    this.playScene = React.createRef();

    this.state = {
      time: '00:00:00',
      selectedLamb: null,
      wolfCharacter: {},
      submittedByUser: null,
      submittedByLamb: null,
      rockPaperScissorsResult: null,
      hintMessages: [],
      isKillingLamb: false,
      isOpenHintWindow: false,
      deathLambs: 0,
      isMusicOn: true,
      isClearGame: false
    };
  }

  componentDidMount() {
    this.bgm = new Audio(bgm);
    this.bgm.play();

    this.renderScene();
    this.startTimer();
  }

  componentWillUnmount() {
    this.bgm.pause();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('click', this.onMouseClick);
  }

  renderScene = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(sceneWidth, sceneHeight);
    this.playScene.current.appendChild(this.renderer.domElement);

    this.gameScene = new GameScene();
    this.renderer.domElement.addEventListener( 'click', this.raycast, false );

    this.placeObject();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.controls = new OrbitControls( this.gameScene.camera, this.renderer.domElement );
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('click', this.onMouseClick, false);

    this.animate();
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.raycasterRender();

    this.lambsAnimation();
    this.boyAnimation();

    this.controls.update();
    this.onWindowResize();
    this.renderer.render( this.gameScene.scene, this.gameScene.camera );
  }

  lambsAnimation = () => {
    this.targetLambs.forEach(lamb => {
      if (lamb.group.uuid === this.state.selectedLamb) {
        lamb.jump(0.05);
        this.groupChangeColor(lamb.group, selectedLambHex);
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

      lamb.walk(Math.random() * 0.05);
    });
  };

  boyAnimation = () => {
    if (!this.state.selectedLamb && !this.state.isKillingLamb) {
      if (this.boy.group.position.distanceTo(this.sceneCenter) > 35) {
        this.boy.group.translateZ(-1);
        this.boy.group.rotation.y =  THREE.Math.radToDeg(Math.random() * 2 * Math.PI);
      }
      this.boy.walk(0.03);
    }
  };

  placeObject = () => {
    this.characters = this.selectLambCharacter();
    this.characters.forEach((character, i) => {
      const { isLamb, color, size, position } = character;
      const lamb = new Lamb(color.code, size.size, isLamb);

      lamb.group.position.x = position.x;
      lamb.group.position.y = position.y + size.size - 0.5;
      lamb.group.position.z = position.z;
      lamb.group.rotation.y = Math.PI * Math.random() * 2;

      this.targetLambs.push(lamb);
      this.gameScene.scene.add(lamb.group);
    });

    this.characters = _.remove(this.characters, character => character.isLamb);
    this.boy = new Boy();
    this.boy.group.position.set(0, 2.2, 0);
    this.gameScene.scene.add(this.boy.group);
  }

  raycasterRender = () => {
    this.gameScene.camera.updateMatrixWorld();
    this.raycaster.setFromCamera(this.mouse, this.gameScene.camera);
    this.intersects = this.raycaster.intersectObjects(this.gameScene.scene.children, true);
    if (this.intersects.length > 0) {
      this.targetLambs.forEach(lamb => {
        this.groupChangeColor(lamb.group, commonHex);

        if (this.intersects[0].object.parent === lamb.group) {
          return this.groupChangeColor(this.intersects[0].object.parent, hoveredLambHex);
        }
      });
    }
  };

  killLamb = () => {
    const targetLamb = _.remove(this.targetLambs, lamb => lamb.group.uuid === this.state.selectedLamb);
    this.setState({
      selectedLamb: null,
      isKillingLamb: true
    });

    this.groupChangeColor(targetLamb[0].group, commonHex);

    targetLamb[0].reset();
    this.boy.reset();
    this.boy.hit();

    if (targetLamb[0].isLamb) {
      const audio = new Audio(deathBgm);
      audio.play();
      targetLamb[0].died(() => {
        this.setState({
          isKillingLamb: false,
          deathLambs: this.state.deathLambs + 1
        });
      });
    } else {
      targetLamb[0].died(() => {
        targetLamb[0].changeWolf();
        this.setState({ isKillingLamb: false });
        this.clearGame();
      });
    }
  };

  onWindowResize = () => {
    this.gameScene.camera.aspect = window.innerWidth / window.innerHeight;
    this.gameScene.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  onMouseMove = event => {
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  };

  onMouseClick = () => {
    this.closeHintWindow();
    if (this.intersects.length > 0) {
      let isLambClicked = false;
      const clickedObj = this.intersects[0].object.parent;
      this.targetLambs.forEach(lamb => {
        if (lamb.group.uuid === this.state.selectedLamb) {
          lamb.reset();
          this.groupChangeColor(lamb.group, commonHex);
        }
        if (lamb.group.uuid === clickedObj.uuid) {
          isLambClicked = true;
        }
      });

      if (isLambClicked) {
        this.boy.reset();
        this.boy.moveToTarget(clickedObj)
        this.setState({ selectedLamb: clickedObj.uuid });
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

  selectLambCharacter = () => {
    const characters = [];
    const positions = this.selectPosition(this.lamsNumber);

    lambColor.forEach(color => {
      lambSize.forEach(size => {
        characters.push({
          color: color,
          size: size,
          isLamb: true
        });
      });
    });

    characters.splice(this.lamsNumber);
    positions.forEach((position, i) => characters[i].position = position);

    const wolf = _.sample(characters);
    wolf.isLamb = false;

    this.setState({
      wolfCharacter: {
        color: wolf.color,
        size: wolf.size
      }
    })

    return _.shuffle(characters);
  };

  selectPosition = number => {
    const positionArr = [];

    while (positionArr.length < number) {
      const positionX = (_.random(1, 10) * 4) - 20;
      const positionY = 1.7;
      const positionZ = (_.random(1, 10) * 4) - 20;
      const newPosition = new THREE.Vector3(positionX, positionY, positionZ);
      const hasSamePosition = positionArr.find(position => {
        return _.isEqual(newPosition, position);
      });

      if (!hasSamePosition) {
        positionArr.push(newPosition);
      }
    }
    return positionArr;
  };

  startTimer = () => {
    let counter = 1;

    this.timer = setInterval(() => this.setState({
      time: millisecondToDuration(counter++ * 50)
    }), 50);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  clearGame = () => {
    this.stopTimer();
    this.setState({ isClearGame: true });
  };

  openHintWindow = () => {
    this.setState({ isOpenHintWindow: true });
  };

  closeHintWindow = () => {
    this.setState({
      isOpenHintWindow: false,
      submittedByUser: null,
      submittedByLamb: null,
      rockPaperScissorsResult: null
    });
  };

  restartHintWindow = () => {
    this.setState({
      submittedByUser: null,
      submittedByLamb: null,
      rockPaperScissorsResult: null
    });
  };

  playRockPaperScissorsGame = submittedByUser => {
    const submittedByLamb = new Date() % 3;
    let result = checkResultRockPaperScissorsGame(submittedByUser, submittedByLamb);
    //test
    result = WIN;
    //
    this.setState({
      submittedByUser,
      submittedByLamb,
      hintMessages: result === WIN
        ? [...this.state.hintMessages, this.makeHintMessage()]
        : this.state.hintMessages,
      rockPaperScissorsResult: result
    });
  };

  makeHintMessage = () => {
    const selectedCharacter = _.sample(this.characters);
    if (!selectedCharacter) {
      return '이젠 찾을 수 있을껄?'
    }
    if (selectedCharacter.color.code === this.state.wolfCharacter.color.code) {
      this.characters = this.characters.filter(character => character.size.size === this.state.wolfCharacter.size.size);
      return `늑대의 크기는 ${this.state.wolfCharacter.size.name}`;
    } else {
      this.characters = this.characters.filter(character => character.color.code !== selectedCharacter.color.code);
      return `늑대는 ${selectedCharacter.color.name}이 아니다.`
    }
  };

  musicOn = () => {
    this.bgm.play();
    this.setState({ isMusicOn: true });
  };

  musicOff = () => {
    this.bgm.pause();
    this.setState({ isMusicOn: false });
  };

  saveClearData = () => {
    const { userName, finishGame } = this.props;
    const { deathLambs } = this.state;
    const timeArr = this.state.time.split(':');
    const durationTime = {
      milliseconds: timeArr[2],
      seconds: timeArr[1],
      minutes: timeArr[0],
    }
    const clearTime = durationToMillisecond(durationTime);
    finishGame(userName, clearTime, deathLambs);
  }

  handleStopEvent = event => {
    event.stopPropagation();
  }

  render() {
    const { userName, gameProgress } = this.props;
    const {
      time,
      selectedLamb,
      isOpenHintWindow,
      submittedByUser,
      submittedByLamb,
      rockPaperScissorsResult,
      hintMessages,
      isMusicOn,
      isClearGame
    } = this.state;

    if (gameProgress === CLEAR_GAME) {
      return <Redirect to='/result' />;
    }

    return (
      <>
        {
          isClearGame
          ? <MissonCompleteModal
              onModalClick={this.handleStopEvent}
              onGoToResultClick={this.saveClearData}
            />
          : null
        }
        <div>
          <div
            className='music-onoff-button'
          >
            {
              isMusicOn
              ? <FaVolumeUp onClick={this.musicOff}/>
              : <FaVolumeMute onClick={this.musicOn}/>
            }
          </div>
          <Logo userName={userName} />
          <Clock
            time={time}
            onStartTimer={this.startTimer}
          />
          <HintList hintMessages={hintMessages} />
          {
            isOpenHintWindow
            ? <RockPaperScissors
                submittedByUser={submittedByUser}
                submittedByLamb={submittedByLamb}
                gameResult={rockPaperScissorsResult}
                hintMessages={hintMessages}
                onImageClick={this.playRockPaperScissorsGame}
                onRestartButtonClick={this.restartHintWindow}
                findHint={this.selectRandomOneLamb}
              />
            : null
          }
          {
            selectedLamb
            ? <SelectBox
                onKillButtonClick={this.killLamb}
                onHintOpenButtonClick={this.openHintWindow}
              />
            : null
          }
        </div>
        <div id='game-field' ref={this.playScene} />
      </>
    );
  }
}
