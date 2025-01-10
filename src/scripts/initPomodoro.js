export default function initPomodoro (element) {
  const startPauseButton = element.querySelector('.controls .start');
  const restartButton = element.querySelector('.controls .reset');
  const timer = element.querySelector('.remaining');
  const closePomodoro = element.querySelector('.label');

  const initialTime = [25, 0];
  let timingOperator = [...initialTime];
  let isPomodoroRunning = false;
  let intervalFunction = null;

  function formatTime ([minutes, seconds]) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function updateTimerDisplay () {
    timer.textContent = formatTime(timingOperator);
  }

  function resetTimerState () {
    clearInterval(intervalFunction);
    intervalFunction = null;
    isPomodoroRunning = false;
    timingOperator = [...initialTime];
    updateTimerDisplay();
    startPauseButton.querySelector('.ph.ph-play').classList.remove('hidden');
    startPauseButton.querySelector('.ph.ph-pause').classList.add('hidden');
  }

  function timerFunction () {
    if (timingOperator[1] === 0) {
      if (timingOperator[0] === 0) {
        alert('O tempo acabou!');
        resetTimerState();
        return;
      } else {
        timingOperator[0]--;
        timingOperator[1] = 59;
      }
    } else {
      if (timingOperator[0] === 0 && timingOperator[1] === 1) {
        const audio = new Audio();
        audio.src = 'assets/audio/timer-end.mp3';
        audio.play();
      }
      timingOperator[1]--;
    }
    updateTimerDisplay();
  }

  function handleStartPlayPause () {
    const playIcon = startPauseButton.querySelector('.ph.ph-play');
    const pauseIcon = startPauseButton.querySelector('.ph.ph-pause');
    playIcon.classList.toggle('hidden');
    pauseIcon.classList.toggle('hidden');

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
    resetTimerState();
  }

  startPauseButton.onclick = () => handleStartPlayPause();
  restartButton.onclick = () => resetTimer();
  closePomodoro.onclick = () => {
    element.querySelector('.timer').classList.toggle('hidden');
    console.log('aa');
  };

  updateTimerDisplay();
}
