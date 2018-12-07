import React from 'react';
import { connect } from 'react-redux';
import { keymap } from '../../Store';

const { KEY_CODE } = keymap;

type Props = {
  keyDown: Function,
  keyUp: Function,
};

/**
 * With Keymap
 * @param {React.Component} WrappedComponent 
 */
function withKeymap(WrappedComponent) {
  class Wrapper extends React.PureComponent<Props> {
    /**
     * On Key Down
     * @param {Event} event
     */
    onKeyDown = (event) => {
      const { keyDown } = this.props;
      switch (event.keyCode) {
        case KEY_CODE.LEFT: {
          keyDown('left');
          break;
        }
        case KEY_CODE.RIGHT: {
          keyDown('right');
          break;
        }
        default: {
          break;
        }
      }
    };

    /**
     * On Key Up
     * @param {Event} event
     */
    onKeyUp = (event) => {
      const { keyUp } = this.props;
      switch (event.keyCode) {
        case KEY_LEFT: {
          keyUp('left');
          break;
        }
        case KEY_RIGHT: {
          keyUp('right');
          break;
        }
        default: {
          break;
        }
      }
    };

    /**
     * Component Did Mount
     */
    componentDidMount() {
      document.addEventListener('keydown',this.onKeyDown);
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
     * Render
     */
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  /**
   * Map State to Props
   * @param {any} state 
   */
  const mapStateToProps = state => ({
    keymap: state.keymap,
  });
  
  /**
   * Map Dispatch to Props
   * @param {Function} dispatch
   */
  const mapDispatchToProps = dispatch => ({
    keyDown: key => dispatch({
      type: actionTypes.KEY_DOWN,
      payload: { [key]: true },
    }),
    keyUp: key => dispatch({
      type: actionTypes.KEY_UP,
      payload: { [key]: false },
    }),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper)
}

export default withKeymap;
