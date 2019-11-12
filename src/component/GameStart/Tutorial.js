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
        <div className='tutorial-video'>
          <img src={props.gifImage} alt={props.step} />
        </div>
        <div className='tutorial-bottom'>
          <div className='tutorial-comment'>
            <div className='tutorial-comment-step'>
              STEP {props.step}.
            </div>
            <div>
              {props.description}
            </div>
          </div>
          <div className='tutorial-page'>
            <FaRegArrowAltCircleLeft onClick={props.prevTutorialButtonClick}/>
            <FaRegArrowAltCircleRight onClick={props.nextTutorialButtonClick} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Tutorial;
