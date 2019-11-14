import React from 'react';

const MissionCompleteModal = ({ onModalClick, onGoToResultClick }) => (
  <div
    className='mission-complete-modal'
    onClick={onModalClick}
    role='button'
    tabIndex='0'
  >
    <div>
      <h2>Congratulation!</h2>
      <h2>Mission Complete!</h2>
      <div>
        <button
          onClick={onGoToResultClick}
          tabIndex='0'
          type='button'
        >
          결과 화면 보기
        </button>
      </div>
    </div>
  </div>
);

export default MissionCompleteModal;
