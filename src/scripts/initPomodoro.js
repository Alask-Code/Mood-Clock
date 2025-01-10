export default function initPomodoro (element) {
  const startPauseButton = element.querySelector('.controls .start');
  const restartButton = element.querySelector('.controls .reset');
  const timer = element.querySelector('.remaining');

  const initialTime = [0, 10];
  let timingOperator = initialTime;
  let isPomodoroRunning = false;
  let intervalFunction = null;

  function formatTime ([minutes, seconds]) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function updateTimerDisplay () {
    timer.textContent = formatTime(timingOperator);
  }

  function timerFunction () {
    if (timingOperator[1] === 0) {
      if (timingOperator[0] === 0) {
        clearInterval(intervalFunction);
        intervalFunction = null;
        isPomodoroRunning = false;

        alert('O tempo acabou!');
        return;
      } else {
        timingOperator[0]--;
        timingOperator[1] = 59;
      }
    } else {
      timingOperator[1]--;
    }
    updateTimerDisplay();
  }

  function handleStartPlayPause () {
    startPauseButton.querySelector('.start .ph.ph-play').classList.toggle('hidden');
    startPauseButton.querySelector('.start .ph.ph-pause').classList.toggle('hidden');

    if (!isPomodoroRunning) {
      isPomodoroRunning = true;
      intervalFunction = setInterval(timerFunction, 1000);
    } else {
      isPomodoroRunning = false;
      clearInterval(intervalFunction);
      intervalFunction = null;
    }
  }

  function resetTimer () {
    clearInterval(intervalFunction);
    intervalFunction = null;
    isPomodoroRunning = false;
    timingOperator = initialTime;
    updateTimerDisplay();
    startPauseButton.querySelector('.start .ph.ph-play').classList.remove('hidden');
    startPauseButton.querySelector('.start .ph.ph-pause').classList.add('hidden');
  }

  startPauseButton.onclick = () => {
    handleStartPlayPause();
  };

  restartButton.onclick = () => {
    resetTimer();
  };

  const closePomodoroTimer = element.querySelector('.label');
  closePomodoroTimer.onclick = () => {
    element.querySelector('.timer').classList.toggle('hidden');
    if (isPomodoroRunning) {
      isPomodoroRunning = false;
      clearInterval(intervalFunction);
      intervalFunction = null;
    }
  };

  updateTimerDisplay();
}
