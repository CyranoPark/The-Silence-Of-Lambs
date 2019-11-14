import '../../setupTests';
import React from 'react';
import { shallow } from 'enzyme';

import Clock from './Clock';
import HintList from './HintList';
import Logo from './Logo';
import MissionCompleteModal from './MissionCompleteModal';
import RockPaperScissors from './RockPaperScissors';

describe('component Test', () => {
  describe('<Clock />', () => {
    let time = '10:00:00';
    let wrapper = shallow(<Clock time={time} />);

    it('should render title', () => {
      expect(wrapper.find('.clock-title').text()).toBe('TIME');
    });
    it('should render time text', () => {
      expect(wrapper.find('.time').text()).toBe(time);
    });
    it('should render another time text', () => {
      time = '09:00:00';
      wrapper = shallow(<Clock time={time} />);
      expect(wrapper.find('.time').text()).toBe(time);
    });
  });

  describe('<HintList />', () => {
    const hintMessages = ['a', 'b', 'c'];
    let wrapper = shallow(<HintList hintMessages={hintMessages} />);

    it('should render hint list', () => {
      expect(wrapper.find('.hint-list').children().length).toBe(3);
      expect(wrapper.find('.hint-list').childAt(0).text()).toBe('a');
    });
    it('should render added hint list item', () => {
      hintMessages.push('d');
      wrapper = shallow(<HintList hintMessages={hintMessages} />);
      expect(wrapper.find('.hint-list').children().length).toBe(4);
      expect(wrapper.find('.hint-list').childAt(3).text()).toBe('d');
    });
  });

  describe('<Logo />', () => {
    let userName = 'test';
    let wrapper = shallow(<Logo userName={userName} />);

    it('should render logo', () => {
      expect(wrapper.find('.top-logo').childAt(0).text()).toBe('The Silence Of Lambs');
    });
    it('should render time text', () => {
      expect(wrapper.find('.top-logo').childAt(1).text().indexOf(userName) + 1).toBeTruthy();
    });
    it('should render another time text', () => {
      userName = 'code';
      wrapper = shallow(<Logo userName={userName} />);
      expect(wrapper.find('.top-logo').childAt(1).text().indexOf(userName) + 1).toBeTruthy();
    });
  });

  describe('<MissionCompleteModal />', () => {
    const onModalClick = jest.fn();
    const onGoToResultClick = jest.fn();
    const wrapper = shallow(
      <MissionCompleteModal
        onModalClick={onModalClick}
        onGoToResultClick={onGoToResultClick}
      />
    );

    it('should render message', () => {
      expect(wrapper.find('.mission-complete-modal > div').childAt(0).text()).toBe('Congratulation!');
      expect(wrapper.find('.mission-complete-modal > div').childAt(1).text()).toBe('Mission Complete!');
    });
    it('should exacute click event when modal clicked', () => {
      wrapper.find('.mission-complete-modal').simulate('click');
      expect(onModalClick).toHaveBeenCalled();
    });
    it('should exacute click event when button clicked', () => {
      wrapper.find('.mission-complete-modal button').simulate('click');
      expect(onGoToResultClick).toHaveBeenCalled();
    });
  });

  describe('<RockPaperScissors />', () => {
    const gameResult = null;
    const hintMessages = null;
    const submittedByUser = 0;
    const submittedByLamb = 1;
    const onRestartButtonClick = jest.fn();
    const wrapper = shallow(
      <RockPaperScissors
        gameResult={gameResult}
        hintMessages={hintMessages}
        submittedByUser={submittedByUser}
        submittedByLamb={submittedByLamb}
        onRestartButtonClick={onRestartButtonClick}
      />
    );

    it('should render modal', () => {
      expect(wrapper.find('.rockPaperScissors-modal').length).toBe(1);
    });
    it('should be rendered selection div before end game', () => {
      expect(wrapper.find('.rockPaperScissors').length).toBe(1);
      expect(wrapper.find('.rockPaperScissors-icon').length).toBe(3);
    });
    it('should be rendered hint message when win the game', () => {
      wrapper.setProps({
        gameResult: 'WIN',
        hintMessages: ['hint']
      });
      expect(wrapper.find('.hint-container').length).toBe(1);
      expect(wrapper.find('.hint-container > div').text()).toBe('hint');
    });
    it('should be rendered restart button when draw the game', () => {
      wrapper.setProps({
        gameResult: 'DRAW'
      });
      expect(wrapper.find('.hint-restart-button').length).toBe(1);

      wrapper.find('.hint-restart-button').simulate('click');
      expect(onRestartButtonClick).toHaveBeenCalled();
    });
    it('should be rendered failed message when lose the game', () => {
      wrapper.setProps({
        gameResult: 'LOSE'
      });
      expect(wrapper.find('.hint-container').text().indexOf('없어') + 1).toBeTruthy();
    });
  });
});
