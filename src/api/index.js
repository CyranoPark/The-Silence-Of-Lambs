import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APP_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
};

firebase.initializeApp(config);

export const postScore = (name, timestamp, clearTime, deathCount, totalTime) => {
  const newRef = firebase.database().ref('scores').push();
  return newRef.set({
    name,
    created_at: timestamp,
    clear_time: clearTime,
    death_count: deathCount,
    total_time: totalTime
  });
};

export const getScores = (limit, start) => {
  return firebase.database().ref('scores')
    .orderByChild('total_time')
    .startAt(start)
    .limitToFirst(limit)
    .once('value')
    .then(snapshot => {
      if (!snapshot.val()) {
        return [];
      }
      const scores = Object.values(snapshot.val());
      scores.sort((a, b) => a.total_time - b.total_time);
      return scores;
    });
};

export const getPrevScores = (limit, end) => {
  return firebase.database().ref('scores')
    .orderByChild('total_time')
    .endAt(end)
    .limitToLast(limit)
    .once('value')
    .then(snapshot => {
      if (!snapshot.val()) {
        return [];
      }
      const scores = Object.values(snapshot.val());
      scores.sort((a, b) => a.total_time - b.total_time);
      return scores;
    });
};

export const checkValidUserName = name => {
  return firebase.database().ref('scores')
    .orderByChild('name')
    .equalTo(name)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        return false;
      }
      return true;
    });
};
