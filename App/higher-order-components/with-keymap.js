import React from 'react';
import { connect } from 'react-redux';
import { actionTypes } from '../Store/keymap';

const KEY_LEFT = 37;
const KEY_RIGHT = 39;

type Props = {
  keyDown: Function,
  keyUp: Function,
};

function withKeymap(WrappedComponent) {
  class Wrapper extends React.PureComponent<Props> {

    onKeyDown = (event) => {
      switch (event.keyCode) {
        case KEY_LEFT: {
          this.props.keyDown('left');
          break;
        }
        case KEY_RIGHT: {
          this.props.keyDown('right');
          break;
        }
        default: {
          break;
        }
      }
    };

    onKeyUp = (event) => {
      switch (event.keyCode) {
        case KEY_LEFT: {
          this.props.keyUp('left');
          break;
        }
        case KEY_RIGHT: {
          this.props.keyUp('right');
          break;
        }
        default: {
          break;
        }
      }
    };

    componentDidMount() {
      document.addEventListener('keydown',this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keyup', this.onKeyUp);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    keymap: state.keymap,
  });
  
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
