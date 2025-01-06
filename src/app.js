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

  domPhrase.onclick = () => {
    domPhrase.classList.toggle('animate');
    setTimeout(() => {
      domPhrase.innerText = randomPhrase(badMoodPhrases);
    }, 250);
    setTimeout(() => {
      domPhrase.classList.toggle('animate');
    }, 500);
  };
  const isElectron = !!window.process;
  if (!isElectron) {
    document.body.style.background = 'rgb(58,58,58)';
  };
}
App();
