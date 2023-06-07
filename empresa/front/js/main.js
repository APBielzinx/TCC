let ul = document.querySelector('nav .ul');

function openMenu(){
    ul.classList.add('open');
}
function closeMenu(){
    ul.classList.remove('open');
}

function darkMode() {
    var p = document.querySelector('#SobreanossaEmpresa');
    var element = document.body;
    element.classList.toggle("dark-mode");
    p.classList.toggle("dark-mode")
    var p1 = document.querySelector('#SobreNos');
    p1.classList.toggle("dark-mode")

}
