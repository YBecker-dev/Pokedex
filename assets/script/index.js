
async function renderAllGenerationStarters() {
  showLoader()
  let generations = [1, 2, 3, 4];
  let generationNumber = 0;
  let imgRef = document.getElementById('main-content');
  imgRef.innerHTML = '';
  await renderGenerationStarters(generations, generationNumber, imgRef);
  await new Promise((resolve) => setTimeout(resolve, 1100));
  hideLoader()
}

async function renderGenerationStarters(generations, generationNumber, imgRef) {
    for (let i = 0; i < generations.length; i++) {
    let gen = generations[i];
    let response = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`);
    let responseToJson = await response.json();
    let firstPokemon = responseToJson.pokemon_species[0];
    let pokemonName = firstPokemon.name;
    let pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    let pokemonData = await pokemonResponse.json();
    let imageUrl = pokemonData.sprites.other.dream_world.front_default;
    generationNumber++
    imgRef.innerHTML += indexHtml(generationNumber, imageUrl);
  }
}