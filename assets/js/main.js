const offset = 0;
const limit = 10; 
const url = 'https://pokeapi.co/api/v2/pokemon?offset='+offset+'&limit='+limit;
//por requisição http estamos buscando os dados dos pokemons e adicionandona lista de forma dinamica
function convertPokemonLi(pokemon) {
    return `<li class="pokemon">
    <span class="numberPokemon">#001</span>
    <span class="name">`+pokemon.name+`</span> 
    <div class="datail">
         <ol class="types">
             <li class="type">grass</li>
             <li class="type">poison</li>
         </ol>    
         <img src="assets/css/pokemonsImg/Bulbasaur.png" alt="`+pokemon.name+`">
    </div>
 </li>`
}

const pokemonList = document.getElementById('pokemonList')

fetch(url)
    .then((response) => response.json()) //converte em json a resposta(string)
    .then((jsonBody) => jsonBody.results)//pega o results do json
    .then((pokemons) => {
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            pokemonList.innerHTML += convertPokemonLi(pokemon);
        }

    })//imprime o results,lista de pokemons, em json
//quando o fetch der cherto, chame a função
    .catch( (error) => console.error(error))
//se o fetch der errado, chame a função


//   .finally(() => console.log('requisição concluida'))
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
