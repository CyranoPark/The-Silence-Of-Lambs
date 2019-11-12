import React from 'react';
import { FaWindowClose, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

const Tutorial = props => {
  return (
    <div
      className='tutorial-back'
      onClick={props.closeModal}
    >
      <div className='tutorial-modal' onClick={(e) => props.onModalBodyClick(e)} >
        <div className='tutorial-top'>
          <div className='tutorial-title'>
            <span>Tutorial</span>
          </div>
          <div className='tutorial-close'>
            <FaWindowClose onClick={props.closeModal} />
          </div>
        </div>
        <div className='tutorial-video'></div>
        <div className='tutorial-bottom'>
          <div className='tutorial-comment'>
            <div className='tutorial-comment-step'>
              STEP 1.
            </div>
            <div>
              양들을 때려 잡는다.
            </div>
          </div>
          <div className='tutorial-page'>
            <FaRegArrowAltCircleLeft />
            <FaRegArrowAltCircleRight />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Tutorial;
