const pokemonList = document.getElementById('pokemonList')
const tableData = document.getElementById('tableData')
const evolution = document.getElementById('evolution')
const weakness = document.getElementById('weakness')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10;
let offset = 0;

const maxRecords = 151;//se a quantidade e itens da paginafor maior ou igual ao limite, retira o botão de ler mais
//151: numero de pokemons da primeira geração
function loadPokemonItensInIndex(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type/*criado para dar a coloração de acordo com o tipo*/}">
            <span class="numberPokemon">#${pokemon.pokemonNumber}</span>
            <span class="name">${pokemon.name}</span> 
            <div class="datail">
                <ol class="types">
                 ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>    
                <img src="${pokemon.photo}" alt="`+pokemon.name+`">
            </div>
        </li>
     `).join(' ')

    //pega a lista de pokemons e converte para uma lista de li e junta todos os li com o separador de espaço, concatenando no html antigo que eu ja itnha

    })//imprime o results,lista de pokemons, em json


}

loadPokemonItensInIndex(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit// aumenta o offset de 10 em 10(tam do limite) a cada click no no botão
     const qtdRecordNexPage = offset + limit//quanto a quantidade maximo de registros da proxima pagina deve ser
    if(qtdRecordNexPage >= maxRecords){//se o numer de registros da proxia pagina for maior que o numero maximo total de registros a serem exibidos
        const newLimit = maxRecords - offset;//limite muda o valor
        loadPokemonItensInIndex(offset, newLimit)//chama a função para esse novo limite
        loadMoreButton.parentElement.removeChild(loadMoreButton);//desabilita o botão chamando o pai dele

    }else{
        loadPokemonItensInIndex(offset, limit)//se não, continua normal chamadno as paginas
    }
})


/*function loadPokemonDatailsInDatailPage(pokemon){
        tableData.innerHTML = `
                            <li class="line">`${pokemon.abilities}`</li>
                            <li class="line">`${pokemon.category}`</li>
                            <li class="line">`${pokemon.gender}`</li>
                            <li class="line">`${pokemon.height}`</li>
                            <li class="line">`${pokemon.weight}`</li`

}*/