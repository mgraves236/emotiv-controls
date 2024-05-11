let _touchStartX = 0;
let _touchEndX = 0;
let _touchStartY = 0;
let _touchEndY = 0;

let _player;
let nip = new Image();
nip.src = 'img/mietka.png';

let _audioVic = new Audio('audio/success-fanfare-trumpets-6185.mp3');
let _audioVicPlayed = false

let _playButton = {
    x: _canvas.width / 2 - 200 / 2,
    y:  _canvas.height / 2 + 200,
    width: 200,
    height: 80,
    string: "PLAY"
};

let _playAgainButton = {
    x: _canvas.width / 2 - 200,
    y:  _canvas.height / 2 + 200,
    width: 400,
    height: 80,
    string: "PLAY AGAIN"
};

function drawButton(button) {
    _ctx.fillStyle = "rgb(218,23,200)";
    _ctx.fillRect(button.x, button.y, button.width, button.height);
    _ctx.fillStyle = "#ffffff";
    _ctx.font = "60px Pixelify";
    _ctx.fillText(button.string, button.x + 30, button.y + 60);
}

function clickBtn(e) {
    let mousePos = getMousePos(e);
    if (isInside(mousePos, _playButton) || isInside(mousePos, _playAgainButton)) {
        startGame();
    }
}

function setUp() {
    _canvas.addEventListener('click', clickBtn);
    drawButton(_playButton);
    _audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

let loaded = false;
function startGame() {
    if (_audioState) _audio.play();
    loaded = false;
    _audioVicPlayed = false;
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    _ctx.font = "25px Pixelify";
    _ctx.fillText("Loading...", _playButton.x - 60, _playButton.y + 120);
    setTimeout(()=> {
        let promise = new Promise(function(resolve, reject) {
            generateMaze();
            resolve(()=> console.log('success')); // when successful
            reject(() => console.log('error'));  // when error
        });

        promise.then(
            function(value) {
                loaded = true;
                _player = new Player(grid[0]);
                _player.end = false
                _ctx.drawImage(nip, _canvas.width - 100, _canvas.height - 100, 100, 100);
                },
            function(error) { loaded = false; }
        );
    }, 0);

    _canvas.removeEventListener('click', clickBtn);
    window.requestAnimationFrame(mainGame);
}

let lastRenderTime = 0;
function mainGame(currentTime) {
    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 25) return;
    lastRenderTime = currentTime;


    if (!_player.end) _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    if (!loaded) {
        _ctx.font = "25px Pixelify";
        _ctx.fillText("Loading...", _playButton.x - 60, _playButton.y + 60);
    } else if (!_player.end) {
        drawMaze();
        drawAudioButton();
        _player.draw();
        _ctx.drawImage(nip, _canvas.width - 70, _canvas.height - 80, 60, 70);
    }

    if (_player.endGame() && !_player.end) {
        // _ctx.clearRect(_player.position.i, _player.position.j, 200,200);
        // _ctx.clearRect(_player.position.i*w, _player.position.j*w, 65,60)
        _player.end = true
    }

    if (_player.end) {
        _audio.pause();
        let image = new Image();
        image.src = 'img/finish.jpeg';
        _ctx.clearRect(_player.position.i*w-20, _player.position.j*w-20, 100,100)
        _player.drawEnd();
        image.onload = function(){
            _ctx.drawImage(image, 150, 80, _canvas.width-300, _canvas.height-300);
        }
        if (!_audioVicPlayed && _audioState) {
            _audioVic.play();
            _audioVicPlayed = true;
        }
        _canvas.addEventListener('click', clickBtn);
        drawButton(_playAgainButton);
        return;
    }
}

window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        _player.move(0,-1);
        _player.isWalking = true;
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        _player.move(0,1);
        _player.isWalking = true;
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        _player.move(-1,0);
        _player.isWalking = true;
        _player.left = true;
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        _player.move(1,0);
        _player.isWalking = true;
        _player.right = true;
    }

}, false);

window.addEventListener('touchstart', function (e) {
    _touchStartX = e.changedTouches[0].screenX;
    _touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener('touchend', function (e) {
    _touchEndX = e.changedTouches[0].screenX;
    _touchEndY = e.changedTouches[0].screenY;
    handleMove();
});

function getMousePos(event) {
    let rect = _canvas.getBoundingClientRect();
    let scaleX = _canvas.width / rect.width;
    let scaleY = _canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function isInside(pos, button) {
    return pos.x > button.x && pos.x < button.x + button.width
        && pos.y < button.y + button.height && pos.y > button.y;
}

function handleMove() {
    if (abs(_touchEndX - _touchStartX) > 50) {
        if (_touchEndX < _touchStartX) {

        } else {

        }
    }
    if (abs(_touchEndY - _touchStartY) > 50) {
        if (_touchEndY < _touchStartY) {

        } else {

        }
    }
}

function abs(number) {
    if (number < 0) {
        return -number;
    } else {
        return number;
    }
}

window.addEventListener("load", setUp);