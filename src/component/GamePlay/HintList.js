import React from 'react';

const HintList = ({ hintMessages }) => {
  const hintListRender = () => (
    hintMessages.map((hint, i) => <li key={i}>{hint}</li>)
  );

  return (
    <div className='hint'>
      Hint
      <ul className='hint-list'>
        {hintListRender()}
      </ul>
    </div>
  );
};

export default HintList;
