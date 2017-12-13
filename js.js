var w=$('#wrap').width();
var h=$('#wrap').height();
var startArr=["x"];
var endArr=["x"];
var isDam=["x"];

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
    $('#mv').append("<div class='move cir make' id='" +countcir+"' onclick='getid(this)'><span>" +
        // "<textarea placeholder='入力してください'></textarea></div>");
        +countcir+"</span></div>");

    countcir++;
    disp_start_end();
    move();
});

function disp_start_end(){
    if(countcir>2){
        $($('.start').find('span')).html("1");

        $($('.goal').find('span')).html(countcir);
        $('.goal').attr('id', countcir);    }

}

/////tool button //////cir=dragabble

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
ctx.lineWidth = 4;

var topoffset;
var leftoffset;
var topoffset2;
var leftoffset2;
var X1,Y1,X2,Y2;
    var triLen=14;


var center_h=85;
console.log("cs.offsetTop : "+cs.offsetTop);
console.log("cs.offsetLeft : "+cs.offsetLeft);


$('#mv').on("click",".move",clickCircle);

    function clickCircle () {//click circle
    var startId,endId;

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
           startId= $(this).attr("id")
            startArr.push(startId);
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


        // drawTriImage(Xm,Ym,degrees);
            drawtri(triLen,Xm, Ym, alfa);
            startfinish = "start";

             endId=$(this).attr("id"); endArr.push();
            dispTextArea(Xm-80,Ym-40,startId,endId);
        } else {
            console.log("else");
        }


    }


function drawLine(x1,y1,x2,y2) {
    console.log("draw_now ");
    ctx.beginPath();
    if($('input[name=damRadio]:checked').val() === 'on') {
        ctx.setLineDash([5,5]);
        isDam.push(true);
    }else{
        ctx.setLineDash([0,0]);
      isDam.push(false);
    }

    // ctx.moveTo(leftOffset,topOffset);
    // ctx.lineTo(leftOffset2,topOffset2);
    // ctx.moveTo(X ,Y);
    // ctx.lineTo(X2,Y2);
    ctx.moveTo(x1,y1);//Y,X
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
}


function drawtri(l,x0,y0,alf) {

        if(alf===0){
            alf=0.0001;
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
    if(Math.abs(X2-a1)>=Math.abs(X2-a2)){//向き
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
    console.log("topx : "+topx);
    console.log("topy : "+topy);
var line1={x:m1,y:n1};
var line2={x:m2,y:n2};
    console.log("line1 : "+line1.x+" y "+line1.y);
    console.log("line2 : "+line2.x+" y "+line2.y);
    drawLine(topx,topy,line1.x,line1.y);
    drawLine(topx,topy,line2.x,line2.y);
}




function dispTextArea(Xm,Ym,startId,endId) {
    $('#wrap').append("<div class='dayTextArea' id='" +startId+'_'+endId+"' onclick='getid(this)' style='" +
        "position: absolute;" +
        "left:"+Xm+"px;"+
        "top:"+Ym+"px;"+
       "'>"+
    "<textarea placeholder='入力してください'></textarea></div>")
}


$('#calcButton').on("click",function () {
        console.log("ARR=>[[");
    for(var i=1;i<startArr.length;i++){
        console.log(i);
        console.log("startArr[i] : "+startArr[i]);
        console.log("endArr[i]: "+endArr[i]);
        console.log("");
        dayarr.;
    }

    console.log("]]");
});
/////////////////////////////////////////////////////////


var dayarr=[];

function inNum(start,end) {
    var cnct={s:start,e:end};

    !function() {numArr.push(cnct);}
}


