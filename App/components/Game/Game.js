import React from 'react';
import { Field } from '..';
import { env, util } from '../../lib';
import './style';

const inputLockInitialState = {
  drop: false,
  move: false,
  rotate: false,
};

const lastUpdateInitialState = {
  drop: 0,
  move: 0,
  rotate: 0,
};

type Props = {
  field: Array<[]>,
  fieldPlaceBlock: Function,
  fieldSet: Function,
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
    let clear = false;
    for (let i = 0; i < field.length; i++) {
      if (field[i].reduce((p, c) => p && c, true)) {
        clear = true;
        field[i].map(() => 0);
        for (let j = i; j > 0; j--) {
          field[j] = field[j - 1];
        }
      }
    }
    if (clear) {
      const { fieldSet } = this.props;
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
    const { input } = this.props;
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
   */
  rotate = () => {
    const { input } = this.props;
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
    const { moveDown, moveLeft, moveRight } = input;
    const move = moveDown || moveLeft || moveRight;
    if (move && !this.inputLock.move) {
      if (input.moveDown) {
        this.drop();
        this.inputLock.drop = true;
        this.lastUpdate.drop = timestamp;
      }
      this.move();
      this.inputLock.move = true;
      this.lastUpdate.move = timestamp;
    }
    const { rotateLeft, rotateRight } = input;
    const rotate = rotateLeft || rotateRight;
    if (rotate && !this.inputLock.rotate) {
      this.rotate();
      this.inputLock.rotate = true;
      this.lastUpdate.rotate = timestamp;
    }
    const { game } = this.props;
    if (timestamp - this.lastUpdate.move > game.speed / env.delay.move) {
      this.inputLock.move = false;
    }
    if (timestamp - this.lastUpdate.rotate > game.speed / env.delay.rotate) {
      this.inputLock.rotate = false;
    }
    if (timestamp - this.lastUpdate.drop > game.speed / env.delay.drop) {
      this.drop();
      this.inputLock.drop = false;
      this.lastUpdate.drop = timestamp;
    }
    this.clearRows();
    const { tetromino } = this.props;
    if (tetromino.landed) {
      const { tetrominoNext } = this.props;
      tetrominoNext();
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
