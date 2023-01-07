import React, { Component } from 'react';
import ParticlesBg from '../components/ParticlesBg';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Score from '../components/Score';
import ImageLinkForm from '../components/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    } else if (route === 'signin') {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

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
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((entries) =>
              this.setState(
                Object.assign(this.state.user, { entries: entries })
              )
            );
        }
        this.faceLocation(data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { onUrlInput, onDetectSubmit, onRouteChange, loadUser } = this;
    const { imageUrl, box, route, isSignedIn, user } = this.state;
    return (
      <div className='App'>
        <ParticlesBg />
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
        <Logo />
        {route === 'signin' ? (
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
        ) : route === 'register' ? (
          <Register onRouteChange={onRouteChange} />
        ) : (
          <>
            <Score name={user.name} entries={user.entries} />
            <ImageLinkForm
              onUrlInput={onUrlInput}
              onDetectSubmit={onDetectSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </>
        )}
      </div>
    );
  }
}

export default App;
