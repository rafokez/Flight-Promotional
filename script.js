const amadeus = require('amadeus');

const amadeusClient = new amadeus.Client({
  clientId: 'YAlaZGKGvim8YUHyFB8rVVhHyn6ATcs5',
  clientSecret: '1uYeaSO2zAfveFRM',
});

const passagensDiv = document.querySelector('.passagens');

async function getPassagens() {
  try {
    const token = await amadeusClient.token();
    const response = await amadeusClient.shopping.flightOffersSearch.get({
      originLocationCode: 'MAD',
      destinationLocationCode: 'PAR',
      departureDate: '2023-03-01',
      returnDate: '2023-03-08',
      adults: 1,
    });

    const passagens = response.data;

    passagensDiv.innerHTML = '';

    passagens.forEach((passagem) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const imagem = document.createElement('img');
      imagem.src = 'https://picsum.photos/200/300'; // Imagem de exemplo
      card.appendChild(imagem);

      const titulo = document.createElement('h2');
      titulo.textContent = `${passagem.itineraries[0].segments[0].departure.iataCode} - ${passagem.itineraries[0].segments[0].arrival.iataCode}`;
      card.appendChild(titulo);

      const preco = document.createElement('p');
      preco.textContent = `Preço: ${passagem.price.total} ${passagem.price.currency}`;
      card.appendChild(preco);

      const data = document.createElement('p');
      data.textContent = `Data: ${passagem.itineraries[0].segments[0].departure.date}`;
      card.appendChild(data);

      const companhia = document.createElement('p');
      companhia.textContent = `Companhia: ${passagem.itineraries[0].segments[0].carrierCode}`;
      card.appendChild(companhia);

      const botao = document.createElement('button');
      botao.textContent = 'Comprar';
      card.appendChild(botao);

      passagensDiv.appendChild(card);
    });
  } catch (error) {
    console.error('Erro ao buscar passagens: ', error);
  }
}

getPassagens();