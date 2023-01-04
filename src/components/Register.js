import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      newEmail: '',
      newPassword: '',
      newName: '',
    };
  }

  onEmailInput = (event) => {
    this.setState({ newEmail: event.target.value });
  };

  onPasswordInput = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  onNameInput = (event) => {
    this.setState({ newName: event.target.value });
  };

  onSummitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.newName,
        email: this.state.newEmail,
        password: this.state.newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.props.onRouteChange('signin');
        }
      });
  };

  render() {
    return (
      <>
        <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
          <main className='pa4 black-80 zindex white'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='name'>
                    Name
                  </label>
                  <input
                    onChange={this.onNameInput}
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='text'
                    name='name'
                    id='name'
                  />
                  <div className='mt3'>
                    <label
                      className='db fw6 lh-copy f6'
                      htmlFor='email-address'
                    >
                      Email
                    </label>
                    <input
                      onChange={this.onEmailInput}
                      className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                      type='email'
                      name='email-address'
                      id='email-address'
                    />
                  </div>
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='password'>
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordInput}
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='password'
                    name='password'
                    id='password'
                  />
                </div>
              </fieldset>
              <div className=''>
                <input
                  onClick={this.onSummitRegister}
                  className='b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib white'
                  type='submit'
                  value='Register'
                />
              </div>
            </div>
          </main>
        </article>
      </>
    );
  }
}

export default Register;
