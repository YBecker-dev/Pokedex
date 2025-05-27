let allPokemons = [];


function pokemonCardHtml(pokemon, i) {
  return `
    <div onclick="showPokemonDetail(${i})" class="pokemon-section d-flex flex-column" id="pokemon-infos">
        <div class="pokemon-infos"> 
            <span>#${pokemon.number}</span>
            <h4>${pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)}</h4>
        </div>
        <div class="pokemon-picture ${pokemon.types.join(' ')} d-flex justify-content-center align-items-end">
          <img src="${pokemon.image}"/>
        </div>
        <div class="pokemon-type d-flex justify-content-center gap-3 align-items-center">
          ${getTypeIconsHtml(pokemon.types)} 
        </div>
    </div>
    `;
}

function pokemonDetailCardHtml(pokemon) {
  return `    
    <div class="pokemon-detailed-information d-flex justify-content-center" id="pokemon-detailed-information" onclick="togglePokemonInfo()">
      <div class="pokemon-detailed-information-header d-flex flex-column"  id="pokemon-detailed-information-header" onclick="eventBubbling(event)">
        <div class="cart-header-responsiv">
          <button onclick="togglePokemonInfo()" class="add-button d-flex">x</button>
        </div>
        <h2>${pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)}</h2>
        <div class="wallpaper">
          <img class="pokemon" src="${pokemon.image}">
        </div>
        <div class="d-flex gap-1 justify-content-center pokemon-detailed-information-bottom flex-wrap">
          <div class="info-categorie d-flex align-items-center gap-3">
            <p> Type: </p> 
            <div class="pokemon-type d-flex align-items-center gap-1">
              ${getTypeIconsHtml(pokemon.types)} 
            </div>
          </div>
          <div class="info-categorie d-flex align-items-center gap-3">
            <p>Geschlecht:</p> 
            <div class="pokemon-type d-flex align-items-center gap-1">
              ${getGenderHtml(pokemon.genderRate)}
            </div>
          </div>
          <div class="info-categorie d-flex align-items-center gap-3">
            <p>Größe:</p>
            <div class="pokemon-type d-flex align-items-center gap-1">
              ${pokemon.weight.height}
            </div>
          </div>
          <div class="info-categorie d-flex align-items-center gap-3">
            <p>Gewicht:</p>
            <div class="pokemon-type d-flex align-items-center gap-1">
              ${pokemon.weight.weight}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function LoadMorePokemons() {
  return `<button class="btn btn-primary d-block mx-auto my-4" onclick="loadMore()">Mehr laden</button>`;
}

function getTypeImage(type) {
  return `https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/${type}.svg`;
}

function getTypeIconsHtml(types) {
  let html = '';
  for (let i = 0; i < types.length; i++) {
    html += '<img class="type-icon" src="' + getTypeImage(types[i]) + '"/>';
  }
  return html;
}

function getGenderHtml(genderRate) {
  if (genderRate === -1) {
    return 'Unbekannt';
  }
  if (genderRate === 0) {
    return;
  }
  if (genderRate === 8) {
    return;
  }
  let malePercent = ((8 - genderRate) / 8) * 100;
  let femalePercent = (genderRate / 8) * 100;
  return `<img class='gender-img' src='../img/maennliches-geschlecht.png'> ${malePercent} % <img class='gender-img' src='../img/weibliches-geschlecht.png'> ${femalePercent} % `;
}
