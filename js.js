var countcir=2,
    alfa=[],
    todraw =false,
    startfinish=null;
move();

function move(){
    $('.move').draggable();
}
$('#ori').on('click',function () {
    $('#m').append("<div class='move cir'>" +
        "<textarea placeholder='入力してください' id='cir"+ countcir+"' onclick='getid(this)'></textarea></div>");
    countcir++;
    move();
});

$('#resetbutton').on('click',function () {
    location.reload();
});

$('#drawon').on('click',function () {
if($('input[name=drawRadio]:checked').val() === 'on'){
    todraw=true;
    console.log(todraw);
    $('.move').draggable("disable");
    startfinish=true;
}
});
var id;
function getid(a) {
    id=a.id;
    console.log("id : "+id);
}

var cs=null,
    csx=null,
    csWidth=null,
    csHeight=null,
    center1=null,
    cf=null,
    cfx=null,
    cfWidth=null,
    cfHeight=null,
    center2=null;

$('.move').on("click",function () {
    if(startfinish==="start"){//startpoint
        cs = document.get
        csx = cs.getContext('2d');
     csWidth  = cs.width;
     csHeight = cs.height;
     center1   = {
         x: csWidth / 2,
         y: csHeight / 2
     };
        startfinish="finish";
    }else if(startfinish==="finish"){
        cf = $(this);
        cfx = cf.getContext('2d');
        cfWidth  = cf.width;
        cfHeight = cs.height;
        center   = {
            x: csWidth / 2,
            y: csHeight / 2
        };
        startfinish=null;
    }
});


var drawLine = function() {
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0, center.y);
    ctx.lineTo(csWidth, center.y);
    ctx.closePath();
    ctx.stroke();
};
drawLine();

function startpoint() {

}

// // 変数定義
// var cs       = document.getElementById('myCanvas'),
//     ctx      = cs.getContext('2d'),
//     csWidth  = cs.width,
//     csHeight = cs.height,
//     center   = {
//         x: csWidth / 2,
//         y: csHeight / 2
//     };
//
// // 線の基本スタイル
// ctx.strokeStyle = '#666';
// ctx.lineWidth = 10;
//
// // 横線を引く
// var drawHorizontalLine = function() {
//     ctx.beginPath();
//     ctx.moveTo(0, center.y);
//     ctx.lineTo(csWidth, center.y);
//     ctx.closePath();
//     ctx.stroke();
// };
//
// // 縦線を引く
// var drawVerticalLine = function() {
//     ctx.beginPath();
//     ctx.moveTo(center.x, 0);
//     ctx.lineTo(center.x, csHeight);
//     ctx.closePath();
//     ctx.stroke();
// };
//
// drawHorizontalLine();
// drawVerticalLine();