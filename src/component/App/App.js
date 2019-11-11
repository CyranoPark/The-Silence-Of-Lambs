import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Start from '../GameStart/Start';
import Play from '../GamePlay/Play';
import Result from '../GameResult/Result';
import './App.scss';

const App = props => {
  const {
    userName,
    gameProgress,
    isSavingScore,
    clearTime,
    deathCount,
    score,
    isLoadingResult,
    topRankList,
    rankList,
    handleGameStart,
    changeUserNameInput,
    saveScore,
    fetchScores,
    fetchPrevScores,
    fetchTopScores
  } = props;

  return (
    <div className="App">
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
        render={routeProps => {
          if (userName) {
            return (
              <Play
                {...routeProps}
                gameProgress={gameProgress}
                finishGame={saveScore}
                userName={userName}
                isSavingScore={isSavingScore}
                clearTime={clearTime}
                deathCount={deathCount}
                score={score}
              />
            );
          }
          return <Redirect to="/start" />;
        }}
      />
      <Route
        exact path="/result"
        render={routeProps =>
          <Result
            {...routeProps}
            userName={userName}
            clearTime={clearTime}
            deathCount={deathCount}
            score={score}
            isLoadingResult={isLoadingResult}
            topRankList={topRankList}
            rankList={rankList}
            fetchScores={fetchScores}
            fetchPrevScores={fetchPrevScores}
            fetchTopScores={fetchTopScores}
          />
        }
      />
      {/* <Route
        path="/"
        render={() => <Redirect to="/start" />}
      /> */}
    </div>
  );
}

export default App;
