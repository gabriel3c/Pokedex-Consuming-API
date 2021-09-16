//color[dark, comum, light]
const colors = {
  bug: ['#6D7815', '#A8B820', '#C6D16E'],
  dark: ['#49392F', '#705848', '#A29288'],
  dragon: ['#A1871F', '#7038F8', '#A27DFA'],
  electric: ['#A1871F', '#F8D030', '#FAE078'],
  fairy: ['#9B6470', '#EE99AC', '#F4BDC9'],
  fighting: ['#7D1F1A', '#C03028', '#D67873'],
  fire: ['#9C531F', '#F08030', '#F5AC78'],
  flying: ['#6D5E9C', '#A890F0', '#C6B7F5'],
  ghost: ['#493963', '#705898', '#A292BC'],
  grass: ['#4E8234', '#78C850', '#A7DB8D'],
  ground: ['#927D44', '#E0C068', '#EBD69D'],
  ice: ['#638D8D', '#98D8D8', '#BCE6E6'],
  normal: ['#6D6D4E', '#A8A878', '#C6C6A7'],
  poison: ['#682A68', '#A040A0', '#C183C1'],
  psychic: ['#A13959', '#F85888', '#FA92B2'],
  rock: ['#786824', '#B8A038', '#D1C17D'],
  steel: ['#787887', '#B8B8D0', '#D1D1E0'],
  water: ['#445E9C', '#6890F0', '#9DB7F5'],
}

const inputSearch = document.getElementById('search') // campo de busca
const buttonSearch = document.getElementById('lupa') // campo de busca
const imgPokemon = document.getElementById('image') // imagem do pokemon
const statusPokemon = document.getElementById('stats') // div com status do pokemon
const typesPokemon = document.getElementById('typesPk') // lista dos tipos, se é eletric, fire, water ...

//evento no input de busca ao apertar uma tecla
inputSearch.addEventListener('keydown', chamaPokemon)
buttonSearch.addEventListener('click', btnSearch)

function btnSearch(event) {
  const pokemon = document.getElementById('search').value
  searchPokemon(pokemon)
}

function chamaPokemon(event) {
  console.log(event.target.value)
  let pokemon = event.target.value
  // quando a tecla enter é pressionada, invoca a função que traz as informações
  // o código da tecla 'Enter' é 13
  if (event.keyCode === 13) {
  searchPokemon(pokemon)

  
  }
}

function searchPokemon(namePokemon) {
  let url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}` // a busca na api ja ocorre direto com o nome ou id do pokemon passado

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      catchPokemon(data)
    })
}

function catchPokemon(pokemon) {
  document.getElementById('namePk').innerHTML = pokemon.name

  document.getElementById('idPk').innerHTML = `# ${pokemon.id}`

  imgPokemon.setAttribute('src', pokemon.sprites.front_default)

  //pokemon.stats -> array dos status do pokemom
  //pkStats retorna uma array organizada, que contem somente o nome e o valor base do atributo
  let pkStats = StatusPokemon(pokemon.stats)

  //cria as <p> para cada status, e atribue os valores de pkStats para cada uma
  showStatus(pkStats)
  showTypes(pokemon.types)

  let firstType = typesPokemon.children[0].getAttribute('id')
  bgColorImage = imgPokemon.style.backgroundColor = colors[firstType][2]

  //função pra trocar classe da tr que tem o pokemon buscado
  // filtrar a tr que tem como lastchild o nome do pokemon
  // trocar classe daquele que ta checkado mas que tem nome diferente do valor do input
  const trList = document.querySelectorAll('.trData')
  trList.forEach((element)=>{ 
    if((element.lastChild.innerHTML === pokemon.name )){
      console.log(element.firstChild.innerHTML, 'testestsetse')
          element.setAttribute('class', 'trDataCheck')     
          element.scrollIntoView() 
    }  

    const trCheckList = document.querySelectorAll('.trDataCheck')
    trCheckList.forEach((tr)=>{
      if(tr.lastChild.innerHTML !== inputSearch.value){
        tr.setAttribute('class', 'trData')
      }
    })
  })
  
}

// função organiza o nome dos status conforme a vontade do cliente ou dev
function StatusPokemon(array) {
  console.log(array)
  let status = [
    ['HP', array[0].base_stat],
    ['Atack', array[1].base_stat],
    ['Defense', array[2].base_stat],
    ['S.Atack', array[3].base_stat],
    ['S.Defense', array[4].base_stat],
    ['Speed', array[5].base_stat],
  ]
  return status
}

function showStatus(pkStats) {
  for (i = 0; i < pkStats.length; i++) {
    let p = document.getElementById(`stats${i}`)
    p.innerHTML = pkStats[i][0] + ': ' + pkStats[i][1]
  }
}
function showTypes(type) {
  typesPokemon.innerHTML = '' //reseta os tipos dos pokemons

  type.forEach((element) => {
    console.log(element.type.name)

    let p = document.createElement('p')
    p.innerHTML = element.type.name
    p.setAttribute('id', element.type.name)

    typesPokemon.appendChild(p)

    p.style.backgroundColor = colors[element.type.name][1]
  })
}






