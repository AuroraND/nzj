var audioPlayer = new Audio('audio/bg.mp3');
audioPlayer.loop = true;
window.addEventListener('beforeunload', function () {
    // 在用户离开页面之前，记录当前音乐的播放位置
    localStorage.setItem('musicPosition', audioPlayer.currentTime);
});
var musicPosition = localStorage.getItem('musicPosition');
if (musicPosition) {
    // 将当前音乐的播放位置设置为前一个页面的位置
    audioPlayer.currentTime = musicPosition;
    audioPlayer.play();
}