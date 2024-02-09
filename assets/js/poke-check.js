const tabs = document.querySelectorAll('.tab_btn')
const all_content = document.querySelectorAll('.content')
let pokemonSelected = []

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e)=>{

        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');

        var line = document.querySelector('.line')
        line.style.width = e.target.offsetWidth + "px"
        line.style.left = e.target.offsetLeft + "px"
        
        all_content.forEach(content=>{content.classList.remove('active')});

        all_content[index].classList.add('active')
    })
})

function getClickedElement() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('clicked');
}

const clickedElement = getClickedElement();

const header = document.querySelector('.header')
const about = document.querySelector('.content-about')
const progressBars = document.querySelectorAll(".progress-value")
const stats = document.getElementById("stats-numbers")


function loadPokemonItens(clickedElement) {
  pokeApi.getSinglePokemon(clickedElement).then((information) => {
      header.innerHTML += information[0]
      about.innerHTML += information[1]
      stats.innerHTML += information[3]
      for (let i = 0; i < progressBars.length; i++) {
        let stat = information[2][i]
        let actual_stat = Math.floor( Math.random() * stat + 1) //número aleatório entre o 0 e o stats sendo visto nesse ciclo
        manageProgress(progressBars[i], actual_stat, stat);   
    }
  })
}
loadPokemonItens(clickedElement)


