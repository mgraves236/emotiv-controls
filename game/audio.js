let _audio = new Audio('audio/cat singing drinking.mp3');
let audio_on = new Image();
audio_on.src = 'img/audio_on.png';
let audio_off = new Image();
audio_off.src = 'img/audio_off.png';

let _audioState = true;
let _audioButton = {
    x: _canvas.width - 50,
    y: 10,
    width: 40,
    height: 40,
}
window.addEventListener("load", () => _canvas.addEventListener('click', clickAudio));

function clickAudio(e) {
    let mousePos = getMousePos(e);
    if (isInside(mousePos, _audioButton)) {
        toggleAudio();
    }
}

function drawAudioButton() {
    if (_audioState) _ctx.drawImage(audio_on, _audioButton.x, _audioButton.y, 40, 40);
    if (!_audioState) _ctx.drawImage(audio_off, _audioButton.x, _audioButton.y, 40, 40);
}

function toggleAudio() {
    if (_audioState) {
        _audio.pause();
        _audioState = false;
    } else {
        _audio.play();
        _audioState = true;
    }
}