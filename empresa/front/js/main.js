let ul = document.querySelector('nav .ul');

function openMenu(){
    ul.classList.add('open');
}
function closeMenu(){
    ul.classList.remove('open');
}

function darkMode() {
    var p = document.querySelector('#text');
    var element = document.body;
    element.classList.toggle("dark-mode");
    p.classList.toggle("dark-mode")
    var p1 = document.querySelector('#text1');
    p1.classList.toggle("dark-mode")
    var p2 = document.querySelector('#text2');
    p2.classList.toggle("dark-mode")
    var p3 = document.querySelector('#text3');
    p3.classList.toggle("dark-mode")
    var p4 = document.querySelector('#text4');
    p4.classList.toggle("dark-mode")
    var footer = document.querySelector('#footer')
    footer.classList.toggle("dark-mode")
    var p5 = document.querySelector('#text5')
    p5.classList.toggle("dark-mode")
    var p6 = document.querySelector('#text6')
    p6.classList.toggle("dark-mode")
    var p7 = document.querySelector('#text7')
    p7.classList.toggle("dark-mode")
}