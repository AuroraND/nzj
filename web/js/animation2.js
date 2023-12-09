(function () {
    const canvas = document.getElementById('canvas');
    const cxt = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particleNum = 300;
    const lineDistance = 120;
    let opacity = 0;
    let r = 50, g = 50, b = 50;
    let mark = [0, 0, 0];
    let particles = [];
    let interactionParticle = null;
    let flag1 = 1;
    class Particle {
        // velocityX/Y沿方向速度
        constructor(x, y, velocityX, velocityY, size, color) {
            this.x = x;
            this.y = y;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.color = color;
            this.size = size;
        }
        // 画粒子
        draw() {
            cxt.beginPath();
            cxt.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            cxt.fillStyle = this.color;
            cxt.fill();
        }
        // 更新位置
        update() {
            if (this.x < 0 || this.x > canvas.width)
                this.velocityX *= -1;
            if (this.y < 0 || this.y > canvas.height)
                this.velocityY *= -1;
            this.x += this.velocityX * .3;
            this.y += this.velocityY * .3;
            this.draw();
        }
    }
    // 获取随机数
    function getRandomAribitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    function setInterval1() {
        setInterval(
            function () {
                if (!mark[0]) r += 1;
                else r -= 5;
                if (!mark[1]) g += 3;
                else g -= 3;
                if (!mark[2]) b += 5;
                else b -= 1;
                if (r >= 255) mark[0] = 1;
                else if (r <= 50) mark[0] = 0;
                if (g >= 255) mark[1] = 1;
                else if (g <= 50) mark[1] = 0;
                if (b >= 255) mark[2] = 1;
                else if (b <= 50) mark[2] = 0;
            }, 100)
    }
    // 创建粒子
    function createParticles() {
        setInterval1();
        for (let i = 0; i < particleNum; i++) {
            let size = getRandomAribitrary(1, 1.5);
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let velocityX = getRandomAribitrary(-1, 1);
            let velocityY = getRandomAribitrary(-1, 1);
            opacity = 1 - size / 3;
            let color = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
            particles.push(new Particle(x, y, velocityX, velocityY, size + 2, color));
        }
    }
    // 连接粒子
    function connect() {
        for (let i = 0; i < particles.length; i++)
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                let distance = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
                if (distance < lineDistance) {
                    opacity = 1 - distance / lineDistance + 0.2;
                    cxt.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ',' + opacity + ')';
                    cxt.beginPath();
                    cxt.lineWidth = 2;
                    // 连接
                    cxt.moveTo(p1.x, p1.y);
                    cxt.lineTo(p2.x, p2.y);
                    cxt.stroke();
                }
            }
    }
    // 创建粒子动画
    function animate() {
        // 循环动画
        requestAnimationFrame(animate);
        // 清除画布
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
        })
        if (!flag1) {
            interactionParticle.update();
            for (let i = 0; i < particles.length; i++) {
                if (Math.sqrt(Math.pow(interactionParticle.x - particles[i].x, 2) + Math.pow(interactionParticle.y - particles[i].y, 2)) < lineDistance) {
                    cxt.beginPath();
                    cxt.strokeStyle = 'rgba(' + (r + 10) + ', ' + (g + 10) + ', ' + (b + 10) + ',' + 0.5 + ')';
                    cxt.lineWidth = 5;
                    cxt.moveTo(interactionParticle.x, interactionParticle.y);
                    cxt.lineTo(particles[i].x, particles[i].y);
                    cxt.stroke();
                    cxt.beginPath();
                    cxt.arc(interactionParticle.x, interactionParticle.y, lineDistance - 100, 0, Math.PI * 2);
                    cxt.strokeStyle = 'rgba(' + (r + 10) + ', ' + (g + 10) + ', ' + (b + 10) + ',' + 0.5 + ')';
                    cxt.stroke();
                }
            }
        }
        connect();
    }
    // 标记粒子
    let flag = [];
    for (let i = 0; i < particles.length; i++)
        flag[i] = 0;
    // 交互鼠标
    function bindevents() {
        canvas.addEventListener('mousemove', e => {
            flag1 = 0;
            if (!interactionParticle)
                interactionParticle = new Particle(e.x, e.y, 0, 0, 3, `rgba(${'255,0,250'},1)`);
        });
        canvas.addEventListener('mousemove', e => {
            interactionParticle.x = e.clientX;
            interactionParticle.y = e.clientY;
            for (let i = 0; i < particles.length; i++) {
                var x = interactionParticle.x;
                var y = interactionParticle.y;
                if (Math.sqrt(Math.pow(x - particles[i].x, 2) + Math.pow(y - particles[i].y, 2)) < lineDistance * 2 && flag[i] == 0) {
                    particles[i].velocityX *= -2;
                    particles[i].velocityY *= -2;
                    flag[i] = 1;
                }
                else if (Math.sqrt(Math.pow(x - particles[i].x, 2) + Math.pow(y - particles[i].y, 2)) > (lineDistance * 2)) {
                    flag[i] = 0;
                }
                if (Math.abs(particles[i].velocityX) > 4)
                    particles[i].velocityX = getRandomAribitrary(-1, 1);
                if (Math.abs(particles[i].velocityY) > 4)
                    particles[i].velocityY = getRandomAribitrary(-1, 1);
            }
        });
        canvas.addEventListener('mouseout', e => {
            flag1 = 1;
            interactionParticle.x = null;
            interactionParticle.y = null;
        });
    }
    bindevents();
    createParticles();
    animate();
}())