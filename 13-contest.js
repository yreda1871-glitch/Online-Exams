/* المسابقة الجديدة: "ساحة التحدي" (بتحل محل المسابقة القديمة، بتتحمّل من 8-pwa.js) */
(function(){
'use strict';
if(window.__cxLoaded)return;window.__cxLoaded=true;
var NQ=10,TL=15,PAGE_SIZE=20;
var CATN2={all:'🎲 مختلط',din:'🕌 ديني',cul:'📖 ثقافي',gen:'🌍 عام',qur:'📿 قرآن',tv:'🎬 مسلسلات'};
var css=document.createElement('style');
css.textContent=[
'#cx{position:fixed;inset:0;z-index:160;display:flex;justify-content:center;background:radial-gradient(120% 80% at 50% 0%,#17306b 0%,#0a1a42 55%,#050d27 100%);color:#fff;font-family:Cairo,Tahoma,Arial,sans-serif;direction:rtl;overflow:hidden}',
'#cx.hidden{display:none}',
'#cx *{box-sizing:border-box}',
'.cx-shell{width:100%;max-width:520px;height:100%;display:flex;flex-direction:column;padding:calc(10px + env(safe-area-inset-top,0px)) 14px calc(14px + env(safe-area-inset-bottom,0px))}',
'.cx-top{display:flex;align-items:center;justify-content:space-between;gap:10px;flex:0 0 auto;padding:4px 0 10px}',
'.cx-top h1{margin:0;font-size:19px;font-weight:800;letter-spacing:.2px}',
'.cx-top small{display:block;font-size:11.5px;color:#9fb4e6;margin-top:1px;font-weight:600}',
'.cx-x{width:40px;height:40px;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:#fff;font:700 17px Cairo,sans-serif;cursor:pointer;flex:0 0 40px}',
'.cx-body{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;padding-bottom:6px}',
'.cx-foot{flex:0 0 auto;padding-top:10px}',
'.cx-btn{display:block;width:100%;border:0;border-radius:18px;padding:16px;font:800 17px Cairo,Tahoma,sans-serif;cursor:pointer;color:#3b2a00;background:linear-gradient(180deg,#ffd75e,#f5a623);box-shadow:0 8px 22px rgba(245,166,35,.35),inset 0 1px 0 rgba(255,255,255,.5)}',
'.cx-btn:active{transform:translateY(1px)}',
'.cx-btn.sec{background:rgba(255,255,255,.09);color:#fff;border:1px solid rgba(255,255,255,.16);box-shadow:none;font-size:15px;padding:13px}',
'.cx-btn[disabled]{opacity:.55}',
'.cx-row{display:flex;gap:10px}.cx-row>*{flex:1}',
'.cx-hero{position:relative;border-radius:26px;padding:22px 18px 18px;text-align:center;background:linear-gradient(160deg,rgba(255,215,94,.18),rgba(56,189,248,.12) 60%,rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.14);overflow:hidden}',
'.cx-hero:before{content:"";position:absolute;inset:-40% -20% auto auto;width:240px;height:240px;background:radial-gradient(circle,rgba(255,215,94,.35),transparent 65%)}',
'.cx-cup{position:relative;font-size:64px;line-height:1;filter:drop-shadow(0 10px 18px rgba(0,0,0,.4));animation:cxfloat 3s ease-in-out infinite}',
'@keyframes cxfloat{50%{transform:translateY(-6px)}}',
'.cx-hero h2{position:relative;margin:8px 0 4px;font-size:22px;font-weight:800}',
'.cx-hero p{position:relative;margin:0;color:#c8d6f7;font-size:13.5px;line-height:1.7}',
'.cx-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:12px 0}',
'.cx-stat{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:12px 6px;text-align:center}',
'.cx-stat b{display:block;font-size:22px;font-weight:800;line-height:1.2}',
'.cx-stat span{font-size:11.5px;color:#9fb4e6;font-weight:600}',
'.cx-h{margin:14px 2px 8px;font-size:13px;color:#9fb4e6;font-weight:700}',
'.cx-chips{display:flex;flex-wrap:wrap;gap:8px}',
'.cx-chip{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#e6eeff;border-radius:999px;padding:9px 14px;font:700 13.5px Cairo,sans-serif;cursor:pointer}',
'.cx-chip.on{background:linear-gradient(180deg,#ffd75e,#f5a623);color:#3b2a00;border-color:transparent}',
'.cx-rules{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:6px}',
'.cx-rule{background:rgba(255,255,255,.05);border-radius:14px;padding:10px 6px;text-align:center;font-size:12px;color:#c8d6f7;line-height:1.5}',
'.cx-rule i{display:block;font-style:normal;font-size:20px;margin-bottom:2px}',
/* play */
'.cx-hud{display:flex;align-items:center;gap:10px;margin-bottom:10px}',
'.cx-pill{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:6px 12px;font-weight:800;font-size:14px;white-space:nowrap}',
'.cx-pill.fire{background:linear-gradient(180deg,#ff9a3c,#ff5d3c);border-color:transparent}',
'.cx-prog{flex:1;height:8px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden}',
'.cx-prog i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#38bdf8,#22d3a6);transition:width .35s}',
'.cx-timer{height:10px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden;margin-bottom:14px}',
'.cx-timer i{display:block;height:100%;width:100%;border-radius:99px;background:linear-gradient(90deg,#22d3a6,#facc15);transition:width .1s linear}',
'.cx-timer.low i{background:linear-gradient(90deg,#fb7185,#f43f5e)}',
'.cx-q{background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.16);border-radius:24px;padding:20px 16px;margin-bottom:14px;text-align:center}',
'.cx-q small{display:block;color:#9fb4e6;font-size:12px;margin-bottom:8px;font-weight:700}',
'.cx-q h3{margin:0;font-size:20px;line-height:1.75;font-weight:800}',
'.cx-opts{display:grid;gap:10px}',
'.cx-opt{display:flex;align-items:center;gap:12px;text-align:right;width:100%;min-height:58px;border-radius:18px;padding:12px 14px;border:1.5px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:#fff;font:700 16px Cairo,Tahoma,sans-serif;cursor:pointer;transition:transform .12s,background .15s,border-color .15s}',
'.cx-opt:active{transform:scale(.985)}',
'.cx-opt b{flex:0 0 30px;height:30px;border-radius:10px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:14px}',
'.cx-opt.ok{background:rgba(34,211,166,.28);border-color:#22d3a6}.cx-opt.ok b{background:#22d3a6;color:#032}',
'.cx-opt.no{background:rgba(244,63,94,.26);border-color:#f43f5e}.cx-opt.no b{background:#f43f5e}',
'.cx-opt.off{opacity:.22;pointer-events:none}',
'.cx-opt.lock{pointer-events:none}',
'.cx-life{display:flex;gap:10px;margin-top:12px}',
'.cx-life button{flex:1;border:1px dashed rgba(255,255,255,.3);background:rgba(255,255,255,.05);color:#e6eeff;border-radius:14px;padding:10px;font:700 13.5px Cairo,sans-serif;cursor:pointer}',
'.cx-life button[disabled]{opacity:.35}',
'.cx-pop{position:absolute;left:50%;top:38%;transform:translate(-50%,0);font-weight:800;font-size:28px;color:#ffd75e;text-shadow:0 4px 14px rgba(0,0,0,.5);pointer-events:none;animation:cxpop .9s ease-out forwards}',
'@keyframes cxpop{from{opacity:1;transform:translate(-50%,0) scale(.8)}to{opacity:0;transform:translate(-50%,-60px) scale(1.2)}}',
/* result */
'.cx-res{text-align:center;padding-top:6px}',
'.cx-stars{font-size:46px;letter-spacing:6px;margin:4px 0}.cx-stars s{text-decoration:none;opacity:.22;filter:grayscale(1)}.cx-stars s.on{opacity:1;filter:none}',
'.cx-score{font-size:54px;font-weight:800;line-height:1.1;background:linear-gradient(180deg,#fff,#ffd75e);-webkit-background-clip:text;background-clip:text;color:transparent}',
'.cx-res h2{margin:2px 0 4px;font-size:21px}',
'.cx-res p{margin:0;color:#c8d6f7;font-size:14px}',
'.cx-rev{margin-top:14px;text-align:right}',
'.cx-rv{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:12px;margin-bottom:8px;font-size:14px;line-height:1.7}',
'.cx-rv u{text-decoration:none;color:#22d3a6;font-weight:800}.cx-rv em{font-style:normal;color:#fb7185}',
/* board */
'.cx-lb{display:grid;gap:8px}',
'.cx-li{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:9px 12px}',
'.cx-li.me{background:linear-gradient(90deg,rgba(255,215,94,.22),rgba(255,215,94,.08));border-color:rgba(255,215,94,.6)}',
'.cx-li .rk{flex:0 0 34px;text-align:center;font-weight:800;font-size:17px}',
'.cx-li img,.cx-li .av{flex:0 0 40px;width:40px;height:40px;border-radius:50%;object-fit:cover;background:#1e3a7a;border:2px solid rgba(255,255,255,.2)}',
'.cx-li .nm{flex:1;min-width:0;font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.cx-li .pt{font-weight:800;color:#ffd75e;font-size:16px}',
'.cx-empty{text-align:center;color:#9fb4e6;padding:40px 10px;font-size:14px;line-height:1.9}',
'@media(max-width:380px){.cx-q h3{font-size:18px}.cx-opt{font-size:15px;min-height:54px}.cx-cup{font-size:54px}}',
'@media(prefers-reduced-motion:reduce){.cx-cup,.cx-pop{animation:none}}'
].join('\n');
document.head.appendChild(css);

var root=null,S=null,tick=null,tmo=[];
var me={streak:0,best:0,rank:0,plays:0,played_today:false,loaded:false};
function $(s){return root.querySelector(s)}
function E(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function code(){try{return profile&&profile.student_code}catch(e){return null}}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.random()*(i+1)|0;var t=a[i];a[i]=a[j];a[j]=t}return a}
function clearT(){if(tick){clearInterval(tick);tick=null}tmo.forEach(clearTimeout);tmo=[]}
function later(fn,ms){var t=setTimeout(fn,ms);tmo.push(t);return t}
function ensure(){
  if(root)return;
  root=document.createElement('div');root.id='cx';root.className='hidden';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');
  document.body.appendChild(root);
}
async function rpc(name,args){
  try{if(typeof ensureDb==='function')await ensureDb()}catch(e){}
  var r=await db.rpc(name,args);if(r.error)throw r.error;return r.data;
}
function shell(title,sub,bodyHtml,footHtml,onX){
  root.innerHTML='<div class="cx-shell"><div class="cx-top"><div><h1>'+title+'</h1>'+(sub?'<small>'+sub+'</small>':'')+'</div><button class="cx-x" aria-label="إغلاق" id="cxX">✕</button></div><div class="cx-body" id="cxBody">'+bodyHtml+'</div>'+(footHtml?'<div class="cx-foot">'+footHtml+'</div>':'')+'</div>';
  $('#cxX').onclick=onX||close;
}
function close(){clearT();S=null;if(root)root.classList.add('hidden');try{document.body.style.overflow=''}catch(e){}}
function open(){
  ensure();root.classList.remove('hidden');try{document.body.style.overflow='hidden'}catch(e){}
  home();loadMe();
}
async function loadMe(){
  var c=code();if(!c)return;
  try{var d=await rpc('contest2_board',{p_code:c});if(d&&d.me){me=Object.assign({loaded:true},d.me);me.rows=d.rows||[];if(root&&!root.classList.contains('hidden')&&root.dataset.screen==='home')home(true)}}catch(e){me.loaded=true}
}
/* ---------- الصفحة الرئيسية ---------- */
function home(keep){
  clearT();S=null;root.dataset.screen='home';
  var cat=(home.cat=home.cat||'all');
  var chips=Object.keys(CATN2).map(function(k){return '<button class="cx-chip'+(k===cat?' on':'')+'" data-c="'+k+'">'+CATN2[k]+'</button>'}).join('');
  var body=
   '<div class="cx-hero"><div class="cx-cup">🏆</div><h2>ساحة التحدي</h2><p>جاوب على '+NQ+' أسئلة بأسرع وقت. كل إجابة صح بتجيب نقط، والسرعة والتتابع بيزودوا النقط.</p></div>'+
   '<div class="cx-stats"><div class="cx-stat"><b>'+(me.streak||0)+' 🔥</b><span>أيام متتالية</span></div><div class="cx-stat"><b>'+(me.best||0)+'</b><span>أعلى نقاطك هذا الأسبوع</span></div><div class="cx-stat"><b>'+(me.rank?('#'+me.rank):'-')+'</b><span>ترتيبك</span></div></div>'+
   '<div class="cx-h">اختر نوع الأسئلة</div><div class="cx-chips" id="cxChips">'+chips+'</div>'+
   '<div class="cx-h">إزاي بتلعب</div><div class="cx-rules"><div class="cx-rule"><i>⏱️</i>'+TL+' ثانية لكل سؤال</div><div class="cx-rule"><i>🔥</i>إجابات صح ورا بعض تزود النقط</div><div class="cx-rule"><i>🛟</i>مساعدتين: حذف إجابتين وتخطي</div></div>';
  shell('المسابقة','تتصفّر النقاط كل سبت',body,'<div class="cx-row"><button class="cx-btn sec" id="cxLb">🏅 المتفوقين</button></div><div style="height:10px"></div><button class="cx-btn" id="cxGo">ابدأ التحدي ▶</button>');
  root.querySelectorAll('.cx-chip').forEach(function(b){b.onclick=function(){home.cat=b.dataset.c;root.querySelectorAll('.cx-chip').forEach(function(x){x.classList.toggle('on',x===b)})}});
  $('#cxGo').onclick=start;$('#cxLb').onclick=board;
}
/* ---------- اختيار الأسئلة ---------- */
function pick(cat){
  var key='cx_used_'+code(),used=[];try{used=JSON.parse(localStorage.getItem(key)||'[]')}catch(e){}
  var all=QB.map(function(_,i){return i}).filter(function(i){return cat==='all'||QB[i].cat===cat});
  var pool=all.filter(function(i){return used.indexOf(i)<0});
  if(pool.length<NQ){used=[];pool=all.slice()}
  var by={1:[],2:[],3:[]};shuffle(pool).forEach(function(i){(by[QB[i].l]||by[1]).push(i)});
  var plan=[1,1,1,1,2,2,2,2,3,3],out=[];
  plan.forEach(function(l){var o=[l,l===3?2:l+1,l===1?2:l-1,1,2,3];for(var k=0;k<o.length;k++){var arr=by[o[k]];if(arr&&arr.length){out.push(arr.shift());return}}});
  if(out.length<NQ){shuffle(pool).forEach(function(i){if(out.length<NQ&&out.indexOf(i)<0)out.push(i)})}
  try{localStorage.setItem(key,JSON.stringify(used.concat(out).slice(-120)))}catch(e){}
  return out.slice(0,NQ).map(function(i){var x=QB[i],ix=shuffle([0,1,2,3]);return {cat:x.cat,q:x.q,o:ix.map(function(j){return x.o[j]}),c:ix.indexOf(x.c)}});
}
/* ---------- اللعب ---------- */
function start(){
  if(!code()){toast('سجّل دخولك الأول');return}
  var qs=pick(home.cat||'all');
  if(qs.length<3){toast('مفيش أسئلة كفاية دلوقتي');return}
  S={qs:qs,i:0,score:0,correct:0,combo:0,best:0,log:[],lock:false,used5050:false,usedSkip:false,left:TL,t0:0};
  question();
}
function question(){
  clearT();root.dataset.screen='play';
  var q=S.qs[S.i];S.lock=false;S.left=TL;S.t0=Date.now();
  var L=['أ','ب','ج','د'];
  var opts=q.o.map(function(t,k){return '<button class="cx-opt" data-k="'+k+'"><b>'+L[k]+'</b><span>'+E(t)+'</span></button>'}).join('');
  var body=
   '<div class="cx-hud"><span class="cx-pill">'+(S.i+1)+' / '+S.qs.length+'</span><div class="cx-prog"><i style="width:'+(S.i/S.qs.length*100)+'%"></i></div><span class="cx-pill'+(S.combo>=2?' fire':'')+'" id="cxCombo">'+(S.combo>=2?'🔥 x'+S.combo:'⭐ '+S.score)+'</span></div>'+
   '<div class="cx-timer" id="cxTm"><i></i></div>'+
   '<div class="cx-q"><small>'+(CATN2[q.cat]||'')+' · '+S.score+' نقطة</small><h3>'+E(q.q)+'</h3></div>'+
   '<div class="cx-opts" id="cxOpts">'+opts+'</div>'+
   '<div class="cx-life"><button id="cxL1"'+(S.used5050?' disabled':'')+'>✂️ حذف إجابتين</button><button id="cxL2"'+(S.usedSkip?' disabled':'')+'>⏭️ تخطي السؤال</button></div>';
  shell('المسابقة',CATN2[home.cat||'all'],body,'',quitAsk);
  root.querySelectorAll('.cx-opt').forEach(function(b){b.onclick=function(){answer(+b.dataset.k)}});
  $('#cxL1').onclick=fifty;$('#cxL2').onclick=skip;
  tick=setInterval(function(){
    var el=(Date.now()-S.t0)/1000;S.left=Math.max(0,TL-el);
    var tm=$('#cxTm');if(!tm)return;
    tm.firstChild.style.width=(S.left/TL*100)+'%';tm.classList.toggle('low',S.left<=5);
    if(S.left<=0){clearInterval(tick);tick=null;answer(-1)}
  },100);
}
function fifty(){
  if(S.lock||S.used5050)return;S.used5050=true;$('#cxL1').disabled=true;
  var q=S.qs[S.i],wrong=[0,1,2,3].filter(function(k){return k!==q.c});
  shuffle(wrong).slice(0,2).forEach(function(k){var b=root.querySelector('.cx-opt[data-k="'+k+'"]');if(b)b.classList.add('off')});
}
function skip(){
  if(S.lock||S.usedSkip)return;S.usedSkip=true;S.lock=true;clearT();
  S.log.push({q:S.qs[S.i],pick:-2,ok:false,skipped:true});
  later(next,150);
}
function answer(k){
  if(S.lock)return;S.lock=true;clearT();
  var q=S.qs[S.i],ok=k===q.c,gain=0;
  if(ok){S.combo++;S.correct++;gain=100+Math.round(S.left/TL*50)+Math.min(S.combo-1,5)*10;S.score+=gain;if(S.combo>S.best)S.best=S.combo}
  else S.combo=0;
  S.log.push({q:q,pick:k,ok:ok});
  root.querySelectorAll('.cx-opt').forEach(function(b){var i=+b.dataset.k;b.classList.add('lock');if(i===q.c)b.classList.add('ok');else if(i===k)b.classList.add('no')});
  if(ok){var p=document.createElement('div');p.className='cx-pop';p.textContent='+'+gain;$('.cx-shell').appendChild(p)}
  else if(k===-1){toast('خلص الوقت ⏱️')}
  later(next,ok?950:1500);
}
function next(){S.i++;if(S.i>=S.qs.length)finish();else question()}
function quitAsk(){
  if(S&&S.log.length<S.qs.length&&root.dataset.screen==='play'){
    if(!confirm('تخرج من التحدي؟ النقط مش هتتسجل.'))return;
  }
  close();
}
/* ---------- النتيجة ---------- */
async function finish(){
  clearT();root.dataset.screen='result';
  var acc=Math.round(S.correct/S.qs.length*100),stars=acc>=90?3:acc>=70?2:acc>=40?1:0;
  var title=acc>=90?'أسطورة! 👑':acc>=70?'شغل جامد 👏':acc>=40?'كويس، كمّل 💪':'حاول تاني، هتتحسن 🌱';
  var starsHtml='<div class="cx-stars">'+[0,1,2].map(function(i){return '<s class="'+(i<stars?'on':'')+'">⭐</s>'}).join('')+'</div>';
  var miss=S.log.filter(function(l){return !l.ok});
  var rev=miss.length?'<div class="cx-rev"><div class="cx-h">راجع أسئلتك</div>'+miss.map(function(l){return '<div class="cx-rv">'+E(l.q.q)+'<br><u>✔ '+E(l.q.o[l.q.c])+'</u>'+(l.pick>=0?'<br><em>✘ '+E(l.q.o[l.pick])+'</em>':(l.skipped?'<br><em>تخطيت السؤال</em>':'<br><em>خلص الوقت</em>'))+'</div>'}).join('')+'</div>':'';
  var snap={score:S.score,correct:S.correct,total:S.qs.length,best:S.best};
  shell('النتيجة','',
    '<div class="cx-res">'+starsHtml+'<div class="cx-score" id="cxSc">0</div><h2>'+title+'</h2><p>'+S.correct+' من '+S.qs.length+' صح · أطول تتابع '+S.best+'</p><div class="cx-stats"><div class="cx-stat"><b id="cxSt">...</b><span>أيام متتالية</span></div><div class="cx-stat"><b id="cxWb">...</b><span>أعلى نقاطك هذا الأسبوع</span></div><div class="cx-stat"><b id="cxRk">...</b><span>ترتيبك</span></div></div></div>'+rev,
    '<div class="cx-row"><button class="cx-btn sec" id="cxLb2">🏅 المتفوقين</button><button class="cx-btn sec" id="cxHm">خروج</button></div><div style="height:10px"></div><button class="cx-btn" id="cxAg">العب تاني ▶</button>');
  $('#cxLb2').onclick=board;$('#cxHm').onclick=close;$('#cxAg').onclick=function(){home(true);setTimeout(start,0)};
  var el=$('#cxSc'),t0=Date.now(),dur=Math.min(1400,300+snap.score);
  var iv=setInterval(function(){var p=Math.min(1,(Date.now()-t0)/dur);if(!$('#cxSc')){clearInterval(iv);return}$('#cxSc').textContent=Math.round(snap.score*p);if(p>=1)clearInterval(iv)},40);
  try{
    var r=await rpc('contest2_submit',{p_code:code(),p_score:snap.score,p_correct:snap.correct,p_total:snap.total});
    me.streak=r.streak;me.best=r.week_best;me.rank=r.rank;
    if($('#cxSt')){$('#cxSt').textContent=r.streak+' 🔥';$('#cxWb').textContent=r.week_best;$('#cxRk').textContent='#'+r.rank}
    if(r.new_best&&snap.score>0)toast('رقم جديد! أعلى نقاطك هذا الأسبوع 🎉');
  }catch(e){
    if($('#cxSt')){$('#cxSt').textContent='-';$('#cxWb').textContent='-';$('#cxRk').textContent='-'}
    toast('النتيجة ظهرت بس مقدرناش نسجلها. تأكد من النت.');
  }
}
/* ---------- لوحة المتفوقين ---------- */
async function board(){
  clearT();root.dataset.screen='board';
  shell('🏅 المتفوقين','أعلى نقاط هذا الأسبوع','<div class="cx-empty">جاري التحميل...</div>','<button class="cx-btn sec" id="cxBk">رجوع</button>');
  $('#cxBk').onclick=function(){home()};
  try{
    var d=await rpc('contest2_board',{p_code:code()});
    var rows=(d&&d.rows)||[],m=(d&&d.me)||{};
    var medals=['🥇','🥈','🥉'];
    var av=function(u){var s='';try{s=(typeof avatarSrc==='function'&&avatarSrc(u))||''}catch(e){}return s?'<img alt="" src="'+E(s)+'">':'<span class="av"></span>'};
    var list=rows.map(function(r,i){var mine=m.rank&&r.rk===m.rank&&r.n===m.n;return '<div class="cx-li'+(r.me?' me':'')+'"><span class="rk">'+(medals[i]||('#'+(i+1)))+'</span>'+av(r.a)+'<span class="nm">'+E(r.n)+(r.me?' (أنت)':'')+'</span><span class="pt">'+E(r.s)+'</span></div>'}).join('');
    var tail=(m.rank&&m.rank>rows.length)?'<div class="cx-li me" style="margin-top:8px"><span class="rk">#'+m.rank+'</span><span class="av"></span><span class="nm">أنت</span><span class="pt">'+(m.best||0)+'</span></div>':'';
    $('#cxBody').innerHTML=rows.length?'<div class="cx-lb">'+list+'</div>'+tail:'<div class="cx-empty">لسه محدش لعب هذا الأسبوع.<br>كن أول واحد على القمة! 🚀</div>';
  }catch(e){$('#cxBody').innerHTML='<div class="cx-empty">تعذر تحميل اللوحة. جرّب تاني.</div>'}
}
window.ctOpen=open;window.ctClose=close;
window.__cx={open:open,pick:pick};
})();
