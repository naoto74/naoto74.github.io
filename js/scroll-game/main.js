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
    constructor(x,y,w,h){
        super(x,y,w,h);
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
        context.fillStyle = "#ff0";
        context.fillRect(width/2-this.w/2, height/2-this.h/2, this.w, this.h);
        context.fill();
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
            if(map[y][x] == "M"){mario = new Mario(x*41,y*41,40,40)}
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
    "01111                                                  2 3                                                0",
    "01   1     M                                        2                                                     0",
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