var w=$('#wrap').width();
var h=$('#wrap').height();
$('#myCanvas').attr('width', w).attr('height', h);

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

/////tool button //////

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

/////////////////////////

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
    c1x = cs.getContext('2d');
    c2x = cs.getContext('2d');
ctx.strokeStyle = '#666';
ctx.lineWidth = 8;

var topoffset;
var leftoffset;
var topoffset2;
var leftoffset2;
var X1,Y1,X2,Y2;
    var triLen=10;

var plusLen=
    // 130/100
1
;
var minusLen=
    // 100/130
1
;


var center_h=75;
console.log("cs.offsetTop : "+cs.offsetTop);
console.log("cs.offsetLeft : "+cs.offsetLeft);


$('#mv').on("click",".move",clickCircle);

    function clickCircle () {//click circle

        console.log("startfinish : " + startfinish);
        if (startfinish === "start") {//startpoint
            topoffset = $(this).offset().top;
            leftoffset = $(this).offset().left;
            X1 = leftoffset - cs.offsetLeft;//+
            Y1 = topoffset - cs.offsetTop;//-

            console.log("start " +
                " leftoffset : " + leftoffset +
                " topoffset : " + topoffset +
                " X1 : " + X1 + " Y1 : " + Y1);

            startfinish = "finish";

        } else if (startfinish === "finish") {
            topoffset2 = $(this).offset().top;
            leftoffset2 = $(this).offset().left;
            X2 = leftoffset2 - cs.offsetLeft;//-
            Y2 = topoffset2 - cs.offsetTop;//+
            var Xm, Ym;
            // if (X1 <= X2) {
            //     X1 *= plusLen;
            //     X2 *= minusLen;
            //     Xm = (X2 - X1) / 2;
            // } else {
            //     X1 *= minusLen;
            //     X2 *= plusLen;
            //     Xm = (X1 - X2) / 2;
            // }
            // if (Y1 <= Y2) {
            //     Y1 *= minusLen;
            //     Y2 *= plusLen;
            //     Ym = (Y2 - Y1) / 2;
            // } else {
            //
            //     Y1 *= plusLen;
            //     Y2 *= minusLen;
            //     Ym = (Y1 - Y2) / 2;
            // }
            console.log("finish ");
            console.log(" leftoffset2 : " + leftoffset2 +
                " X2 : " + X2 + " Y2 : " + Y2);

            drawLine(X1 + center_h, Y1 + center_h, X2 + center_h, Y2 + center_h);
            // drawtri(Xm, Ym, triLen);
            startfinish = "start";

        } else {
            console.log("else");
        }
    }

function drawLine(x1,y1,x2,y2) {
    console.log("draw_now ");
    ctx.beginPath();
    if($('input[name=damRadio]:checked').val() === 'on') {
        ctx.setLineDash([5,5]);}
    // ctx.moveTo(leftOffset,topOffset);
    // ctx.lineTo(leftOffset2,topOffset2);
    // ctx.moveTo(X ,Y);
    // ctx.lineTo(X2,Y2);
    ctx.moveTo(x1,y1);//Y,X
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();

    var a = (y2-y1)/(x2-x1);
    var minus_a=-a;

}

function drawtri(x,y,l) {
    c1x.beginPath();
    c1x.moveTo(x,y);//Y,X
    c1x.lineTo(a,b);
    c1x.closePath();
    c1x.stroke();

    c2x.beginPath();
    c2x.moveTo(x,y);//Y,X
    c2x.lineTo(a,b);
    c2x.closePath();
    c2x.stroke();
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