async function renderPokemonStats(pokemons, responseToJson) {
  for (let i = 0; i < responseToJson.results.length; i++) {
    let pokemon = responseToJson.results[i];
    let apiNameSpecies = getSpezialPokemon(pokemon.name, true);
    let apiNamePokemon = getSpezialPokemon(pokemon.name, false);
    let response = await fetch(pokemon.url);
    let details = await response.json();
    let weight = await getPokemonWeight(apiNamePokemon);
    let speciesData = await getPokemonSpeciesData(apiNameSpecies);
    let types = extractPokemonTypes(details);
    pokemonPush(pokemons, pokemon, details, types, weight, offset + i + 1, speciesData);
  }
}

function extractPokemonTypes(details) {
  let types = [];
  for (let i = 0; i < details.types.length; i++) {
    types.push(details.types[i].type.name);
  }
  return types;
}

async function getPokemonWeight(apiName) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
  let data = await response.json();
  return {
    height: data.height / 10 + ' m',
    weight: data.weight / 10 + ' kg',
  };
}

async function getPokemonSpeciesData(apiName) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${apiName}`);
  let data = await response.json();
  return {
    genderRate: data.gender_rate,
    color: data.color.name,
    captureRate: data.capture_rate,
    habitat: data.habitat ? data.habitat.name : 'Unbekannt',
    eggGroups: data.egg_groups.map((group) => group.name).join(', '),
    baseHappiness: data.base_happiness,
  };
}

function pokemonPush(pokemons, pokemon, details, types, weight, number, speciesData) {
  pokemons.push({
    name: pokemon.name,
    image: details.sprites.other.dream_world.front_default,
    types: types,
    weight: weight,
    number: number,
    genderRate: speciesData.genderRate,
    color: speciesData.color,
    captureRate: speciesData.captureRate,
    habitat: speciesData.habitat,
    eggGroups: speciesData.eggGroups,
    baseHappiness: speciesData.baseHappiness,
    shiny: details.sprites.other['official-artwork'].front_shiny,
  });
}

function getSpezialPokemon(name, forSpecies = false) {
  if (name.startsWith('deoxys')) return forSpecies ? 'deoxys' : 'deoxys-normal';
  if (name.startsWith('wormadam')) return forSpecies ? 'wormadam' : 'wormadam-plant';
  if (name.startsWith('giratina')) return forSpecies ? 'giratina' : 'giratina-altered';
  if (name.startsWith('shaymin')) return forSpecies ? 'shaymin' : 'shaymin-land';
  if (name === 'mr-mime') return 'mr-mime';
  if (name === 'mime-jr') return 'mime-jr';
  if (name.startsWith('basculin')) return forSpecies ? 'basculin' : name;
  if (name.startsWith('darmanitan')) return forSpecies ? 'darmanitan' : name;
  return name;
}

function currentLimitPokemonLoaded(remaining, limit) {
  if (remaining < limit) {
    return remaining;
  }
  return limit;
}
