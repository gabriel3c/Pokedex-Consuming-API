const urlPokedex = `https://pokeapi.co/api/v2/pokedex/1/` // a busca na api ja ocorre direto com o nome ou id do pokemon passado
  
fetch(urlPokedex)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        showPokedex(data)
    })

function showPokedex(pokedex){
    console.log(pokedex)
    
    //acessar dados e organizar com os que eu vou usar
    //const arrayPokemons = pokedex.pokemon_entries

    const dataPokedex = pokedex.pokemon_entries.reduce((acc, elem) =>{
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

        //table body que recebe as tr's
        tbody.appendChild(tr)
    });

    const tr = document.querySelectorAll('.trData')    // é um nodeList, que na pratica é um array
       
    // evento em cada row da table, para clicar e exibir o pokemon
    tr.forEach((element)=>{
        element.addEventListener('click',()=>{
            searchPokemon(element.lastChild.innerHTML) //last child aqui, porque são 2, e o first é o id
        })
    })
}

//