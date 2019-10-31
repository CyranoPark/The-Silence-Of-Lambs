import React, { Component } from 'react';
import * as THREE from 'three';
import StartScene from '../../models/Scene/StartScene';
import Lamb from '../../models/Lamb';
import {
  titleSceneWidth,
  titleSceneHeight
} from '../../Constants/Style';

export default class Start extends Component {
  constructor(props) {
    super(props);

    this.startScene = React.createRef();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  componentDidMount() {
    // this.renderer.setClearColor('#ffffff');
    this.renderer.setSize(titleSceneWidth, titleSceneHeight);
    this.startScene.current.appendChild(this.renderer.domElement);

    this.renderScene();
  }

  renderScene = () => {
    const title = new StartScene();
    this.renderer.render(title.scene, title.camera);
  }

  render() {
    return (
      <div ref={this.startScene}>
        <form>
          <input type='text' />
        </form>
      </div>
    );
  }
}
