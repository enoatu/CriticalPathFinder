var countcir=2,
    alfa=[],
    todraw =false,
    startfinish=null;
move();

function move(){
    $('.move').draggable();
}
$('#ori').on('click',function () {//created move elements
    $('#mv').append("<div class='move cir' id='cir " +countcir+"' onclick='getid(this)'>" +
        "<textarea placeholder='入力してください'></textarea></div>");
    countcir++;
    move();
});

$('#resetbutton').on('click',function () {
    location.reload();
});

$('#selectdraw').on('click',function () {
      if($('input[name=drawRadio]:checked').val() === 'on'){
    todraw=true;
    console.log("todraw : "+todraw);
    $('.move').draggable("disable");
    startfinish="start";
}else if($('input[name=drawRadio]:checked').val() === 'off'){
          todraw=false;
          console.log("todraw : "+todraw);
          $('.move').draggable("enable");
          startfinish=null;
}

});
var id;
function getid(a) {
    id=a.id;
    console.log("id : "+id);
}

// var cs=null,
//     csx=null,
//     csWidth=null,
//     csHeight=null,
//     center1=null,
//     cf=null,
//     cfx=null,
//     cfWidth=null,
//     cfHeight=null,
//     center2=null;

var cs       = document.getElementById('myCanvas'),
    ctx      = cs.getContext('2d');

ctx.strokeStyle = '#666';
ctx.lineWidth = 1;

var topoffset;
var leftoffset;
var topoffset_f;
var leftoffset_f;
var LR,TB,LR_f,TB_f;
console.log("cs.offsetTop : "+cs.offsetTop);
console.log("cs.offsetLeft : "+cs.offsetLeft);

    $('#mv').on("click",".move",function () {

    console.log("startfinish : "+startfinish);
    if(startfinish==="start"){//startpoint
        topoffset =  $(this).offset().top;
        leftoffset = $(this).offset().left;
         LR = topoffset-cs.offsetTop;
         TB = leftoffset-cs.offsetLeft;
         LR=

        console.log("start "+
                    " topoffset : "+topoffset+
                    " leftoffset : "+leftoffset
                    +" LR : "+LR+" TB : "+TB);

        startfinish="finish";

    }else if(startfinish==="finish"){
        topoffset_f =  $(this).offset().top;
        leftoffset_f = $(this).offset().left;
         LR_f =topoffset_f-cs.offsetTop;
         TB_f = leftoffset_f-cs.offsetLeft;

        console.log("finish ");
        console.log(

                        " leftoffset_f : "+leftoffset_f+
                        " LR_f : "+LR_f+" TB_f : "+TB_f);
        drawLine();
        startfinish=null;

    }else{
        console.log("else");
    }
});

var drawLine = function() {
    console.log("draw_now ");
    ctx.beginPath();
    // ctx.moveTo(leftOffset,topOffset);
    // ctx.lineTo(leftOffset_f,topOffset_f);
    // ctx.moveTo(LR ,TB);
    // ctx.lineTo(LR_f,TB_f);
    ctx.moveTo(0 ,0);
    ctx.lineTo(100,100);
    ctx.closePath();
    ctx.stroke();
};



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