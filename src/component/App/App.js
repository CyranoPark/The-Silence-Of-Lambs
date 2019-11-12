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
    isLoadingGame,
    isSavingScore,
    clearTime,
    deathCount,
    score,
    isLoadingResult,
    topRankList,
    rankList,
    handleStartButtonClick,
    handleGameStart,
    completeStartLoading,
    handleGameRestart,
    changeUserNameInput,
    saveScore,
    fetchScores,
    fetchPrevScores,
    fetchTopScores,
    initRankingList
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
            isLoadingGame={isLoadingGame}
            isLoadingResult={isLoadingResult}
            topRankList={topRankList}
            rankList={rankList}
            handleStartButtonClick={handleStartButtonClick}
            handleGameStart={handleGameStart}
            completeStartLoading={completeStartLoading}
            changeUserNameInput={changeUserNameInput}
            fetchScores={fetchScores}
            fetchPrevScores={fetchPrevScores}
            fetchTopScores={fetchTopScores}
            initRankingList={initRankingList}
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
            gameProgress={gameProgress}
            isLoadingResult={isLoadingResult}
            topRankList={topRankList}
            rankList={rankList}
            onRestartButtonClick={handleGameRestart}
            fetchScores={fetchScores}
            fetchPrevScores={fetchPrevScores}
            fetchTopScores={fetchTopScores}
          />
        }
      />
      <Route
        path="/"
        render={() => <Redirect to="/start" />}
      />
    </div>
  );
}

export default App;
