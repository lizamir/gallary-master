'use strict';
const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const PASSAGE = 'PASSAGE';
const GLUE = 'GLUE'

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
const GLUE_IMG = '<img src="img/gamer-purple.png">';


var gGamerPos;
var gBoard;
var gCounter = 0;
var gNumBalls = 2;
var gIntervalGlue;
var gInterval;
var isGlue = false



function init() {
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    gInterval = setInterval(addBalls, 3000);
    gIntervalGlue = setInterval(addGlue, 5000)
    renderBoard(gBoard);
}

function reset() {
    restart()
}

function restart() {
    clearInterval(gInterval)
    clearInterval(gIntervalGlue)
    gBoard = buildBoard()
    renderBoard(gBoard)
    gCounter = 0;
    gNumBalls = 2;
}


// Create the Matrix 10 * 12 
function buildBoard() {
    var board = createMat(10, 12);
    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = { type: FLOOR, gameElement: null }
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL
            }
            if ((i === 0 && j === 3) || (i === board.length - 1 && j === 3) ||
                (j === 0 && i === 3) || (j === board[0].length - 1 && i == 3)) {
                cell.type = PASSAGE
            }
            board[i][j] = cell
        }
    }
    // Place the gamer
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
    board[2][7].gameElement = BALL
    board[1][3].gameElement = BALL

    return board;
}

// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            if (currCell.type === FLOOR || currCell.type === PASSAGE) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';


            strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    // console.log('strHTML is:');
    // console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
    console.log(i, j);
    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;
    if (isGlue) return


    // Calculate distance to ake sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);


    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) ||
        targetCell.type === PASSAGE) {


        if (targetCell.gameElement === BALL) {
            collectMsg();

            gCounter++;
            gNumBalls--;

            var elSpan = document.querySelector('span');
            elSpan.innerHTML = `${gCounter}`;
            console.log('NumOfBall', gNumBalls, 'count', gCounter)

            if (gNumBalls === 0) {
                clearInterval(gInterval);
                console.log('winnn');
                winMsg();
            }

        } else if (targetCell.gameElement === GLUE) {
            isGlue = true;
            setTimeout(() => {
                isGlue = false;
            }, 3000);
        }
        //Move the gamer
        console.log(gGamerPos);
        //update the model
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null

        //update the DOM:
        renderCell(gGamerPos, '')

        //update the model
        gGamerPos = { i: i, j: j }
        targetCell.gameElement = GAMER

        //update the DOM:
        renderCell(gGamerPos, GAMER_IMG)

    } else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;

    console.log(i, j);
    switch (event.key) {
        case 'ArrowLeft':
            if (j === 0) moveTo(i, gBoard[0].length - 1);
            else moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            if (j === gBoard[0].length - 1) moveTo(i, 0);
            else moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            if (i === 0) moveTo(gBoard.length - 1, j);
            else moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            if (i === gBoard.length - 1) moveTo(0, j);
            else moveTo(i + 1, j);
            break;
    }


}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function addBalls() {

    var i = getRandomInt(1, 7);
    var j = getRandomInt(1, 7);

    gBoard[i][j].gameElement = BALL

    if (isEmptyCell({ i, j })) return
    renderCell({ i, j }, BALL_IMG)

    gNumBalls++
}

function addGlue() {
    var i = getRandomInt(1, 7);
    var j = getRandomInt(1, 7);
    var cell = { i, j }
    if (isEmptyCell(cell)) {
        gBoard[i][j].gameElement = GLUE
        cell = { i, j };
    }
    renderCell(cell, GLUE_IMG);
    setTimeout(function() {
        renderCell(cell, '');
    }, 3000);
}


function isEmptyCell(cell) {
    return (gBoard[cell.i][cell.j] === '')
}

function winMsg() {
    var elAudio = document.getElementById('win');
    elAudio.play();
}

function collectMsg() {
    var elAudio = document.getElementById('collect');
    elAudio.play();
}