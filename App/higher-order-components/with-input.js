import React from 'react';
import { connect } from 'react-redux';
import { input } from '../state';

type Props = {
  keyDown: Function,
  keyUp: Function,
};

/**
 * With Input
 * @param {React.Component|React.PureComponent} WrappedComponent
 */
export default function (WrappedComponent) {
  class Wrapper extends React.PureComponent<Props> {
    /**
     * Component Did Mount
     */
    componentDidMount() {
      const { keyDown, keyUp } = this.props;
      this.onKeyDown = this.handleInput(true, keyDown);
      this.onKeyUp = this.handleInput(false, keyUp);
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
    }

    /**
     * Component Did Mount
     */
    componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keyup', this.onKeyUp);
    }

    /**
     * On Key Down
     * @param {Event} event
     */
    onKeyDown: Function;

    /**
     * On Key Up
     * @param {Event} event
     */
    onKeyUp: Function;

    /**
     * Handle Input
     * @param {Event} event
     */
    handleInput = (value, fn) => (event) => {
      switch (event.key) {
        case 'ArrowLeft': {
          fn('left');
          break;
        }
        case 'ArrowRight': {
          fn('right');
          break;
        }
        case 'ArrowUp': {
          fn('up');
          break;
        }
        default: {
          break;
        }
      }
    };

    /**
     * Render
     */
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    keyDown: key => dispatch(input.actions.keyDown(key)),
    keyUp: key => dispatch(input.actions.keyUp(key)),
  });

  return connect(null, mapDispatchToProps)(Wrapper);
}
