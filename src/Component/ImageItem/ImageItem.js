import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'Component/Modal/Modal';

export default class ImageItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { largeImageURL, src, alt } = this.props;
    const { showModal } = this.state;

    return (
      <li className="ImageGalleryItem">
        <img onClick={this.toggleModal} alt={alt} src={src} className="" />
        {showModal && (
          <Modal onClose={this.toggleModal} src={largeImageURL} alt={alt} />
        )}
      </li>
    );
  }
}

ImageItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
