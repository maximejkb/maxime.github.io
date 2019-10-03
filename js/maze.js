const WALL_CHAR = "█";
const FLOOR_CHAR = "@";
const PATH_CHAR = "<strong>@</strong>";

function maze(width, height) {
    var boardWidth = 2 * width + 1;
    var boardHeight = 2 * height + 1;
    var board = [];
    for (let y = 0; y < boardHeight; y++) {
        let row = [];
        for (let x = 0; x < boardWidth; x++) {
            // Create a grid of walls and floor spaces.
            if (x === 0 || y === 0 || x === boardWidth - 1 || y === boardHeight - 1 || x % 2 === 0 || y % 2 === 0) {
                row.push(1); // Is a wall.
            } else {
                row.push(0); // Is a floor.
            }
        }
        board.push(row);
    }
    // Stack holds: [[prevX, prevY], [x, y]].
    var stack = [[[1, 1], [1, 1]]];
    while (stack.length > 0) {
        let [x, y] = stack.pop()[1];
        board[y][x] = 2; // Is visited.
        let n = neighbors(x, y, boardWidth, boardHeight);
        // Remove visited neighbors.
        n = n.filter(neighbor => board[neighbor[1]][neighbor[0]] !== 2);
        if (n.length === 0) {
            if (stack.length !== 0) {
                // We are at a dead end. Peek at the beginning of the new passage.
                let [prev, next] = stack[stack.length -1];
                [x, y] = next;
                // If the new passage is connected to another, do nothing.
                if (board[y + 1][x] === 0 || board[y - 1][x] === 0 || board[y][x + 1] === 0 || board[y][x - 1] === 0) {
                    continue;
                }
                // Otherwise, ensure the connectedness of the maze by removing the
                // wall between the previous and the next.
                board[~~((prev[1] + y) / 2)][~~((prev[0] + x) / 2)] = 0
            }
            continue;
        }
        n.sort(function(a, b) {
            let rand = Math.floor(Math.random() * 3);
            if (rand === 0) return -1;
            if (rand === 1) return 0;
            if (rand === 2) return 1;
        });
        for (let i = 0; i < n.length; i++) {
            stack.push([[x, y], n[i]]);
        }
        let next = n[n.length - 1];
        board[~~((y + next[1]) / 2)][~~((x + next[0]) / 2)] = 0
    }
    // Clean up: reduce from [0 (passage), 1 (wall), 2 (visited cell)]
    // to [0 (floor), 1 (wall)].
    for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            if (board[y][x] !== 1) board[y][x] = 0;
        }
    }
    return board;
}

function neighbors(x, y, boardWidth, boardHeight) {
    let n = [];
    if (x > 1) n.push([x - 2, y]);
    if (x < boardWidth - 2) n.push([x + 2, y]);
    if (y > 1) n.push([x, y - 2]);
    if (y < boardHeight - 2) n.push([x, y + 2]);
    return n
}

function solve_maze(m, source, target) {
    var width = m[0].length;
    var height = m.length;

    var visited = [];
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            if (m[y][x] === 1) row.push(true);
            else row.push(false);
        }
        visited.push(row);
    }

    var stack = [];
    var prev = {source: source};
    var current = source;
    while (current[0] !== target[0] || current[1] !== target[1]) {
        let [x, y] = current;
        visited[y][x] = true;
        let adjacent = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
        for (let i = 0; i < adjacent.length; i++) {
            let [a_x, a_y] = adjacent[i];
            if (a_x > 0 &&  a_x < width - 1 && a_y > 0 && a_y < height - 1 && !visited[a_y][a_x]) {
                stack.push([a_x, a_y]);
                prev[[a_x, a_y]] = [x, y];
            }
        }
        current = stack.pop();
    }

    while (prev[current] !== current) {
        m[current[1]][current[0]] = 0.5;
        current = prev[current];
    }
}

function startSketch(e){
    var w = document.getElementById("width");
    var h = document.getElementById("height");
    if (!((e.type === 'keypress' && e.key === 'Enter') || e.type === 'touchstart') ||
        !h.value || !w.value || h.value < 1 || w.value < 1) {
        return;
    }

    w = w.value;
    h = h.value;
    var sketch = function(p) {
        p.setup = function() {
            let mazeW = p.displayWidth / 2;
            // Want display elements to be square.
            // Use width as fixed, let height be unbounded
            // to scroll. Need width-of-square * h pixels.
            let mazeH = (mazeW / w) * h;
            let canvas = p.createCanvas(mazeW, mazeH);
            canvas.parent("output");
            m = maze(w, h);
            solve_maze(m, [1, 1], [w * 2 - 1, h * 2 - 1]);
            p.noLoop();
        };

        p.draw = function() {
            p.noStroke();
            let boardW = m[0].length;
            let boardH = m.length;
            let blockY = p.height / boardH;
            let blockX = p.width / boardW;
            for (let y = 0; y < boardH; y++) {
                for (let x = 0; x < boardW; x++) {
                    if (m[y][x] === 0) p.fill(255);
                    if (m[y][x] === 0.5) p.fill(100);
                    if (m[y][x] === 1) p.fill(0);
                    p.rect(x * blockX, y * blockY, blockX, blockY)
                }
            }
        };
    };

    var maze_sketch = new p5(sketch);
}

document.addEventListener('keypress', startSketch);
document.addEventListener('touchstart', startSketch);

var m;
