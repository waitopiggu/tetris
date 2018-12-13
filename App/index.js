import React from 'react';
import { Field } from './components';
import { env, tetrominos, util } from './lib';
import styles from './style';

const fieldMatrix = Array(env.field.rows).fill(Array(env.field.cols).fill(0));

type State = {
  input: any,
  placed: Array<any>,
  position: any,
  rotation: number,
  running: boolean,
  tetromino: any,
  tetrominoNext: any,
  speed: number,
};

/**
 * App Component
 */
export default class App extends React.Component<*, State> {
  /**
   * Last input
   */

  /**
   * Last Update
   */
  lastUpdate = 0;

  /**
   * Default State
   */
  state = {
    input: {},
    placed: fieldMatrix,
    position: {},
    rotation: 0,
    running: false,
    tetromino: null,
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
   * Get Matrix
   */
  getMatrix = () => {
    const { placed, tetromino } = this.state;
    const matrix = placed.map(row => row.map(col => col));
    if (tetromino) {
      const { position, rotation } = this.state;
      const block = tetromino.rotations[rotation];
      for (let i = 0; i < block.length; i++) {
        for (let j = 0; j < block[i].length; j++) {
          if (block[i][j] === 0) continue;
          matrix[i + position.row][j + position.col] = block[i][j];
        }
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
   * Place Block
   */
  placeBlock = async () => {
    const { placed, position, rotation, tetromino, tetrominoNext } = this.state;
    const block = tetromino.rotations[rotation];
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[i].length; j++) {
        if (block[i][j] === 0) continue;
        placed[i + position.row][j + position.col] = block[i][j];
      }
    }
    await this.setState({
      placed,
      position: { ...tetrominoNext.position },
      rotation: 0,
      tetromino: tetrominoNext,
      tetrominoNext: util.randomItem(tetrominos),
    });
  };

  /**
   * Start
   */
  start = async () => {
    const tetromino = util.randomItem(tetrominos);
    const tetrominoNext = util.randomItem(tetrominos);
    const position = { ...tetromino.position };
    const { placed } = this.state;
    const { initialSpeed } = env;
    await this.setState({
      placed: placed.map(row => row.map(col => 0)),
      position,
      rotation: 0,
      running: true,
      tetromino,
      tetrominoNext,
      speed: initialSpeed,
    });
    window.requestAnimationFrame(this.update);
  };

  /**
   * Stop
   */
  stop = () => this.setState({ running: false });

  /**
   * Fall
   */
  fall = async () => {
    const { placed, rotation, tetromino } = this.state;
    const block = tetromino.rotations[rotation];
    const position = { ...this.state.position };
    position.row += 1;
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[i].length; j++) {
        if (block[i][j] === 0) continue;
        if (i + position.row >= placed.length) {
          return await this.placeBlock();
        } else if (placed[i + position.row][j + position.col] !== 0) {
          return await this.placeBlock();
        }
      }
    }
    await this.setState({ position });
  };

  /**
   * Move
   */
  move = async () => {
    const { input, placed, rotation, tetromino } = this.state;
    const block = tetromino.rotations[rotation];
    let position = { ...this.state.position };
    let moveX = input.left ? -1 : input.right ? 1 : 0;
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[i].length; j++) {
        if (block[i][j] === 0) continue;
        const k = j + position.col + moveX;
        if (k < 0 || k >= placed[i + position.row].length) {
          moveX = 0;
        } else if (placed[i + position.row][k] !== 0) {
          moveX = 0;
        }
      }
    }
    position.col += moveX;
    await this.setState({ position, rotation });
  };

  /**
   * Update
   * @param {number} timestamp
   */
  update = async (timestamp) => {
    const { running, speed } = this.state;
    await this.move();
    if (timestamp - this.lastUpdate > speed) {
      await this.fall();
      this.lastUpdate = timestamp;
    }
    running && window.requestAnimationFrame(this.update);
  };

  /**
   * Render
   */
  render() {
    return (
      <div>
        <Field matrix={this.getMatrix()} />
        <div>
          <button onClick={this.start}>
            {'start'}
          </button>
          <button onClick={this.stop}>
            {'stop'}
          </button>
        </div>
      </div>
    );
  }
}
