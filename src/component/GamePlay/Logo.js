import React from 'react';

const Logo = props => {
  return (
    <div className='top-logo'>
      <div>The Silence Of Lambs</div>
      <div>USER : {props.userName}</div>
    </div>
  )
};

export default Logo;
