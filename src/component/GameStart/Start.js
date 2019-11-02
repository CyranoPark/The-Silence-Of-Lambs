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

import {
  sceneWidth,
  sceneHeight
} from '../../constants/style';
import './Start.scss';

export default class Start extends Component {
  constructor(props) {
    super(props);

    this.titleScene = React.createRef();
    this.state = {
      toPlayRoute: false,
      isValidName: true,
      isOpenTutorial: false
    }
  }

  componentDidMount() {
    this.renderScene();
  }

  renderScene = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sceneWidth, sceneHeight);
    this.titleScene.current.appendChild(renderer.domElement);

    const startScene = new StartScene();
    const titleText = new TitleText('The Silence Of Lambs');
    titleText.textMesh.position.x = -5;
    titleText.textMesh.position.y = 5;
    titleText.textMesh.position.z = 5;
    titleText.textMesh.rotation.y = 0.21 * Math.PI;

    const lamb = new Lamb();
    lamb.group.position.x = 12;
    lamb.group.position.y = 2;
    lamb.group.position.z = 0;

    startScene.scene.add(titleText.textMesh);
    startScene.scene.add(lamb.group);

    const controls = new OrbitControls( startScene.camera, renderer.domElement );
    animate();

    function animate() {
      requestAnimationFrame( animate );

      lamb.jump(0.1);
      controls.update();
      renderer.render( startScene.scene, startScene.camera );
    }
  };

  handleUserNameSubmit = async event => {
    event.preventDefault();

    const { userName } = this.props;
    const isValidName = await checkValidUserName(userName);

    if (isValidName) {
      return this.setState({
        toPlayRoute: true,
        isValidName: true
      });
    }
    return this.setState({
      toPlayRoute: false,
      isValidName: false
    });
  };

  handleUserNameInput = (userName) => {
    const { onUserNameInputChange } = this.props;
    if (!this.state.isValidName) {
      this.setState({
        isValidName: true
      });
    }
    onUserNameInputChange(userName);
  };

  handleTutorialModalClose = () => {
    this.setState({isOpenTutorial : false});
  };

  handleTutorialModalOpen = () => {
    this.setState({isOpenTutorial : true});
  };

  render() {
    const { userName } = this.props;
    const { toPlayRoute, isOpenTutorial } = this.state;
    console.log(isOpenTutorial)
    if (toPlayRoute === true) {
      return <Redirect to='/play' />
    }

    return (
      <>
      <div id='start-title' ref={this.titleScene} />
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
