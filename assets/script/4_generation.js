let offset = 386;
let limit = 25;

function init() {
  offset = 386;
  allPokemons = [];
  loadPokemonsWithDetail();
}

async function loadPokemonsWithDetail() {
  showLoader();
  let remaining = 493 - offset;
  let currentLimit = limit;
  if (remaining < limit) {
    currentLimit = remaining;
  }
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${currentLimit}&offset=${offset}`);
  let responseToJson = await response.json();
  const pokemons = [];
  await renderPokemonStats(pokemons, responseToJson);
  addMorePokemons(pokemons); //füllt Pokemon mit limit = Zahl
  renderPokemons(allPokemons);
  await new Promise((resolve) => setTimeout(resolve, 1100));
  hideLoader();
    if (offset + currentLimit >= 493) {
    document.getElementById('loadMoreBtn').classList.add('d-none');
  }
}

function loadMore() {
  offset += limit;
  if (offset >= 493) {
    return;
  }
  loadPokemonsWithDetail();
}
