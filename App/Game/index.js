import { connect } from 'react-redux';
import { actions as fieldActions } from '../state/field';
import { actions as gameActions } from '../state/game';
import { actions as tetrominoActions } from '../state/tetromino';
import { withInput } from '../higher-order-components';
import Game from './Game';

const mapStateToProps = state => ({
  field: state.field,
  game: state.game,
  input: state.input,
  tetromino: state.tetromino,
});

const mapDispatchToProps = dispatch => ({
  fieldPlaceBlock: (block, position) => dispatch(
    fieldActions.placeBlock(block, position),
  ),
  fieldSet: field => dispatch(fieldActions.set(field)),
  gameStart: level => dispatch(gameActions.start(level)),
  gameStop: () => dispatch(gameActions.stop()),
  tetrominoNext: () => dispatch(tetrominoActions.next()),
  tetrominoUpdate: props => dispatch(tetrominoActions.update(props)),
});

export default withInput(connect(mapStateToProps, mapDispatchToProps)(Game));
