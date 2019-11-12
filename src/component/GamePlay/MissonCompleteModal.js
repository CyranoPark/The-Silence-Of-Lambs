import React from 'react';

const MissionCompleteModal = props => {
  return (
    <div
      className='mission-complete-modal'
      onClick={props.onModalClick}
    >
      <div>
        <h2>Congratulation!</h2>
        <h2>Mission Complete!</h2>
        <div>
          <button onClick={props.onGoToResultClick}>
            결과 화면 보기
          </button>
        </div>
      </div>
    </div>
  )
};

export default MissionCompleteModal;
