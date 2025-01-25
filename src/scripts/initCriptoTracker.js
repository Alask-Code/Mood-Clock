export default async function initCriptoTracker (element) {
  const data = await fetch('https://rest.coinapi.io/v1/exchangerate/BTC/BRL', {
    headers: {
      'X-CoinAPI-Key': '6dc38443-d900-4749-bdad-e3d358ea51ef'
    }
    // https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_32/4caf2b16a0174e26a3482cea69c34cba.png
  }).then(response => response.json());
  console.log(data);
}
