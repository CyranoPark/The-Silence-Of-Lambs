import React from 'react';

import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import { millisecondToDuration } from '../../utils';

const Ranking = props => {
  const {
    topRankList,
    rankList,
    rankingPage,
    userName,
    onNextButtonClick,
    onPrevButtonClick
  } = props;

  const topRankerRender = () => {
    if (!topRankList.length) {
      return;
    }
    const topRankerView = (item, rank) => (
      <div className='top-rank-view'>
        {
          item.name === userName
          ? <img
              src={process.env.PUBLIC_URL + '/images/new_icon.png'}
              alt='newIcon'
              className='new-icon'
            />
          : null
        }
        <div className='top-rank-number'>
          <span>{rank}</span>
        </div>
        <div className='top-rank-name'>{item.name}</div>
        <div className='top-rank-score'>
          {millisecondToDuration(item.total_time)}
        </div>
      </div>
    );

    return (
      <div className='top-rank'>
        <div className='rank-first'>
          {topRankerView(topRankList[0], 1)}
        </div>
        <div className='top-rank-bottom'>
          <div className='rank-second'>
            {topRankList[1] ? topRankerView(topRankList[1], 2) : null}
          </div>
          <div className='rank-third'>
            {topRankList[2] ? topRankerView(topRankList[2], 3) : null}
          </div>
        </div>
      </div>
    );
  };

  const rankListRender = () => {
    return rankList.map((rank, i) => {
      const listItemClassName = rank.name === userName ? 'highlight' : '';
      return (
        <li key={i}>
          <div className={`rank-list-item ${listItemClassName}`}>
            <div className='rank-number'>
              {
                rank.name === userName
                ? <img
                    src={process.env.PUBLIC_URL + '/images/new_icon.png'}
                    alt='newIcon'
                    className='new-icon'
                  />
                : null
              }
              <span>{rankingPage * 7 - 3 + i}</span>
            </div>
            <div>{rank.name}</div>
            <div className='rank-score'>
              {millisecondToDuration(rank.total_time)}
            </div>
          </div>
          <hr className='div-line' />
        </li>
      );
    })
  };

  const emptyListRender = () => {
    const emptyLine = [];
    for (let i = 0; i < 7 - rankList.length; i++) {
      emptyLine.push(
        <li key={i + rankList.length}>
          <div className={'rank-list-item'} />
          <hr className='div-line' />
        </li>
      )
    }
    return emptyLine;
  };

  return (
    <div className='rank-container'>
      <div className='top-ranker-container'>
        {topRankerRender()}
      </div>
      <div className='rank-list'>
        <div className='rank-pagination'>
          <div><FaRegArrowAltCircleLeft  onClick={onPrevButtonClick} /></div>
          <div><FaRegArrowAltCircleRight onClick={onNextButtonClick} /></div>
        </div>
        <ol>
          {rankListRender()}
          {emptyListRender()}
        </ol>
      </div>
    </div>
  );
};

export default Ranking;
