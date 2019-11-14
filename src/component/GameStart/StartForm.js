import React from 'react';

const StartForm = props => {
  const {
    userName,
    isValidName,
    onUserNameInputChange,
    onRankingButtonClick,
    onTutorialButtonClick,
    onUserNameSubmit
  } = props;

  const renderValidateMessage = () => {
    if (!isValidName) {
      return (
        <>
          <div>이미 사용된 이름입니다.</div>
          <div>다른 이름을 사용해주세요</div>
        </>
      );
    }
  };

  return (
    <>
      <div className='tutorial-button-wrap'>
        <button
          type='button'
          className='ranking-open-button'
          onClick={onRankingButtonClick}
        >
          랭킹보기
        </button>
        <button
          type='button'
          className='tutorial-open-button'
          onClick={onTutorialButtonClick}
        >
          게임설명
        </button>
      </div>
      <form
        className='start-form'
        onSubmit={event => onUserNameSubmit(event)}
      >
        <div>
          <h2>
            양치기의 이름을 결정해주세요
          </h2>
        </div>
        <div>
          <input
            type='text'
            value={userName}
            placeholder='거짓말쟁이 양치기'
            autoComplete='false'
            onChange={e => onUserNameInputChange(e.target.value)}
            required
          />
        </div>
        <div className='error-message'>
          {renderValidateMessage()}
        </div>
        <div>
          <input type='submit' value='START!' />
        </div>
      </form>
    </>
  );
};

export default StartForm;
