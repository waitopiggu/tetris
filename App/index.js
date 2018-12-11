import React from 'react';
import { clone } from 'lodash';
import { Field } from './components';
import { env, tetrominos, util } from './lib';

type State = {
  input: any,
  placed: Array<any>,
  position: any,
  rotationIndex: number,
  tetrominoIndex: number,
  speed: number,
};

/**
 * App Component
 * @param {Props} props
 */
export default class App extends React.Component<*, State> {
  /**
   * Last Update
   */
  lastUpdate = 0;

  /**
   * Default State
   */
  state = {
    input: {},
    placed: [],
    position: {},
    rotationIndex: -1,
    tetrominoIndex: -1,
    speed: 0,
  };

  /**
   * Component Will Mount
   */
  componentDidMount() {
    this.onKeyDown = this.handleInput(true);
    document.addEventListener('keydown', this.onKeyDown);
    this.onKeyUp = this.handleInput(false);
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
   * Collide
   */
  collide = () => {
  };

  /**
   * Get Matrix
   */
  getMatrix = () => {
    const { placed, position, rotationIndex, tetrominoIndex } = this.state;
    const matrix = placed.map(row => row.map(col => col));
    if (!matrix.length) {
      return [];
    }
    const tetromino = tetrominos[tetrominoIndex].rotations[rotationIndex];
    const { length } = tetromino;
    const { x, y } = position;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        matrix[i + y][j + x] = tetromino[i][j];
      }
    }
    return matrix;
  };

  /**
   * Handle Input
   * @param {boolean} value
   */
  handleInput = value => async (event) => {
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
      case 'ArrowUp': {
        input.rotation = value;
        break;
      }
      default: {
        break;
      }
    }
    await this.setState({ input });
  };

  /**
   * Initialize
   */
  initialize = async () => {
    const { cols, rows } = env.field;
    const placed = Array(rows).fill(Array(cols).fill(0));
    const tetrominoIndex = util.randomIndex(tetrominos)
    const position = clone(tetrominos[tetrominoIndex].spawn);
    await this.setState({
      placed,
      position,
      rotationIndex: 0,
      tetrominoIndex,
      speed: env.initialSpeed,
    });
    window.requestAnimationFrame(this.update);
  };

  /**
   * Move
   */
  move = async () => {
  };

  /**
   * Update
   * @param {number} timestamp
   */
  update = async (timestamp) => {
    window.requestAnimationFrame(this.update);
  };

  /**
   * Render
   */
  render() {
    return (
      <div>
        <Field matrix={this.getMatrix()} />
        <button onClick={this.initialize}>
          {'initialize'}
        </button>
      </div>
    );
  }
}
