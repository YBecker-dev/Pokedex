let offset = 0;
let limit = 10;

async function loadPokemonsWithDetail() {
  showLoader();
  let remaining = 151 - offset;
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
}

async function renderPokemonStats(pokemons, responseToJson) {
  for (let i = 0; i < responseToJson.results.length; i++) {
    let pokemon = responseToJson.results[i];
    let response = await fetch(pokemon.url);
    let details = await response.json();
    let gender = await getPokemonGender(pokemon.name);
    let weight = await getPokemonWeight(pokemon.name);
    let types = [];
    for (let index = 0; index < details.types.length; index++) {
      types.push(details.types[index].type.name);
    }
    pokemonPush(pokemons, pokemon, details, types, gender, weight, offset + i + 1);
  }
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

async function getPokemonWeight(name) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  let data = await response.json();
  return {
    height: data.height / 10 + ' m',
    weight: data.weight / 10 + ' kg',
  };
}

async function getPokemonGender(name) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  let data = await response.json();
  return data.gender_rate;
}

async function getPokemonDetails(pokemon) {
  let response = await fetch(pokemon.url);
  let details = await response.json();
  let types = [];
  for (let i = 0; i < details.types.length; i++) {
    types.push(details.types[i].type.name);
  }
  return {
    name: pokemon.name,
    image: details.sprites.front_default,
    types: types,
  };
}

