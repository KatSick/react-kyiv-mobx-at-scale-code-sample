import { observable, action, computed } from 'mobx';
import { serializable, object, serialize } from 'serializr';
import { createViewModel } from 'mobx-utils';

class ViewModel {
  _viewModel;

  get viewModel() {
    if (!this._viewModel) {
      this._viewModel = createViewModel(this);
    }

    return this._viewModel
  }
}

class UserAddress extends ViewModel {
  @serializable @observable city;
  @serializable @observable street;
  @serializable @observable suite;
}

export default class UserModel extends ViewModel {
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