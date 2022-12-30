import React, { Component } from 'react';
import Clarifai from 'clarifai';
import ParticlesBg from './components/ParticlesBg';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import Rank from './components/Rank';
import ImageLinkForm from './components/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'ee560f912a91443880d70ee343d047d9',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    };
  }

  onUrlInput = (event) => {
    this.setState({ input: event.target.value });
  };

  faceLocation = (data) => {
    const faceLocationData =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const height = Number(image.height);
    const width = Number(image.width);
    const boxData = {
      topRow: faceLocationData.top_row * height,
      rightCol: width - faceLocationData.right_col * width,
      bottomRow: height - faceLocationData.bottom_row * height,
      leftCol: faceLocationData.left_col * width,
    };
    this.setState({ box: boxData });
  };

  onDetectSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => this.faceLocation(response))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onUrlInput={this.onUrlInput}
          onDetectSubmit={this.onDetectSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
