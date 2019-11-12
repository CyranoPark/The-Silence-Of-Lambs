import moment from 'moment';
import { rockPaperScissorsPair } from '../constants/game';

export const durationToMillisecond = duration => (
  moment.duration(duration).asMilliseconds()
);

export const millisecondToDuration = millisecond => (
  moment().minute(0).second(0).millisecond(millisecond).format('mm:ss:SS')
);

export const deathCountToPenaltyTime = count => (
  count * 1000 * 60
);

export const checkResultRockPaperScissorsGame = (user, lamb) => (
  rockPaperScissorsPair[user][lamb]
);
