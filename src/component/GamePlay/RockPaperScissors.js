import React from 'react';
import {
  WIN,
  DRAW,
  LOSE,
  rockPaperScissorsItem
} from '../../constants/game';

const rockPaperScissors = props => {
  const stopEvent = event => {
    event.stopPropagation();
  };

  const beforeStartGameRender = () => {
    return(
      <>
        <div>가위 바위 보를 이기면 늑대를 찾는 힌트를 줄게</div>
        <div>셋 중에 하나를 선택해</div>
        <div className='rockPaperScissors'>
          <div className='user-select'>
            <div>
              <img
                src={process.env.PUBLIC_URL + '/images/rock.png'}
                alt='rockPaperScissors'
                className='rockPaperScissors-icon'
                onClick={() => props.onImageClick(0)}
              />
            </div>
            <div>
              <img
                src={process.env.PUBLIC_URL + '/images/scissors.png'}
                alt='rockPaperScissors'
                className='rockPaperScissors-icon'
                onClick={() => props.onImageClick(1)}
              />
            </div>
            <div>
              <img
                src={process.env.PUBLIC_URL + '/images/paper.png'}
                alt='rockPaperScissors'
                className='rockPaperScissors-icon'
                onClick={() => props.onImageClick(2)}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const afterGetResultGameRender = () => {
    const {
      submittedByUser,
      submittedByLamb,
      gameResult
    } = props;
    return (
      <>
        <div className='rockPaperScissors-result'>
          <div className='user-board'>
            <img
              src={process.env.PUBLIC_URL + `/images/${rockPaperScissorsItem[submittedByUser].toLowerCase()}.png`}
              alt='rockPaperScissors'
              className='rockPaperScissors-icon'
              onClick={() => props.onImageClick(2)}
            />
          </div>
          <div className='game-result'>
            {gameResult}
          </div>
          <div className='lamb-board'>
            <img
              src={process.env.PUBLIC_URL + `/images/${rockPaperScissorsItem[submittedByLamb].toLowerCase()}.png`}
              alt='rockPaperScissors'
              className='rockPaperScissors-icon-reverse'
              onClick={() => props.onImageClick(2)}
            />
          </div>
        </div>
        {hintMessageRender()}
      </>
    );
  };

  const hintMessageRender = () => {
    const { gameResult, hintMessages, onRestartButtonClick } = props;
    switch (gameResult) {
      case WIN:
        return (
          <div className='hint-container'>
            <div>{hintMessages[hintMessages.length - 1]}</div>
          </div>
        );

      case DRAW:
        return (
          <div className='hint-container'>
            <div>비겼엉 이자식아</div>
            <button
              onClick={onRestartButtonClick}
            >
              다시 하기
            </button>
          </div>
        )
      case LOSE:
        return <div>힌트는 없어 이자식아</div>
      default:
        return <div>비겼엉 이자식아</div>
    }
  };

  return (
    <div
      className='rockPaperScissors-modal'
      onClick={stopEvent}
      onMouseMove={stopEvent}
    >
      {
        props.gameResult
        ? afterGetResultGameRender()
        : beforeStartGameRender()
      }
    </div>
  )
};

export default rockPaperScissors;
