documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellWidth = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;
blockWidth = 0.6 * documentWidth;
blockHeight = 0.3 * documentWidth;
blockFontSize = 0.1 * documentWidth;

function getPosTop(i, j) {
    return cellSpace + (cellWidth + cellSpace) * i;
}

function getPosLeft(i, j) {
    return cellSpace + (cellWidth + cellSpace) * j;
}

function getBackgroundColor(num) {
    switch (num) {
        case 2:
            return "#eee4de";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;

        default:
            return "black";
    }
}

function getColor(num) {
    if (num <= 4) {
        return "#5a5652";
    }

    return "white";
}

function noSpace() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }

    return true;
}

function noMove() {
    if (canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown()) {
        return false;
    }

    return true;
}

function noBlockHorizontal(row, col1, col2, board) {
    for (let h = col1 + 1; h < col2; h++) {
        if (board[row][h] != 0) {
            return false;
        }
    }

    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for (let v = row1 + 1; v < row2; v++) {
        if (board[v][col] != 0) {
            return false;
        }
    }

    return true;
}


function canMoveLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveUp() {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveDown() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }

    return false;
}