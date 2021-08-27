function loadpk(namePoke = 1) {
  let url = `https://pokeapi.co/api/v2/pokemon/${namePoke}`

  //let searchInput = document.getElementById('search').innerHTML

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data.name)
      console.log(data.id)
    })
}

/* document.getElementById('search').onkeypress = loadpk(even) */
