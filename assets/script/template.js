let allPokemons = [];

function pokemonCardHtml(pokemon, i) {
  return `
  <div id="${pokemon.name}" class="responsiv-width">
    <div onclick="showPokemonDetail(${i})" class="pokemon-section d-flex flex-column" id="pokemon-infos">
      <div class="pokemon-infos-section ${pokemon.types.join(' ')} d-flex justify-content-center align-items-center">
        <div class="pokemon-picture d-flex justify-content-center align-items-center">
        <img src="${pokemon.image}"/>
        <div class="icon-types position-absolute position-icon d-flex flex-column justify-content-center gap-1">
          ${getTypeIconsHtml(pokemon.types)} 
        </div>
        <div class="position-absolute position-name">
          <span>#${pokemon.number}</span>
          <h4>${pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)}</h4>
        </div>
      </div>
    </div>
  </div>
    `;
}

function pokemonDetailCardHtml(pokemon, index) {
  return `    
    <div onclick="closePokemonInfo()" class="d-flex justify-content-center pokemon-overlay" id="pokemon-detailed-information">
      <div onclick="eventBubbling(event)" class="pokemon-detailed-information-header hide-scrollbar ${
        pokemon.types[0]
      } d-flex flex-column" id="pokemon-detailed-information-header">
        <div class="wallpaper">
          <div class="cart-header d-flex position-relative justify-content-end">
          <img onclick="closePokemonInfo()" id="close" src="/assets/img/menu/gebogener-pfeil.png">
        </div>
        <div>
            <h2 class="mt-3" id="wallpaper-h2">${pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)}</h2>
          <img src="${pokemon.image}">
          </div>
        </div>
        <div>
          <div class="d-flex justify-content-center pokemon-detailed-information-bottom flex-wrap flex-column p-2">
            <table class="table-bordered table-sm small-table tr-border-${pokemon.types[0]}">
              <tr>
                <th colspan="2" class="tr-background-${pokemon.types[0]}">
                  <p class="text-center text-black fw-bold" id="info"> Allgemeine Informationen zu <span class="pokemon-name">${
                    pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)
                  }</span></p>
                </th>
              </tr>
              <tr>
                <th>Type :</th>
                <td>
                  ${renderTypeLabels(pokemon)}
                </td>
              </tr>
              <tr>
                <th>Gender :</th>
                <td>${getGenderHtml(pokemon.genderRate)}</td>
              </tr>
              <tr>
                <th>Hight :</th>
                <td>${pokemon.weight.height}</td>
              </tr>
              <tr>
                <th>Weight :</th>
                <td>${pokemon.weight.weight}</td>
              </tr>
              <tr>
                <th>Shiny:</th>
                <td><img class="shiny" src="${pokemon.shiny}"></td>
              </tr>              
              <tr>
                <th>Color :</th>
                <td>${pokemon.color.charAt().toUpperCase() + pokemon.color.slice(1)}</td>
              </tr>
              <tr>
                <th>Capture_rate :</th>
                <td>${pokemon.captureRate}</td>
              </tr>
              <tr>
                <th>Habitat :</th>
                <td>${pokemon.habitat.charAt().toUpperCase() + pokemon.habitat.slice(1)}</td>
              </tr>
              <tr>
                <th>Egg groups :</th>
                <td>${pokemon.eggGroups}</td>
              </tr>
              <tr>
                <th>base happiness :</th>
                <td>${pokemon.baseHappiness}</td>
              </tr>
              <tr>
                <th colspan="2" class="tr-background-${pokemon.types[0]}">
                  <div class="text-center">&nbsp;<div>
                </th>
              </tr>
            </table>
            <div class="mt-2 arrow-key d-flex justify-content-between align-items-center">
              <div>
                <img 
                  onclick="changePokemon(${index}, -1)" 
                  src="/assets/img/arrow key/6327807.png">
                <img onclick="changePokemon(${index}, -1)" 
                  src="${allPokemons[index === 0 ? allPokemons.length - 1 : index - 1].image}">
              </div>
              <div>
                <img onclick="changePokemon(${index}, 1)"
                  src="${allPokemons[(index + 1) % allPokemons.length].image}">
                <img 
                  onclick="changePokemon(${index}, 1)" 
                  class="arrow-key-scale" 
                  src="/assets/img/arrow key/6327807.png">
              </div>
            </div>
        </div>
      </div>
    </div>
  `;
}

function LoadMorePokemons() {
  return `<button class="btn btn-primary d-block mx-auto my-4" onclick="loadMore(), closePokemonInfo()">Mehr laden</button>`;
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
  return `<img class='gender-img' src='../img/gender/maennliches-geschlecht.png'> ${malePercent} % <img class='gender-img' src='../img/gender/weibliches-geschlecht.png'> ${femalePercent} % `;
}

function renderTypeLabels(pokemon) {
  let html = '';
  for (let i = 0; i < pokemon.types.length; i++) {
    let type = pokemon.types[i];
    let typeName = type[0];
    for (let index = 1; index < type.length; index++) {
      typeName += type[index];
    }
    html += '<span class="type-label type-' + type + '">' + typeName + '</span> ';
  }
  return html;
}

function menuHtml() {
  return `        
        <div class="d-flex flex-column gap-2 p-2">
          <div class="d-flex justify-content-between align-items-center">
            <img onclick="closeMenu()" id="backward" src="/assets/img/arrow key/6327807.png">
            <a class="menu-links p-1 w-100" href="1_generation.html">1. Generation</a>
          </div>
          <a class="menu-links p-1 w-100" href="2_generation.html">2. Generation</a>
          <a class="menu-links p-1 w-100" href="3_generation.html">3. Generation</a>
          <a class="menu-links p-1 w-100" href="4_generation.html">4. Generation</a>
        </div>`;
}

async function indexHtml(generationNumber, imageUrl) {
  return `
    <div class="generation gap-3 p-1">
      <div class="generation-starter d-flex flex-column-reverse justify-content-center p-3">
        <a href="assets/html/${generationNumber}_generation.html">${generationNumber}. Generation</a>
        <a href="assets/html/${generationNumber}_generation.html"><img src="${imageUrl}"></a>
      </div>
    </div>
  `;
}
