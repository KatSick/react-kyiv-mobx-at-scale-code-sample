import * as React from 'react';
import { observable, computed, action, useStrict } from 'mobx';
import { observer } from 'mobx-react';
import { deserialize, serialize, serializable, object } from 'serializr';
import './App.css';

// useStrict(true);

class UserAddress {
  @serializable @observable city;
  @serializable street;
  @serializable suite;
}

class User {
  @serializable id;
  @serializable @observable name;
  @serializable @observable email;

  @serializable(object(UserAddress)) address;

  @computed get humanAddress() {
    return `${this.address.city} ${this.address.street} ${this.address.suite}`;
  }

  @action.bound setName(e) {
    this.name = e.target.value;
  }

  @action.bound setCity(e) {
    this.address.city = e.target.value; 
  }

  @action.bound async updateUser() {
    const fetchConfig = { method: 'PUT', body: JSON.stringify(this.asJSON) }
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${this.id}`, fetchConfig);
      await response.json(); // just wait
      alert(JSON.stringify(this.asJSON, null, 2)); // for demo
    } catch (e) {
      console.error(e);
    }
  }

  @computed get asJSON() {
    return serialize(this);
  }
}

class UsersStore {
  users = observable.array([]);

  @action.bound async fetchItems() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      
      this.resetUsers(data);
    } catch (e) {
      console.error(e);
    }
  }

  @action.bound resetUsers(data) {
    const users = data.map(user => deserialize(User, user));
    this.users.replace(users);
  }
}

const store = new UsersStore();

@observer
class UserItem extends React.Component<{ user: User }, {}> {
  render() {
    const { user } = this.props;
    return (
      <div>
        <p className="App-intro">
          "{user.name}"" lives at "{user.humanAddress}""
        </p>
        <input
          value={user.name}
          onChange={user.setName}
        />
        <input
          value={user.address.city}
          onChange={user.setCity}
        />
        <button onClick={user.updateUser}>Save to server</button>
      </div>
    );
  }
}

@observer
class UsersList extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        {store.users.map(user => <UserItem key={user.id} user={user} />)}
      </div>
    );
  }
}

@observer
export default class Demo1 extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React Kyiv</h2>
          <img className="App-logo" src={require('./logo.png')} alt="React Kyiv" />
        </div>
        <button onClick={store.fetchItems}>Fetch users</button>
        <UsersList />
      </div>
    );
  }
}
