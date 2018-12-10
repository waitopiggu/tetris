import React from 'react';
import { Field } from './components';
import { tetrominos } from './lib';

const INITIAL_SPEED = 1000;
const MATRIX_COLS = 10;
const MATRIX_ROWS = 20;

type State = {
  placed: Array<any>,
  position: Array<number>,
  speed: number,
  tetromino: any,
};

/**
 * App Component
 * @param {Props} props
 */
export default class App extends React.Component<*, State> {
  /**
   * Default State
   */
  state = {
    placed: [],
    position: [],
    speed: 0,
    tetromino: {},
  };

  /**
   * Input
   */
  input = {};

  /**
   * Last Update
   */
  lastUpdate = 0;

  /**
   * Component Will Mount
   */
  componentDidMount() {
    this.onKeyDown = this.handleInput(true);
    document.addEventListener('keydown', this.onKeyDown);
    this.onKeyUp = this.handleInput(false);
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
   * Get Matrix
   */
  getMatrix = () => {
    const { placed, position, tetromino } = this.state;
    const matrix = placed.map(row => row.map(col => col));
    const { size } = tetromino || 0;
    const [y, x] = position;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        matrix[i + y][j + x] = tetromino.piece[i][j];
      }
    }
    return matrix;
  };

  /**
   * Handle Input
   * @param {boolean} value
   */
  handleInput = value => (event) => {
    switch (event.key) {
      case 'ArrowLeft': {
        this.input.left = value;
        break;
      }
      case 'ArrowRight': {
        this.input.right = value;
        break;
      }
      default: {
        break;
      }
    }
  };

  /**
   * Initialize
   */
  initialize = () => {
    const placed = Array(MATRIX_ROWS).fill(Array(MATRIX_COLS).fill(0));
    const tetromino = tetrominos.getRandom();
    this.setState({
      placed,
      position: tetromino.spawn.slice(),
      speed: INITIAL_SPEED,
      tetromino,
    });
    window.requestAnimationFrame(this.update);
  };

  /**
   * Update
   * @param {number} timestamp
   */
  update = (timestamp) => {
    const { speed } = this.state;
    if (timestamp - this.lastUpdate > speed) {
      const { position } = this.state;
      let [y, x] = position;
      if (this.input.left) {
        x -= 1;
      }
      if (this.input.right) {
        x += 1;
      }
      this.setState({ position: [y + 1, x] });
      this.lastUpdate = timestamp;
    }
    window.requestAnimationFrame(this.update);
  };

  /**
   * Render
   */
  render() {
    return <Field matrix={this.getMatrix()} />;
  }
}
