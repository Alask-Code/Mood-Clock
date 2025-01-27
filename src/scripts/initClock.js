const INTERVAL_SECONDS = 0.25;

function updateState (element) {
  const timestamp = new Date();

  element.innerText = timestamp
    .toTimeString()
    .split('GMT', 1);
}

export default function initClock (clockElement) {
  updateState(clockElement);
  setInterval(updateState, INTERVAL_SECONDS * 1000, clockElement);
}
