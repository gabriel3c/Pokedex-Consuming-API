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
//type,color1,color2,color3
const typeColor = Object.entries(colors)

const inputSearch = document.getElementById('search') // campo de busca
const imgPokemon = document.getElementById('image') // imgem do pokemon
const statusPokemon = document.getElementById('stats') // div com status do pokemon
const typesPokemon = document.getElementById('typesPk') // tipos, se é eletric, fire, water ...
//evento no input de busca ao apertar uma tecla
inputSearch.addEventListener('keydown', chamaPokemon)

function chamaPokemon(event) {
  console.log(event.keyCode)
  console.log(event.key)
  console.log(event.target.value)

  let pokemon = event.target.value

  // quando a tecla enter é pressionada, invoca a função que traz as informações
  if (event.keyCode === 13) {
    searchPokemon(pokemon)
  }
}

function searchPokemon(namePokemon) {
  if (namePokemon === '') namePokemon = 25 // se o input estiver vazio, ao pressionar enter vai puxar o Pikachu
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
  console.log(pokemon)

  //nome do pokemon
  console.log(pokemon.name)
  document.getElementById('namePk').innerHTML = pokemon.name

  //id do pokemon
  console.log(pokemon.id)
  document.getElementById('idPk').innerHTML = `# ${pokemon.id}`

  //imagem do pokemon
  console.log(pokemon.sprites.front_default)
  imgPokemon.setAttribute('src', pokemon.sprites.front_default)

  /* pokemon.stats.forEach((element) => {
    console.log(element.stat.name)
    console.log(element.base_stat)
  }) */

  //pokemon.stats -> array dos status do pokemom
  //pkStats retorna uma array organizada, que contem somente o nome e o valor base do atributo
  pkStats = catchStatusPokemon(pokemon.stats)

  //cria as <p> para cada status, e atribue os valores de pkStats para cada uma
  showStats(pkStats)

  showTypes(pokemon.types)

  let firstType = typesPokemon.children[0].getAttribute('id')
  for (i = 0; i < typeColor.length; i++) {
    if (typeColor[i][0] === firstType) {
      imgPokemon.style.backgroundColor = typeColor[i][1][2]
    }
  }

  //da pra pra pegar o primeiro <p> da div dos tipos  com uma noção de parent e children?
  //typesPokemon é a div pai
  //typesPokemon.children[0] -> acessando o primeiro p
  //preciso pegar o id do p, que é o tipo do pokemon
  //preciso buscar no array de cores o array do tipo e guardar a cor
  //a cor eu atribue no background da imagem
  //console.log('tipo' + typesPokemon.children[0].getAttribute('id'))  lendo id
}
// função organiza o nome dos status conforme a vontade do cliente ou dev
function catchStatusPokemon(array) {
  console.log(array)
  let status = [
    ['HP', array[0].base_stat],
    ['Atack', array[1].base_stat],
    ['Defense', array[2].base_stat],
    ['S.Atack', array[3].base_stat],
    ['S.Defense', array[4].base_stat],
    ['Speed', array[5].base_stat],
  ]

  //console.log(status)
  return status
}

function showStats(pkStats) {
  for (i = 0; i < pkStats.length; i++) {
    let p = document.getElementById(`stats${i}`)
    p.innerHTML = pkStats[i][0] + ': ' + pkStats[i][1]
  }
}
function showTypes(pokemon) {
  typesPokemon.innerHTML = ''

  pokemon.forEach((element) => {
    console.log(element.type.name)

    //cria tag p, coloca o value do tipo e insere um id referente ao tipo
    let p = document.createElement('p')
    p.innerHTML = element.type.name
    p.setAttribute('id', element.type.name)

    //colocando o 'p' como filho da div responsável pelos tipos dos pokemons
    typesPokemon.appendChild(p)

    //identificar o id do tipo e linkar com uma cor do colorsType
    //changeColorType(element.type.name)
    changeColorType(element.type.name, p)
  })
}

function changeColorType(type, p) {
  for (i = 0; i < typeColor.length; i++) {
    if (typeColor[i][0] === type) {
      //background do elemento p mude para a cor dark ->[i][1][1]
      //background da imagem mude de cor pra light->[i][1][3]
      p.style.backgroundColor = typeColor[i][1][1]
    }
  }
}




