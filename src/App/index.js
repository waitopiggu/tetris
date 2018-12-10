import React from 'react';
import { Field } from './components';

const MATRIX_COLS = 10;
const MATRIX_ROWS = 20;

type State = {
  keymap: any,
  matrix: Array<any>,
  position: Array<number>,
};

/**
 * App Component
 * @param {Props} props
 */
export default class App extends React.Component<State, Props> {
  /**
   * Default State
   */
  state = {
    input: {},
    matrix: [],
    position: [],
  };

  /**
   * Component Will Mount
   */
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
    this.initialize();
  }

  /**
   * Component Did Mount
   */
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  initialize() {
    const matrix = Array(MATRIX_ROWS).fill(Array(MATRIX_COLS).fill(null));
    this.setState({ matrix });
  }

  /**
   * Handle Input
   * @param {boolean} value
   */
  handleInput = value => (event) => {
    const { input } = this.state;
    switch (event.key) {
      case 'ArrowLeft': {
        input.left = value;
        break;
      }
      case 'ArrowRight': {
        input.right = value;
        break;
      }
      default: {
        break;
      }
    }
    this.setState({ input });
  };

  /**
   * On Key Down
   */
  onKeyDown = this.handleInput(true);

  /**
   * On Key Up
   */
  onKeyUp = this.handleInput(false);

  /**
   * Render
   */
  render() {
    const { matrix } = this.state;
    return <Field matrix={matrix} />;
  }
}
