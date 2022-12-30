import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import Rank from './components/Rank';
import ImageLinkForm from './components/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition';
import './App.css';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: 'ee560f912a91443880d70ee343d047d9',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    };
  }

  onUrlInput = (event) => {
    this.setState({ input: event.target.value });
  };

  onDetectSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        console.log('hi', response);
      });
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg type='fountain' bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onUrlInput={this.onUrlInput}
          onDetectSubmit={this.onDetectSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
