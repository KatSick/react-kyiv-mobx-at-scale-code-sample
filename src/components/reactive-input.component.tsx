import * as React from 'react';
import { observer } from 'mobx-react';

interface Props {
    model: any;
    type: string;
    asForm?: boolean;
    handler?(e);
}

@observer
export default class ReactiveInpute extends React.Component<Props, {}> {
  onChange = (e) => this.props.model[this.props.type] = e.target.value;

  render() {
    const { model, type, handler, asForm } = this.props;
  
    return (
      <input
          value={model[type] || ''}
          onChange={asForm ? this.onChange : handler}
        />
    );
  }
}
