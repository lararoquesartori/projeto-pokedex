const pokeApi = {}//objeto

function convertPokeApiDatailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.pokemonNumber = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDatail = (pokemon) => {
    return fetch(pokemon.url)
            .then((reponse) => reponse.json())//converte os tetalhes para json
            .then(convertPokeApiDatailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) =>{//metodo GetPokemons
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    //por requisição http estamos buscando os dados dos pokemons e adicionandona lista de forma dinamica 
    
    //requisição que traz lista de pokemons
    return fetch(url)//busca a lista de pokemons
        .then((response) => response.json()) //converte em json a resposta(string)
        .then((jsonBody) => jsonBody.results)//pega o results do json
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDatail))//transformando a lista de pokemons em uma lista de requisições depromessas dos detalhes dos pokemons, da nova requisição, essa lista de promessas vai vir uma lista de response que teremos que converter para json
        .then((detailRequests) => Promise.all(detailRequests))//a lista de requisição de detalhes, esperadno todas as promessas serem finalizadas obtem-se todos os detalhes dos poekemons
        .then((pokemonsDetailsInJson) => pokemonsDetailsInJson)//retorna a lista de detalhes dos pokemons
        //quando o fetch der cherto, chame a função
        //.catch( (error) => console.error(error))//se o fetch der errado, chame a função

} 
//.finally(() => console.log('requisição concluida'))
//quando estiver finalizado, chame a função

//fetch retorna uma promisse, processamento assincrono, que será executado e não tem uma resposta de imediato, promessa de um resultado
//conforme vc fazer a busca, uma hora vc recebe essa reposta
//quando toda a requisição for feita ai sim o fetch eh executado
//funciona como uma estrutura de try/catch, a estruturade uma promisse foi baseadad nela
//quando tem dois then, o segundo tem recebe o retorno do primeiro, fazendo assim com que não precise fazer encademanetos de estruturas como:
/*
    .then(function(response){
        response
            .json()
            .then(function(reponseBody){
                console.log(reponseBody);
            })//resposta convertida em json
    })

*/

//uma froma reduzida de fazer uma função é trocar por exemplo:
/*(function (error) {
    console.error(error)
}

POR 

(error) => console.error(error)


muito comum para casos como esse, em que as funções servem apenas como callBack
*/

//no final eu quero converter essa lista json nessa lista de html de pokemons
Promise.all([//lista de promessas
    //lista de  pokemons transformada em lista de novas requisições
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2')
]).then(results=>{
    console.log(results)
})