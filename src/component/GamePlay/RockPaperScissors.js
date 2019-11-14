import React from 'react';
import {
  WIN,
  DRAW,
  LOSE,
  rockPaperScissorsItem
} from '../../constants/game';

const rockPaperScissors = props => {
  const {
    gameResult,
    hintMessages,
    onRestartButtonClick,
    submittedByUser,
    submittedByLamb
  } = props;

  const stopEvent = event => {
    event.stopPropagation();
  };

  const renderBeforeStartGame = () => (
    <>
      <div>가위 바위 보를 이기면 늑대를 찾는 힌트를 줄게</div>
      <div>셋 중에 하나를 선택해</div>
      <div className='rockPaperScissors'>
        <div className='user-select'>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/images/rock.png`}
              alt='rockPaperScissors'
              className='rockPaperScissors-icon'
              onClick={() => props.onImageClick(0)}
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/images/scissors.png`}
              alt='rockPaperScissors'
              className='rockPaperScissors-icon'
              onClick={() => props.onImageClick(1)}
            />
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/images/paper.png`}
              alt='rockPaperScissors'
              className='rockPaperScissors-icon'
              onClick={() => props.onImageClick(2)}
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderAfterGetResultGame = () => (
    <>
      <div className='rockPaperScissors-result'>
        <div className='user-board'>
          <img
            src={`${process.env.PUBLIC_URL}/images/${rockPaperScissorsItem[submittedByUser].toLowerCase()}.png`}
            alt='rockPaperScissors'
            className='rockPaperScissors-icon'
          />
        </div>
        <div className='game-result'>
          {gameResult}
        </div>
        <div className='lamb-board'>
          <img
            src={`${process.env.PUBLIC_URL}/images/${rockPaperScissorsItem[submittedByLamb].toLowerCase()}.png`}
            alt='rockPaperScissors'
            className='rockPaperScissors-icon-reverse'
          />
        </div>
      </div>
      {renderHintMessage()}
    </>
  );

  const renderHintMessage = () => {
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
            <div>비겼엉... 다시 해볼래?</div>
            <button
              className='hint-restart-button'
              onClick={onRestartButtonClick}
              tabIndex='0'
              type='button'
            >
              다시 하기
            </button>
          </div>
        );

      case LOSE:
        return <div className='hint-container'>힌트는 없어 이자식아</div>;

      default:
        return (
          <div className='hint-container'>
            <div>비겼엉... 다시 해볼래?</div>
            <button
              className='hint-restart-button'
              onClick={onRestartButtonClick}
              tabIndex='0'
              type='button'
            >
              다시 하기
            </button>
          </div>
        );
    }
  };

  return (
    <div
      className='rockPaperScissors-modal'
      onClick={stopEvent}
      onMouseMove={stopEvent}
      role='button'
      tabIndex='0'
    >
      {
        gameResult
          ? renderAfterGetResultGame()
          : renderBeforeStartGame()
      }
    </div>
  );
};

export default rockPaperScissors;
