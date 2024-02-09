
const pokeApi = {}

function informationConvert(pokemon){
    return [`
    <div class="pokemon ${pokemon.type}">
        <div class="header">
            <h1 class="pokemonName">${pokemon.name}</h1>
            <h2 class="pokemonNumber">#${pokemon.number}</h2>
        </div>
        <div class="detail"> 
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <img class="pokemonPhoto" src="${pokemon.photo}"
                            alt="${pokemon.name}">
        
    </div>`
    , 
    
    `<div class="info2">
        <p>${pokemon.height} cm</p>
        <p>${pokemon.weight} kg</p>
        <p>${pokemon.abilities.toString().replaceAll(',', ', ')}</p>
    </div>`
    , 
    
    pokemon.stats

    ,
    
    `
    ${pokemon.stats.map((stat) => `<p>${stat}</p>`).join('')}
    `
    ]
    
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height 
    pokemon.weight = pokeDetail.weight * 0.01

    const abilities = pokeDetail.abilities.map((ability) =>  ability.ability.name)
    pokemon.abilities = abilities
    
    const stats = pokeDetail.stats.map((stat) => stat.base_stat)

    pokemon.stats = stats

    console.log(pokeDetail)
    console.log(pokemon)
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}



pokeApi.getSinglePokemon = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}/`

    return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => convertPokeApiDetailToPokemon(pokemon))
    .then((detailRequest) => Promise.resolve(detailRequest))
    .then((pokemonDetails) => informationConvert(pokemonDetails))
}
