let pokemonListCategory = document.querySelector(".pokemon_List_Category")
let categorybutton = document.querySelectorAll("button")

const savedCategory = localStorage.getItem("selectedCategory")

if (savedCategory) {
    for (let i = 1; i <= 151; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => response.json())
            .then(data => {
                const type = data.types.map(type => type.type.name)
                if (type.some(type => type.includes(savedCategory))) {
                    showPokemon(data)
                }
            })
    }
} else {
    for (let i = 1; i <= 151; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => response.json())
            .then(data => showPokemon(data))
    }
}

function showPokemon(data) {
    let categories = data.types.map(type => `<p class="bg-mustardYellow px-3 py-2 rounded-lg font-bold">${type.type.name}</p>`)
    categories = categories.join("")

    pokemonListCategory.innerHTML += `
        <article class="flex flex-col justify-center items-center p-5 shadow rounded-lg gap-5 hover:ring-1 ring-gray-300" ">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="img" loading="lazy">
            <p class="font-bold">${data.name.toUpperCase()}</p>
            <div class="flex gap-5 justify-center items-center">
                ${categories}
            </div>
        </article>
    `
}

categorybutton.forEach(button => button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id
    localStorage.setItem("selectedCategory", buttonId)

    pokemonListCategory.innerHTML = ""

    for (let i = 1; i <= 151; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(response => response.json())
            .then(data => {
                const type = data.types.map(type => type.type.name)
                if (type.some(type => type.includes(buttonId))) {
                    showPokemon(data)
                }
            })
    }
}))