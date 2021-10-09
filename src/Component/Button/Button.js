import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';

export default class Button extends Component {
  scroll = () => {
    this.props.onClick();
    scroll.scrollToBottom();
  };

  render() {
    return (
      <button onClick={this.scroll} className="Button" type="button">
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
