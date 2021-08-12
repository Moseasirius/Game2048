var board = [];
var score = 0;
var hasMerged = [];

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function () {
    preForMobile();
    startGame();
});

function preForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellWidth = 100;
        cellSpace = 20;
        blockWidth = 300;
        blockHeight = 150;
        blockFontSize = 50;
    }
    $("#grid-container").css("width", gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("height", gridContainerWidth - 2 * cellSpace);
    $("#grid-container").css("padding", cellSpace);
    $("#grid-container").css("border-radius", 0.02 * gridContainerWidth);

    $(".grid-cell").css("width", cellWidth);
    $(".grid-cell").css("height", cellWidth);
    $(".grid-cell").css("border-radius", 0.02 * cellWidth);

}

function startGame() {
    //初始化棋盘格（包括位置、数据以及得分）
    init();

    // 随机产生两个数字
    generateOneNumber();
    generateOneNumber();

    // //清除游戏结束弹框
    // $(".block").remove();
}

function init() {
    //初始化棋盘格位置
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            // console.log(gridCell);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    //初始化棋盘格数据
    for (let i = 0; i < 4; i++) {
        board[i] = [];
        hasMerged[i] = [];
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasMerged[i][j] = false;
        }
    }

    //更新棋盘格数据到前端页面
    updateBoardView(board);

    //初始化得分
    score = 0;

    //更新得分到前端页面
    updateScore(score);
}

function generateOneNumber() {
    //先判断是否有空间给你生成数字
    if (noSpace()) {
        return false;
    }

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    // //判断位置是否可用
    // while(true){  //此处为死循环，当计算机随机的位置一直没有满足条件时，就会在这个地方停留过久
    //     if (board[randx][randy] == 0){
    //         break;
    //     }

    //     var randx = parseInt(Math.floor(Math.random() * 4));
    //     var randy = parseInt(Math.floor(Math.random() * 4));
    // }

    //判断位置是否可用（优化算法）
    var times = 0;
    while (times < 50) { //先给计算机50次机会随机生成一个位置
        if (board[randx][randy] == 0) {
            break;
        }

        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }

    if (times >= 50) {
        outer: for (let i = 0; i < 4; i++) {  //当计算机随机50次内无法生成有效的位置时，人为的找一个位置给它
            for (let j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                    break outer;  //在最外层循环添加outer标识符，可以是用break outer直接跳到外层
                }
            }
        }
    }

    //在可用的位置随机生成一个数字（2或者4）
    var randomNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randomNumber;

    //将所产生的随机数，更新到前端页面——下面提供了两种显示方式，一个是统一显示，一个是自定义动画显示
    // updateBoardView();
    showNumberAnimation(randx, randy, randomNumber);
}

function isGameOver() {
    // $(".block").remove();
    $("body").append('<div class="block" id="game-over-block" onclick = "startGame()"></div>');
    var gameOverBlock = $("#game-over-block");
    if (noSpace() && noMove()) {
        // $(".block").css("font-size", blockFontSize + "px"); //注意要加上单位 px
        // $(".block").css("line-height", blockHeight + "px");
        gameOverBlock.css("font-size", blockFontSize + "px"); //注意要加上单位 px
        gameOverBlock.css("line-height", blockHeight + "px");
        gameOverBlock.css("background-color", "saddlebrown");
        gameOverBlock.css("color", "white");
        gameOverBlock.text("重新开始");

        gameOverBlock.animate({ //游戏结束的弹框效果
            width: blockWidth,
            height: blockHeight
        }, 100);

    } else {
        gameOverBlock.css("width", "0px");
        gameOverBlock.css("height", "0px");
    }
}

function updateBoardView() {

    $(".number-cell").remove(); /*不加这句清除语句，会导致下一次显示随机数的时候，
    上一次显示的随机数还在，尽管上一次随机数所在的位置的值已经为0 */

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');  //此处要注意
            var numberCell = $("#number-cell-" + i + "-" + j);
            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + cellWidth / 2);
                numberCell.css("left", getPosLeft(i, j) + cellWidth / 2);
            } else {
                numberCell.css("width", cellWidth);
                numberCell.css("height", cellWidth);
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getBackgroundColor(board[i][j]));
                numberCell.css("color", getColor(board[i][j]));
                numberCell.text(board[i][j]);
            }

            hasMerged[i][j] = false;
        }
    }
    $(".number-cell").css("line-height", cellWidth + "px"); //注意要加上单位 px
    $(".number-cell").css("font-size", 0.6 * cellWidth + "px");
}

function updateScore(score) {
    $("#score").text(score);
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:  //move left
            event.preventDefault(); /* 加入 event.preventDefault() 解决由于电
        脑屏幕分辩导致右侧出现滚动条时，按上下键时出现浏览器的滚动条也会随之动作的问题 */
            moveLeft();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 300);
            break;

        case 38:  //move up
            event.preventDefault();
            moveUp();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 300);
            break;

        case 39:  //move right
            event.preventDefault();
            moveRight();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 300);
            break;

        case 40:  //move down
            event.preventDefault();
            moveDown();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 300);
            break;

        default:
            break;
    }
});

document.addEventListener("touchstart", function (event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

//解决手机端浏览器下滑手势误触发刷新的问题：用户向下滑动，出现格子不往下移动，页面却刷新了
document.addEventListener("touchmove", function (event) {
    event.preventDefault();
});

document.addEventListener("touchend", function (event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltax = endX - startX;
    var deltay = endY - startY;

    //解决误触发的问题：用户只是点击一下屏幕，却出现格子移动的情况
    if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth) {
        return;
    }

    if (Math.abs(deltax) >= Math.abs(deltay)) { //move to the x axis
        if (deltax > 0) {
            //move right
            event.preventDefault();
            moveRight();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 300);
        } else {
            //move left
            event.preventDefault();
            moveLeft();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 300);
        }

    } else {  //move to the y axis
        if (deltay > 0) {
            //move down
            event.preventDefault();
            moveDown();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 300);
        } else {
            //move up
            event.preventDefault();
            moveUp();
            setTimeout("generateOneNumber()", 210);
            setTimeout("isGameOver()", 300);
        }
    }
});

function moveLeft() {
    if (!canMoveLeft()) {
        return false;
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, i, k);

                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasMerged[i][k]) {
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, i, k);
                        score += board[i][k];
                        updateScore(score);
                        hasMerged[i][k] = true;
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);   //将数据更新到前端页面
    return true;
}

function moveRight() {
    if (!canMoveRight()) {
        return false;
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, i, k);

                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasMerged[i][k]) {
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, i, k);
                        score += board[i][k];
                        updateScore(score);
                        hasMerged[i][k] = true;
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp()) {
        return false;
    }

    for (let j = 0; j < 4; j++) {   //先定列，再定行或者先定行再定列都行
        for (let i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, k, j);

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasMerged[k][j]) {
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, k, j);
                        score += board[k][j];
                        updateScore(score);
                        hasMerged[k][j] = true;
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown()) {
        return false;
    }

    for (let j = 0; j < 4; j++) {   //先定列，再定行或者先定行再定列都行
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, k, j);

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasMerged[k][j]) {
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        showMoveAnimation(i, j, k, j);
                        score += board[k][j];
                        updateScore(score);
                        hasMerged[k][j] = true;
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

