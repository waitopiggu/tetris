import React from 'react';
import { Field } from './components';
import { env, util } from '../lib';
import './style';

const inputLockInitialState = {
  drop: false,
  move: false,
  rotate: false,
};

const lastUpdateInitialState = {
  drop: 0,
  move: 0,
};

type Props = {
  field: Array<[]>,
  fieldPlaceBlock: Function,
  fieldSet: Function,
  game: any,
  gameStart: Function,
  gameStop: Function,
  gameUpdateScore: Function,
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
  inputLock = { ...inputLockInitialState };

  /**
   * Last Update
   */
  lastUpdate = { ...lastUpdateInitialState };

  /**
   * Start
   */
  start = () => {
    const { gameStart } = this.props;
    gameStart();
    this.inputLock = { ...inputLockInitialState };
    this.lastUpdate = { ...lastUpdateInitialState };
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
   * Clear Rows
   */
  clearRows = () => {
    const { field } = this.props;
    const lines = [];
    for (let i = 0; i < field.length; i++) {
      if (field[i].reduce((p, c) => p && c, true)) {
        lines.push(i);
        field[i].map(() => 0);
        for (let j = i; j > 0; j--) {
          field[j] = field[j - 1];
        }
      }
    }
    if (lines.length > 0) {
      const { gameUpdateScore, fieldSet } = this.props;
      gameUpdateScore(lines);
      fieldSet(field);
    }
  };

  /**
   * Drop
   */
  drop = () => {
    const { field, tetromino } = this.props;
    const { current, position, rotation } = tetromino;
    const block = util.block(current, rotation);
    for (let i = 0; i < block.length; i++) {
      const y = i + position.row + 1;
      for (let j = 0; j < block[i].length; j++) {
        if (block[i][j] !== 0) {
          const x = j + position.col;
          if (y >= field.length || field[y][x] !== 0) {
            const { fieldPlaceBlock } = this.props;
            fieldPlaceBlock(block, position);
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
    const direction = input.moveLeft ? -1 : input.moveRight ? 1 : 0;
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
   */
  rotate = () => {
    const { field, input, tetromino } = this.props;
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
    const { game, input, tetromino } = this.props;
    const levelSpeed = util.speed(game.level, env.speeds);
    /**
     * Move
     */
    const move = input.moveDown || input.moveLeft || input.moveRight;
    if (!this.inputLock.move && move) {
      if (input.moveDown) {
        this.drop();
        this.inputLock.drop = true;
        this.lastUpdate.drop = timestamp;
      }
      if (input.moveLeft || input.moveRight) {
        this.move();
      }
      this.inputLock.move = true;
      this.lastUpdate.move = timestamp;
    }
    if (timestamp - this.lastUpdate.move > levelSpeed / env.autoShiftDelay) {
      this.inputLock.move = false;
    }
    /**
     * Rotate
     */
    const rotate = input.rotateLeft || input.rotateRight;
    if (!this.inputLock.rotate && rotate) {
      this.rotate();
      this.inputLock.rotate = true;
    } else if (this.inputLock.rotate && !rotate) {
      this.inputLock.rotate = false;
    }
    /**
     * Drop
     */
    if (timestamp - this.lastUpdate.drop > levelSpeed) {
      this.drop();
      this.inputLock.drop = false;
      this.lastUpdate.drop = timestamp;
    }
    /**
     * Clear Rows
     */
    if (tetromino.landed) {
      this.clearRows();
      const { tetrominoNext } = this.props;
      tetrominoNext();
    }
    /**
     * Update
     */
    if (game.running) {
      window.requestAnimationFrame(this.update);
    }
  };

  /**
   * Render
   */
  render() {
    const { game } = this.props;
    return (
      <div>
        <Field />
        <span style={{ color: 'white' }}>{`score: ${game.score}`}</span>
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
