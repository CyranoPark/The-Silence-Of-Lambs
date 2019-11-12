import React from 'react';

const HintList = props => {
  const hintListRender = () => {
    return props.hintMessages.map((hint, i) => {
      return <li key={i}>{hint}</li>
    })
  }
  return (
    <div className='hint'>
      Hint
      <ul className='hint-list'>
        {hintListRender()}
      </ul>
    </div>
  )
};

export default HintList;
