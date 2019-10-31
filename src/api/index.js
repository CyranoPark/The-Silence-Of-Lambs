import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APP_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
};

firebase.initializeApp(config);

export const postScore = (name, timestamp, clearTime, deathCount, difficulty, score) => {
  return firebase.database().ref('scores/' + name).set({
    name,
    created_at : timestamp,
    clear_time : clearTime,
    death_count : deathCount,
    difficulty,
    score
  });
};

export const getScores = () => {
  return firebase.database().ref('scores').once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};

export const checkValidUserName = name => {
  return firebase.database().ref('scores/' + name).once('value')
  .then(function(snapshot) {
    if (snapshot.val()) {
      return false;
    }
    return true;
  });
};
