import * as React from 'react';
import { observer, inject } from 'mobx-react';

import UserModel from '../stores/models/user.model';
import UsersStore from '../stores/users.store';
import Input from './reactive-input.component';

interface Props {
    user: any,
    usersStore?: any
}

@observer
class DirtyState extends React.Component<Props, {}> {
  render() {
    const { user } = this.props;
    return (
      <pre>
        Is model dirty:
        {(user.isDirty || user.address.viewModel.isDirty).toString()}
        <br />
        <br />
        Is name dirty:
        {user.isPropertyDirty('name').toString()}
        <br />
        Is email dirty:
        {user.isPropertyDirty('email').toString()}
        <br />
        Is street dirty:
        {user.address.viewModel.isPropertyDirty('street').toString()}
        <br />
        Is suite dirty:
        {user.address.viewModel.isPropertyDirty('suite').toString()}
        <br />
        Is suite dirty:
        {user.address.viewModel.isPropertyDirty('street').toString()}
        <br />
        Is city dirty:
        {user.address.viewModel.isPropertyDirty('city').toString()}
      </pre>
    );
  }
}

@inject('usersStore') @observer
export default class UserCreate extends React.Component<Props, {}> {
  resetForm = () => {
    this.props.user.viewModel.reset();
    this.props.user.address.viewModel.reset();
  };

  onSave = () => {
    this.props.user.viewModel.submit();
    this.props.user.address.viewModel.submit();
    this.props.usersStore.createItem(this.props.user);
    // this.props.user = this.props.usersStore.createNew();
  };

  render() {
    const { user: model } = this.props;
    const user = model.viewModel

    return (
      <div>
        <label>
          Name
          <Input
            model={user}
            type="name"
            asForm={true}
          />
        </label>
        <br />
        <label>
          Email
          <Input
            model={user}
            type="email"
            asForm={true}
          />
        </label>
        <br />
        <label>
          Street
          <Input
            model={user.address.viewModel}
            type="street"
            asForm={true}
          />
        </label>
        <br />
        <label>
          Suite
          <Input
            model={user.address.viewModel}
            type="suite"
            asForm={true}
          />
        </label>
        <br />
        <label>
          City
          <Input
            model={user.address.viewModel}
            type="city"
            asForm={true}
          />
        </label>
        <br />
        <DirtyState user={user} />
        <button onClick={this.onSave}>Save on server</button>
        <button onClick={this.resetForm}>Reset form</button>
      </div>
    );
  }
}