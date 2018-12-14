import React from 'react';
import { Field } from '..';
import { env, util } from '../../lib';
import './style';

type Props = {
  field: Array<[]>,
  fieldPlaceBlock: Function,
  game: any,
  gameStart: Function,
  gameStop: Function,
  input: any,
  tetromino: any,
  tetrominoNext: Function,
  tetrominoUpdate: Function,
};

/**
 * Game Component
 */
export default class Game extends React.PureComponent<Props> {
  /**
   * Input Lock
   */
  inputLock: false;

  /**
   * Last Input
   */
  lastInput: 0;

  /**
   * Last Fall
   */
  lastFall: 0;

  /**
   * Start
   */
  start = () => {
    const { gameStart } = this.props;
    gameStart();
    this.lastInput = 0;
    this.lastFall = 0;
    window.requestAnimationFrame(this.update);
  };

  /**
   * Stop
   */
  stop = () => {
    const { gameStop } = this.props;
    gameStop();
  };

  /**
   * Fall
   * @param {number} timestamp
   */
  fall = (timestamp) => {
    this.lastFall = timestamp;
    const { field, tetromino } = this.props;
    const { current, position, rotation } = tetromino;
    const block = util.block(current, rotation);
    for (let i = 0; i < block.length; i++) {
      const y = i + position.row + 1;
      for (let j = 0; j < block[i].length; j++) {
        if (block[i][j] !== 0) {
          const x = j + position.col;
          if (y >= field.length || field[y][x] !== 0) {
            const { fieldPlaceBlock, tetrominoNext } = this.props;
            fieldPlaceBlock(block, position);
            tetrominoNext();
            return;
          }
        }
      }
    }
    position.row += 1;
    const { tetrominoUpdate } = this.props;
    tetrominoUpdate({ position });
  };

  /**
   * Move
   * @param {number} timestamp
   */
  move = (timestamp) => {
    this.lastInput = timestamp;
    const { input } = this.props;
    if (input.moveDown) {
      this.fall(timestamp);
    }
    const direction = input.moveLeft ? -1 : input.moveRight ? 1 : 0;
    if (direction === 0) {
      return;
    }
    const { field, tetromino } = this.props;
    const { current, position, rotation } = tetromino;
    const block = util.block(current, rotation);
    for (let i = 0; i < block.length; i++) {
      const y = i + position.row;
      for (let j = 0; j < block[i].length; j++) {
        const x = j + position.col + direction;
        if (block[i][j] !== 0) {
          if (x < 0 || x >= field[y].length || field[y][x] !== 0) {
            return;
          }
        }
      }
    }
    position.col += direction;
    const { tetrominoUpdate } = this.props;
    tetrominoUpdate({ position });
  };

  /**
   * Rotate
   * @param {number} timestamp
   */
  rotate = (timestamp) => {
    this.lastInput = timestamp;
    const { input } = this.props;
    if (!(input.rotateLeft || input.rotateRight)) {
      return;
    }
    const { field, tetromino } = this.props;
    const { current, position, rotation } = tetromino;
    const newRotation = util.nextIndex(
      current.rotations,
      rotation,
      input.rotateLeft,
    );
    const block = util.block(current, newRotation);
    for (let i = 0; i < block.length; i++) {
      const y = i + position.row;
      for (let j = 0; j < block[i].length; j++) {
        const x = j + position.col;
        if (block[i][j] !== 0) {
          if (x < 0 || x >= field[y].length || field[y][x] !== 0) {
            return;
          }
        }
      }
    }
    const { tetrominoUpdate } = this.props;
    tetrominoUpdate({ rotation: newRotation });
  };

  /**
   * Update
   * @param {number} timestamp
   */
  update = (timestamp) => {
    const { input } = this.props;
    const move = Object.values(input).reduce((value, i) => (value || i), false);
    if (this.inputLock && !move) {
      this.inputLock = false;
    }
    if (move && !this.inputLock) {
      this.move(timestamp);
      this.rotate(timestamp);
      this.inputLock = true;
    }
    const { game } = this.props;
    if (timestamp - this.lastInput > game.speed / env.inputDelayDivisor) {
      this.inputLock = false;
    }
    if (timestamp - this.lastFall > game.speed) {
      this.fall(timestamp);
    }
    if (game.running) {
      window.requestAnimationFrame(this.update);
    }
  };

  /**
   * Render
   */
  render() {
    return (
      <div>
        <Field />
        <div>
          <button onClick={this.start} type="button">
            {'start'}
          </button>
          <button onClick={this.stop} type="button">
            {'stop'}
          </button>
        </div>
      </div>
    );
  }
}
