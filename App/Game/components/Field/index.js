import { connect } from 'react-redux';
import Field from './Field';

const mapStateToProps = state => ({
  field: state.field,
  tetromino: state.tetromino,
});

export default connect(mapStateToProps)(Field);
