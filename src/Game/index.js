import { connect } from 'react-redux';
import { field } from '../Store';
import { withKeymap } from './higher-order-components';
import Game from './Game';

/**
 * Map State to Props
 * @param {any} state 
 */
const mapStateToProps = state => ({
});

/**
 * Map Dispatch to Props
 * @param {Function} dispatch 
 */
const mapDispatchToProps = dispatch => ({
  fieldInitialize: () => dispatch({
    type: field.actionTypes.FIELD_INITIALIZE,
  }),
});

export default withKeymap(connect(mapStateToProps, mapDispatchToProps)(Game));
