import React from 'react';

const Profile = ({ toggleModal }) => {
  return (
    <div className='profile-modal'>
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
        <main className='pa4 black-80 zindex w=80'>
          <img src='' alt='avatar' className='h3 w3 dib' />
          <h1>Bo</h1>
          <h4>Image Submitted: 4</h4>
          <p>Member since: January</p>
          <hr />
          <label className='mt2 fw6' htmlFor='user-name'>
            Name:
          </label>
          <input
            className='pa2 ba w-100'
            type='text'
            name='user-name'
            id='name'
            placeholder='Bo'
          />
          <label className='mt2 fw6' htmlFor='user-name'>
            Age:
          </label>
          <input
            className='pa2 ba w-100'
            type='text'
            name='user-age'
            id='age'
            placeholder='34'
          />
          <label className='mt2 fw6' htmlFor='user-name'>
            Pet:
          </label>
          <input
            className='pa2 ba w-100'
            type='text'
            name='user-pet'
            id='pet'
            placeholder='Tiger'
          />
          <div
            className='mt4'
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
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
};

export default Profile;