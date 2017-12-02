var countcir=2;
var alfa=[];
move();

function move(){
    $('.move').draggable();
}
$('#ori').on('click',function () {
    $('#m').append("<div class='move cir'>" +
        "<textarea placeholder='入力してください' id='cir"+ countcir+"'></textarea></div>");
    countcir++;
    move();
});

$('#resetbutton').on('click',function () {
    location.reload();
});



// 変数定義
var cs       = document.getElementById('myCanvas'),
    ctx      = cs.getContext('2d'),
    csWidth  = cs.width,
    csHeight = cs.height,
    center   = {
        x: csWidth / 2,
        y: csHeight / 2
    };

// 線の基本スタイル
ctx.strokeStyle = '#666';
ctx.lineWidth = 10;

// 横線を引く
var drawHorizontalLine = function() {
    ctx.beginPath();
    ctx.moveTo(0, center.y);
    ctx.lineTo(csWidth, center.y);
    ctx.closePath();
    ctx.stroke();
};

// 縦線を引く
var drawVerticalLine = function() {
    ctx.beginPath();
    ctx.moveTo(center.x, 0);
    ctx.lineTo(center.x, csHeight);
    ctx.closePath();
    ctx.stroke();
};

drawHorizontalLine();
drawVerticalLine();