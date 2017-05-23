import * as React from 'react';
import { observer } from 'mobx-react';

import UserModel from '../stores/models/user.model';
import Input from './reactive-input.component';

interface Props {
    user: UserModel
}

@observer
class UserAddress extends React.Component<Props, {}> {
  render() {
    const { user } = this.props;

    return (
      <p className="App-intro">
        "{user.name}"" lives at "{user.humanAddress}""
      </p>
    );
  }
}

export default class UserItem extends React.Component<Props, {}> {
  render() {
    const { user } = this.props;

    return (
      <div>
        <UserAddress user={user} />
        <Input
          model={user}
          type="name"
          handler={user.setName}
        />
        <Input
          model={user.address}
          type="city"
          handler={user.setCity}
        />
        <button onClick={user.updateUser}>Save on server</button>
      </div>
    );
  }
}