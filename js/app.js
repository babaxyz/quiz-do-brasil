const CATS=[["Geografia","🌎","Países, mapas e lugares","mint"],["História","🏛️","Civilizações e acontecimentos","peach"],["Ciência","🔬","Descobertas e curiosidades","blue"],["Matemática","➗","Números e raciocínio","yellow"],["Arte e Cultura","🎨","Arte, música e tradições","pink"],["Esportes","🏆","Jogos e grandes momentos","orange"],["Natureza","🌿","Animais e meio ambiente","mint"],["Conhecimentos Gerais","💡","Um pouco de tudo","lavender"]];
const $=s=>document.querySelector(s);
function read(k,d){try{let x=localStorage.getItem(k);return x===null?d:JSON.parse(x)}catch{return d}}
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll("[data-year]").forEach(x=>x.textContent=new Date().getFullYear());
 const cards=CATS.map(c=>`<a class="cat ${c[3]}" href="quiz.html?category=${encodeURIComponent(c[0])}"><span class="cat-icon">${c[1]}</span><b>${c[0]}</b><small>${c[2]}</small><span class="arrow">↗</span></a>`).join("");
 if($("#home-categories"))$("#home-categories").innerHTML=cards;
 if($("#all-categories"))$("#all-categories").innerHTML=cards;
 if($("#best-home"))$("#best-home").textContent=(read("qdb-best",0))+" pontos";
 if($("#best"))$("#best").textContent=read("qdb-best",0)+" pontos";
 if($("#completed"))$("#completed").textContent=read("qdb-completed",0);
 if(read("qdb-theme","light")==="dark")document.documentElement.dataset.theme="dark";
 const theme=$("#theme");if(theme){theme.textContent=document.documentElement.dataset.theme==="dark"?"☀":"☾";theme.onclick=()=>{let d=document.documentElement.dataset.theme!=="dark";if(d)document.documentElement.dataset.theme="dark";else delete document.documentElement.dataset.theme;localStorage.setItem("qdb-theme",JSON.stringify(d?"dark":"light"));theme.textContent=d?"☀":"☾"}}
 const menu=$("#menu"),nav=$("#nav");if(menu&&nav)menu.onclick=()=>nav.classList.toggle("open");
 const clear=$("#clear");if(clear)clear.onclick=()=>{if(confirm("Deseja apagar seu progresso salvo?")){["qdb-best","qdb-completed","qdb-last"].forEach(k=>localStorage.removeItem(k));location.reload()}};
});