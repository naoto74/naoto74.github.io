// ==============================注意　プログラムが汚いです！==============================
// 
// ===目次===
// 
//  15~     変数の定義
// 
//  50      void     init(void)                                  初期する処理の関数
//  87      void     createDiceWindow(Element diceItem)          ダイスの窓を作る関数
// 136      void     createJavaSparrowWindow(Element diceItem)   鳥専用の窓を作る関数
// 162      object   diceRangeReader(string data_range)          ダイスのdata属性を読み取る関数
// 172      void     resetInputStyle(void)                       色の選択の背景をセットする関数
// 
// 作成日 2022/7/05
// 公開日 2022/7/13
// 最終更新日 2022/7/13
let documentRoot = document.documentElement;
let colorHInput = document.getElementById("colorHInput");
let colorSInput = document.getElementById("colorSInput");
let colorLInput = document.getElementById("colorLInput");
let container = document.getElementById("container");
let DiceSound = document.getElementById("DiceSound");
let diceItem = container.querySelectorAll(".diceItem[data-range]");
let JavaSparrowItem = container.querySelector(".diceJavaSparrow");

let bgcolorH = 340;
let bgcolorS = 18;
let bgcolorL = 80;
colorHInput.value = bgcolorH;
colorSInput.value = bgcolorS;
colorLInput.value = bgcolorL;

const diceSVGList = {"1 to 6":{},"0 to 20":{},"1 to 4":{},"javasparrow":{}};
const SVGfilter = {
    white:`<filter xmlns="http://www.w3.org/2000/svg" id="white" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="3" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0" result="mono"/><feComposite in="mono" in2="SourceGraphic" operator="in" result="res"/><feBlend in="res" in2="SourceGraphic" mode="darken"/></filter>`,
    black:`<filter xmlns="http://www.w3.org/2000/svg" id="black" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="3" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0" result="mono"/><feComposite in="mono" in2="SourceGraphic" operator="in" result="res"/><feBlend in="res" in2="SourceGraphic" mode="lighten"/></filter>`,
};
const JavaSparrowSettings = [
    {head:"#844",body:"#c88",face:"#fff",filter:"none"},//シナモン
    {head:"#333",body:"#888",face:"#fff",filter:"none"},//桜
    {head:"none",body:"#fff",face:"none",filter:"none"},//白
    {head:"#333",body:"#888",face:"#fff",filter:"black"},//黒多めごま
    {head:"none",body:"#fff",face:"#fff",filter:"white"},//白多めごま
];


resetInputStyle();
addEventListener("load",init,{once: true});

// 初期処理
function init(){
    let dice1to6 = '<polygon points="5,5 95,5 95,95 5,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/>';
    diceSVGList["1 to 6"]["init"] = dice1to6+'<text x="50" y="50" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="80" stroke-linejoin="round" font-family="monospace">?</text>';
    diceSVGList["1 to 6"]["1"] = dice1to6+'<polygon points="50,27.5 35,74.5 72.5,44.5 27.5,44.5 65,74.5" fill="#0ff" transform="rotate(45)" transform-origin="center"/><circle cx="48" cy="52" r="6" fill="white"/>';
    diceSVGList["1 to 6"]["2"] = dice1to6+'<circle cx="35" cy="35" r="10" fill="blue"/><circle cx="70" cy="70" r="10" fill="blue"/>';
    diceSVGList["1 to 6"]["3"] = dice1to6+'<circle cx="25" cy="25" r="10" fill="green"/><circle cx="50" cy="50" r="10" fill="green"/><circle cx="75" cy="75" r="10" fill="green"/>';
    diceSVGList["1 to 6"]["4"] = dice1to6+'<circle cx="30" cy="30" r="10" fill="purple"/><circle cx="30" cy="70" r="10" fill="purple"/><circle cx="70" cy="30" r="10" fill="purple"/><circle cx="70" cy="70" r="10" fill="purple"/>';
    diceSVGList["1 to 6"]["5"] = dice1to6+'<circle cx="30" cy="30" r="10" fill="darkblue"/><circle cx="30" cy="70" r="10" fill="darkblue"/><circle cx="70" cy="30" r="10" fill="darkblue"/><circle cx="70" cy="70" r="10" fill="darkblue"/><circle cx="50" cy="50" r="10" fill="darkblue"/>';
    diceSVGList["1 to 6"]["6"] = dice1to6+'<circle cx="30" cy="25" r="10" fill="darkgreen"/><circle cx="70" cy="25" r="10" fill="darkgreen"/><circle cx="30" cy="50" r="10" fill="darkgreen"/><circle cx="70" cy="50" r="10" fill="darkgreen"/><circle cx="30" cy="75" r="10" fill="darkgreen"/><circle cx="70" cy="75" r="10" fill="darkgreen"/>';
    let dice0to20 = '<polygon points="50,5 95,50, 50,95 5,50" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,50 20,65 50,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,50 80,65 50,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,5 75,60 50,80 25,60" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/><text x="50" y="50" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="30" stroke-linejoin="round" font-family="monospace">';
    diceSVGList["0 to 20"]["init"] = dice0to20+"?</text>";
    for(let i=0;i<=20;i++) diceSVGList["0 to 20"][i]=dice0to20+i+"</text>";
    let dice1to4 = '<polygon points="50,5 95,90 5,90" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/><text x="50" y="60" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="40" stroke-linejoin="round" font-family="monospace">';
    diceSVGList["1 to 4"]["init"] = dice1to4+"?</text>";
    for(let i=1;i<=4;i++) diceSVGList["1 to 4"][i]=dice1to4+i+"</text>";
    let dicejavasparrow = '<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="$body$" filter="$filter$" d="M22 122C6-17 98-25 105 50c50 38 70 71 121 134-39-6-52-1-94 22-48 0-96-30-110-84Z"/><path fill="$head$" stroke="$head2$" filter="$filter$" d="M31 32C42 16 43 6 67 3c23 3 29 14 34 27 8 11-9 5-33 5s-47 7-37-3Z"/><path fill="$face$" stroke="$face2$" d="M27 49c0-13 5-12 41-14 37 0 37 1 37 15 7 10-13 18-35 20-34-1-51-10-43-21Z"/><path fill="#F88" d="M30 37 3 40l21 19 6-22"/></g><path d="M46 42a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z"/>';
    diceSVGList["javasparrow"]["init"] = '<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="#fff" d="M22 122C6-17 98-25 105 50c50 38 70 71 121 134-39-6-52-1-94 22-48 0-96-30-110-84Z"/><path fill="#F88" d="M30 37 3 40l21 19 6-22"/></g><path d="M46 42a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z"/>';
    for(let i=0;i<JavaSparrowSettings.length;i++){
        diceSVGList["javasparrow"][i] = dicejavasparrow
        .replaceAll("$head$",JavaSparrowSettings[i].head)
        .replaceAll("$head2$",JavaSparrowSettings[i].head=="none"?"none":"#000")
        .replaceAll("$body$",JavaSparrowSettings[i].body)
        .replaceAll("$face$",JavaSparrowSettings[i].face)
        .replaceAll("$face2$",JavaSparrowSettings[i].face=="none"?"none":"#000");
        if(JavaSparrowSettings[i].filter!="none"){
            diceSVGList["javasparrow"][i] = SVGfilter[JavaSparrowSettings[i].filter]
            +diceSVGList["javasparrow"][i].replaceAll("$filter$","url(#"+JavaSparrowSettings[i].filter+")");
        }
    }
    for(let i=0;i<diceItem.length;i++)createDiceWindow(diceItem[i]);
    createJavaSparrowWindow(JavaSparrowItem);

    colorHInput.addEventListener("input",()=>{resetInputStyle();},{passive:true});
    colorSInput.addEventListener("input",()=>{resetInputStyle();},{passive:true});
    colorLInput.addEventListener("input",()=>{resetInputStyle();},{passive:true});
};
// ダイスの窓
function createDiceWindow(item){
    let diceBody = item.getElementsByClassName("diceBody")[0];
    let diceTitle = item.getElementsByClassName("diceTitle")[0];
    let range = diceRangeReader(item.dataset.range);
    let name = item.dataset.name;
    let method = item.dataset.method;
    diceTitle.innerText = name;
    let diceChildren = [];
    for(let i=0;i<range.length;i++){
        diceChildren[i] = document.createElementNS("http://www.w3.org/2000/svg","svg");
        diceChildren[i].setAttribute("viewBox","0 0 100 100");
        diceChildren[i].innerHTML = diceSVGList[`${range[i].dirmin} to ${range[i].dirmax}`]["init"];
        diceBody.appendChild(diceChildren[i]);
    };
    let resultElement = document.createElement("p");
    resultElement.className = "diceResult";
    resultElement.innerText = "?";
    diceBody.appendChild(resultElement);
    item.addEventListener("click",()=>{
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
                    resultElement.innerText = "ファンブル";
                }else if(name=="1d100" && sum<=5){
                    resultElement.innerText = "クリティカル";
                    resultElement.style.color = "#ff0";
                }else{
                    resultElement.innerText = sum;
                    resultElement.style.color = "#000";
                }
            },_loopcount);})(loopcount*100);
        }
    },{passive:true});
};
//鳥専用の窓
function createJavaSparrowWindow(diceItem){
    let diceBody = diceItem.getElementsByClassName("diceBody")[0];
    let diceTitle = diceItem.getElementsByClassName("diceTitle")[0];
    
    diceTitle.innerText = "JavaSparrow";
    let diceChildren = [];
    for(let i=0;i<JavaSparrowSettings.length;i++){
        diceChildren[i] = document.createElementNS("http://www.w3.org/2000/svg","svg");
        diceChildren[i].setAttribute("viewBox","0 0 230 210");
        diceChildren[i].innerHTML = diceSVGList["javasparrow"]["init"];
        diceBody.appendChild(diceChildren[i]);
    };
    diceItem.addEventListener("click",()=>{
        DiceSound.currentTime=0;
        DiceSound.play();
        for(let loopcount=0;loopcount<15;loopcount++){
            ((_loopcount)=>{setTimeout(()=>{
                for(let i=0;i<JavaSparrowSettings.length;i++){
                    let random = Math.floor(JavaSparrowSettings.length*Math.random());
                    diceChildren[i].innerHTML = diceSVGList["javasparrow"][`${random}`];
                };
            },_loopcount);})(loopcount*100);
        }
    },{passive:true});
};
// ダイスのdata属性を読み取る
function diceRangeReader(data_range){
    let arr = data_range.split(" + ");
    let ret = [];
    for(let i=0;i<arr.length;i++){
        let g = arr[i].match(/(?<dirmin>\d+)\s+to\s+(?<dirmax>\d+)\s+\/\s+(?<min>\d+)\s+to\s+(?<max>\d+)\s+\*\s+(?<count>\d+)/).groups;
        for(let j=0;j<g.count;j++)ret.push({dirmin:Number(g.dirmin),dirmax:Number(g.dirmax),min:Number(g.min),max:Number(g.max)});
    }
    return ret;
};
// 色の選択の背景をセット
function resetInputStyle(){
    bgcolorH = colorHInput.valueAsNumber;
    bgcolorS = colorSInput.valueAsNumber;
    bgcolorL = colorLInput.valueAsNumber;
    colorHInput.value = bgcolorH;
    colorSInput.value = bgcolorS;
    colorLInput.value = bgcolorL;
    documentRoot.style.setProperty("--bgcolor",`hsl(${bgcolorH}deg ${bgcolorS}% ${bgcolorL}%)`);
    let hslArray = [];
    for(let i=0;i<10;i++)hslArray.push(`hsl(${bgcolorH}deg ${i*10}% ${bgcolorL}%)`);
    colorSInput.style.setProperty("background","linear-gradient(to right,"+hslArray.join(",")+")");
    hslArray = [];
    for(let i=0;i<10;i++)hslArray.push(`hsl(${bgcolorH}deg ${bgcolorS}% ${i*10}%)`);
    colorLInput.style.setProperty("background","linear-gradient(to right,"+hslArray.join(",")+")");
};