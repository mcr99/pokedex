let pokemonList = document.querySelector(".Pokemon_List")

for (let i = 1; i <= 151; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.json())
        .then(data => showPokemon(data))
}

function showPokemon(data) {
    pokemonList.innerHTML += `
        <article class="flex flex-col justify-center items-center p-5 shadow rounded-lg gap-5 hover:ring-1 ring-gray-300">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="img" loading="lazy">
            <p class="font-bold">${data.name.toUpperCase()}</p>
        </article>
    `
}