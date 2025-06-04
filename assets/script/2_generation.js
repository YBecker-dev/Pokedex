let offset = 151;
let limit = 25;

function init() {
  offset = 151;
  allPokemons = [];
  loadPokemonsWithDetail();
}

async function loadPokemonsWithDetail() {
  showLoader();
  let remaining = 251 - offset;
  let currentLimit = currentLimitPokemonLoaded(remaining, limit);
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${currentLimit}&offset=${offset}`);
  let responseToJson = await response.json();
  const pokemons = [];
  await renderPokemonStats(pokemons, responseToJson);
  addMorePokemons(pokemons);
  renderPokemons(allPokemons);
  await new Promise((resolve) => setTimeout(resolve, 1100));
  hideLoader();
  hideLoadMoreButtonIfComplete(offset, currentLimit);
}

function loadMore() {
  offset += limit;
  if (offset >= 251) {
    return;
  }
  loadPokemonsWithDetail();
}

function hideLoadMoreButtonIfComplete(offset, currentLimit) {
  if (offset + currentLimit >= 251) {
    document.getElementById('loadMoreBtn').classList.add('d-none');
  }
}
