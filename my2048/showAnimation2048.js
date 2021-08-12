function showNumberAnimation(i, j, randNum) {
    var numberCell = $("#number-cell-" + i + "-" + j);  //注意#号不要忘了
    numberCell.css("background-color", getBackgroundColor(randNum));
    numberCell.css("color", getColor(randNum));
    numberCell.text(randNum);

    numberCell.animate({
        width: cellWidth, //不设定宽度和高度，那么背景颜色就是无效
        height: cellWidth,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(row1, col1, row2, col2) {
    var numberCell = $("#number-cell-" + row1 + "-" + col1);
    // console.log(numberCell);
    numberCell.animate({
        top: getPosTop(row2, col2),
        left: getPosLeft(row2, col2)
    }, 200);
}
