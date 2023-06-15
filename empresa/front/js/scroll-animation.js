 const scrollAnima = document.querySelectorAll('[data-anima="scroll"')

 function animarScroll(){
const topoItem = scrollAnima.getBoundingClientReact()

console.log(topoItem)
 }

 window.addEventListener('scroll', animarScroll);