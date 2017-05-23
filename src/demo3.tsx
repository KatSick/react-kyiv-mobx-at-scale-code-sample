import * as React from 'react';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';

import UsersList from './components/users-list.component';
import UserCreate from './components/user-create.component';
import UsersStore from './stores/users.store';

// useStrict(true);

export default class Demo3 extends React.Component<{}, {}> {
  render() {
    return (
      <Provider usersStore={UsersStore}>
        <Router>
          <div className="App">
            <div className="App-header">
              <h2>Welcome to React Kyiv</h2>
              <img className="App-logo" src={require('./logo.png')} alt="React Kyiv" />
            </div>
            <ul>
              <li><Link to="/demo3/list">List</Link></li>
              <li><Link to="/demo3/create">Create</Link></li>
            </ul>

            <hr/>
            <Route path="/demo3/list" render={() => <UsersList />} />
            <Route path="/demo3/create" render={() => <UserCreate user={UsersStore.createNew()} />} />
          </div>
        </Router>
      </Provider>
    );
  }
}
