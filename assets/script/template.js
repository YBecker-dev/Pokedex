const POKE_API_POKEMONS = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
const POKE_API_GENDER = 'https://pokeapi.co/api/v2/gender/';

function pokemonCardHtml(pokemon, i) {
  return `
    <div onclick="showPokemonDetail(${i})" class="pokemon-section d-flex flex-column" id="pokemon-infos">
        <div class="pokemon-infos"> 
            <p>${'#' + (i + 1)}</p>
            <h4>${pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)}</h4>
        </div>
        <div class="pokemon-picture ${pokemon.types.join(' ')} d-flex justify-content-center align-items-end">
          <img src="${pokemon.image}"/>
        </div>
        <div class="pokemon-type d-flex justify-content-center gap-3 align-items-center">
            ${pokemon.types.map((type) => `<img class="type-icon" src="${getTypeImage(type)}"/>`).join('')} 
        </div>
    </div>
    `;
}

function pokemonDetailCardHtml(pokemon) {
  return `    
    <div class="pokemon-detailed-information d-flex justify-content-center" id="pokemon-detailed-information" onclick="togglePokemonInfo()">
      <div class="pokemon-detailed-information-header d-flex flex-column"  id="pokemon-detailed-information-header">
        <div class="cart-header-responsiv">
          <button onclick="togglePokemonInfo()" class="add-button d-flex">x</button>
        </div>
        <h2>${pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)}</h2>
        <div class="wallpaper">
          <img class="pokemon" src="${pokemon.image}">
        </div>
        <div class="d-flex gap-1">
          <div class="info-categorie d-flex align-items-center gap-3">
            <p> Type: </p> 
            <div class="pokemon-type d-flex align-items-center gap-1">
            ${pokemon.types.map((type) => `<img class="type-icon" src="${getTypeImage(type)}"/>`).join('')}
            </div>
          </div>
          <div class="info-categorie d-flex align-items-center gap-3">
            <p> Type: </p> 
            <div class="pokemon-type d-flex align-items-center gap-1">
            ${pokemon.types.map((type) => `<img class="type-icon" src="${getTypeImage(type)}"/>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getTypeImage(type) {
  return `https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${type}.svg`;
}
