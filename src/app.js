import badMoodPhrases from './phrases.js';
import initClock from './scripts/initClock.js';
import randomPhrase from './scripts/randomPhrase.js';

function App () {
  const domPhrase = document.querySelector('.phrase');
  domPhrase.innerText = randomPhrase(badMoodPhrases);

  const domClock = document.querySelector('.clock');
  initClock(domClock);
}
App();
