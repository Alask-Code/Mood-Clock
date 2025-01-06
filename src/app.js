import badMoodPhrases from './phrases.js';
import initClock from './scripts/initClock.js';
import initDate from './scripts/initDate.js';
import randomPhrase from './scripts/randomPhrase.js';

function App () {
  const domDate = document.querySelector('.date');
  initDate(domDate);
  const domClock = document.querySelector('.clock');
  initClock(domClock);

  const domPhrase = document.querySelector('.phrase');
  domPhrase.innerText = randomPhrase(badMoodPhrases);
}
App();
