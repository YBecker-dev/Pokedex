let lastClickedPokemonId = null;

function initIndexHtml() {
  renderAllGenerationStarters();
}

function showPokemonDetail(index) {
  let pokemon = allPokemons[index];
  lastClickedPokemonId = pokemon.name;
  let detailsRef = document.getElementById('pokemon-detailed-information-section');
  detailsRef.innerHTML = pokemonDetailCardHtml(pokemon, index);
  border(pokemon);
  document.getElementById('pokemon-detailed-information').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closePokemonInfo() {
  let close = document.getElementById('pokemon-detailed-information');
  close.classList.add('close-animate');
  setTimeout(function () {
    close.classList.add('d-none');
    close.classList.remove('close-animate');
  }, 100);
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
  renderPokemList(allPokemons, PokemonImgRef);  
  loadMoreBtnRef.innerHTML += LoadMorePokemons();
}

function renderPokemList(allPokemons, PokemonImgRef) {
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

async function searchPokemon() {
  showLoader();
  let input = document.getElementById('searchInput');
  let searchTerm = input.value.toLowerCase();
  let filteredPokemons = [];
  searchNameAndNumber(searchTerm, filteredPokemons);
  renderPokemons(filteredPokemons);
  hideLoader();
}

function searchNameAndNumber(searchTerm, filteredPokemons) {
  for (let i = 0; i < allPokemons.length; i++) {
    if (allPokemons[i].name.toLowerCase().includes(searchTerm)) {
      filteredPokemons.push(allPokemons[i]);
    }
    if (allPokemons[i].number.toString().includes(searchTerm)) {
      filteredPokemons.push(allPokemons[i]);
    }
  }
}

function changePokemon(index, direction) {
  let newIndex = index + direction;
  if (newIndex < 0) newIndex = allPokemons.length - 1;
  if (newIndex >= allPokemons.length) newIndex = 0;
  let pokemon = allPokemons[newIndex];
  document.getElementById('pokemon-detailed-information-section').innerHTML = pokemonDetailCardHtml(pokemon, newIndex);
  border(pokemon);
  animationPrevNextPokemon();
}

function animationPrevNextPokemon() {
  let detailDiv = document.getElementById('pokemon-detailed-information');
  detailDiv.classList.remove('pokemon-detail-animate');
  void detailDiv.offsetWidth;
  detailDiv.classList.add('pokemon-detail-animate');
}

function OpenMenu() {
  document.getElementById('toggle-menu-responsive').classList.remove('d-none');
  html = '';
  let toogleMenuRef = document.getElementById('toggle-menu-responsive');
  html += menuHtml();

  toogleMenuRef.innerHTML = html;
}

function closeMenu() {
  document.getElementById('toggle-menu-responsive').classList.add('d-none');
}

function border(pokemon) {
  detailedRef = document.getElementById('pokemon-detailed-information-header');
  for (let i = 0; i < pokemon.types.length; i++) {
    let type = pokemon.types[0];
    detailedRef.classList.add('border-' + type);
  }
}

function viewBack() {
  if (lastClickedPokemonId) {
    let card = document.getElementById(lastClickedPokemonId);
    if (card) {
      card.scrollIntoView({ block: 'center' });
    }
  }
}


// git add summit -m "add animation and border.css, change js code, responsiv changes, add some Infos, add speciel Pokemons," 