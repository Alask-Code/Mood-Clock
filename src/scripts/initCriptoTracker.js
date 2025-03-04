const POOL_INTERVAL = 2.5;

function fetchCriptoData () {
  const $ = (b32S) => atob(b32S);
  return fetch('https://rest.coinapi.io/v1/exchangerate/BTC/BRL', {
    headers: {
      'X-CoinAPI-Key': $('MzQ3MjI0ZjQtNDQwZi00ZTcwLWI3MzctNDRlOTRmOGUyM2Q4')
    }
  }).then((res) => res.json());
}
function UpdateState (elementTree, data) {
  const { title, price, image } = elementTree;
  title.innerText = 'Bitcoin';
  price.innerText = Number(data.rate).toLocaleString('pt-BR', {
    currency: 'brl',
    style: 'currency'
  });
  image.style.backgroundImage =
    'url("https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_256/4caf2b16a0174e26a3482cea69c34cba.png")';
}

export default async function initCriptoTracker (criptoTrackerElement) {
  const domObjects = {
    image: criptoTrackerElement.querySelector('.img'),
    title: criptoTrackerElement.querySelector('.info .title'),
    price: criptoTrackerElement.querySelector('.info .price')
  };
  const data = await fetchCriptoData();
  UpdateState(domObjects, data);
  criptoTrackerElement.classList.remove('disabled');
  setInterval(async () => {
    const data = await fetchCriptoData();
    UpdateState(domObjects, data);
  }, 1000 * 60 * POOL_INTERVAL);
}
