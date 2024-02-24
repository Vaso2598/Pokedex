const urlParams = new URLSearchParams(window.location.search);
const pokemonArrayString = urlParams.get("pokemon");
const yourTeamBattle = document.getElementById("yourTeamBattle");
const enemyTeamBattle = document.getElementById("enemyTeam");

const splitString = pokemonArrayString.split(",");

// console.log(splitString);

//  Your Team

splitString.forEach((id) => {
	fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then((response) => response.json())
		.then((pokemonData) => {
			fetchPokemonData(pokemonData);
			console.log(pokemonData);
		});
});

function fetchPokemonData(pokemonData) {
	yourTeamBattle.innerHTML += `
            <div class="pokemonCard">
                <h3>#${pokemonData.id.toString().padStart(3, "0")}</h3>
                <img src="${pokemonData.sprites.front_default}">
                <h3>${pokemonData.name}</h3>
                <div class="pokemon-types">
                    ${pokemonData.types
											.map((type) => {
												return `<span class="pokemon-type-${type.type.name}">${type.type.name}</span>`;
											})
											.join("")}
                </div>
            </div>
    `;
}

// Enemy Team

const enemyTeamIds = [];
for (let i = 0; i < 5; i++) {
	enemyTeamIds.push(Math.floor(Math.random() * 151) + 1);
}

enemyTeamIds.forEach((id) => {
	fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then((response) => response.json())
		.then((pokemonData) => {
			// Display enemy Pokemon using a similar approach as for your team
			displayEnemyPokemon(pokemonData);
		});
});

function displayEnemyPokemon(pokemonData) {
	enemyTeamBattle.innerHTML += `
            <div class="pokemonCard">
                <h3>#${pokemonData.id.toString().padStart(3, "0")}</h3>
                <img src="${pokemonData.sprites.front_default}">
                <h3>${pokemonData.name}</h3>
                <div class="pokemon-types">
                    ${pokemonData.types
											.map((type) => {
												return `<span class="pokemon-type-${type.type.name}">${type.type.name}</span>`;
											})
											.join("")}
                </div>
            </div>
    `;
}

// sound
let myAudio = document.querySelector("#audio");
myAudio.play();
myAudio.volume = 0.1;
