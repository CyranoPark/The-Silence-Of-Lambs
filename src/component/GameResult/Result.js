import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Ranking from './Ranking';
import Score from './Score';

import { deathCountToPenaltyTime } from '../../utils';
import { CLEAR_GAME } from '../../constants/status';
import './Result.scss';

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeScore: 0,
      deathScore: 0,
      deathPenaltyScore: 0,
      totalScore: 0,
      rankingPage: 0
    };
  }

  componentDidMount() {
    const { gameProgress, fetchTopScores } = this.props;
    if (gameProgress !== CLEAR_GAME) {
      return;
    }
    fetchTopScores(this.fetchAdditionalScores);
    this.renderScore();
  }

  fetchAdditionalScores = () => {
    const { topRankList, rankList, fetchScores } = this.props;
    const { rankingPage } = this.state;
    const nextStartScore = rankList.length
      ? rankList[rankList.length - 1].total_time + 1
      : topRankList[topRankList.length - 1].total_time + 1;
    fetchScores(7, nextStartScore, () => {
      this.setState({ rankingPage: rankingPage + 1 });
    });
  };

  fetchPreviousScores = () => {
    const { rankingPage } = this.state;
    const { rankList, fetchPrevScores } = this.props;
    if (!rankList.length || rankingPage <= 1) {
      return;
    }
    const prevEndScore = rankList[0].total_time - 1;
    fetchPrevScores(7, prevEndScore, () => {
      this.setState({ rankingPage: rankingPage - 1 });
    });
  };

  renderScore = () => {
    const { clearTime } = this.props;
    this.timeScoreInterval = setInterval(() => {
      const { timeScore } = this.state;
      const nextTime = timeScore + 1000;
      if (nextTime >= clearTime) {
        clearInterval(this.timeScoreInterval);
        this.setState({
          timeScore: clearTime,
          totalScore: clearTime
        });
        this.renderDeathCount();
        return;
      }

      this.setState({
        timeScore: nextTime,
        totalScore: nextTime
      });
    }, 10);
  };

  renderDeathCount = () => {
    const { deathCount } = this.props;
    this.deathCountInterval = setInterval(() => {
      const { deathScore, totalScore } = this.state;
      if (deathScore === deathCount) {
        clearInterval(this.deathCountInterval);
        return;
      }

      const nextCount = deathScore + 1;
      this.setState({
        deathScore: nextCount,
        deathPenaltyScore: deathCountToPenaltyTime(nextCount),
        totalScore: totalScore + deathCountToPenaltyTime(1)
      });
    }, 500);
  };

  onRestartButtonClick = () => {
    const { handleGameRestart, initRankingList } = this.props;
    clearInterval(this.deathCountInterval);
    clearInterval(this.timeScoreInterval);
    initRankingList();
    handleGameRestart();
  }

  render() {
    const {
      userName,
      topRankList,
      rankList,
      gameProgress
    } = this.props;
    const {
      timeScore,
      deathScore,
      deathPenaltyScore,
      totalScore,
      rankingPage
    } = this.state;

    if (gameProgress !== CLEAR_GAME) {
      return <Redirect to='/start' />;
    }
    return (
      <>
        <h1>Misson Complete!</h1>
        <div className='result-container'>
          <div>
            <button
              type='button'
              className='restart-button'
              onClick={this.onRestartButtonClick}
            >
              RESTART
            </button>
          </div>
          <Score
            userName={userName}
            clearTime={timeScore}
            deathCount={deathScore}
            deathPenalty={deathPenaltyScore}
            score={totalScore}
          />
          <h2>Killer Rank</h2>
          <Ranking
            topRankList={topRankList}
            rankList={rankList}
            rankingPage={rankingPage}
            userName={userName}
            onNextButtonClick={this.fetchAdditionalScores}
            onPrevButtonClick={this.fetchPreviousScores}
          />
        </div>
      </>
    );
  }
}

export default Result;
