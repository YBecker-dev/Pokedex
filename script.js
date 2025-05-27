function initIndexHtml() {
  renderAllGenerationStarters();
}

function showPokemonDetail(index) {
  let pokemon = allPokemons[index];
  let detailsRef = document.getElementById('pokemon-detailed-information-section');
  detailsRef.innerHTML = pokemonDetailCardHtml(pokemon, index);
  document.getElementById('pokemon-detailed-information').classList.remove('d-none');
}

function togglePokemonInfo() {
  let toggle = document.getElementById('pokemon-detailed-information');
  toggle.classList.toggle('d-none');
}

function addMorePokemons(pokemons) {
  for (let i = 0; i < pokemons.length; i++) {
    allPokemons.push(pokemons[i]);
  }
}

function renderPokemons(allPokemons) {
  let PokemonImgRef = document.getElementById('content');
  let loadMoreBtnRef = document.getElementById('loadMoreBtn');
  loadMoreBtnRef.innerHTML = '';
  PokemonImgRef.innerHTML = '';

  for (let i = 0; i < allPokemons.length; i++) {
    let pokemon = allPokemons[i];
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


function nextPokemon(index) {
  let nextIndex = index + 1;
  if (nextIndex >= allPokemons.length) {
    nextIndex = 0;
  }
  let next = allPokemons[nextIndex];
  document.getElementById('pokemon-detailed-information-section').innerHTML = pokemonDetailCardHtml(next, nextIndex);
}

function previousPokemon(index) {
  let prevIndex = index - 1;
  if (prevIndex < 0) {
    prevIndex = allPokemons.length - 1;
  }
  let prev = allPokemons[prevIndex];
  document.getElementById('pokemon-detailed-information-section').innerHTML = pokemonDetailCardHtml(prev, prevIndex);
}
