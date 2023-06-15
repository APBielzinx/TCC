const scrollAnima = document.querySelector('[data-anima="scroll"]')

const metadeWindow = window.innerHeight * 3.5

console.log(metadeWindow)

function animarScroll(){
    const topoItem = scrollAnima.getBoundingClientRect().top

    const itemVisivel =  topoItem - metadeWindow < 0

    if(itemVisivel){
        scrollAnima.classList.add('show-button')
    } else {
        scrollAnima.classList.remove('show-button')
    }

//console.log(topoItem)
 }

 window.addEventListener('scroll', animarScroll);