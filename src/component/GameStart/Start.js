import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import StartForm from './StartForm';
import Tutorial from './Tutorial';
import StartScene from '../../models/Scene/StartScene';
import TitleText from '../../models/Text/Title';
import Lamb from '../../models/objects/Lamb';

import { checkValidUserName } from '../../api';
import { PLAYING_GAME } from '../../constants/status';
import { lambColor, lambSize } from '../../constants/game';

import {
  sceneWidth,
  sceneHeight
} from '../../constants/style';
import './Start.scss';

export default class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidName: true,
      isOpenTutorial: false
    }
  }

  componentDidMount() {
    this.renderScene();
  }

  renderScene = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(sceneWidth, sceneHeight);
    this.startScene.appendChild(this.renderer.domElement);

    const startScene = new StartScene();
    const titleText = new TitleText('The Silence Of Lambs');
    titleText.textMesh.position.x = -5;
    titleText.textMesh.position.y = 5;
    titleText.textMesh.position.z = 5;
    titleText.textMesh.rotation.y = 0.21 * Math.PI;

    const lamb = new Lamb('WELCOME', lambColor[0].code, lambSize[0].size);
    const position = new THREE.Vector3(8, 1.7, 0);
    lamb.group.position.x = position.x;
    lamb.group.position.y = position.y;
    lamb.group.position.z = position.z;
    lamb.group.rotation.y = 0.21 * Math.PI;
    startScene.scene.add(titleText.textMesh);
    startScene.scene.add(lamb.group);

    const controls = new OrbitControls( startScene.camera, this.renderer.domElement );
    const animate = () => {
      requestAnimationFrame( animate );

      lamb.jump(0.05);
      controls.update();
      this.renderer.render( startScene.scene, startScene.camera );
    };

    animate();
  };

  handleUserNameSubmit = async event => {
    event.preventDefault();

    const { userName, handleGameStart } = this.props;
    const isValidName = await checkValidUserName(userName);

    if (isValidName) {
      return handleGameStart();
    }
    return this.setState({
      isValidName: false
    });
  };

  handleUserNameInput = (userName) => {
    const { changeUserNameInput } = this.props;
    if (!this.state.isValidName) {
      this.setState({
        isValidName: true
      });
    }
    changeUserNameInput(userName);
  };

  handleTutorialModalClose = () => {
    this.setState({isOpenTutorial : false});
  };

  handleTutorialModalOpen = () => {
    this.setState({isOpenTutorial : true});
  };

  render() {
    const { userName, gameProgress } = this.props;
    const { isOpenTutorial } = this.state;
    if (gameProgress === PLAYING_GAME) {
      return <Redirect to='/play' />
    }

    return (
      <>
      <div id='start-title' ref={(startScene) => { this.startScene = startScene }} />
        {
          isOpenTutorial ? (
            <Tutorial
              closeModal={this.handleTutorialModalClose}
            />
          ) : (
            <StartForm
              userName={userName}
              isValidName={this.state.isValidName}
              onTutorialButtonClick={this.handleTutorialModalOpen}
              onUserNameInputChange={this.handleUserNameInput}
              onUserNameSubmit={this.handleUserNameSubmit}
            />
          )
        }
      </>
    );
  }
}
