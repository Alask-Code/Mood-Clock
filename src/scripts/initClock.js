export default function initClock (element) {
  setInterval(() => {
    const timestamp = new Date();
    element.innerText = timestamp.toTimeString().split('GMT', 1);
  }, 250);
}
