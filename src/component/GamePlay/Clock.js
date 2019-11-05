import React from 'react';


const Clock = props => {
  return (
      <div className='play-time'>
        <div className="clock">
          <p className="clock-title">TIME</p>
          <p className="time">{props.time}</p>
        </div>
      </div>
  )
};

export default Clock;
