import React from 'react';

const StartForm = props => {
  const { userName, isValidName, onUserNameInputChange } = props;

  const renderValidateMessage = () => {
    if (!isValidName) {
      return (
        <>
          <div>이미 사용된 이름입니다.</div>
          <div>다른 이름을 사용해주세요</div>
        </>
      );
    }
  }

  return (
    <div className='start-form-modal' >
      <form
        className='start-form'
        onSubmit={(event) => props.onUserNameSubmit(event)}
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
    </div>
  );
};

export default StartForm;
