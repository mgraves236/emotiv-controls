let cat = new Image();
cat.src = 'img/cat.png';


class Player {

    constructor(cell) {
        this.position = {
            i: cell.i,
            j: cell.j
        }
        this.end = false;
        this.animate = 0;
        this.isWalking = false;
        this.right = false;
    }

    move(i, j) {
        if (this.isMove(i, j)) {
            this.position.i = this.position.i + i;
            this.position.j = this.position.j + j;
        }
    }

    isMove(i, j) {
        for (let k = 0; k < grid.length; k++) {
            if (this.position.i === grid[k].i && this.position.j === grid[k].j) {
                if (i === 1 && grid[k].walls[1] === true) {
                    return false;
                }
                if (i === -1 && grid[k].walls[3] === true) {
                    return false;
                }
                if (j === 1 && grid[k].walls[2] === true) {
                    return false;
                }
                if (j === -1 && grid[k].walls[0] === true) {
                    return false;
                }

            }
        }
        return true;
    }

    endGame() {
        return (this.position.i === grid[grid.length - 1].i && this.position.j === grid[grid.length - 1].j)
    }

    draw() {
        _ctx.save();
        if (this.isWalking) {
            if (this.animate % 10 === 0) {
                if (this.right) {
                    _ctx.drawImage(cat, 989, 0, 777, 832, this.position.i * w + 10, this.position.j * w, 60, 61);
                } else {
                    _ctx.drawImage(cat, 3153, 0, 777, 832, this.position.i * w + 10, this.position.j * w, 60, 61);
                }
            } else {
                if (this.right) {
                    _ctx.drawImage(cat, 2071, 0, 787, 832, this.position.i * w + 10, this.position.j * w, 60, 61);
                } else {
                    _ctx.drawImage(cat, 4261, 0, 787, 832, this.position.i * w + 10, this.position.j * w, 60, 61);
                }
            }
            this.right = false

            this.animate = this.animate + 1
            _player.isWalking = false;
        } else {
            _ctx.drawImage(cat, 0, 0, 669, 832, this.position.i * w + 20, this.position.j * w, 50, 61);
        }
        _ctx.restore();
    }

    drawEnd() {
        _ctx.save();
        let eat = new Image();
        eat.src = 'img/eat.png';
        if (this.animate % 10 === 0) {
            _ctx.drawImage(eat, 19, 0, 887, 825, this.position.i * w , this.position.j * w, 80, 80);
        } else {
            _ctx.drawImage(eat, 1065, 0, 887, 825, this.position.i * w , this.position.j * w, 80, 80);
        }

        this.animate = this.animate + 1;
        _ctx.restore();
    }
}