const updateInterval = 0.25; // Measured in seconds

function updateState (element) {
  const timestamp = new Date();

  element.innerText = timestamp
    .toTimeString()
    .split('GMT', 1);
}

export default function initClock (element) {
  updateState(element);
  setInterval(updateState, updateInterval * 1000, element);
}
