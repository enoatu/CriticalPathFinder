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
          $('.move').draggable();
          startfinish=null;
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

$('#mv').on("click",".move",function () {
    console.log("startfinish : "+startfinish);
    if(startfinish==="start"){//startpoint
        console.log("start ");
        // cs = document.getElementById(getid(this));
        cs= document.getElementById('myCanvas');
        console.log("this : "+this);
         csx = cs.getContext('2d');
     csWidth  = cs.width;
     csHeight = cs.height;
     center1   = {
         x: csWidth / 2,
         y: csHeight / 2
     };
        startfinish="finish";
    }else if(startfinish==="finish"){
        console.log("finish : ");
        cf = document.getElementById(getid(this));
        // cfx = cf.getContext('2d');
        cfWidth  = cf.width;
        cfHeight = cf.height;
        center2   = {
            x: cfWidth / 2,
            y: cfHeight / 2
        };
        drawLine();
        startfinish=null;
    }else{
        console.log("else");
    }
});


var drawLine = function() {
    
    cfx.strokeStyle = '#666';
    cfx.lineWidth = 10;
    cfx.beginPath();
    cfx.moveTo(center1.x, center1.y);
    cfx.lineTo(center2, center2.y);
    cfx.closePath();
    cfx.stroke();
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