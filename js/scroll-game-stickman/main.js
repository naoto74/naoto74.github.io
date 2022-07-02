var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

canvas.style.imageRendering="pixelated";
context.imageSmoothingEnabled = false;
function sctouchF(cssSelector,start,end){
    console.log(`document.querySelector("${cssSelector}")`);
    var Telm = document.querySelector(cssSelector);
    Telm.addEventListener("touchstart",start,{passive:true});
    Telm.addEventListener("touchend",end,{passive:true});
}

var rad = 3.14/180;
class Stickman{
	constructor(x,y,width){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 90/50*width;
        this.time = 0;
        this.color = "#000";
        this.speed = 3;
        this.linewidth = 2;
    }
    draw(context){
        this.height = 90/50*this.width;
        context.strokeStyle = this.color;
        context.lineWidth = this.linewidth;
        var muki = Math.abs(this.speed)==this.speed;//true:右,false:左
        context.save();
        context.translate(this.x+this.width/2,0);
        context.scale(muki?1:-1,1);
        context.translate(-this.x-this.width/2,0);
        var animationTime = (muki?-1:1)*this.time/20;
        
        var AngleF = (defaultAngle,angle,length)=>defaultAngle+(Math.sin(animationTime+angle*rad)+1.0)*length;
        var SizeF = size => size/50*this.width;
        var headR = SizeF(10);
        var bodyAngle = 100;
        var armRightAngle = AngleF(  90,0,20);
        var armRightAngle2 = AngleF(-30,0,80);
        var armLeftAngle =  AngleF(  90,180,20);
        var armLeftAngle2 = AngleF( -30,180,80);
        var legRightAngle = AngleF(  20,0,50);
        var legRightngle2 = AngleF(  80,70,50);
        var legLeftAngle = AngleF(   20,180,50);
        var legLeftAngle2 = AngleF(  80,250,50);


        var headX = this.x+this.width/2;
        var headY = this.y+headR + Math.sin(this.time/10)+SizeF(5.0);
        var neckLineX = headX;
        var neckLineY = headY + SizeF(15);

        var armRightX = neckLineX+Math.cos(armRightAngle*rad)*SizeF(20);
        var armRightY = neckLineY+Math.sin(armRightAngle*rad)*SizeF(20);

        var armRight2X = armRightX+Math.cos(armRightAngle2*rad)*SizeF(10);
        var armRight2Y = armRightY+Math.sin(armRightAngle2*rad)*SizeF(10);

        var armLeftX = neckLineX+Math.cos(armLeftAngle*rad)*SizeF(20);
        var armLeftY = neckLineY+Math.sin(armLeftAngle*rad)*SizeF(20);

        var armLeft2X = armLeftX+Math.cos(armLeftAngle2*rad)*SizeF(10);
        var armLeft2Y = armLeftY+Math.sin(armLeftAngle2*rad)*SizeF(10);

        var bodyX = neckLineX+Math.cos(bodyAngle*rad)*SizeF(30);
        var bodyY = neckLineY+Math.sin(bodyAngle*rad)*SizeF(30);

        var legRightX = bodyX+Math.cos(legRightAngle*rad)*SizeF(15);
        var legRightY = bodyY+Math.sin(legRightAngle*rad)*SizeF(15);

        var legRight2X = legRightX+Math.cos(legRightngle2*rad)*SizeF(15);
        var legRight2Y = legRightY+Math.sin(legRightngle2*rad)*SizeF(15);

        var legLeftX = bodyX+Math.cos(legLeftAngle*rad)*SizeF(15);
        var legLeftY = bodyY+Math.sin(legLeftAngle*rad)*SizeF(15);

        var legLeft2X = legLeftX+Math.cos(legLeftAngle2*rad)*SizeF(15);
        var legLeft2Y = legLeftY+Math.sin(legLeftAngle2*rad)*SizeF(15);

        
        /*context.beginPath();
        context.strokeRect(this.x,this.y,this.width,this.height);
        context.stroke();*/
        
        context.beginPath();
        context.arc(headX, headY, headR, 0, Math.PI*2);
        context.stroke();

        context.beginPath();

        context.moveTo(headX, headY);
        context.lineTo(neckLineX, neckLineY);

        context.moveTo(neckLineX, neckLineY);
        context.lineTo(armRightX, armRightY);
        context.lineTo(armRight2X, armRight2Y);

        context.moveTo(neckLineX, neckLineY);
        context.lineTo(armLeftX, armLeftY);
        context.lineTo(armLeft2X, armLeft2Y);
        
        context.moveTo(neckLineX, neckLineY);
        context.lineTo(bodyX, bodyY);
        context.lineTo(legRightX, legRightY);
        context.lineTo(legRight2X, legRight2Y);
        context.moveTo(bodyX, bodyY);
        context.lineTo(legLeftX, legLeftY);
        context.lineTo(legLeft2X, legLeft2Y);

        context.stroke();
        context.save();
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(headX, headY, headR, 0, 6.28);
        context.fill();
        context.restore();
        
        context.restore();
        this.time+=this.speed;
    }
    static widthToheight(width){
        return 90/50*width;
    }
}
var ImageData = {
    Block:"Block.png",
    Dirt:"Dirt.png",
    Stone:"Stone.png",
    Tree1:"Tree1.png"
};
for(var i in ImageData){
    ImageData[i] = (function(src){
    var img = new Image();
    img.src = src;
    return img;
    })(ImageData[i]);
}
class Rect{
    constructor(x,y,w,h){
        Object.assign(this,{x,y,w,h});
    }
    isinRect(A){
        var B = this;
		if(B.x < A.x+A.w && A.x < B.x+B.w){
			if(B.y < A.y+A.h && A.y < B.y+B.h){
				return true;
			}
		}
        return false;
    }
    addXY(x,y){
        return new Rect(this.x+x,this.y+y,this.w,this.h);
    }
    draw(color,cx,cy){
        var x = (this.x+cx||0)|0;
        var y = (this.y+cy||0)|0;
        if(typeof color == "string"){
            context.fillStyle = color;
            context.fillRect(x, y, this.w, this.h);
            context.fill();
        }else{
            context.drawImage(color,x, y, this.w, this.h);
        }
    }
}
class Mario extends Rect{
    constructor(x,y,w){
        super(x,y,w,Stickman.widthToheight(w));
        this.stickman = new Stickman(width/2-w/2, height/2-Stickman.widthToheight(w)/2,w);
        this.stickman.time = 0;
        this.stickman.color = "#ff0";
        this.stickman.linewidth = 5;
        this.stickman.speed = 0;
        this.speed = 1;
        this.dx = 0;
        this.dy = 0;
        this.keys = {};
        addEventListener("keydown",e=>{
            this.keys[e.key] = true;
        },{passive:true});
        addEventListener("keyup",e=>{
            this.keys[e.key] = false;
        },{passive:true});
        sctouchF(".smartPhoneKeyBoard .keyW",()=>this.keys["w"] = true,()=>this.keys["w"] = false);
        sctouchF(".smartPhoneKeyBoard .keyA",()=>this.keys["a"] = true,()=>this.keys["a"] = false);
        sctouchF(".smartPhoneKeyBoard .keyS",()=>this.keys["s"] = true,()=>this.keys["s"] = false);
        sctouchF(".smartPhoneKeyBoard .keyD",()=>this.keys["d"] = true,()=>this.keys["d"] = false);
    }
    update(blocks){
        this.stickman.draw(context);
        if(!blocks.isinBlocks(this.addXY(this.dx,0)))this.x += this.dx;else this.dx /= 100;
        if(!blocks.isinBlocks(this.addXY(0,this.dy))){this.y += this.dy;}else this.dy /= 100;
        this.dy += this.speed/2;
        if(this.keys["w"]||this.keys["ArrowUp"]){
            if(blocks.isinBlocks(this.addXY(0,1))){
                this.dy -= this.speed*10;
            }
        }
        if(this.keys["s"]||this.keys["ArrowDown"]){
            this.dy += this.speed;
        }
        if(this.keys["a"]||this.keys["ArrowLeft"]){
            this.dx -= this.speed;
        }
        if(this.keys["d"]||this.keys["ArrowRight"]){
            this.dx += this.speed;
        }
        if(this.keys["l"]){
            if(!blocks.isinBlocks(this.addXY(this.dx,1)))this.dx = 0;else this.dx *= 0.3;
        }
        this.stickman.speed = this.dx*0.5;
	    this.dx *= 0.9;
    }
}
class Blocks{
    constructor(){
        this.blocks = [];
    }
    update(cx,cy){
        var canvasRectObj = new Rect(-cx,-cy,width,height);
        this.blocks.forEach(e=>{
            if(canvasRectObj.isinRect(e))e.draw(ImageData[e.img],cx,cy);
        });
    }
    add(x,y,w,h,blockName){
        var block = new Rect(x,y,w,h);
        block.img = blockName;
        this.blocks.push(block);
    }
    isinBlocks(rect){
        for(var i=0;i<this.blocks.length;i++){
            if(this.blocks[i].isinRect(rect)){
                return true;
            }
        }
        return false;
    }
}
var mario;
var blocks = new Blocks();
(function(map){
    for(var y=0;y<map.length;y++){
        for(var x=0;x<map[y].length;x++){
            if(map[y][x] == "M"){mario = new Mario(x*41,y*41,30)}
            else if(map[y][x] == "0"){blocks.add(x*41,y*41,41,41,"Dirt")}
            else if(map[y][x] == "1"){blocks.add(x*41,y*41,41,41,"Block")}
            else if(map[y][x] == "2"){blocks.add(x*41,y*41,41,41,"Stone")}
            else if(map[y][x] == "3"){blocks.add(x*41,y*41,41,41,"Tree1")};
        }
    }
})([
    "0                                                            33333333                                     0",
    "0                                                           3                                             0",
    "011                                                       3                                               0",
    "01111      M                                           2 3                                                0",
    "01   1                                              2                                                     0",
    "01    1  0000 22  3 33                                                                                    0",
    "011111111111111111111111111111112222222322232232232232232232232232211111111111111111 1 1 1 1 1 1 1 11111110",
    "00000000000000000000000000000000232232232232232222222223222232322220000000000000000000000000000000000000000",
]);
function loop(){
    context.clearRect(0,0,width,height);
    mario.update(blocks);
    blocks.update(-(mario.x+mario.w/2)+width/2,-(mario.y+mario.h/2)+height/2);
    requestAnimationFrame(loop);
}
loop();