window.onload = init;

const btn1 = document.querySelector('#button1')
let x = 1;

function init() {
    btn1.addEventListener('click', function() {
        click()
    })

    function click() {
        console.log(x !== 1 ? x++*x++ : x+=3);
    }
}