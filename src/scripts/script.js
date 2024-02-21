const pokemonList = document.getElementById("pokemon-list");
const contextmenu = document.getElementById("contextmenu");
const addButton = document.getElementById("add");
const yourTeam = document.getElementById("yourTeam");
let yourTeamArray = [];
let currentPokemonId = null;

function fetchFirstGeneration() {
	fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
		.then((response) => response.json())
		.then(function (allpokemon) {
			allpokemon.results.map(function (pokemon) {
				fetchPokemonData(pokemon);
				// console.log(pokemon);
			});
		});
}

function fetchPokemonData(pokemon) {
	const url = pokemon.url;
	fetch(url)
		.then((response) => response.json())
		.then(function (pokeData) {
			// console.log(pokeData);
			const pokemonElement = document.createElement("div");
			pokemonElement.classList.add("pokemonCard");
			pokemonElement.dataset.id = pokeData.id;
			pokemonElement.innerHTML = `
            <h3>#${pokeData.id.toString().padStart(3, "0")}</h3>
            <img src="${pokeData.sprites.front_default}">
            <h3>${pokeData.name}</h3>
            <div class="pokemon-types">
                ${pokeData.types
									.map((type) => {
										return `<span class="pokemon-type-${type.type.name}">${type.type.name}</span>`;
									})
									.join("")}
            </div>
            `;
			pokemonList.appendChild(pokemonElement);
		});
}

// Display your Team

function updateTeamDisplay() {
	yourTeam.innerHTML = "";
	yourTeamArray.forEach((pokemonId) => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
			.then((response) => response.json())
			.then((pokeData) => {
				const teamPokemonElement = document.createElement("div");
				teamPokemonElement.classList.add("pokemonCard");
				teamPokemonElement.innerHTML = `
                    <h3>#${pokeData.id.toString().padStart(3, "0")}</h3>
                    <img src="${pokeData.sprites.front_default}">
                    <h3>${pokeData.name}</h3>
                    <div class="pokemon-types">
                        ${pokeData.types
													.map((type) => {
														return `<span class="pokemon-type-${type.type.name}">${type.type.name}</span>`;
													})
													.join("")}
                    </div>
                `;
				yourTeam.appendChild(teamPokemonElement);
			});
	});
}

// Adding items to team with Addbutton

addButton.addEventListener("click", () => {
	const selectedPokemonId = currentPokemonId;
	if (selectedPokemonId && yourTeamArray.length < 5 && !yourTeamArray.includes(selectedPokemonId)) {
		yourTeamArray.push(selectedPokemonId);
		updateTeamDisplay();
	} else if (yourTeamArray.includes(selectedPokemonId)) {
		alert("This Pokemon is already in your team!");
	} else {
		alert("You can only have up to 5 unique Pokémon in your team!");
	}
});

fetchFirstGeneration();

// Contextmenu
document.addEventListener("contextmenu", ($e) => {
	$e.preventDefault();
	// console.log(!!$e.target.closest(".pokemonCard"));
	if ($e.target.closest(".pokemonCard")) {
		contextmenu.style.left = `${$e.pageX}px`;
		contextmenu.style.top = `${$e.pageY}px`;
		currentPokemonId = $e.target.closest(".pokemonCard").dataset.id;
		// console.log(currentPokemonId);
		showContext();
	}
});
document.addEventListener("click", () => {
	hideContext();
});
document.addEventListener("scroll", () => {
	hideContext();
});

function showContext() {
	contextmenu.style.display = "flex";
}

function hideContext() {
	contextmenu.style.display = "none";
	currentPokemonId = null;
}
