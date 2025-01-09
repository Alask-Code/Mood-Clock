import badMoodPhrases from './phrases.js';
import initClock from './scripts/initClock.js';
import initDate from './scripts/initDate.js';
import randomPhrase from './scripts/randomPhrase.js';
import initTodo from './scripts/initTodo.js';

function App () {
  const domDate = document.querySelector('.date');
  initDate(domDate);

  const domClock = document.querySelector('.clock');
  initClock(domClock);

  const domPhrase = document.querySelector('.phrase');
  domPhrase.innerText = randomPhrase(badMoodPhrases);

  const domNotes = document.querySelector('.notes');
  initTodo(domNotes);

  domPhrase.onclick = () => {
    domPhrase.classList.toggle('animate');
    setTimeout(() => {
      domPhrase.innerText = randomPhrase(badMoodPhrases);
    }, 250);
    setTimeout(() => {
      domPhrase.classList.toggle('animate');
    }, 500);
  };

  setInterval(() => { domPhrase.click(); }, 1000 * 60 * 5);

  if (!window.process) {
    document.body.style.background = "url('https://picsum.photos/id/17/1920/1080')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backdropFilter = 'blur(12px) contrast(180%) brightness(20%)';
  };
}
App();
