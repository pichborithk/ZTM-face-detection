import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        this.setState({ name: event.target.value });
        break;
      case 'user-age':
        this.setState({ age: event.target.value });
        break;
      case 'user-pet':
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    const token = window.sessionStorage.getItem('token');
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: token
        ? {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        : { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { name, age, pet } = this.state;
    const { user, toggleModal } = this.props;
    return (
      <div className='profile-modal'>
        <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
          <main className='pa4 black-80 zindex w=80'>
            <img src='' alt='avatar' className='h3 w3 dib' />
            <h1>{name}</h1>
            <h4>{`Image Submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <hr />
            <label className='mt2 fw6' htmlFor='user-name'>
              Name:
            </label>
            <input
              onChange={this.onFormChange}
              className='pa2 ba w-100'
              type='text'
              name='user-name'
              id='name'
              placeholder={user.name}
            />
            <label className='mt2 fw6' htmlFor='user-name'>
              Age:
            </label>
            <input
              onChange={this.onFormChange}
              className='pa2 ba w-100'
              type='text'
              name='user-age'
              id='age'
              placeholder={user.age}
            />
            <label className='mt2 fw6' htmlFor='user-name'>
              Pet:
            </label>
            <input
              onChange={this.onFormChange}
              className='pa2 ba w-100'
              type='text'
              name='user-pet'
              id='pet'
              placeholder={user.pet}
            />
            <div
              className='mt4'
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <button
                className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
                onClick={() => this.onProfileUpdate({ name, age, pet })}
              >
                Save
              </button>
              <button
                className='b pa2 grow pointer hover-white w-40 bg-red b--black-20'
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div className='modal-close' onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
