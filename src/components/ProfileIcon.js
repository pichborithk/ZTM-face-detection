import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      ...prevState,
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    return (
      <div className='pa4 tc'>
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          // direction={direction}
        >
          <DropdownToggle
            tag='span'
            data-toggle='dropdown'
            aria-expanded={this.state.dropdownOpen}
          >
            <img src='' alt='avatar' className='br-100 ba h3 w3 dib' />
          </DropdownToggle>
          <DropdownMenu
            // {...args}
            className='b--transparent shadow-5'
            style={{
              // marginTop: '20px',
              backgroundColor: 'rgba(255,255,255,0.5)',
            }}
          >
            <DropdownItem header>User Name</DropdownItem>
            <DropdownItem onClick={this.props.toggleModal}>
              View Profile
            </DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange('signin')}>
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
