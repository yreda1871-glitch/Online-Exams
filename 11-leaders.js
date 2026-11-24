/* المتفوقين: تغيير الاسم + شكل جديد للوحة (بيتحمّل من 8-pwa.js) */
(function(){
'use strict';
if(window.__leadersLoaded)return;window.__leadersLoaded=true;
/* 1) إعادة التسمية: المتصدرين -> المتفوقين في كل مكان */
const RE=/المتصدر(ين|ة)?/g;
function fix(s){return s.replace(RE,(m,g)=>'المتفوق'+(g||''))}
function fixNode(root){
  try{
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){const p=n.parentNode&&n.parentNode.nodeName;if(p==='SCRIPT'||p==='STYLE'||p==='TEXTAREA')return NodeFilter.FILTER_REJECT;return RE.test(n.nodeValue)?(RE.lastIndex=0,NodeFilter.FILTER_ACCEPT):(RE.lastIndex=0,NodeFilter.FILTER_REJECT)}});
    const L=[];while(w.nextNode())L.push(w.currentNode);
    L.forEach(n=>{n.nodeValue=fix(n.nodeValue)});
    if(root.querySelectorAll)root.querySelectorAll('[title],[aria-label],[alt]').forEach(e=>{['title','aria-label','alt'].forEach(a=>{const v=e.getAttribute(a);if(v&&/المتصدر/.test(v))e.setAttribute(a,fix(v))})});
  }catch(e){}
}
let t=null;
function schedule(){if(t)return;t=requestAnimationFrame(()=>{t=null;fixNode(document.body);if(/المتصدر/.test(document.title))document.title=fix(document.title)})}
function startObs(){fixNode(document.body);new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,characterData:true})}
if(document.body)startObs();else document.addEventListener('DOMContentLoaded',startObs);

/* 2) شكل جديد للوحة */
const css=document.createElement('style');
css.textContent=`
#leaderList.lb2{display:block;padding:0}
.lb-hero{background:linear-gradient(160deg,#0B2A5B 0%,#1D4ED8 60%,#38BDF8 130%);border-radius:22px;padding:18px 10px 14px;margin-bottom:14px;color:#fff;position:relative;overflow:hidden;box-shadow:0 10px 24px rgba(13,43,86,.28)}
.lb-hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% -10%,rgba(255,215,0,.28),transparent 55%);pointer-events:none}
.lb-podium{position:relative;display:grid;grid-template-columns:1fr 1.15fr 1fr;gap:6px;align-items:end;direction:ltr}
.lb-p{display:flex;flex-direction:column;align-items:center;text-align:center;min-width:0;direction:rtl}
.lb-p .av{position:relative;width:62px;height:62px;border-radius:50%;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.3)}
.lb-p.r1 .av{width:80px;height:80px;border-color:#FACC15}
.lb-p.r2 .av{border-color:#CBD5E1}.lb-p.r3 .av{border-color:#D6A27A}
.lb-p .av img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;background:#fff}
.lb-p .medal{position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);min-width:24px;height:24px;border-radius:12px;display:flex;align-items:center;justify-content:center;font:900 13px Cairo,Tahoma,Arial,sans-serif;color:#1E293B;border:2px solid #fff}
.lb-p.r1 .medal{background:#FACC15}.lb-p.r2 .medal{background:#E2E8F0}.lb-p.r3 .medal{background:#E7B891}
.lb-p .crown{font-size:26px;line-height:1;margin-bottom:2px}
.lb-p .nm{margin-top:14px;font-size:12.5px;font-weight:800;line-height:1.35;max-width:100%;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.lb-p.r1 .nm{font-size:13.5px}
.lb-p .pc{margin-top:4px;background:rgba(255,255,255,.18);border-radius:999px;padding:2px 10px;font-size:12.5px;font-weight:800}
.lb-p.r1 .pc{background:#FACC15;color:#422006}
.lb-p.me .nm:after{content:" (أنت)";color:#FDE68A}
.lb-list{display:flex;flex-direction:column;gap:8px}
.lb-row{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #E2E8F0;border-radius:16px;padding:10px 12px;box-shadow:0 2px 8px rgba(15,23,42,.05)}
.lb-row.me{border-color:#1877F2;background:#EFF6FF;box-shadow:0 0 0 2px rgba(24,119,242,.15)}
.lb-row .rk{flex:0 0 30px;height:30px;border-radius:50%;background:#F1F5F9;color:#475569;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:14px}
.lb-row.me .rk{background:#1877F2;color:#fff}
.lb-row img{flex:0 0 44px;width:44px;height:44px;border-radius:50%;object-fit:cover;background:#F1F5F9}
.lb-row .mid{flex:1;min-width:0}
.lb-row .nm{font-weight:800;font-size:14.5px;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lb-row .nm small{color:#1877F2;font-weight:800;margin-inline-start:4px}
.lb-bar{height:6px;border-radius:99px;background:#E2E8F0;margin-top:6px;overflow:hidden}
.lb-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#22C55E,#16A34A)}
.lb-row .pc{flex:0 0 auto;text-align:center;line-height:1.2}
.lb-row .pc b{display:block;font-size:16px;color:#0F172A}
.lb-row .pc span{font-size:11px;color:#64748B}
.lb-empty{background:#fff;border:1px dashed #CBD5E1;border-radius:16px;padding:18px;text-align:center;color:#64748B;font-weight:700}
`;
document.head.appendChild(css);
function pct(x){return Number(x.average_percentage||0)}
function build(data){
  const img=x=>esc(avatarSrc(x.avatar_url)||(isMeRow(x)?myMascot():AVATAR_SQ[guessGender(x.full_name)]));
  const fb=(typeof fallbackAvatar!=='undefined')?fallbackAvatar:'';
  const im=(x,c)=>'<img class="'+(c||'')+'" src="'+img(x)+'" onerror="this.src=\''+fb+'\'" alt="">';
  const top=data.slice(0,3),rest=data.slice(3);
  const pod=(x,i)=>{const r=i+1;return '<div class="lb-p r'+r+(isMeRow(x)?' me':'')+'">'+(r===1?'<div class="crown">👑</div>':'')+'<div class="av">'+im(x)+'<span class="medal">'+r+'</span></div><div class="nm">'+esc(x.full_name)+'</div><div class="pc">'+pct(x).toFixed(1)+'%</div></div>'};
  const order=[1,0,2].filter(i=>top[i]);
  let h='<div class="lb-hero"><div class="lb-podium">'+order.map(i=>pod(top[i],i)).join('')+'</div></div>';
  if(rest.length)h+='<div class="lb-list">'+rest.map((x,i)=>{const r=i+4,p=Math.max(0,Math.min(100,pct(x)));return '<div class="lb-row'+(isMeRow(x)?' me':'')+'"><div class="rk">'+r+'</div>'+im(x)+'<div class="mid"><div class="nm">'+esc(x.full_name)+(isMeRow(x)?'<small>أنت</small>':'')+'</div><div class="lb-bar"><i style="width:'+p+'%"></i></div></div><div class="pc"><b>'+p.toFixed(1)+'%</b><span>'+(x.total_score??0)+' درجة</span></div></div>'}).join('')+'</div>';
  return h;
}
async function load(){
  const box=document.getElementById('leaderList');if(!box)return;
  box.classList.add('lb2');box.innerHTML='<div class="lb-empty">جارٍ تحميل المتفوقين...</div>';
  const {data,error}=await db.rpc('get_student_leaderboard',{p_student_code:profile.student_code});
  if(error){box.innerHTML='<div class="lb-empty">تعذر تحميل قائمة المتفوقين. جرّب التحديث.</div>';return}
  if(!data||!data.length){box.innerHTML='<div class="lb-empty">لا توجد نتائج كافية لعرض الترتيب.</div>';return}
  cachedLeaderboard=data;
  box.innerHTML=build(data);
}
window.__lbBuild=build;
let n=0;const iv=setInterval(()=>{if(typeof loadLeaderboard==='function'&&typeof db!=='undefined'){window.loadLeaderboard=load;clearInterval(iv)}else if(++n>60)clearInterval(iv)},500);
})();
