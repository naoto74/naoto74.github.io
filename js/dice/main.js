(()=>{"use strict";let a="getElementById",h="querySelector",b="addEventListener",c=document[a]("colorHInput"),d=document[a]("colorSInput"),e=document[a]("colorLInput"),i=document[a]("DiceSound"),j=document.getElementsByClassName("diceItem"),k=document[a]("diceJavaSparrow"),l=document[a]("diceWindowTemplate"),f=document.createElementNS("http://www.w3.org/2000/svg","svg");f.setAttribute("viewBox","0 0 100 100");let m=c.value=340,n=d.value=18,o=e.value=80,p={"1 to 6":{},"0 to 20":{},"1 to 4":{},j:{}},q=[{h:"#844",b:"#c88",g:"#fff",f:!1},{h:"#333",b:"#888",g:"#fff",f:!1},{h:"none",b:"#fff",g:"none",f:!1},{h:"#333",b:"#666",g:"#fff",f:!0},{h:"none",b:"#ccc",g:"#fff",f:!0}];function r(c){let d=l.content.cloneNode(!0),j=d[h](".diceBody"),e=[];c.dataset.range.split(" + ").map(c=>{let a=c.match(/(?<dirmin>\d+)\s+to\s+(?<dirmax>\d+)\s+\/\s+(?<min>\d+)\s+to\s+(?<max>\d+)\s+\*\s+(?<count>\d+)/).groups;for(let b=0;b<a.count;b++)e.push({dirmin:Number(a.dirmin),dirmax:Number(a.dirmax),min:Number(a.min),max:Number(a.max)})});let k=c.dataset.name,m=c.dataset.method;d[h](".diceTitle").textContent=k;let g=[];for(let a=0;a<e.length;a++)g[a]=f.cloneNode(!0),g[a].innerHTML=p[`${e[a].dirmin} to ${e[a].dirmax}`].init,j.appendChild(g[a]);let n=d[h](".diceResult");c[b]("click",()=>{i.currentTime=0,i.play();for(let a=0;a<15;a++){var b;setTimeout(()=>{let b=0;for(let a=0;a<e.length;a++){let c=e[a].min+Math.floor((e[a].max-e[a].min+1)*Math.random());g[a].innerHTML=p[`${e[a].dirmin} to ${e[a].dirmax}`][`${c}`],"add"==m?b+=c:"dec"==m&&(b+=c*Math.pow(10,e.length-(a+1)))}"dec"==m&&0==b&&(b=Math.pow(10,e.length-1)*(e[0].max+1)),"1d100"==k&&b>=96?(n.style.color="#f00",n.textContent="\u30D5\u30A1\u30F3\u30D6\u30EB"):"1d100"==k&&b<=5?(n.textContent="\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB",n.style.color="#ff0"):(n.textContent=b,n.style.color="#000")},100*a)}},{passive:!0}),c.appendChild(d)}function g(){m=c.valueAsNumber,n=d.valueAsNumber,o=e.valueAsNumber,document.documentElement.style.setProperty("--bgcolor",`hsl(${m}deg ${n}% ${o}%)`);let a=[];for(let b=0;b<10;b++)a.push(`hsl(${m}deg ${10*b}% ${o}%)`);d.style.background=`linear-gradient(to right,${a.join(",")})`,a=[];for(let f=0;f<10;f++)a.push(`hsl(${m}deg ${n}% ${10*f}%)`);e.style.background=`linear-gradient(to right,${a.join(",")})`}g(),window[b]("load",()=>{let f='<polygon points="5,5 95,5 95,95 5,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/>';p["1 to 6"]={init:f+'<text x="50" y="50" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="80" stroke-linejoin="round" font-family="monospace">?</text>',"1":f+'<polygon points="50,27.5 35,74.5 72.5,44.5 27.5,44.5 65,74.5" fill="#0ff" transform="rotate(45)" transform-origin="center"/><circle cx="48" cy="52" r="6" fill="white"/>',"2":f+'<circle cx="35" cy="35" r="10" fill="blue"/><circle cx="70" cy="70" r="10" fill="blue"/>',"3":f+'<circle cx="25" cy="25" r="10" fill="green"/><circle cx="50" cy="50" r="10" fill="green"/><circle cx="75" cy="75" r="10" fill="green"/>',"4":f+'<circle cx="30" cy="30" r="10" fill="purple"/><circle cx="30" cy="70" r="10" fill="purple"/><circle cx="70" cy="30" r="10" fill="purple"/><circle cx="70" cy="70" r="10" fill="purple"/>',"5":f+'<circle cx="30" cy="30" r="10" fill="darkblue"/><circle cx="30" cy="70" r="10" fill="darkblue"/><circle cx="70" cy="30" r="10" fill="darkblue"/><circle cx="70" cy="70" r="10" fill="darkblue"/><circle cx="50" cy="50" r="10" fill="darkblue"/>',"6":f+'<circle cx="30" cy="25" r="10" fill="darkgreen"/><circle cx="70" cy="25" r="10" fill="darkgreen"/><circle cx="30" cy="50" r="10" fill="darkgreen"/><circle cx="70" cy="50" r="10" fill="darkgreen"/><circle cx="30" cy="75" r="10" fill="darkgreen"/><circle cx="70" cy="75" r="10" fill="darkgreen"/>'};let v='<polygon points="50,5 95,50, 50,95 5,50" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,50 20,65 50,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,50 80,65 50,95" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#eee"/><polygon points="50,5 75,60 50,80 25,60" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/><text x="50" y="50" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="30" stroke-linejoin="round" font-family="monospace">';p["0 to 20"].init=v+"?</text>";for(let n=0;n<=20;n++)p["0 to 20"][n]=v+n+"</text>";let w='<polygon points="50,5 95,90 5,90" stroke="#d8d8d8" stroke-width="3" stroke-linejoin="round" fill="#fff"/><text x="50" y="60" text-anchor="middle" dominant-baseline="central" stroke="#000" stroke-width="3" font-size="40" stroke-linejoin="round" font-family="monospace">';p["1 to 4"].init=w+"?</text>";for(let o=1;o<=4;o++)p["1 to 4"][o]=w+o+"</text>";p.j.init='<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="#fff" d="M22 122C6-17 98-25 105 50c50 38 70 71 121 134-39-6-52-1-94 22-48 0-96-30-110-84Z"/><path fill="#F88" d="M30 37 3 40l21 19 6-22"/></g><path d="M46 42a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z"/>';for(let a=0;a<q.length;a++)p.j[a]=(q[a].f?'<filter xmlns="http://www.w3.org/2000/svg" id="f1" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="3" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0" result="mono"/><feComposite in="mono" in2="SourceGraphic" operator="in" result="res"/><feBlend in="res" in2="SourceGraphic" mode="lighten"/></filter>':"")+'<g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="$b$" filter="$f$" d="M22 122C6-17 98-25 105 50c50 38 70 71 121 134-39-6-52-1-94 22-48 0-96-30-110-84Z"/><path fill="$h$" stroke="$h2$" filter="$f$" d="M31 32C42 16 43 6 67 3c23 3 29 14 34 27 8 11-9 5-33 5s-47 7-37-3Z"/><path fill="$g$" stroke="$g2$" d="M27 49c0-13 5-12 41-14 37 0 37 1 37 15 7 10-13 18-35 20-34-1-51-10-43-21Z"/><path fill="#F88" d="M30 37 3 40l21 19 6-22"/></g><path d="M46 42a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z"/>'.replaceAll("$f$",q[a].f?"url(#f1)":"none").replaceAll("$h$",q[a].h).replaceAll("$h2$","none"==q[a].h?"none":"#000").replaceAll("$b$",q[a].b).replaceAll("$g$",q[a].g).replaceAll("$g2$","none"==q[a].g?"none":"#000");for(let t=0;t<j.length;t++)r(j[t]);{let s=l.content.cloneNode(!0),y=s[h](".diceBody");s[h](".diceTitle").textContent="JavaSparrow",s[h](".diceResult").remove();let u=[],x=document.createElementNS("http://www.w3.org/2000/svg","svg");x.setAttribute("viewBox","0 0 230 210");for(let m=0;m<q.length;m++)u[m]=x.cloneNode(!0),u[m].innerHTML=p.j.init,y.appendChild(u[m]);k[b]("click",()=>{i.currentTime=0,i.play();for(let a=0;a<15;a++){var b;setTimeout(()=>{for(let a=0;a<q.length;a++)u[a].innerHTML=p.j[`${Math.floor(q.length*Math.random())}`]},100*a)}},{passive:!0}),k.appendChild(s)}c[b]("input",()=>{g()},{passive:!0}),d[b]("input",()=>{g()},{passive:!0}),e[b]("input",()=>{g()},{passive:!0})},{once:!0}),"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js")})()