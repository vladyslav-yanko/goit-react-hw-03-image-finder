import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div onClick={this.handleBackdrop} className="Overlay">
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleBackdrop: PropTypes.func.isRequired,
};
