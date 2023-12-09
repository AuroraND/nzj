var but1 = document.querySelector('#but1');
var but2 = document.querySelector('#but2');
var but3 = document.querySelector('#but3');
var but4 = document.querySelector('#but4');
const audio = new Audio('web/audio/summer.mp3');

but1.addEventListener('click', function () {
    location.href = 'web/record.html';
})
but2.addEventListener('click', function () {
    location.href = 'web/picture.html';
})
but3.addEventListener('click', function () {
    location.href = 'web/work.html';
})
but4.addEventListener('click', function () {
    location.href = 'web/animation.html';
})
var aud1 = document.querySelector('#audio1');
aud1.addEventListener('click', function () {
    audio.play();
    audio.loop = true;
});
var aud2 = document.querySelector('#audio2');
aud2.addEventListener('click', function () {
    audio.pause();
});