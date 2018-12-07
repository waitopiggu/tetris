import React from 'react';
import { Field } from './components';
import { withKeymap } from './higher-order-components';

type Props = {
  fieldInitialize: Function,
};

/**
 * Game Component
 * @param {Props} props
 */
class Game extends React.PureComponent<Props> {
  /**
   * Componet Did Mount
   */
  componentDidMount() {
    const { fieldInitialize } = this.props;
    fieldInitialize();
  }

  /**
   * Render
   */
  render() {
    return <Field />;
  }
}

export default withKeymap(Game);
