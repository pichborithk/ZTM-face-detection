import React from 'react';
import { createPortal } from 'react-dom';

const modelRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modelRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modelRoot.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Modal;
