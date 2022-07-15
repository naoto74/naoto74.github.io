(()=>{"use strict";let a=a=>document.getElementById(a),b=a("colorHInput"),c=a("colorSInput"),d=a("colorLInput"),f=a("DiceSound"),g=document.querySelectorAll(".diceItem[data-range]"),h=a("diceJavaSparrow"),i=b.value=340,j=c.value=18,k=d.value=80,l={"1 to 6":{},"0 to 20":{},"1 to 4":{},j:{}},m=[{h:"#844",b:"#c88",g:"#fff",f:!1},{h:"#333",b:"#888",g:"#fff",f:!1},{h:"none",b:"#fff",g:"none",f:!1},{h:"#333",b:"#666",g:"#fff",f:!0},{h:"none",b:"#ccc",g:"#fff",f:!0}];function n(b){let g=b.getElementsByClassName("diceBody")[0],d=[];b.dataset.range.split(" + ").map(c=>{let a=c.match(/(?<dirmin>\d+)\s+to\s+(?<dirmax>\d+)\s+\/\s+(?<min>\d+)\s+to\s+(?<max>\d+)\s+\*\s+(?<count>\d+)/).groups;for(let b=0;b<a.count;b++)d.push({dirmin:Number(a.dirmin),dirmax:Number(a.dirmax),min:Number(a.min),max:Number(a.max)})});let h=b.dataset.name,i=b.dataset.method;b.getElementsByClassName("diceTitle")[0].innerText=h;let c=[];for(let a=0;a<d.length;a++)c[a]=document.createElementNS("http://www.w3.org/2000/svg","svg"),c[a].setAttribute("viewBox","0 0 100 100"),c[a].innerHTML=l[`${d[a].dirmin} to ${d[a].dirmax}`].init,g.appendChild(c[a]);let e=document.createElement("p");e.className="diceResult",e.innerText="?",g.appendChild(e),b.addEventListener("click",()=>{f.currentTime=0,f.play();for(let a=0;a<15;a++){var b;setTimeout(()=>{let b=0;for(let a=0;a<d.length;a++){let f=d[a].min+Math.floor((d[a].max-d[a].min+1)*Math.random());c[a].innerHTML=l[`${d[a].dirmin} to ${d[a].dirmax}`][`${f}`],"add"==i?b+=f:"dec"==i&&(b+=f*Math.pow(10,d.length-(a+1)))}"dec"==i&&0==b&&(b=Math.pow(10,d.length-1)*(d[0].max+1)),"1d100"==h&&b>=96?(e.style.color="#f00",e.innerText="\u30D5\u30A1\u30F3\u30D6\u30EB"):"1d100"==h&&b<=5?(e.innerText="\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB",e.style.color="#ff0"):(e.innerText=b,e.style.color="#000")},100*a)}},{passive:!0})}function e(){i=b.valueAsNumber,j=c.valueAsNumber,k=d.valueAsNumber,document.documentElement.style.setProperty("--bgcolor",`hsl(${i}deg ${j}% ${k}%)`);let a=[];for(let e=0;e<10;e++)a.push(`hsl(${i}deg ${10*e}% ${k}%)`);c.style.background=`linear-gradient(to right,${a.join(",")})`,a=[];for(let f=0;f<10;f++)a.push(`hsl(${i}deg ${j}% ${10*f}%)`);d.style.background=`linear-gradient(to right,${a.join(",")})`}e(),addEventListener("load",()=>{let i='<polygon points="5,5 95,5 95,95 5,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/>';l["1 to 6"]={init:i+'<text x="50" y="50" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="80" stroke-linejoin="round" font-family="monospace">?</text>',"1":i+'<polygon points="50,27.5 35,74.5 72.5,44.5 27.5,44.5 65,74.5" fill="#0ff" transform="rotate(45)" transform-origin="center"/><circle cx="48" cy="52" r="6" fill="white"/>',"2":i+'<circle cx="35" cy="35" r="10" fill="blue"/><circle cx="70" cy="70" r="10" fill="blue"/>',"3":i+'<circle cx="25" cy="25" r="10" fill="green"/><circle cx="50" cy="50" r="10" fill="green"/><circle cx="75" cy="75" r="10" fill="green"/>',"4":i+'<circle cx="30" cy="30" r="10" fill="purple"/><circle cx="30" cy="70" r="10" fill="purple"/><circle cx="70" cy="30" r="10" fill="purple"/><circle cx="70" cy="70" r="10" fill="purple"/>',"5":i+'<circle cx="30" cy="30" r="10" fill="darkblue"/><circle cx="30" cy="70" r="10" fill="darkblue"/><circle cx="70" cy="30" r="10" fill="darkblue"/><circle cx="70" cy="70" r="10" fill="darkblue"/><circle cx="50" cy="50" r="10" fill="darkblue"/>',"6":i+'<circle cx="30" cy="25" r="10" fill="darkgreen"/><circle cx="70" cy="25" r="10" fill="darkgreen"/><circle cx="30" cy="50" r="10" fill="darkgreen"/><circle cx="70" cy="50" r="10" fill="darkgreen"/><circle cx="30" cy="75" r="10" fill="darkgreen"/><circle cx="70" cy="75" r="10" fill="darkgreen"/>'};let r='<polygon points="50,5 95,50, 50,95 5,50" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,50 20,65 50,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,50 80,65 50,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,5 75,60 50,80 25,60" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/><text x="50" y="50" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="30" stroke-linejoin="round" font-family="monospace">';l["0 to 20"].init=r+"?</text>";for(let k=0;k<=20;k++)l["0 to 20"][k]=r+k+"</text>";let s='<polygon points="50,5 95,90 5,90" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/><text x="50" y="60" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="40" stroke-linejoin="round" font-family="monospace">';l["1 to 4"].init=s+"?</text>";for(let o=1;o<=4;o++)l["1 to 4"][o]=s+o+"</text>";l.j.init='<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="#fff" d="M22 122C6-17 98-25 105 50c50 38 70 71 121 134-39-6-52-1-94 22-48 0-96-30-110-84Z"/><path fill="#F88" d="M30 37 3 40l21 19 6-22"/></g><path d="M46 42a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z"/>';for(let a=0;a<m.length;a++)l.j[a]=(m[a].f?'<filter xmlns="http://www.w3.org/2000/svg" id="f1" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="3" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0" result="mono"/><feComposite in="mono" in2="SourceGraphic" operator="in" result="res"/><feBlend in="res" in2="SourceGraphic" mode="lighten"/></filter>':"")+'<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="$b$" filter="$f$" d="M22 122C6-17 98-25 105 50c50 38 70 71 121 134-39-6-52-1-94 22-48 0-96-30-110-84Z"/><path fill="$h$" stroke="$h2$" filter="$f$" d="M31 32C42 16 43 6 67 3c23 3 29 14 34 27 8 11-9 5-33 5s-47 7-37-3Z"/><path fill="$g$" stroke="$g2$" d="M27 49c0-13 5-12 41-14 37 0 37 1 37 15 7 10-13 18-35 20-34-1-51-10-43-21Z"/><path fill="#F88" d="M30 37 3 40l21 19 6-22"/></g><path d="M46 42a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z"/>'.replaceAll("$f$",m[a].f?"url(#f1)":"none").replaceAll("$h$",m[a].h).replaceAll("$h2$","none"==m[a].h?"none":"#000").replaceAll("$b$",m[a].b).replaceAll("$g$",m[a].g).replaceAll("$g2$","none"==m[a].g?"none":"#000");for(let q=0;q<g.length;q++)n(g[q]);{let t=h.getElementsByClassName("diceBody")[0];h.getElementsByClassName("diceTitle")[0].innerText="JavaSparrow";let p=[];for(let j=0;j<m.length;j++)p[j]=document.createElementNS("http://www.w3.org/2000/svg","svg"),p[j].setAttribute("viewBox","0 0 230 210"),p[j].innerHTML=l.j.init,t.appendChild(p[j]);h.addEventListener("click",()=>{f.currentTime=0,f.play();for(let a=0;a<15;a++){var b;setTimeout(()=>{for(let a=0;a<m.length;a++)p[a].innerHTML=l.j[`${Math.floor(m.length*Math.random())}`]},100*a)}},{passive:!0})}b.addEventListener("input",()=>{e()},{passive:!0}),c.addEventListener("input",()=>{e()},{passive:!0}),d.addEventListener("input",()=>{e()},{passive:!0})},{once:!0})})()