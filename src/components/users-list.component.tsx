import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { fromPromise } from 'mobx-utils';

import UserItem from './user-item.component';
import { UsersStore } from '../stores/users.store';

interface Props {
  usersStore?: UsersStore
}


@inject('usersStore') @observer
export default class UsersList extends React.Component<Props, {}> {
  usersPromise;

  componentWillMount() {
    this.usersPromise = fromPromise(this.props.usersStore.fetchItems());
  }

  render() {
    return (
      <div>
        {this.usersPromise.case({
          pending: () => <div>loading</div>,
          fulfilled: () => (
            this.props.usersStore
              .users.map(user => <UserItem key={user.id} user={user} />)
          ),
          rejected: () => <div>error occured during fetching</div>
        })}
      </div>
    );
  }
}