import React from 'react';
import { FaWindowClose, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';

const Tutorial = props => {
  const {
    closeModal,
    onModalBodyClick,
    step,
    description,
    gifImage,
    prevTutorialButtonClick,
    nextTutorialButtonClick
  } = props;

  return (
    <div
      className='tutorial-back'
      onClick={closeModal}
      role='button'
      tabIndex='0'
    >
      <div
        className='tutorial-modal'
        onClick={event => onModalBodyClick(event)}
        role='button'
        tabIndex='0'
      >
        <div className='tutorial-top'>
          <div className='tutorial-title'>
            <span>Tutorial</span>
          </div>
          <div className='tutorial-close'>
            <FaWindowClose onClick={closeModal} />
          </div>
        </div>
        <div className='tutorial-video'>
          <img src={gifImage} alt={step} />
        </div>
        <div className='tutorial-bottom'>
          <div className='tutorial-comment'>
            <div className='tutorial-comment-step'>
              {`STEP ${step}.`}
            </div>
            <div>
              {description}
            </div>
          </div>
          <div className='tutorial-page'>
            <FaRegArrowAltCircleLeft
              className='prev-tutorial-button'
              onClick={prevTutorialButtonClick}
            />
            <FaRegArrowAltCircleRight
              className='next-tutorial-button'
              onClick={nextTutorialButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
