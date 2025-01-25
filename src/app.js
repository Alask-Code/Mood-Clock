import badMoodPhrases from './phrases.js';
import initClock from './scripts/initClock.js';
import initDate from './scripts/initDate.js';
import randomPhrase from './scripts/randomPhrase.js';
import initTodo from './scripts/initTodo.js';
import initPomodoro from './scripts/initPomodoro.js';

function App () {
  const domTodo = document.querySelector('.todo');
  initTodo(domTodo);

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
  setInterval(() => { domPhrase.click(); }, 1000 * 60 * 2.5);

  const domPomodoro = document.querySelector('.pomodoro-timer');
  initPomodoro(domPomodoro);
}
App();
