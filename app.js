"use strict";
// FairShift UI. Pure logic lives in logic.js (unit tested).
const T={en:{wk:"Worker",em:"Employer",ci:"Check-in",ps:"Payslip",rp:"Report",fb:"Feedback",sk:"Skills",hi:"Hello",scan:"Scan site QR to check in",out:"Check out",in:"Checked in at",sh:"Shift length (demo)",wh:"Hours this week",ot:"Overtime hours",base:"Regular pay",otp:"Overtime pay (1.5×)",pf:"Provident fund (12%)",esi:"Insurance (0.75%)",net:"Take-home",why:"How we calculated this",issue:"Describe the problem",speak:"🎤 Speak",send:"Submit",st:"Status",anon:"100% anonymous – your name is never saved",topic:"About",rate:"How is it?",thx:"Thank you!",tr:"Training & certificates",none:"Nothing yet",fat:"⚠️ You worked long hours. Please rest.",dash:"Overview",att:"Attendance",gr:"Complaints & safety",risk:"At risk of leaving",fa:"Fatigue alerts",th:"Feedback themes",hrs:"Hours",name:"Name",open:"Open",prog:"In progress",res:"Resolved",safety:"Safety hazard",pay:"Pay question",conduct:"Conduct",ok:"All fine"},
ta:{wk:"தொழிலாளர்",em:"நிர்வாகி",ci:"வருகை",ps:"சம்பள விவரம்",rp:"புகார்",fb:"கருத்து",sk:"திறன்கள்",hi:"வணக்கம்",scan:"வருகை பதிவு செய்ய QR ஸ்கேன் செய்யவும்",out:"வெளியேறு",in:"வருகை நேரம்",sh:"பணி நேரம் (டெமோ)",wh:"இந்த வார மணி நேரம்",ot:"கூடுதல் நேரம்",base:"அடிப்படை சம்பளம்",otp:"கூடுதல் நேர ஊதியம் (1.5×)",pf:"வைப்பு நிதி (12%)",esi:"காப்பீடு (0.75%)",net:"கைக்கு வரும் தொகை",why:"இது எப்படி கணக்கிடப்பட்டது",issue:"பிரச்சினையை விவரிக்கவும்",speak:"🎤 பேசுங்கள்",send:"அனுப்பு",st:"நிலை",anon:"முற்றிலும் அநாமதேயம் – உங்கள் பெயர் சேமிக்கப்படாது",topic:"தலைப்பு",rate:"எப்படி இருக்கிறது?",thx:"நன்றி!",tr:"பயிற்சி & சான்றிதழ்கள்",none:"இன்னும் இல்லை",fat:"⚠️ நீங்கள் அதிக நேரம் வேலை செய்தீர்கள். ஓய்வு எடுங்கள்.",open:"திறந்தது",prog:"நடவடிக்கையில்",res:"தீர்க்கப்பட்டது",safety:"பாதுகாப்பு ஆபத்து",pay:"சம்பள கேள்வி",conduct:"நடத்தை"},
hi:{wk:"कर्मचारी",em:"नियोक्ता",ci:"हाज़िरी",ps:"पे-स्लिप",rp:"शिकायत",fb:"फ़ीडबैक",sk:"कौशल",hi:"नमस्ते",scan:"हाज़िरी के लिए QR स्कैन करें",out:"चेक आउट",in:"चेक-इन समय",sh:"शिफ्ट अवधि (डेमो)",wh:"इस हफ़्ते के घंटे",ot:"ओवरटाइम घंटे",base:"नियमित वेतन",otp:"ओवरटाइम वेतन (1.5×)",pf:"भविष्य निधि (12%)",esi:"बीमा (0.75%)",net:"हाथ में आने वाला वेतन",why:"यह कैसे गिना गया",issue:"समस्या बताएं",speak:"🎤 बोलें",send:"भेजें",st:"स्थिति",anon:"पूरी तरह गुमनाम – आपका नाम सेव नहीं होता",topic:"विषय",rate:"कैसा है?",thx:"धन्यवाद!",tr:"प्रशिक्षण और प्रमाणपत्र",none:"अभी कुछ नहीं",fat:"⚠️ आपने बहुत घंटे काम किया। कृपया आराम करें।",open:"खुली",prog:"प्रगति में",res:"हल हुई",safety:"सुरक्षा ख़तरा",pay:"वेतन सवाल",conduct:"व्यवहार"}};
const IND={con:{sub:"Construction site – daily-wage crew",rate:[90,85,95,110,80,120],ot:1.5,roles:["Mason","Helper","Electrician","Crane Operator","Helper","Supervisor"],skills:[["Scaffold safety","2025"],["Height work","2024"]],topics:["Site safety","Supervisor","Wages & overtime","Drinking water / toilets"]},
col:{sub:"College – teaching & support staff",rate:[160,140,120,100,130,150],ot:1.25,roles:["Lecturer","Lab Assistant","Librarian","Clerk","Lecturer","Warden"],skills:[["FDP – Outcome-based education","2025"],["First Aid","2024"]],topics:["Management","Workload","Timetable","Facilities"]}};
const NM=["Ravi","Meena","Karthik","Lakshmi","Imran","Sunita"];
const H=[[9,9,10,9,11,9,0],[8,8,9,8,8,0,0],[12,12,12,11,12,12,12],[8,8,8,8,8,8,0],[9,10,9,9,10,9,0],[8,9,8,8,9,0,0]];
const FB0=[["Wages & overtime",2],["Site safety",2],["Supervisor",3],["Drinking water / toilets",1],["Wages & overtime",2]];
const gt=(k)=>T[S.lang][k]||T.en[k]||k;
let S={ind:"con",lang:"en",role:"w",tab:"ci",me:0,gr:[],fb:[],cin:{},sk:{}};
try{Object.assign(S,JSON.parse(localStorage.getItem("fs")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("fs",JSON.stringify(S))}catch(e){}};
const wk=i=>{const a=H[i].slice();const x=(S.extra||{})[S.ind+i]||0;return a.map((v,k)=>k==6?v+x:v)};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const calc=i=>Logic.calc(wk(i),IND[S.ind].rate[i],IND[S.ind].ot);
const fatigue=i=>Logic.fatigue(wk(i));
const risk=i=>{const f=S.fb.concat(FB0.map(x=>({t:x[0],r:x[1]})));return Logic.risk({ot:calc(i).ot,flags:fatigue(i).length,open:S.gr.filter(g=>g.w==i&&g.s!="res").length,avg:f.reduce((s,x)=>s+x.r,0)/f.length})};
const $=s=>document.querySelector(s);
function nav(){const w=[["ci","ci"],["ps","ps"],["rp","rp"],["fb","fb"],["sk","sk"]],e=[["d","dash"],["g","gr"],["f","th"]];
$("#tabs").innerHTML=(S.role=="w"?w:e).map(([k,l])=>`<button data-t="${k}" class="${S.tab==k?"on":""}">${S.role=="e"?(T.en[l]):gt(l)}</button>`).join("");
$("#tabs").onclick=ev=>{const t=ev.target.dataset.t;if(t){S.tab=t;save();draw()}}}
function draw(){S.lang=$("#lang").value;document.documentElement.lang=S.lang;S.ind=$("#ind").value;$("#sub").textContent=IND[S.ind].sub;
$("#live").textContent="";$("#rw").className=S.role=="w"?"on":"";$("#re").className=S.role=="e"?"on":"";
const ws=["ci","ps","rp","fb","sk"];if(S.role=="w"&&!ws.includes(S.tab))S.tab="ci";if(S.role=="e"&&ws.includes(S.tab))S.tab="d";nav();
$("#main").innerHTML=S.role=="w"?worker():employer();bind()}
function worker(){const i=S.me,t=S.tab,c=calc(i),I=IND[S.ind];
const sel=`<select id="me" aria-label="Select worker">${NM.map((n,k)=>`<option value="${k}" ${k==i?"selected":""}>${n} – ${I.roles[k]}</option>`).join("")}</select>`;
let h=`<div class="c"><b>${gt("hi")}, ${NM[i]}!</b> ${sel}</div>`;
if(fatigue(i).length)h+=`<div class="c" style="background:var(--wb);color:var(--wr)">${gt("fat")}</div>`;
if(t=="ci"){const ci=S.cin[S.ind+i];h+=`<div class="c">${ci?`<p>✅ ${gt("in")} <b>${ci}</b></p><label class="mu">${gt("sh")}</label><br><select id="len" aria-label="Shift length in hours"><option>8</option><option>10</option><option>12</option></select> <button class="p" id="co">${gt("out")}</button>`:`<button class="p big" id="qr" style="width:100%">📷 ${gt("scan")}</button>`}</div>
<div class="c"><h2>${gt("wh")}</h2><div class="big">${c.tot} h</div><div class="mu">${gt("ot")}: ${c.ot} h</div>
<div class="g2" style="margin-top:8px">${wk(i).map((v,k)=>`<div><span class="mu">${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][k]}</span><div class="bb"><i style="width:${Math.min(100,v/12*100)}%"></i></div></div>`).join("")}</div></div>`}
if(t=="ps")h+=`<div class="c"><h2>${gt("ps")}</h2><table>
<tr><td>${c.reg}h × ₹${c.r}</td><td class="r">₹${c.b.toFixed(0)}</td></tr>
<tr><td>${gt("base")==""?"":gt("otp")}: ${c.ot}h × ₹${(c.r*I.ot).toFixed(0)}</td><td class="r">₹${c.o.toFixed(0)}</td></tr>
<tr><td>${gt("pf")}</td><td class="r">− ₹${c.pf.toFixed(0)}</td></tr><tr><td>${gt("esi")}</td><td class="r">− ₹${c.esi.toFixed(0)}</td></tr>
<tr><th>${gt("net")}</th><th class="r">₹${c.net.toFixed(0)}</th></tr></table><p class="mu">${gt("why")}: ${c.tot}h − 8h/day = ${c.ot}h OT</p></div>`;
if(t=="rp"){h+=`<div class="c"><select id="gt" aria-label="Complaint type"><option value="safety">${gt("safety")}</option><option value="pay">${gt("pay")}</option><option value="conduct">${gt("conduct")}</option></select>
<p><textarea id="gx" aria-label="Describe the problem" rows="3" placeholder="${gt("issue")}"></textarea></p><button id="mic">${gt("speak")}</button> <button class="p" id="gs">${gt("send")}</button></div>`;
const mine=S.gr.filter(g=>g.w==i);h+=mine.map(g=>`<div class="c"><span class="tg ${g.s=="res"?"":"w"}">${gt(g.s=="open"?"open":g.s=="prog"?"prog":"res")}</span> <b>${gt(g.k)}</b><div class="mu">${esc(g.x)}</div></div>`).join("")}
if(t=="fb"){h+=`<div class="c"><span class="tg">🔒 ${gt("anon")}</span><p>${gt("topic")}:<br><select id="ft" aria-label="Feedback topic">${I.topics.map(x=>`<option>${x}</option>`).join("")}</select></p><p>${gt("rate")}<br>${[1,2,3,4,5].map(n=>`<button class="rt" data-r="${n}">${"⭐".repeat(n)}</button>`).join(" ")}</p>
<textarea id="fx" aria-label="Your comment" rows="2"></textarea><p><button class="p" id="fs">${gt("send")}</button> <span id="ty"></span></p></div>`}
if(t=="sk"){const l=I.skills.concat(S.sk[S.ind+i]||[]);h+=`<div class="c"><h2>🪪 ${gt("tr")}</h2><table>${l.map(s=>`<tr><td>${s[0]}</td><td class="r">${s[1]}</td></tr>`).join("")}</table><p class="mu">Portable across employers · QR verifiable</p></div>`}
return h}
function employer(){const t=S.tab,I=IND[S.ind];let h="";
const all=NM.map((n,k)=>({n,k,c:calc(k),f:fatigue(k),r:risk(k)}));
if(t=="d")h=`<div class="g2"><div class="c"><div class="mu">Staff</div><div class="big">${NM.length}</div></div><div class="c"><div class="mu">Open complaints</div><div class="big">${S.gr.filter(g=>g.s!="res").length}</div></div></div>
<div class="c"><h2>⚠️ Fatigue alerts</h2>${all.filter(a=>a.f.length).map(a=>`<div><b>${a.n}</b> (${I.roles[a.k]}) <span class="tg w">${a.f.join(", ")}</span></div>`).join("")||"All fine"}</div>
<div class="c"><h2>📉 Risk of leaving</h2><div class="sc"><table>${all.sort((a,b)=>b.r-a.r).map(a=>`<tr><td>${a.n}</td><td style="width:50%"><div class="bb"><i style="width:${a.r}%;background:${a.r>55?"var(--rd)":"var(--ac)"}"></i></div></td><td class="r">${a.r}</td></tr>`).join("")}</table></div><p class="mu">Score = overtime + fatigue + open complaints + low feedback</p></div>
<div class="c"><h2>Attendance (hours this week)</h2><table>${all.map(a=>`<tr><td>${a.n}</td><td class="r">${a.c.tot}h</td><td class="r">OT ${a.c.ot}h</td></tr>`).join("")}</table></div>`;
if(t=="g")h=`<div class="c"><h2>Complaints & safety</h2>${S.gr.length?"":"<p class=mu>None yet – submit one from the Worker view.</p>"}</div>`+S.gr.map((g,x)=>`<div class="c"><span class="tg ${g.s=="res"?"":"w"}">${g.k}</span> <b>${NM[g.w]}</b><p>${esc(g.x)}</p><select aria-label="Complaint status" data-g="${x}">${["open","prog","res"].map(s=>`<option value="${s}" ${g.s==s?"selected":""}>${T.en[s]}</option>`).join("")}</select></div>`).join("");
if(t=="f"){const fb=S.fb.concat(FB0.map(x=>({t:x[0],r:x[1]})));h=`<div class="c"><h2>Anonymous feedback themes</h2>${I.topics.map(tp=>{const l=fb.filter(x=>x.t==tp),a=l.length?l.reduce((s,x)=>s+x.r,0)/l.length:0;return `<div>${tp} <span class="mu">(${l.length})</span><div class="bb"><i style="width:${a*20}%;background:${a<3?"var(--rd)":"var(--ac)"}"></i></div></div>`}).join("")}</div><div class="c">${S.fb.filter(x=>x.x).map(x=>`<p>“${esc(x.x)}” <span class="mu">– ${x.t}</span></p>`).join("")||"<span class=mu>Free-text comments appear here, with no names.</span>"}</div>`}
return h}
function bind(){const q=s=>document.querySelector(s);
if(q("#me"))q("#me").onchange=e=>{S.me=+e.target.value;save();draw()};
if(q("#qr"))q("#qr").onclick=()=>{S.cin[S.ind+S.me]=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});save();draw()};
if(q("#co"))q("#co").onclick=()=>{S.extra=S.extra||{};const k=S.ind+S.me;S.extra[k]=(S.extra[k]||0)+ +q("#len").value;delete S.cin[k];save();draw()};
if(q("#gs"))q("#gs").onclick=()=>{const x=q("#gx").value.trim();if(!x)return;S.gr.push({w:S.me,k:q("#gt").value,x,s:"open"});save();draw()};
if(q("#mic"))q("#mic").onclick=()=>{try{const R=window.SpeechRecognition||window.webkitSpeechRecognition,r=new R();r.lang={en:"en-IN",ta:"ta-IN",hi:"hi-IN"}[S.lang];r.onresult=e=>{q("#gx").value+=e.results[0][0].transcript};r.start()}catch(e){alert("Voice not supported in this browser – please type.")}};
let rt=3;document.querySelectorAll(".rt").forEach(b=>b.onclick=()=>{rt=+b.dataset.r;document.querySelectorAll(".rt").forEach(x=>x.classList.remove("on"));b.classList.add("on")});
if(q("#fs"))q("#fs").onclick=()=>{S.fb.push({t:q("#ft").value,r:rt,x:q("#fx").value.trim()});save();q("#fx").value="";q("#ty").textContent=gt("thx")};
document.querySelectorAll("[data-g]").forEach(s=>s.onchange=()=>{S.gr[+s.dataset.g].s=s.value;save();$("#live").textContent="Status updated"})}
$("#ind").value=S.ind;$("#lang").value=S.lang;
$("#ind").onchange=()=>{save();draw()};$("#lang").onchange=()=>{save();draw()};
$("#rw").onclick=()=>{S.role="w";save();draw()};$("#re").onclick=()=>{S.role="e";save();draw()};
draw();