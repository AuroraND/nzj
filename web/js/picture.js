// 雪花背景
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let w = window.innerWidth;
let h = window.innerHeight;
let nx = 0;
let ny = 0;
canvas.width = w;
canvas.height = h;
let num = 300;
let snows = [];
for (let i = 0; i < num; i++) {
    snows.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 7 + 1
    });
}
let move = () => {
    for (let i = 0; i < num; i++) {
        let snow = snows[i];
        snow.x += Math.random() * 2 + 1;
        snow.y += Math.random() * 2 + 2;
        if (snow.x > w)
            snow.x = 0;
        if (snow.y > h)
            snow.y = 0;
    }
}
let draw = () => {
    context.clearRect(0, 0, w, h);
    context.beginPath();
    context.fillStyle = 'rgb(255,255,255)';
    context.shadowColor = 'rgb(255,255,255)';
    context.shadowBlur = 10;
    for (let i = 0; i < num; i++) {
        let snow = snows[i];
        context.moveTo(snow.x, snow.y);
        context.arc(snow.x, snow.y, snow.r, 0, 2 * Math.PI);
    }
    context.fill();
    context.closePath();
    move();
}
canvas.addEventListener('mousemove', e => {
    let updateX = e.clientX - nx;
    let updateY = e.clientY - ny;
    nx = e.clientX;
    ny = e.clientY;
    for (let i = 0; i < num; i++) {
        let snow = snows[i];
        snow.x += updateX * 0.01;
        snow.y += updateY * 0.01;
    }
    draw()
})
draw();
setInterval(draw, 30);