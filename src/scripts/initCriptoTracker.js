const POOL_INTERVAL = 2.5;

function fetchCriptoData () {
  const $ = (b32S) => atob(b32S);
  return fetch('https://rest.coinapi.io/v1/exchangerate/BTC/BRL', {
    headers: {
      'X-CoinAPI-Key': $('NmRjMzg0NDMtZDkwMC00NzQ5LWJkYWQtZTNkMzU4ZWE1MWVm')
    }
  }).then(res => res.json());
}
function UpdateState (elementTree, data) {
  const { title, price, image } = elementTree;
  title.innerText = 'Bitcoin';
  price.innerText = `R$ ${data.rate.toFixed(2)}`;
  image.style.backgroundImage = 'url("https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_256/4caf2b16a0174e26a3482cea69c34cba.png")';
}

export default async function initCriptoTracker (element) {
  const domObjects = {
    image: element.querySelector('.img'),
    title: element.querySelector('.info .title'),
    price: element.querySelector('.info .price')
  };
  const data = await fetchCriptoData();
  UpdateState(domObjects, data);
  setInterval(async () => {
    const data = await fetchCriptoData();
    UpdateState(domObjects, data);
  }, 1000 * 60 * POOL_INTERVAL);
}
