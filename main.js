document.addEventListener("DOMContentLoaded", function() {
    function processData() {
        const click = document.querySelector("button");
        click.addEventListener("click", () => {
            const input = document.querySelector("input"); // to get the use input
            const pokemonName = input.value;
            
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Pokémon not found: ${pokemonName}`);
                    }
                    return response.json();
                })
                .then(pokemon => {
                    console.log(pokemon)
                    const card = document.createElement("div");
                    card.className = "pokemon-card"; 

                    // creating elements for Pokémon details
                    const pokemonName = document.createElement("h1");
                    pokemonName.className = "h1";
                    pokemonName.textContent = pokemon.name.toUpperCase();
                    card.appendChild(pokemonName);

                    // creating the img element
                    const img = document.createElement("img");
                    img.src = pokemon.sprites.front_default;
                    img.alt = pokemon.name;
                    card.appendChild(img);

                    
                    // creating the h3 element
                    const h3Stats = document.createElement("h3");
                    h3Stats.textContent = "stats";
                    h3Stats.className = "stats";
                    card.appendChild(h3Stats);


                    // creating the stats element
                    const stats = document.createElement("ul");
                    stats.className = "ul";
                    pokemon.stats.forEach(stat => {
                        const li = document.createElement("li");
                        const div = document.createElement("div")
                        div.className = "div";
                        
                        const statName = document.createElement("span");
                        statName.textContent = stat.stat.name;

                        const statValue = document.createElement("span");
                        statValue.textContent = stat.base_stat;

                        div.appendChild(statName);
                        div.appendChild(statValue);

                        li.appendChild(div);
                        stats.appendChild(li);
                    }) 
                    card.appendChild(stats);
                    


                    // creating the h3 element
                    const h3 = document.createElement("h3");
                    h3.textContent = "abilities";
                    h3.className = "abilities";
                    card.appendChild(h3);


                    // creating the abilities element
                    const abilities = document.createElement("p")
                    abilities.textContent = `${pokemon.abilities.map(ability => ability.ability.name).join(", ")}`;
                    card.appendChild(abilities);

                

                    //appending the card to the container
                    const container = document.getElementById("pokemon-container");
                    container.innerHTML = "";
                    container.appendChild(card);
                    

                    input.value = "";

                })
                .catch(error => {
                    console.error("Error:", error.message); // log the error 
                    const errorDiv = document.createElement("div");
                    errorDiv.textContent = error.message;
                    errorDiv.className = "error-div";
                    document.body.appendChild(errorDiv);

                })
        })
    }

    processData()
});

    
    
