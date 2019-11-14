import React from 'react';

const Logo = ({ userName }) => (
  <div className='top-logo'>
    <div>The Silence Of Lambs</div>
    <div>
      {`USER : ${userName}`}
    </div>
  </div>
);

export default Logo;
