import * as React from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import './App.css';

class User {
  @observable firstName;
  @observable lastName;

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @computed get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const john = new User('John', 'Doe');

@observer
export default class Demo1 extends React.Component<{}, {}> {
  changeFirstName = ({ target }) => john.firstName = target.value;
  changeLastName = ({ target }) => john.lastName = target.value;

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React Kyiv</h2>
          <img className="App-logo" src={require('./logo.png')} alt="React Kyiv" />
        </div>
        <p className="App-intro">
          {john.fullName}
        </p>
        <input
          value={john.firstName}
          onChange={this.changeFirstName}
        />
        <input
          value={john.lastName}
          onChange={this.changeLastName}
        />
      </div>
    );
  }
}
