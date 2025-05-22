

let allPokemons = [];

function init() {
  loadPokemonsWithDetail();
}

const loadPokemonsWithDetail = async () => {
  let response = await fetch(POKE_API_POKEMONS);
  let responseToJson = await response.json();
  let pokemons = await Promise.all(
    responseToJson.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const details = await response.json();
      return {
        name: pokemon.name,
        image: details.sprites.front_default,
        types: details.types.map((t) => t.type.name),
      };
    })
  );
  allPokemons = pokemons;
  renderPokemons(pokemons);
};

function renderPokemons(pokemons) {
  let PokemonImgRef = document.getElementById('content');
  PokemonImgRef.innerHTML = '';

  for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    PokemonImgRef.innerHTML += pokemonCardHtml(pokemon, i)
  }
}

function showPokemonDetail(index) {
  let pokemon = allPokemons[index];
  let detailsRef = document.getElementById('pokemon-detailed-information-section');
  detailsRef.innerHTML = pokemonDetailCardHtml(pokemon);
  document.getElementById('pokemon-detailed-information').classList.remove('d-none');
  document.getElementById('pokemon-detailed-information-header').addEventListener('click', function (event) {
    event.stopPropagation();
  });
}

function togglePokemonInfo() {
  let toggle = document.getElementById('pokemon-detailed-information');
  toggle.classList.toggle('d-none');
}
