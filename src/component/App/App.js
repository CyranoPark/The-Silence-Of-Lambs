import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Start from '../GameStart/Start';
import Play from '../GamePlay/Play';
import './App.scss';

const App = props => {
  const {
    userName,
    gameProgress,
    handleGameStart,
    changeUserNameInput
  } = props;

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
            gameProgress={gameProgress}
            handleGameStart={handleGameStart}
            changeUserNameInput={changeUserNameInput}
          />
        }
      />
      <Route
        exact path="/play"
        render={routeProps =>
          <Play
            {...routeProps}
            userName={userName}
          />
        }
      />
    </div>
  );
}

export default App;
