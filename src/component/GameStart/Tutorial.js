import React from 'react';
import { FaWindowClose } from "react-icons/fa";

const Tutorial = props => {
  return (
    <div className='tutorial-back'>
      <div className='tutorial-modal'>
        <div className='tutorial-top'>
          <div className='tutorial-title'>
            <span>Tutorial</span>
          </div>
          <div className='tutorial-close'>
            <FaWindowClose />
          </div>
        </div>
        <div className='tutorial-video'></div>
        <div className='tutorial-bottom'>
          <div className='tutorial-comment'></div>
          <div className='tutorial-page'></div>
        </div>
      </div>
    </div>
  )
};

export default Tutorial;
