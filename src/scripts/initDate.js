export default function initDate (element) {
  const date = new Date().toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      weekday: 'long',
      month: 'long',
      year: 'numeric'

    }
  );
  element.innerHTML = date;
  setInterval(() => {
    element.innerHTML = date;
  }, 2500);
}
