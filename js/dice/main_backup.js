(()=>{"use strict";
let _getElementById = "getElementById";
let _querySelector = "querySelector";
let _addEventListener = "addEventListener";
// ==============================警告！　このプログラムはMinifyされやすいように作られているので汚いです。==============================
// 
// 
// 作成日 2022/7/05
// 公開日 2022/7/13
// 最終更新日 2022/7/22

let SVG100x100Template = document.createElementNS("http://www.w3.org/2000/svg","svg");
SVG100x100Template.setAttribute("viewBox","0 0 100 100");


const diceTagTemplate = document[_getElementById]("dice-tag");
const javasparrowTagTemplate = document[_getElementById]("javasparrow-tag");



let colorHInput = document[_getElementById]("colorHInput");
let colorSInput = document[_getElementById]("colorSInput");
let colorLInput = document[_getElementById]("colorLInput");
let DiceSound = document[_getElementById]("DiceSound");

let bgcolorH = colorHInput.value = 340;
let bgcolorS = colorSInput.value = 18;
let bgcolorL = colorLInput.value = 80;


const diceSVGList = {"1 to 6":{},"0 to 20":{},"1 to 4":{},"j":{}};

const JavaSparrowSettings = [
    {h:"#844",b:"#c88",g:"#fff",f:false},//シナモン文鳥
    {h:"#333",b:"#888",g:"#fff",f:false},//桜文鳥
    {h:"none",b:"#fff",g:"none",f:false},//白文鳥
    {h:"#333",b:"#666",g:"#fff",f:true},//黒多め ごま文鳥
    {h:"none",b:"#ccc",g:"#fff",f:true},//白多め ごま文鳥
];
resetInputStyle();

window[_addEventListener]("load",()=>{
    let dice1to6 = '<polygon points="5,5 95,5 95,95 5,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/>';
    diceSVGList["1 to 6"] = {
        init:dice1to6+'<text x="50" y="50" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="80" stroke-linejoin="round" font-family="monospace">?</text>',
        "1":dice1to6+'<polygon points="50,27.5 35,74.5 72.5,44.5 27.5,44.5 65,74.5" fill="#0ff" transform="rotate(45)" transform-origin="center"/><circle cx="48" cy="52" r="6" fill="white"/>',
        "2":dice1to6+'<circle cx="35" cy="35" r="10" fill="blue"/><circle cx="70" cy="70" r="10" fill="blue"/>',
        "3":dice1to6+'<circle cx="25" cy="25" r="10" fill="green"/><circle cx="50" cy="50" r="10" fill="green"/><circle cx="75" cy="75" r="10" fill="green"/>',
        "4":dice1to6+'<circle cx="30" cy="30" r="10" fill="purple"/><circle cx="30" cy="70" r="10" fill="purple"/><circle cx="70" cy="30" r="10" fill="purple"/><circle cx="70" cy="70" r="10" fill="purple"/>',
        "5":dice1to6+'<circle cx="30" cy="30" r="10" fill="darkblue"/><circle cx="30" cy="70" r="10" fill="darkblue"/><circle cx="70" cy="30" r="10" fill="darkblue"/><circle cx="70" cy="70" r="10" fill="darkblue"/><circle cx="50" cy="50" r="10" fill="darkblue"/>',
        "6":dice1to6+'<circle cx="30" cy="25" r="10" fill="darkgreen"/><circle cx="70" cy="25" r="10" fill="darkgreen"/><circle cx="30" cy="50" r="10" fill="darkgreen"/><circle cx="70" cy="50" r="10" fill="darkgreen"/><circle cx="30" cy="75" r="10" fill="darkgreen"/><circle cx="70" cy="75" r="10" fill="darkgreen"/>',
    };
    let dice0to20 = '<polygon points="50,5 95,50, 50,95 5,50" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,50 20,65 50,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,50 80,65 50,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,5 75,60 50,80 25,60" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/><text x="50" y="50" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="30" stroke-linejoin="round" font-family="monospace">';
    diceSVGList["0 to 20"].init = dice0to20+"?</text>";
    for(let i=0;i<=20;i++) diceSVGList["0 to 20"][i]=dice0to20+i+"</text>";
    let dice1to4 = '<polygon points="50,5 95,90 5,90" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/><text x="50" y="60" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="40" stroke-linejoin="round" font-family="monospace">';
    diceSVGList["1 to 4"].init = dice1to4+"?</text>";
    for(let i=1;i<=4;i++) diceSVGList["1 to 4"][i]=dice1to4+i+"</text>";
    diceSVGList["j"].init = '<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="#fff" d="M22 122C6-17 98-25 105 50c50 38 70 71 121 134-39-6-52-1-94 22-48 0-96-30-110-84Z"/><path fill="#F88" d="M30 37 3 40l21 19 6-22"/></g><path d="M46 42a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z"/>';
    for(let i=0;i<JavaSparrowSettings.length;i++){
        diceSVGList["j"][i] = (JavaSparrowSettings[i].f?'<filter xmlns="http://www.w3.org/2000/svg" id="f1" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="3" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0" result="mono"/><feComposite in="mono" in2="SourceGraphic" operator="in" result="res"/><feBlend in="res" in2="SourceGraphic" mode="lighten"/></filter>':"")+
        '<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="$b$" filter="$f$" d="M22 122C6-17 98-25 105 50c50 38 70 71 121 134-39-6-52-1-94 22-48 0-96-30-110-84Z"/><path fill="$h$" stroke="$h2$" filter="$f$" d="M31 32C42 16 43 6 67 3c23 3 29 14 34 27 8 11-9 5-33 5s-47 7-37-3Z"/><path fill="$g$" stroke="$g2$" d="M27 49c0-13 5-12 41-14 37 0 37 1 37 15 7 10-13 18-35 20-34-1-51-10-43-21Z"/><path fill="#F88" d="M30 37 3 40l21 19 6-22"/></g><path d="M46 42a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z"/>'
        .replaceAll("$f$",JavaSparrowSettings[i].f?"url(#f1)":"none")
        .replaceAll("$h$",JavaSparrowSettings[i].h)
        .replaceAll("$h2$",JavaSparrowSettings[i].h=="none"?"none":"#000")
        .replaceAll("$b$",JavaSparrowSettings[i].b)
        .replaceAll("$g$",JavaSparrowSettings[i].g)
        .replaceAll("$g2$",JavaSparrowSettings[i].g=="none"?"none":"#000");
    }
    customElements.define("dice-tag",class extends HTMLElement{
        constructor(){
            super();
            const clone = diceTagTemplate.content.cloneNode(true);
            this.attachShadow({mode:"open"}).appendChild(clone);
            let diceBody = this[_querySelector]("[slot=body]");
            let range = [];
            this.dataset.range.split(" + ").map(e=>{
                let g = e.match(/(?<dirmin>\d+)\s+to\s+(?<dirmax>\d+)\s+\/\s+(?<min>\d+)\s+to\s+(?<max>\d+)\s+\*\s+(?<count>\d+)/).groups
                for(let j=0;j<g.count;j++){
                    range.push({dirmin:Number(g.dirmin),dirmax:Number(g.dirmax),min:Number(g.min),max:Number(g.max)});
                };
            });
            let name = this.dataset.name;
            let method = this.dataset.method;
            this[_querySelector]("[slot=title]").textContent = name;
            let diceChildren = [];
            for(let i=0;i<range.length;i++){
                diceChildren[i] = SVG100x100Template.cloneNode(true);
                diceChildren[i].innerHTML = diceSVGList[`${range[i].dirmin} to ${range[i].dirmax}`].init;
                diceBody.appendChild(diceChildren[i]);
            };
            let resultElement = this[_querySelector]("[slot=result]");
            this[_addEventListener]("click",()=>{
                DiceSound.currentTime=0;
                DiceSound.play();
                for(let loopcount=0;loopcount<15;loopcount++){
                    ((_loopcount)=>{setTimeout(()=>{
                        let sum = 0;
                        for(let i=0;i<range.length;i++){
                            let random = range[i].min+Math.floor((range[i].max-range[i].min+1)*Math.random());
                            diceChildren[i].innerHTML = diceSVGList[`${range[i].dirmin} to ${range[i].dirmax}`][`${random}`];
                            if(method=="add"){
                                sum += random;
                            }else if(method=="dec"){
                                sum += random*Math.pow(10,range.length-(i+1));
                            }
                        };
                        if(method=="dec" && sum == 0)sum = Math.pow(10, range.length-1)*(range[0].max+1);
                        if(name=="1d100" && sum>=96){
                            resultElement.style.color = "#f00";
                            resultElement.textContent = "ファンブル";
                        }else if(name=="1d100" && sum<=5){
                            resultElement.textContent = "クリティカル";
                            resultElement.style.color = "#ff0";
                        }else{
                            resultElement.textContent = sum;
                            resultElement.style.color = "#000";
                        }
                    },_loopcount);})(loopcount*100);
                }
            },{passive:true});
        }
    });
    customElements.define("javasparrow-tag",class extends HTMLElement{
        constructor(){
            super();
            let clone = javasparrowTagTemplate.content.cloneNode(true);
            this.attachShadow({mode:"open"}).appendChild(clone);
            let diceBody = this[_querySelector]("[slot=body]");
            this[_querySelector]("[slot=title]").textContent = "JavaSparrow";
            let diceChildren = [];
            let SVG230x210Template = document.createElementNS("http://www.w3.org/2000/svg","svg");
            SVG230x210Template.setAttribute("viewBox","0 0 230 210");
            for(let i=0;i<JavaSparrowSettings.length;i++){
                diceChildren[i] = SVG230x210Template.cloneNode(true);
                diceChildren[i].innerHTML = diceSVGList["j"].init;
                diceBody.appendChild(diceChildren[i]);
            };
            this[_addEventListener]("click",()=>{
                DiceSound.currentTime=0;
                DiceSound.play();
                for(let loopcount=0;loopcount<15;loopcount++){
                    ((_loopcount)=>{setTimeout(()=>{
                        for(let i=0;i<JavaSparrowSettings.length;i++){
                            diceChildren[i].innerHTML = diceSVGList["j"][`${Math.floor(JavaSparrowSettings.length*Math.random())}`];
                        };
                    },_loopcount);})(loopcount*100);
                }
            },{passive:true});
        }
    });
    colorHInput[_addEventListener]("input",()=>{resetInputStyle();},{passive:true});
    colorSInput[_addEventListener]("input",()=>{resetInputStyle();},{passive:true});
    colorLInput[_addEventListener]("input",()=>{resetInputStyle();},{passive:true});
},{once:true});
// 色の選択の背景をセット
function resetInputStyle(){
    bgcolorH = colorHInput.valueAsNumber;
    bgcolorS = colorSInput.valueAsNumber;
    bgcolorL = colorLInput.valueAsNumber;
    document.documentElement.style.setProperty("--bgcolor",`hsl(${bgcolorH}deg ${bgcolorS}% ${bgcolorL}%)`);
    let hslArray = [];
    for(let i=0;i<10;i++)hslArray.push(`hsl(${bgcolorH}deg ${i*10}% ${bgcolorL}%)`);
    colorSInput.style.background = `linear-gradient(to right,${hslArray.join(",")})`;
    hslArray = [];
    for(let i=0;i<10;i++)hslArray.push(`hsl(${bgcolorH}deg ${bgcolorS}% ${i*10}%)`);
    colorLInput.style.background = `linear-gradient(to right,${hslArray.join(",")})`;
};
if("serviceWorker" in navigator){navigator.serviceWorker.register("./sw.js");};
})();