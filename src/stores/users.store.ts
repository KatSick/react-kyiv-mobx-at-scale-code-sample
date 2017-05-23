import { observable, action } from 'mobx';
import { deserialize } from 'serializr';

import UserModel from './models/user.model';

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export class UsersStore {
  users = observable.array([]);

  @action.bound async fetchItems() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      await sleep(2000); // for demo
      
      this.resetUsers(data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound async createItem(model) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        { method: 'POST', body: JSON.stringify(model.asJSON) }
      );
      const data = await response.json();
      
      this.addUser(model)
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  @action.bound createNew() {
    return deserialize(
        UserModel,
        {
          id: Math.random(),
          name: '',
          email: '',
          address: {
            city: '',
            street: '',
            suite: ''
          }
        }
    );
  }

  @action.bound addUser(model) {
    this.users.push(model);
  }

  @action.bound resetUsers(data) {
    const users = data.map(user => deserialize(UserModel, user));
    this.users.replace(users);
  }
}

export default new UsersStore();
