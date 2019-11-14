import React from 'react';
import { millisecondToDuration } from '../../utils';

const Score = props => {
  const {
    userName,
    clearTime,
    deathCount,
    deathPenalty,
    score
  } = props;

  return (
    <div className='score-container'>
      <h2>TOTAL SCORE</h2>
      <table className='result-table'>
        <tbody>
          <tr>
            <td>NAME</td>
            <td className='score-value'>{userName}</td>
          </tr>
          <tr>
            <td>CLEAR TIME</td>
            <td className='score-value'>
              {millisecondToDuration(clearTime)}
            </td>
          </tr>
          <tr>
            <td>LAMB DEATH</td>
            <td className='score-value'>{deathCount}</td>
          </tr>
          <tr>
            <td>DEATH PENALTY</td>
            <td className='score-value'>
              {millisecondToDuration(deathPenalty)}
            </td>
          </tr>
          <tr>
            <td>TOTAL</td>
            <td className='score-value'>
              {millisecondToDuration(score)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Score;
