(function(){
var codef = document.getElementById("viewFrame").children;
var srcHTML = "\n";
for(var i=0;i<codef.length;i++){
    var ex = "html";
    if(codef[i].dataset.file)ex = codef[i].dataset.file.split(".").reverse()[0];
    if(ex=="html"){
    if(codef[i].TagName!="script"&&codef[i].TagName!="style")srcHTML += codef[i].outerHTML+"\n";
    }else{
    var pre = document.createElement("pre");
    var code = document.createElement("code");
    pre.dataset.lang=ex;
    pre.dataset.file=codef[i].dataset.file;
    code.innerText = codef[i].innerText;
    pre.appendChild(code);
    document.querySelector(".contentBody").insertAdjacentElement("beforeend",pre);
    };
};
var pre = document.createElement("pre");
var code = document.createElement("code");
pre.dataset.lang="html";
pre.dataset.file="index.html (一部)";
code.innerText = srcHTML;
pre.appendChild(code);
document.querySelector(".contentBody").insertAdjacentElement("beforeend",pre);
})();