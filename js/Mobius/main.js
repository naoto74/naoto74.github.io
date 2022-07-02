//かなり無理矢理
var ranges = Array.from(document.querySelectorAll(".CN > input[type=range]"));
ranges.forEach(e=>{
    e.max = 2;
    e.min = 0;
    e.step = 0.0001;
});
var autoparam = document.querySelector(".CN > input[type=checkbox]");

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;
var cw2 = cw/2;
var ch2 = ch/2;
var rad = Math.PI/180;
var time = 0;
class CN{
    constructor(x,y){
        this.x = x*1;
        this.y = y*1;
    }
    add(b){
        return new CN(this.x+b.x, this.y+b.y);
    }
    sub(b){
        return new CN(this.x-b.x, this.y-b.y);
    }
    mul(b){
        return new CN(this.x*b.x-this.y*b.y, this.x*b.y+this.y*b.x);
    }
    div(b){
        var r2 = b.x*b.x+b.y*b.y;
        return new CN((this.x*b.x+this.y*b.y)/r2, (-this.x*b.y+this.y*b.x)/r2);
    }
    static conj(a){
        return new CN(a.x, -a.y);
    }
    static exp(a){
        return new CN(Math.exp(a.x)*Math.cos(a.y),Math.exp(a.x)*Math.sin(a.y));
    }
    static log(a){
        var r2 = a.x*a.x + a.y*a.y;
        return new CN(0.5*Math.log(r2), Math.atan2(a.y,a.x));
    }
    static pow(a, b){
        return CN.exp(CN.log(a).mul(b));
    }
    static abs(a){
        return Math.sqrt(a.x*a.x+a.y*a.y);
    }
    static arg(a){
        return Math.atan2(a.y,a.x);
    }
}
var Points = [];
var circleN = 6;
var lineN = 300;

for(var i=0;i<circleN;i++){
    var x1 = Math.cos(i/circleN*Math.PI*2);
    var y1 = Math.sin(i/circleN*Math.PI*2);
    for(var j=0;j<lineN;j++){
        var x2 = Math.cos(j/lineN*Math.PI*2);
        var y2 = Math.sin(j/lineN*Math.PI*2);
        Points.push(new CN(x1+x2/2,y1+y2/2));
    }
}

circleN++;
for(var j=0;j<lineN;j++){
    var x2 = Math.cos(j/lineN*Math.PI*2);
    var y2 = Math.sin(j/lineN*Math.PI*2);
    Points.push(new CN(x2/2,y2/2));
}
circleN++;
for(var j=0;j<lineN;j++){
    var x2 = Math.cos(j/lineN*Math.PI*2);
    var y2 = Math.sin(j/lineN*Math.PI*2);
    Points.push(new CN(x2*1.5,y2*1.5));
}
function loop(){
    context.clearRect(0,0,cw,ch);
    if(autoparam.checked){
        time+=rad/128;
        ranges[0].value = Math.sin(time*1)+1;
        ranges[1].value = Math.sin(time*2)+1;
        ranges[2].value = Math.sin(time*4)+1;
        ranges[3].value = Math.sin(time*8)+1;
        ranges[4].value = Math.sin(time*16)+1;
        ranges[5].value = Math.sin(time*32)+1;
        ranges[6].value = Math.sin(time*64)+1;
        ranges[7].value = Math.sin(time*128)+1;
    }
    var a = new CN(ranges[0].value, ranges[1].value);
    var b = new CN(ranges[2].value, ranges[3].value);
    var c = new CN(ranges[4].value, ranges[5].value);
    var d = new CN(ranges[6].value, ranges[7].value);
    for(var i=0;i<circleN;i++){
        context.beginPath();
        context.fillStyle = "hsla("+(i/circleN*360)+",100%,50%,0.5)";
        for(var j=0;j<lineN;j++){
            var p = Points[i*lineN+j].mul(a).add(b).div(Points[i*lineN+j].mul(c).add(d))
            if(j==0) context.moveTo((p.x*cw2)/5+cw2,(p.y*ch2)/5+ch2);
            context.lineTo((p.x*cw2)/5+cw2,(p.y*ch2)/5+ch2);
        }
        context.fill();
        context.closePath();
    }
    requestAnimationFrame(loop);
}
loop();