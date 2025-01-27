export default function initDate (dateElement) {
  const date = new Date().toLocaleDateString(
    'pt-BR',
    {
      day: '2-digit',
      weekday: 'long',
      month: 'long',
      year: 'numeric'

    }
  );
  dateElement.innerHTML = date;
  setInterval(() => {
    dateElement.innerHTML = date;
  }, 2500);
}
