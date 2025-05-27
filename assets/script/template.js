let allPokemons = [];


function pokemonCardHtml(pokemon, i) {
  return `
    <div onclick="showPokemonDetail(${i})" class="pokemon-section d-flex flex-column " id="pokemon-infos">
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
    <div class="pokemon-detailed-information d-flex justify-content-center" id="pokemon-detailed-information" onclick="togglePokemonInfo()">
      <div class="pokemon-detailed-information-header ${pokemon.types.join(
        ' '
      )} d-flex flex-column"  id="pokemon-detailed-information-header" onclick="eventBubbling(event)">
        <div class="wallpaper">
               <div class="cart-header d-flex position-relative justify-content-end">
          <button onclick="togglePokemonInfo()" class="add-button d-flex">x</button>
        </div>
        <div>
            <h2>${pokemon.name.charAt().toUpperCase() + pokemon.name.slice(1)}</h2>
          <img class="pokemon" src="${pokemon.image}">
          </div>
        </div>
        <div class="background-cart">
          <div class="d-flex gap-1 justify-content-center pokemon-detailed-information-bottom flex-wrap flex-column p-2">
            <table>
              <tr>
                <th>Type :</th>
                <td class="pokemon-types-border">
                  ${typesWithBackgroundColorAndBorder(pokemon)}
                </td>
              </tr>
              <tr>
                <th>Gender :</th>
                <td>${getGenderHtml(pokemon.genderRate)}</td>
              </tr>
                <th>Hight :</th>
                <td>${pokemon.weight.height}</td>
              <tr>
                <th>Weight :</th>
                <td>${pokemon.weight.weight}</td>
              </tr>
            </table>
          <div class="arrow-key d-flex justify-content-between">
            <img onclick="previousPokemon(${index})" src="/assets/img/arrow key/6327807.png">
            <img onclick="nextPokemon(${index})" class="arrow-key-scale" src="/assets/img/arrow key/6327807.png">
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

function typesWithBackgroundColorAndBorder(pokemon) {
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
