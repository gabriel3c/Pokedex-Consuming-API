
  
const urlPokedex = `https://pokeapi.co/api/v2/pokedex/1/` // a busca na api ja ocorre direto com o nome ou id do pokemon passado
  
fetch(urlPokedex)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        showPokedex(data)
    })


const listPokemon = document.getElementById('tablePk') //tabela da pokedex
const tBody = document.getElementsByTagName('tbody')

function showPokedex(pokedex){
    console.log(pokedex)
    
    //acessar dados e organizar com os que eu vou usar
    const arrayPokemons = pokedex.pokemon_entries

    const dataPokedex = arrayPokemons.reduce((acc, elem) =>{
        let dataPokemon = {
                id: elem.entry_number,
                name: elem.pokemon_species.name,
            }
        acc.push(dataPokemon)
        return acc
        },
        []
    )
    console.log(dataPokedex)
    
    const tbody = document.getElementById('tableBody')
    // criar table data e tr que ficam dentro do tbody
    dataPokedex.forEach(element => {
        //td com id e name
        let id = document.createElement('td')
        id.setAttribute('class', 'id')
        id.innerHTML = `# ${element.id}`
        if(element.id < 100) id.innerHTML = `# 0${element.id}`
        if(element.id < 10) id.innerHTML = `# 00${element.id}`
        
        let name = document.createElement('td')
        name.setAttribute('class', 'name')
        name.innerHTML = element.name
        //tr que recebe os td's como filhos
        let tr = document.createElement('tr')
        tr.setAttribute('class', 'trData')
        tr.appendChild(id)
        tr.appendChild(name)
        tbody.appendChild(tr)
    });

    const tr = document.querySelectorAll('.trData')
    console.log(tr.childNodes)    
    tr.forEach((element)=>{
        element.addEventListener('click',()=>{
            searchPokemon(element.lastChild.innerHTML)
        })
    })
}