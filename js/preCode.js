(function(){
var Codetarget = document.getElementById("viewFrame").children;
var srcHTML = "\n";
for(var i=0;i<Codetarget.length;i++){
    var ex = "html";
    if(Codetarget[i].dataset.file){
        ex = Codetarget[i].dataset.file.split(".").reverse()[0];
    }
    if(ex=="html"){
        if(Codetarget[i].TagName!="script"&&Codetarget[i].TagName!="style"){
            srcHTML += Codetarget[i].outerHTML;
        }
    }else{
        var pre = document.createElement("pre");
        var code = document.createElement("code");
        pre.dataset.lang=ex;
        pre.dataset.file=Codetarget[i].dataset.file;
        code.innerText = Codetarget[i].innerText;
        pre.appendChild(code);
        document.querySelector(".contentBody").insertAdjacentElement("beforeend",pre);
    };
};
var pre = document.createElement("pre");
var code = document.createElement("code");
pre.dataset.lang="html";
pre.dataset.file="index.html";
code.innerText = srcHTML;
pre.appendChild(code);
document.querySelector(".contentBody").insertAdjacentElement("beforeend",pre);
})();