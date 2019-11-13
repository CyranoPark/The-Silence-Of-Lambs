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
      counter: 0,
      timer: 1000,
      timeScore: 0,
      deathScore: 0,
      deathPenaltyScore: 0,
      totalScore: 0,
      rankingPage: 0
    }
  }

  componentDidMount() {
    const { gameProgress } = this.props;
    if (gameProgress !== CLEAR_GAME) {
      return;
    }
    this.setState({ rankingPage: 0 });
    this.props.fetchTopScores(this.fetchAdditionalScores);
    this.renderScore();
  }

  fetchAdditionalScores = () => {
    const { topRankList, rankList, fetchScores } = this.props;
    const nextStartScore = rankList.length
      ? rankList[rankList.length - 1].total_time + 1
      : topRankList[topRankList.length - 1].total_time + 1;

    fetchScores(7, nextStartScore, () => {
      this.setState({ rankingPage: this.state.rankingPage + 1 });
    });
  };

  fetchPreviousScores = () => {
    const { rankList, fetchPrevScores } = this.props;
    if (!rankList.length || this.state.rankingPage === 1) {
      return;
    }
    const prevEndScore = rankList[0].total_time - 1;
    fetchPrevScores(7, prevEndScore, () => {
      this.setState({ rankingPage: this.state.rankingPage - 1 });
    });
  };

  renderScore = () => {
    const { clearTime } = this.props;

    const timeScoreInterval = setInterval(() => {
      const nextTime = this.state.timeScore + 1000;
      if (nextTime >= clearTime) {
        clearInterval(timeScoreInterval);
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
    const deathCountInterval = setInterval(() => {
      if (this.state.deathScore === deathCount) {
        clearInterval(deathCountInterval);
        return;
      }

      const nextCount = this.state.deathScore + 1;
      this.setState({
        deathScore: nextCount,
        deathPenaltyScore: deathCountToPenaltyTime(nextCount),
        totalScore: this.state.totalScore + deathCountToPenaltyTime(1)
      });
    }, 500);
  };

  render() {
    const {
      userName,
      topRankList,
      rankList,
      gameProgress,
      onRestartButtonClick,
    } = this.props;
    const {
      timeScore,
      deathScore,
      deathPenaltyScore,
      totalScore,
      rankingPage
    } = this.state;

    if (gameProgress !== CLEAR_GAME) {
      return <Redirect to='/start' />
    }
    return (
      <>
        <h1>Misson Complete!</h1>
        <div className='result-container'>
          <div>
            <button
              className='restart-button'
              onClick={onRestartButtonClick}
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
    )
  };
};

export default Result;
