import React from 'react';
import { clone } from 'lodash';
import { Field } from './components';
import { env, tetrominos } from './lib';

type State = {
  input: any,
  placed: Array<any>,
  player: any,
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
    player: {
      position: {},
      tetromino: {},
    },
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
   * Collide
   */
  collide = () => {
  };

  /**
   * Get Matrix
   */
  getMatrix = () => {
    const { placed, player } = this.state;
    const matrix = placed.map(row => row.map(col => col));
    const { size } = player.tetromino || 0;
    const { x, y } = player.position;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        matrix[i + y][j + x] = player.tetromino.piece[i][j];
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
    const tetromino = tetrominos.random();
    await this.setState({
      placed,
      player: {
        position: clone(tetromino.spawn),
        tetromino,
      },
      speed: env.initialSpeed,
    });
    window.requestAnimationFrame(this.update);
  };

  /**
   * Move
   */
  move = async () => {
    const { input, player } = this.state;
    if (input.left) {
      player.position.x -= 1;
    } else if (input.right) {
      player.position.x += 1;
    }
    await this.setState({ player });
    await this.collide();
  };

  /**
   * Update
   * @param {number} timestamp
   */
  update = async (timestamp) => {
    const { speed } = this.state;
    await this.move();
    if (timestamp - this.lastUpdate > speed) {
      const { player } = this.state;
      player.position.y += 1;
      await this.setState({ player });
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
