import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Bugcide from 'bugcide';


import rootReducer from './reducers';
import App from './container/App';
import './index.scss';

new Bugcide().init({ projectToken: 'thesilenceoflambs-LiccO' });
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
