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

var cs       = document.getElementById('myCanvas'),
    ctx      = cs.getContext('2d');
ctx.strokeStyle = '#666';
ctx.lineWidth = 8;

var topoffset;
var leftoffset;
var topoffset2;
var leftoffset2;
var X1,Y1,X2,Y2;
    var triLen=4;


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
            X1+=center_h; Y1+=center_h; X2 += center_h; Y2 += center_h;
            var Xm, Ym;
            var X1_is_larger;
            var Y1_is_larger;
            if (X1 <= X2) {
                Xm = (X2 + X1) / 2;
                X1_is_larger=false;

            } else {
                Xm = (X1 + X2) / 2;
                X1_is_larger=true;
            }
            if (Y1 <= Y2) {
                Ym = (Y2 + Y1) / 2;
                Y1_is_larger=false;
            } else {
                Ym = (Y1 + Y2) / 2;
                Y1_is_larger=true;
            }
            console.log("finish ");
            console.log(" leftoffset2 : " + leftoffset2 +
                " X2 : " + X2 + " Y2 : " + Y2+"Xm : "+Xm+"Ym : "+Ym);
            drawLine(X1,Y1,X2,Y2);
        var alfa=(Y2-Y1)/(X2-X1);//////////////////////

            var radians = Math.atan2(Y2-Y1, X2-X1);
            // ラジアンを角度に変換
            var degrees = radians * 180 / Math.PI;
            // 表示オブジェクトの角度に反映

        // drawTriImage(Xm,Ym,degrees);
            drawtri(triLen,Xm, Ym, alfa);
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

}
function drawTriImage(m,n,degr){

    ctx.beginPath();
    var img = new Image();
    img.src = "point.png";
    ctx.drawImage(img, m, n,40,40);
    // ctx.rotate(degr);
    ctx.closePath();
    ctx.stroke();

}

function drawtri(l,x0,y0,alf) {

        if(alf===0){
            alf=0.001;
        }

    console.log("l : "+l);
    console.log("x0 : "+x0);
    console.log("y0 : "+y0);
    console.log("alf : "+alf);
    var M=Math.sqrt(1/(Math.pow(alf,2)+1));
    var n1= l*alf*-M+y0; //branches
    var m1 = (y0-(l*alf*-M+y0))/alf+x0;
    var n2=l*alf*+M+y0;
    var m2=(y0-(l*alf*+M+y0))/alf+x0;

    var a1 = l*M+x0;//ちょうてん候補x
    var a2 = l*-M+x0;
    var b1 =alf*(l*M)+y0;//ちょうてんこうほy
    var b2 =alf*-(l*M)+y0;

    var topx,topy;
    if(Math.abs(X2-a1)>=Math.abs(X2-a2)){
       topx= a2;
    }else{topx=a1;}
    if(Math.abs(Y2-b1)>=Math.abs(Y2-b2)){
        topy= b2;
    }else{topy=b1;}


    console.log("m1 : "+m1);
    console.log("n1 : "+n1);
    console.log("m2 : "+m2);
    console.log("n2 : "+n2);
    console.log("alf : "+alf);
drawLine(topx,topy,m1,h-n1);
    drawLine(topx,topy,m2,h-n2);
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