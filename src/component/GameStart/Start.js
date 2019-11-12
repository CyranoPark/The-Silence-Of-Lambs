import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import StartForm from './StartForm';
import Tutorial from './Tutorial';
import Ranking from '../GameResult/Ranking';

import StartScene from '../../models/Scene/StartScene';
import TitleText from '../../models/Text/Title';
import Lamb from '../../models/objects/Lamb';
import bgm from '../../asset/audio/bgm.mp3';
import AppLoading from '../App/AppLoading';

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

    this.audioRef = React.createRef();
    this.state = {
      isValidName: true,
      isOpenTutorial: false,
      isOpenRanking: false,
      rankingPage: 0
    }
  }

  componentDidMount() {
    this.renderStartScene();
  }

  renderStartScene = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(sceneWidth, sceneHeight);
    this.startScene.appendChild(this.renderer.domElement);

    const startScene = new StartScene();
    const titleText = new TitleText('The Silence Of Lambs');
    titleText.textMesh.position.x = -5;
    titleText.textMesh.position.y = 5;
    titleText.textMesh.position.z = 5;
    titleText.textMesh.rotation.y = 0.21 * Math.PI;

    const lamb = new Lamb(lambColor[0].code, lambSize[0].size);
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

    const {
      userName,
      handleStartButtonClick,
      completeStartLoading,
      handleGameStart
    } = this.props;

    handleStartButtonClick();

    const isValidName = await checkValidUserName(userName);

    completeStartLoading();
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

  renderStartForm = () => {
    const { isOpenTutorial, isOpenRanking, userName } = this.state;
    const { isLoadingGame } = this.props;

    if (!isOpenRanking && !isOpenTutorial) {
      return (
        <div className='start-form-modal' >
          {
            isLoadingGame
            ? <AppLoading />
            :  <StartForm
                userName={userName}
                isValidName={this.state.isValidName}
                onTutorialButtonClick={this.handleTutorialModalOpen}
                onRankingButtonClick={this.handleRankingModalOpen}
                onUserNameInputChange={this.handleUserNameInput}
                onUserNameSubmit={this.handleUserNameSubmit}
              />
          }
        </div>
      );
    }
  }
  renderModal = () => {
    const { isOpenTutorial, isOpenRanking } = this.state;
    const {
      topRankList,
      rankList,
      userName,
      isLoadingResult
    } = this.props;

    if(isOpenTutorial) {
      return (
        <Tutorial
          onModalBodyClick={this.handleStopEvent}
          closeModal={this.handleModalClose}
        />
      );
    }

    if(isOpenRanking) {
      return (
        <div className='ranking-back' onClick={this.handleModalClose}>
          <div className='ranking-modal' onClick={this.handleStopEvent}>
            {
              isLoadingResult
              ? <AppLoading />
              : (
                <>
                  <h2>RANKING</h2>
                  <Ranking
                    topRankList={topRankList}
                    rankList={rankList}
                    rankingPage={this.state.rankingPage}
                    userName={userName}
                    onNextButtonClick={this.fetchAdditionalScores}
                    onPrevButtonClick={this.fetchPreviousScores}
                  />
                </>
              )
            }
          </div>
        </div>
      );
    }
  };

  handleModalClose = () => {
    this.setState({
      isOpenTutorial : false,
      isOpenRanking: false,
      rankingPage: 0
    });

    this.props.initRankingList();
  };

  handleTutorialModalOpen = () => {
    this.setState({
      isOpenTutorial : true,
      isOpenRanking: false
    });
  };

  handleRankingModalOpen = () => {
    this.props.fetchTopScores(this.fetchAdditionalScores);
    this.setState({
      isOpenRanking : true,
      isOpenTutorial: false
    });
  };

  fetchAdditionalScores = () => {
    const { topRankList, rankList, fetchScores } = this.props;
    const nextStartScore = rankList.length
      ? rankList[rankList.length - 1].total_time + 1
      : topRankList[topRankList.length - 1].total_time + 1;

    fetchScores(7, nextStartScore, () => {
      this.setState({ rankingPage: this.state.rankingPage + 1 });
    });
  };

  fetchPreviousScores = () => {
    const { rankList, fetchPrevScores } = this.props;
    if (!rankList.length || this.state.rankingPage === 1) {
      return;
    }
    const prevEndScore = rankList[0].total_time - 1;
    fetchPrevScores(7, prevEndScore, () => {
      this.setState({ rankingPage: this.state.rankingPage - 1 });
    });
  };

  handleStopEvent = event => {
    event.stopPropagation();
  }

  render() {
    const { gameProgress } = this.props;
    if (gameProgress === PLAYING_GAME) {
      return <Redirect to='/play' />
    }

    return (
      <>
        <div id='start-title' ref={(startScene) => { this.startScene = startScene }} />
        <audio ref={this.audioRef} src={bgm} controls autoPlay />
        {this.renderModal()}
        {this.renderStartForm()}
      </>
    );
  }
}
