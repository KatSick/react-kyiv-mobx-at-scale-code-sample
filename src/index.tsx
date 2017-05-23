import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import DevTools from 'mobx-devtools';

import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';

ReactDOM.render(
  <Router>
    <div>
      <header className="devtools">
        <DevTools />
      </header>

      <Route path="/" exact render={() => (
        <ul>
          <li><Link to="/demo1">Demo 1</Link></li>
          <li><Link to="/demo2">Demo 2</Link></li>
          <li><Link to="/demo3">Demo 3</Link></li>
        </ul>
      )} />

      {/*<hr/>*/}

      <Route path="/demo1" render={() => <Demo1 />} />
      <Route path="/demo2" render={() => <Demo2 />} />
      <Route path="/demo3" render={() => <Demo3 />} />
    </div>
  </Router>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
