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
   */
  fall = () => {
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
   */
  move = () => {
    const { field, input, tetromino } = this.props;
    const { current, position, rotation } = tetromino;
    const block = util.block(current, rotation);
    const dir = input.left ? -1 : input.right ? 1 : 0;
    for (let i = 0; i < block.length; i++) {
      const y = i + position.row;
      for (let j = 0; j < block[i].length; j++) {
        const x = j + position.col + dir;
        if (block[i][j] !== 0) {
          if (x < 0 || x >= field[y].length || field[y][x] !== 0) {
            return;
          }
        }
      }
    }
    position.col += dir;
    const { tetrominoUpdate } = this.props;
    tetrominoUpdate({ position });
  };

  /**
   * Update
   * @param {number} timestamp
   */
  update = (timestamp) => {
    const { game } = this.props;
    if (!this.inputLock) {
      this.move();
      this.lastInput = timestamp;
    }
    if (timestamp - this.lastInput > game.speed / env.inputDelayDivisor) {
      this.inputLock = false;
    }
    if (timestamp - this.lastFall > game.speed) {
      this.fall();
      this.lastFall = timestamp;
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
