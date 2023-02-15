import React, { Component } from 'react';
import ParticlesBg from '../components/ParticlesBg';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Score from '../components/Score';
import ImageLinkForm from '../components/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition';
import Modal from './Modal';
import './App.css';
import Profile from '../components/Profile';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: '',
    pet: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            })
              .then((resp) => resp.json())
              .then((user) => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange('home');
                }
              });
          }
        })
        .catch(console.log);
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        age: data.age,
        pet: data.pet,
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

  faceLocations = (data) => {
    const boxesData = data.outputs[0].data.regions.map((faceData) => {
      const faceLocationData = faceData.region_info.bounding_box;
      const image = document.getElementById('input-image');
      const height = Number(image.height);
      const width = Number(image.width);
      return {
        topRow: faceLocationData.top_row * height,
        rightCol: width - faceLocationData.right_col * width,
        bottomRow: height - faceLocationData.bottom_row * height,
        leftCol: faceLocationData.left_col * width,
      };
    });

    this.setState({ boxes: boxesData });
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
        this.faceLocations(data);
      })
      .catch((err) => console.log(err));
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  render() {
    const { onUrlInput, onDetectSubmit, onRouteChange, loadUser, toggleModal } =
      this;
    const { imageUrl, boxes, route, isSignedIn, user, isProfileOpen } =
      this.state;
    return (
      <div className='App'>
        <ParticlesBg />
        <Navigation
          onRouteChange={onRouteChange}
          isSignedIn={isSignedIn}
          toggleModal={toggleModal}
        />
        <Logo />
        {route === 'signin' ? (
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
        ) : route === 'register' ? (
          <Register onRouteChange={onRouteChange} />
        ) : (
          <>
            {isProfileOpen && (
              <Modal>
                <Profile
                  toggleModal={toggleModal}
                  user={user}
                  loadUser={loadUser}
                />
              </Modal>
            )}
            <Score name={user.name} entries={user.entries} />
            <ImageLinkForm
              onUrlInput={onUrlInput}
              onDetectSubmit={onDetectSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </>
        )}
      </div>
    );
  }
}

export default App;
