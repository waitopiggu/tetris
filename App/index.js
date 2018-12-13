import React from 'react';
import { Field } from './components';
import { env, tetrominos, util } from './lib';
import styles from './style';

const fieldMatrix = Array(env.field.rows).fill(Array(env.field.cols).fill(0));

type State = {
  grounded: boolean,
  input: any,
  inputLock: boolean,
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
   * Last Input
   */
  lastInput: 0;

  /**
   * Last Fall
   */
  lastFall: 0;

  /**
   * Default State
   */
  state = {
    grounded: false,
    input: {},
    inputLock: false,
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
      grounded: false,
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
      inputLock: false,
      grounded: false,
      placed: placed.map(row => row.map(col => 0)),
      position,
      rotation: 0,
      running: true,
      tetromino,
      tetrominoNext,
      speed: initialSpeed,
    });
    this.lastInput = 0;
    this.lastFall = 0;
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
    for (let i = 0; i < block.length; i++) {
      const k = i + position.row + 1;
      for (let j = 0; j < block[i].length; j++) {
        if (block[i][j] === 0) continue;
        if (k >= placed.length || placed[k][j + position.col] !== 0) {
          return await this.setState({ grounded: true });
        }
      }
    }
    position.row += 1;
    await this.setState({ position });
  };

  /**
   * Move
   */
  move = async () => {
    const { input, placed, rotation, tetromino } = this.state;
    const block = tetromino.rotations[rotation];
    const position = { ...this.state.position };
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
    await this.setState({ inputLock: true, position, rotation });
  };

  /**
   * Update
   * @param {number} timestamp
   */
  update = async (timestamp) => {
    const { inputLock, running, speed } = this.state;
    if (!inputLock) {
      await this.move();
      this.lastInput = timestamp;
    }
    if (timestamp - this.lastInput > speed / env.inputDelayDivisor) {
      await this.setState({ inputLock: false });
    }
    if (timestamp - this.lastFall > speed) {
      await this.fall();
      this.lastFall = timestamp;
    }
    const { grounded } = this.state;
    if (grounded) {
      await this.placeBlock();
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
