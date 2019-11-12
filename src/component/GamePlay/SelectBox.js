import React from 'react';

const SelectBox = props => {
  const stopEvent = (event) => {
    event.stopPropagation();
  }
  return (
    <div className='select-box' onClick={stopEvent}>
      <div>어떤 행동을 하시겠습니까?</div>
      <div className='select-button-wrap'>
        <button onClick={props.onKillButtonClick}>죽인다.</button>
        <button onClick={props.onHintOpenButtonClick}>힌트를 받는다.</button>
      </div>
    </div>
  )
};

export default SelectBox;
