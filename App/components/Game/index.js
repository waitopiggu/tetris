import { connect } from 'react-redux';
import { field, game, tetromino } from '../../state';
import { withInput } from '../../higher-order-components';
import Game from './Game';

const mapStateToProps = state => ({
  field: state.field,
  game: state.game,
  input: state.input,
  tetromino: state.tetromino,
});

const mapDispatchToProps = dispatch => ({
  fieldPlaceBlock: (block, position) => dispatch(field.actions.placeBlock(block, position)),
  gameStart: () => dispatch(game.actions.start()),
  gameStop: () => dispatch(game.actions.stop()),
  tetrominoNext: () => dispatch(tetromino.actions.next()),
  tetrominoUpdate: props => dispatch(tetromino.actions.update(props)),
});

export default withInput(connect(mapStateToProps, mapDispatchToProps)(Game));
