import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Start from '../GameStart/Start';
import './App.scss';

const App = props => {
  const { userName, onUserNameInputChange } = props;
  return (
    <div className="App">
      <Route
        exact path="/"
        render={() => <Redirect to="/start" />}
      />
      <Route
        exact path="/start"
        render={routeProps =>
          <Start
            {...routeProps}
            userName={userName}
            onUserNameInputChange={onUserNameInputChange}
          />
        }
      />
    </div>
  );
}

export default App;
