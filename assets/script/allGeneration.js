async function renderPokemonStats(pokemons, responseToJson) {
  for (let i = 0; i < responseToJson.results.length; i++) {
    let pokemon = responseToJson.results[i];
    let apiNameSpecies = getApiName(pokemon.name, true);
    let apiNamePokemon = getApiName(pokemon.name, false);
    let response = await fetch(pokemon.url);
    let details = await response.json();
    let gender = await getPokemonGender(apiNameSpecies);
    let weight = await getPokemonWeight(apiNamePokemon);
    let types = [];
    for (let index = 0; index < details.types.length; index++) {
      types.push(details.types[index].type.name);
    }
    pokemonPush(pokemons, pokemon, details, types, gender, weight, offset + i + 1);
  }
}

async function getPokemonWeight(apiName) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
  let data = await response.json();
  return {
    height: data.height / 10 + ' m',
    weight: data.weight / 10 + ' kg',
  };
}

async function getPokemonGender(apiName) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${apiName}`);
  let data = await response.json();
  return data.gender_rate;
}

async function getPokemonDetails(pokemon) {
  let baseName = pokemon.name.split('-')[0];
  let apiName = getApiName(baseName); // für besonder Pokemon die mit Bindestrich geschrieben sind
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
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

function getApiName(name, forSpecies = false) {
  if (name.startsWith('deoxys')) return forSpecies ? 'deoxys' : 'deoxys-normal';
  if (name.startsWith('wormadam')) return forSpecies ? 'wormadam' : 'wormadam-plant';
  if (name.startsWith('giratina')) return forSpecies ? 'giratina' : 'giratina-altered';
  if (name.startsWith('shaymin')) return forSpecies ? 'shaymin' : 'shaymin-land';
  if (name === 'mr-mime') return 'mr-mime';
  if (name === 'mime-jr') return 'mime-jr';
  return name;
}
