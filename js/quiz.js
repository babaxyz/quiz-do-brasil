let bank=[],set=[],idx=0,score=0,done=false,seconds=60,interval=null,mode="normal";
const $=s=>document.querySelector(s);
async function start(){
 const p=new URLSearchParams(location.search);mode=p.get("mode")||"normal";const cat=p.get("category");
 try{bank=await(await fetch("data/questions.json")).json()}catch{$("#question").textContent="Não foi possível carregar as perguntas. Use um servidor estático local ou publique o projeto.";return}
 if(cat)bank=bank.filter(q=>q.category===cat);
 if(mode==="daily"){const d=new Date();let seed=d.getDate()+d.getMonth()*31;bank=bank.slice().sort((a,b)=>((a.id||0)*seed)%17-((b.id||0)*seed)%17)}
 set=bank.slice().sort(()=>Math.random()-.5).slice(0,Math.min(10,bank.length));
 $("#qcat").textContent=mode==="timed"?"DESAFIO DE 60 SEGUNDOS":mode==="daily"?"QUIZ DO DIA":cat?cat.toUpperCase():"CONHECIMENTOS GERAIS";
 if(mode==="timed"){tick();interval=setInterval(()=>{seconds--;tick();if(seconds<=0)finish(true)},1000)}
 show();
}
function tick(){$("#timer").textContent="⏱ 00:"+String(Math.max(0,seconds)).padStart(2,"0")}
function show(){
 if(idx>=set.length){finish(false);return}
 done=false;let q=set[idx];$("#count").textContent=`Pergunta ${idx+1} de ${set.length}`;$("#progress").style.width=(idx/set.length*100)+"%";$("#question").textContent=q.question;$("#feedback").textContent="";$("#next").disabled=true;
 $("#answers").innerHTML=q.options.map((o,i)=>`<button class="answer" data-i="${i}"><span>${String.fromCharCode(65+i)}</span>${o}</button>`).join("");
 document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>answer(+b.dataset.i));
}
function answer(i){if(done)return;done=true;let q=set[idx],ok=i===q.answer;if(ok)score+=10;
 document.querySelectorAll(".answer").forEach((b,n)=>{b.disabled=true;if(n===q.answer)b.classList.add("correct");else if(n===i)b.classList.add("wrong")});
 $("#feedback").innerHTML=`<b>${ok?"Muito bem!":"Quase!"}</b> ${q.explanation}`;$("#next").disabled=false}
function finish(timeup){if($("#finished").hidden===false)return;if(interval)clearInterval(interval);$("#question").parentElement.querySelectorAll(":scope > *").forEach(el=>{if(!["finished"].includes(el.id))el.hidden=true});$("#finished").hidden=false;$("#final-message").textContent=timeup?`O tempo acabou! Você acertou ${score/10} pergunta(s).`:`Você concluiu ${set.length} pergunta(s) e acertou ${score/10}.`;$("#final-score").textContent=score+" pontos";
 let best=Number(localStorage.getItem("qdb-best")||0);if(score>best)localStorage.setItem("qdb-best",score);localStorage.setItem("qdb-completed",Number(localStorage.getItem("qdb-completed")||0)+1);localStorage.setItem("qdb-last",JSON.stringify({score,date:new Date().toISOString()}))}
document.addEventListener("DOMContentLoaded",()=>{$("#next").onclick=()=>{idx++;show()};start()});