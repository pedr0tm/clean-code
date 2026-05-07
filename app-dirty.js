// app-dirty.js — Funciona, mas tem vários maus cheiros.
// 1) Variáveis globais expostas
var a = []; // array de tarefas
var c = 0;  // contador "mágico" de ids
var flt = "all"; // string mágica de filtro

// 2) Nomes pobres
function doIt(mode){
    // 7) Código morto/comentado
    // var notUsed = 123; // não usado
    // if(false){ console.log('nada'); }

    // 3) Função longa com responsabilidades demais: inicialização, bind de eventos, render, validação…
    var t = document.getElementById("t");
    var b = document.getElementById("b");
    var l = document.getElementById("list");
    var fs = document.getElementsByClassName("f");

    if(mode === 1){ // 6) Flag argument (parâmetro modo) controlando fluxos diferentes
        var val = t.value;
        if(val == "" || val == "   "){ alert("Digite algo"); return; } // 4) Strings mágicas
        var item = { id: ++c, txt: val, ok: false }; // 4) boolean e campos com nomes pobres
        a.push(item);
        t.value = "";
        // 5) Código duplicado: render básico repetido
        l.innerHTML = "";
        for(var i=0;i<a.length;i++){
            if(flt==="all" || (flt==="1" && !a[i].ok) || (flt==="2" && a[i].ok)){
                var li = document.createElement("li");
                if(a[i].ok){ li.className="done"; }
                var chk = document.createElement("input"); chk.type="checkbox"; chk.checked=a[i].ok;
                chk.addEventListener("change", (function(id){ return function(){ 
                    for(var j=0;j<a.length;j++){ if(a[j].id===id){ a[j].ok=!a[j].ok; break; } }
                    doIt(3); // re-render
                } })(a[i].id));
                var sp = document.createElement("span"); sp.textContent=a[i].txt;
                var del = document.createElement("button"); del.textContent="x";
                del.addEventListener("click",(function(id){ return function(){
                    for(var k=0;k<a.length;k++){ if(a[k].id===id){ a.splice(k,1); break; } }
                    doIt(3);
                }})(a[i].id));
                li.appendChild(chk); li.appendChild(sp); li.appendChild(del);
                l.appendChild(li);
            }
        }
    } else if(mode === 2){
        // bind de filtros (duplicado)
        for(var i=0;i<fs.length;i++){
            fs[i].addEventListener("click", function(){
                flt = this.getAttribute("data-f");
                doIt(3);
            });
        }
    } else {
        // render (duplicado da lógica do mode === 1)
        l.innerHTML = "";
        for(var i=0;i<a.length;i++){
            if(flt==="all" || (flt==="1" && !a[i].ok) || (flt==="2" && a[i].ok)){
                var li = document.createElement("li");
                if(a[i].ok){ li.className="done"; }
                var chk = document.createElement("input"); chk.type="checkbox"; chk.checked=a[i].ok;
                chk.addEventListener("change", (function(id){ return function(){ 
                    for(var j=0;j<a.length;j++){ if(a[j].id===id){ a[j].ok=!a[j].ok; break; } }
                    doIt(3);
                } })(a[i].id));
                var sp = document.createElement("span"); sp.textContent=a[i].txt;
                var del = document.createElement("button"); del.textContent="x";
                del.addEventListener("click",(function(id){ return function(){
                    for(var k=0;k<a.length;k++){ if(a[k].id===id){ a.splice(k,1); break; } }
                    doIt(3);
                }})(a[i].id));
                li.appendChild(chk); li.appendChild(sp); li.appendChild(del);
                l.appendChild(li);
            }
        }
    }

    // bind principal (acoplado e duplicado)
    if(mode !== 2){
        b.onclick = function(){ doIt(1); };
        for(var i=0;i<fs.length;i++){
            fs[i].onclick = function(){ flt = this.getAttribute("data-f"); doIt(3); };
        }
    }
}

// inicialização
document.addEventListener("DOMContentLoaded", function(){
    doIt(2); // bind filtros
    doIt(3); // primeira renderização
});