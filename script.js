const pokedex = document.getElementById("pokedex");
console.log(pokedex);

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      abilities: data.abilities.map((ability) => ability.ability.name).join(', '),
      height: data.height,
      weight: data.weight,
      // image:`raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      image:`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`,
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon.map(pokeman =>
    `
    <li class="card">
    <div class="content">
    <img class="card-image" src = "${pokeman.image}" alt="${pokeman.name} image"/>
    <h2 class="card-title"> ${pokeman.id}. ${pokeman.name}</h2>
    <div class="details">
    <p class="subtitle para">Type: ${pokeman.type}</p>
    <p class="para">Abilities: ${pokeman.abilities} </p>
    <p class="para">Height: ${pokeman.height} , Weight: ${pokeman.weight}</p>
    </div>
    </div>
    </li>
    `).join('');
  pokedex.innerHTML =  pokemonHTMLString;
}

//     .then(data => {
//       console.log(data);
//       const pokemon = {
//         name:  data.name,
//         id:  data.id,
//         abilities:  data.abilities.map((ability) => ability.ability.name),
//         height:  data.height,
//         weight:  data.weight,
//         image:  data.sprites.front_default,
//         type: data.types.map((type) => type.type.name).join(', '),

//       }

//       console.log(pokemon);
//     });

// };

fetchPokemon();
/*
The Promise.all() static method takes an iterable of promises as input and returns a single Promise. 
This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values.
*/
