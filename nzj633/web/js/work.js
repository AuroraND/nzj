// 滚动特效 js

//动画播放时间
const animationTime = 1000;

//获取画布
const fullpage = document.querySelector('.fullpage');

//获取侧边栏按钮
const lis = document.querySelectorAll('.controls li');

// 网页窗口宽度
let viewwidth = null;

// 网页窗口高度
let viewheight = null;

// 屏幕索引
let index = 0;

// 检测是否在滚动
let roll = false;

// 鼠标滚动事件
const mousewheel = (e) => {

    // 判断是否在滚动
    if (!roll) {
        roll = true;

        // 判断向上滚动或向下滚动
        if (e.wheelDelta > 0 && index > 0) {
            index--;
            // 上
        } else if (e.wheelDelta < 0 && index < lis.length - 1) {
            index++;
            // 下
        }

        // 滚动屏幕
        rollScenes();
    }
}
function bt2() {
    // 判断向上滚动或向下滚动
    if (index > 0) {
        index--;
        // 上
        rollScenes();
    }
}
function bt3() {
    // // 判断向上滚动或向下滚动
    if (index < lis.length - 1) {
        index++;
        // 下
    }
    // 滚动屏幕
    rollScenes();
}
// 滚动视图
const rollScenes = () => {

    // 获取屏幕宽度
    viewwidth = document.body.clientWidth;

    // 获取屏幕高度
    viewheight = document.body.clientHeight;

    // 添加动画
    fullpage.classList.add("fullpage-animation");

    // 更改位置
    fullpage.style.top = -index * viewheight + 'px';

    // 更改侧边栏样式
    changeLocation(index);

    // 更改状态
    setTimeout(function () {
        roll = false;
        fullpage.classList.remove("fullpage-animation");
    }, animationTime);
    for (let i = 0; i < lis.length; i++) {
        let bg = document.getElementById('bg' + (i + 1));
        bg.style.cssText = "filter: brightness(100%)";
        let box = document.getElementById('box' + (i + 1));
        box.style.cssText = "filter: brightness(85%)";
        let bt = document.getElementById('bt');
        bt.style.cssText = "opacity:0";
        let pas1 = document.getElementById('pas1');
        pas1.style.cssText = "opacity:0";
        let pas2 = document.getElementById('pas2');
        pas2.style.cssText = "opacity:0";
        let pas3 = document.getElementById('pas3');
        pas3.style.cssText = "opacity:0";
        let pas4 = document.getElementById('pas4');
        pas4.style.cssText = "opacity:0";
        setTimeout(function () {
            bg.style.cssText = "filter: brightness(100%)";
            box.style.cssText = "filter: brightness(90%);box-shadow: 0 0 5px 2px inset khaki";
            bt.style.cssText = "opacity:0.2";
            pas1.style.cssText = "opacity:0.2";
            pas2.style.cssText = "opacity:0.2";
            pas3.style.cssText = "opacity:0.2";
            pas4.style.cssText = "opacity:0.2";
        }, 300)
        setTimeout(function () {
            bg.style.cssText = "filter: brightness(90%)";
            box.style.cssText = "filter: brightness(95%);box-shadow: 0 0 10px 4px inset khaki";
            bt.style.cssText = "opacity:0.4";
            pas1.style.cssText = "opacity:0.4";
            pas2.style.cssText = "opacity:0.4";
            pas3.style.cssText = "opacity:0.4";
            pas4.style.cssText = "opacity:0.4";
        }, 400)
        setTimeout(function () {
            bg.style.cssText = "filter: brightness(80%)";
            box.style.cssText = "filter: brightness(100%);box-shadow: 0 0 15px 6px inset khaki";
            bt.style.cssText = "opacity:0.6";
            pas1.style.cssText = "opacity:0.6";
            pas2.style.cssText = "opacity:0.6";
            pas3.style.cssText = "opacity:0.6";
            pas4.style.cssText = "opacity:0.6";
        }, 500)
        setTimeout(function () {
            bg.style.cssText = "filter: brightness(65%)";
            box.style.cssText = "filter: brightness(110%);box-shadow: 0 0 20px 8px inset khaki";
            bt.style.cssText = "opacity:0.8";
            pas1.style.cssText = "opacity:0.8";
            pas2.style.cssText = "opacity:0.8";
            pas3.style.cssText = "opacity:0.8";
            pas4.style.cssText = "opacity:0.8";
        }, 600)
        setTimeout(function () {
            bg.style.cssText = "filter: brightness(50%)";
            box.style.cssText = "filter: brightness(120%);box-shadow: 0 0 30px 10px inset khaki";
            bt.style.cssText = "opacity:1";
            pas1.style.cssText = "opacity:1";
            pas2.style.cssText = "opacity:1";
            pas3.style.cssText = "opacity:1";
            pas4.style.cssText = "opacity:1";
        }, 700)
    }
};

// 绑定点击事件
for (let i = 0; i < lis.length; i++) {

    // 给每个li加点击事件
    lis[i].onclick = function () {

        // 判断是否在滚动
        if (!roll) {
            roll = true;
            index = i;
            rollScenes();
        }
    }
}
// 改变li样式
function changeLocation(index) {
    for (var j = 0; j < lis.length; j++) {
        lis[j].className = '';
    }
    lis[index].className = 'active';
}
// 窗体改动事件
const getWindowInfo = () => {

    // 获取屏幕宽度
    viewwidth = document.body.clientWidth;

    // 获取屏幕高度
    viewheight = document.body.clientHeight;

    // 更改位置
    fullpage.style.top = -index * viewheight + 'px';

    // 屏幕块
    const section = document.querySelectorAll(".section");

    // 设置样式
    for (let i = 0; i < section.length; i++) {
        section[i].setAttribute("style", "width:" + document.body.clientWidth + "px;height:" + document.body.clientHeight + "px")
    }
};
// 窗体改变事件
window.addEventListener('resize', getWindowInfo);