import React from 'react';

const SelectBox = ({ onKillButtonClick, onHintOpenButtonClick }) => {
  const stopEvent = event => {
    event.stopPropagation();
  };

  return (
    <div
      className='select-box'
      onClick={stopEvent}
      role='button'
      tabIndex='0'
    >
      <div>어떤 행동을 하시겠습니까?</div>
      <div className='select-button-wrap'>
        <button
          onClick={onKillButtonClick}
          tabIndex='0'
          type='button'
        >
          죽인다.
        </button>
        <button
          onClick={onHintOpenButtonClick}
          tabIndex='0'
          type='button'
        >
          힌트를 받는다.
        </button>
      </div>
    </div>
  );
};

export default SelectBox;
