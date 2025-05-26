function init() {
  offset = 0;
  allPokemons = [];
  loadPokemonsWithDetail();
}

function showPokemonDetail(index) {
  let pokemon = allPokemons[index];
  let detailsRef = document.getElementById('pokemon-detailed-information-section');
  detailsRef.innerHTML = pokemonDetailCardHtml(pokemon);
  document.getElementById('pokemon-detailed-information').classList.remove('d-none');
}

function togglePokemonInfo() {
  let toggle = document.getElementById('pokemon-detailed-information');
  toggle.classList.toggle('d-none');
}

function loadMore() {
  offset += limit;
  if (offset >= 151) {
    return;
  }
  loadPokemonsWithDetail();
}

function addMorePokemons(pokemons) {
  for (let i = 0; i < pokemons.length; i++) {
    allPokemons.push(pokemons[i]);
  }
}

function renderPokemons(pokemons) {
  let PokemonImgRef = document.getElementById('content');
  let loadMoreBtnRef = document.getElementById('loadMoreBtn')
  loadMoreBtnRef.innerHTML = '';
  PokemonImgRef.innerHTML = '';

  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    let allIndex = -1;
    for (let index = 0; index < allPokemons.length; index++) {
      if (allPokemons[index].name === pokemon.name) {
        allIndex = index;
        break;
      }
    }
    PokemonImgRef.innerHTML += pokemonCardHtml(pokemon, allIndex);
  }

  loadMoreBtnRef.innerHTML += LoadMorePokemons();
}

function eventBubbling(event) {
  event.stopPropagation();
}

function showLoader() {
  document.getElementById('loader').classList.remove('d-none');
}
function hideLoader() {
  document.getElementById('loader').classList.add('d-none');
}

function searchPokemon() {
  let input = document.getElementById('searchInput');
  let searchTerm = input.value.toLowerCase();
  let filteredPokemons = [];
  for (let i = 0; i < allPokemons.length; i++) {
    if (allPokemons[i].name.toLowerCase().includes(searchTerm)) {
      filteredPokemons.push(allPokemons[i]);
    }
  }
  renderPokemons(filteredPokemons);
}

function pokemonPush(pokemons, pokemon, details, types, gender, weight, number) {
  pokemons.push({
    name: pokemon.name,
    image: details.sprites.other.dream_world.front_default,
    types: types,
    genderRate: gender,
    weight: weight,
    number: number,
  });
}