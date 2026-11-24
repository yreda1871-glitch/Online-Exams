/* المسابقة الجديدة: "ساحة التحدي" (بتحل محل المسابقة القديمة، بتتحمّل من 8-pwa.js) */
(function(){
'use strict';
if(window.__cxLoaded)return;window.__cxLoaded=true;
var NQ=40,TL=12,PAGE_SIZE=20;
var CATN2={all:'🎲 مختلط',din:'🕌 ديني',cul:'📖 ثقافي',gen:'🌍 عام',qur:'📿 قرآن',tv:'🎬 مسلسلات'};
var css=document.createElement('style');
css.textContent=[
'#cx{position:fixed;inset:0;z-index:100000;display:flex;justify-content:center;background:radial-gradient(120% 80% at 50% 0%,#17306b 0%,#0a1a42 55%,#050d27 100%);color:#fff;font-family:Cairo,Tahoma,Arial,sans-serif;direction:rtl;overflow:hidden}',
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


var css2=document.createElement('style');css2.textContent=[
'.cx-path{display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;font-size:12px;color:#c8d6f7}',
'.cx-path span{background:rgba(255,255,255,.07);border-radius:12px;padding:6px 8px;display:flex;align-items:center;gap:5px}.cx-path b{background:#f5a623;color:#3b2a00;border-radius:50%;width:18px;height:18px;display:inline-flex;align-items:center;justify-content:center;font-size:11px}.cx-path em{font-style:normal;opacity:.5}',
'.cx-round{text-align:center;background:linear-gradient(160deg,rgba(255,215,94,.18),rgba(56,189,248,.1));border:1px solid rgba(255,255,255,.14);border-radius:24px;padding:18px 12px}',
'.cx-round small{color:#9fb4e6;font-weight:700}.cx-round h2{margin:6px 0 0;font-size:19px;line-height:1.7}.cx-round h2 span{font-size:26px;color:#ffd75e}',
'.cx-ms{display:grid;gap:8px}.cx-m{display:flex;align-items:center;justify-content:space-between;gap:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:9px 12px;font-size:13.5px}',
'.cx-m.mine{background:rgba(255,215,94,.14);border-color:rgba(255,215,94,.55)}.cx-m i{font-style:normal;font-size:11px;color:#9fb4e6}.cx-m span{flex:1;text-align:center;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cx-m span.me{color:#ffd75e}',
'.cx-done{background:rgba(255,255,255,.05);border-radius:12px;padding:8px 12px;margin-bottom:6px;font-size:13px}.cx-done b{color:#9fb4e6;margin-left:6px}',
'.cx-vs{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px}.cx-side{flex:1;text-align:center;min-width:0}.cx-side b{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.cx-vsm{flex:0 0 auto;background:rgba(255,255,255,.09);border-radius:14px;padding:6px 10px;text-align:center;font-size:12px;font-weight:800;line-height:1.5}',
'.cx-dots{display:flex;gap:4px;justify-content:center;margin-top:4px}.cx-dots u{width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,.14)}.cx-dots u.ok{background:#22d3a6}.cx-dots u.no{background:#f43f5e}',
'.cx-oppst{display:block;margin-top:4px;color:#ffd75e}',
'.cx-ov{position:absolute;inset:0;background:rgba(3,8,26,.8);display:flex;align-items:center;justify-content:center;padding:20px;z-index:5}.cx-dlg{background:#122757;border:1px solid rgba(255,255,255,.2);border-radius:22px;padding:20px;max-width:360px;width:100%;text-align:center}.cx-dlg h3{margin:0 0 6px}.cx-dlg p{margin:0 0 14px;color:#c8d6f7;font-size:14px}',
'.cx-conf{position:relative;height:0}.cx-conf i{position:absolute;top:-60px;width:8px;height:14px;border-radius:2px;animation:cxfall 2.6s linear infinite}',
'@keyframes cxfall{to{transform:translateY(520px) rotate(540deg);opacity:0}}'
].join('\n');
var cols=['#ffd75e','#38bdf8','#22d3a6','#fb7185','#fff'];
css2.textContent+=Array.apply(null,Array(17)).map(function(_,i){return '.cx-conf i:nth-child('+(i+1)+'){left:'+(3+i*5.7)+'%;background:'+cols[i%5]+';animation-delay:'+((i*0.17)%1.6).toFixed(2)+'s}'}).join('');
document.head.appendChild(css2);

var css3=document.createElement('style');css3.textContent=[

'.cx-bw{position:relative;width:100%;overflow:hidden;margin-top:4px}',
'.cx-bg{position:absolute;right:0;top:0}',
'.cx-lines{position:absolute;left:0;top:0;pointer-events:none}',
'.cx-lab{position:absolute;top:2px;width:50px;text-align:center;font-size:8.5px;color:#9fb4e6;font-weight:700;line-height:1.2}',
'.cx-lab.fin{color:#ffd75e;font-size:11px;top:44px}',
'.cx-troph{position:absolute;font-size:52px;line-height:1;width:66px;text-align:center;filter:drop-shadow(0 6px 12px rgba(0,0,0,.5))}',
'.cx-s{position:absolute;width:50px;height:42px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.2);border-radius:9px;font-size:8.5px;font-weight:700;line-height:1.1;overflow:hidden;transition:opacity .4s,filter .4s}',
'.cx-s span{max-width:46px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.cx-s em{font-style:normal;opacity:.5;font-size:15px}',
'.cx-s.empty{opacity:.35;background:rgba(255,255,255,.04)}',
'.cx-s.me{border-color:#ffd75e;box-shadow:0 0 12px rgba(255,215,94,.75);background:rgba(255,215,94,.16)}',
'.cx-s.lose{opacity:.6;filter:grayscale(1)}',
'.cx-s.lose:after{content:"✕";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:34px;color:#f43f5e;font-weight:800;text-shadow:0 0 8px #000;animation:cxx .45s cubic-bezier(.2,1.8,.4,1)}',
'@keyframes cxx{from{transform:scale(3.2);opacity:0}to{transform:scale(1);opacity:1}}',
'.cx-sa{width:22px;height:22px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(255,255,255,.35)}',
'.cx-fly{z-index:8;transition:left .95s cubic-bezier(.5,0,.2,1),top .95s cubic-bezier(.5,0,.2,1);box-shadow:0 0 16px rgba(34,211,166,.8);border-color:#22d3a6}',
'.cx-leg{text-align:center;font-size:13px;margin-top:8px;color:#e6eeff}.cx-leg small{color:#9fb4e6}',
'.cx-turn{text-align:center;font-weight:800;font-size:14px;border-radius:12px;padding:7px;margin-bottom:8px}',
'.cx-turn.me{background:rgba(34,211,166,.18);color:#22d3a6}.cx-turn.opp{background:rgba(251,113,133,.16);color:#fda4af}',
'.cx-side.act .cx-sav{box-shadow:0 0 0 3px #ffd75e,0 0 18px rgba(255,215,94,.7)}',
'.cx-podium{display:flex;align-items:flex-end;justify-content:center;gap:8px;margin:6px 0 4px;position:relative}',
'.cx-pod{flex:1;max-width:112px;text-align:center;min-width:0}.cx-pod b{display:block;font-size:12.5px;margin:4px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.cx-podav{width:62px;height:62px;border-radius:50%;object-fit:cover;border:3px solid #ffd75e}.cx-pod.p1 .cx-podav{width:76px;height:76px}',
'.cx-pav{position:relative;display:inline-block}.cx-pav em{position:absolute;top:-26px;left:50%;transform:translateX(-50%);font-style:normal;font-size:28px;animation:cxfloat 2s ease-in-out infinite}',
'.cx-blk{border-radius:12px 12px 0 0;background:linear-gradient(180deg,#ffd75e,#c98a10);display:flex;align-items:center;justify-content:center;font-size:30px;animation:cxrise .9s cubic-bezier(.2,1,.3,1) both}',
'.cx-pod.p2 .cx-blk{background:linear-gradient(180deg,#e5e7eb,#9ca3af)}.cx-pod.p3 .cx-blk{background:linear-gradient(180deg,#e0a46c,#9a5b2a)}',
'@keyframes cxrise{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}',
'.cx-note{margin:12px 0 4px;background:rgba(56,189,248,.1);border:1px solid rgba(56,189,248,.3);border-radius:14px;padding:10px 12px;font-size:12.5px;line-height:1.7;color:#cfe6ff}',
'.cx-dr{opacity:0;animation:cxdr .45s ease-out forwards}',
'@keyframes cxdr{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}',
'.cx-mav,.cx-sav{width:30px;height:30px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.25);flex:0 0 30px}',
'.cx-sav{display:block;margin:0 auto 4px;width:46px;height:46px;flex:none}',
'.cx-vsov{position:absolute;inset:0;z-index:9;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 45%,#1b3b86,#050d27 70%);overflow:hidden;transition:opacity .35s}',
'.cx-vsov.out{opacity:0}',
'.cx-vsrays{position:absolute;inset:-50%;background:repeating-conic-gradient(rgba(255,215,94,.12) 0 8deg,transparent 8deg 16deg);animation:cxspin 6s linear infinite}',
'@keyframes cxspin{to{transform:rotate(360deg)}}',
'.cx-vsrnd{position:relative;font-weight:800;color:#ffd75e;font-size:16px;margin-bottom:22px;letter-spacing:.5px;animation:cxfadein .5s both}',
'.cx-vsrow{position:relative;width:100%;display:flex;align-items:center;justify-content:center;gap:6px;padding:0 10px}',
'.cx-vsp{flex:1;display:flex;flex-direction:column;align-items:center;gap:10px;min-width:0}',
'.cx-vsp b{font-size:17px;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 3px 10px rgba(0,0,0,.6)}',
'.cx-vsav{width:110px;height:110px;border-radius:50%;object-fit:cover;border:4px solid #ffd75e;box-shadow:0 0 0 6px rgba(255,215,94,.2),0 14px 30px rgba(0,0,0,.5)}',
'.cx-vsp.l{animation:cxinr .7s cubic-bezier(.2,1.3,.4,1) both}',
'.cx-vsp.r{animation:cxinl .7s cubic-bezier(.2,1.3,.4,1) .15s both}',
'@keyframes cxinr{from{transform:translateX(140%);opacity:0}to{transform:none;opacity:1}}',
'@keyframes cxinl{from{transform:translateX(-140%);opacity:0}to{transform:none;opacity:1}}',
'.cx-vsbig{flex:0 0 auto;font-size:46px;font-weight:800;color:#fff;text-shadow:0 0 22px #ff5d3c,0 0 40px #ff9a3c,0 4px 0 #b3241a;animation:cxvs .6s cubic-bezier(.2,1.6,.4,1) .55s both;font-style:italic}',
'@keyframes cxvs{from{transform:scale(0) rotate(-20deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}',
'@keyframes cxfadein{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}',
'.cx-vsgo{position:relative;margin-top:30px;font-size:20px;font-weight:800;color:#22d3a6;animation:cxfadein .5s 1.3s both}',
'.cx-pop{z-index:6}',
'@media(max-width:380px){.cx-vsav{width:92px;height:92px}.cx-vsbig{font-size:38px}}',
'@media(prefers-reduced-motion:reduce){.cx-vsrays,.cx-vsp,.cx-vsbig,.cx-vsrnd,.cx-vsgo{animation:none}}'
].join('\n');document.head.appendChild(css3);
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
  return out.slice(0,NQ).map(function(i){var x=QB[i],ix=shuffle([0,1,2,3]);return {cat:x.cat,l:x.l,q:x.q,o:ix.map(function(j){return x.o[j]}),c:ix.indexOf(x.c)}});
}
/* ---------- البطولة (إقصاء من 16 لاعب) ---------- */

/* ---------- صوت وصور ---------- */
var AC=null;
function ac(){try{if(!AC){var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C()}if(AC.state==='suspended')AC.resume()}catch(e){return null}return AC}
function sndOn(){try{return localStorage.getItem('cx_snd')!=='0'}catch(e){return true}}
function tone(f,t,d,type,v,f2){var a=ac();if(!a||!sndOn())return;try{var o=a.createOscillator(),g=a.createGain(),t0=a.currentTime+t;o.type=type||'sine';o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+d);g.gain.setValueAtTime(0.0001,t0);g.gain.linearRampToValueAtTime(v||.15,t0+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(a.destination);o.start(t0);o.stop(t0+d+.05)}catch(e){}}
function crowd(dur,vol){var a=ac();if(!a||!sndOn())return;try{var n=Math.floor(a.sampleRate*dur),b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0),claps=[],i,k;
  for(i=0;i<Math.floor(dur*70);i++)claps.push(Math.random()*dur*0.9);
  for(i=0;i<n;i++)d[i]=(Math.random()*2-1)*0.12;
  claps.forEach(function(c){var st=Math.floor(c*a.sampleRate);for(k=0;k<1400&&st+k<n;k++){d[st+k]+=(Math.random()*2-1)*Math.exp(-k/260)*0.9}});
  var src=a.createBufferSource();src.buffer=b;var f=a.createBiquadFilter();f.type='bandpass';f.frequency.value=2200;f.Q.value=.6;var g=a.createGain();var t0=a.currentTime;g.gain.setValueAtTime(vol,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+dur);src.connect(f);f.connect(g);g.connect(a.destination);src.start(t0)}catch(e){}}
function sfxCheer(){tone(523,0,.14,'triangle',.16);tone(659,.1,.14,'triangle',.16);tone(784,.2,.3,'triangle',.18);tone(1047,.32,.4,'triangle',.14);crowd(1.4,.5)}
function sfxWrong(){tone(220,0,.35,'sawtooth',.07,110)}
function sfxVs(){tone(110,0,.5,'sawtooth',.1,440);tone(60,.45,.5,'sine',.3);crowd(1.2,.25)}
function sfxWin(){[523,659,784,1047,1319].forEach(function(f,i){tone(f,i*.12,.35,'triangle',.16)});crowd(2.2,.55)}
function firstName(n){return String(n||'').trim().split(/\s+/).slice(0,2).join(' ')}
function avOf(seat){
  var src='';
  try{
    if(seat.me){src=(typeof avatarSrc==='function'&&profile&&avatarSrc(profile.avatar_url))||(typeof myMascot==='function'?myMascot():'')}
    else if(seat.src){src=seat.src}
    else{var g=seat.g||'m';src=(typeof AVATAR_SQ!=='undefined'&&AVATAR_SQ[g])||''}
  }catch(e){}
  return src;
}
function avHtml(seat,cls){var s=avOf(seat);return s?'<img class="'+cls+'" alt="" src="'+E(s)+'">':'<span class="'+cls+'" style="background:#1e3a7a;display:inline-block"></span>'}
function myName(){try{return firstName(profile&&profile.full_name)||'أنت'}catch(e){return 'أنت'}}
function dotsHtml(a){var h='';for(var i=0;i<PERQ;i++)h+='<u class="'+(i<a.length?(a[i]?'ok':'no'):'')+'"></u>';return h}
function vsIntro(opp,cb){
  var meSeat=B.seats.filter(function(x){return x.me})[0];
  var ov=document.createElement('div');ov.className='cx-vsov';
  ov.innerHTML='<div class="cx-vsrays"></div><div class="cx-vsrnd">'+RN[B.r]+'</div>'+
   '<div class="cx-vsrow"><div class="cx-vsp l">'+avHtml(meSeat,'cx-vsav')+'<b>'+E(myName())+'</b></div><div class="cx-vsbig">VS</div><div class="cx-vsp r">'+avHtml(opp,'cx-vsav')+'<b>'+E(opp.n)+'</b></div></div><div class="cx-vsgo">استعد!</div>';
  root.appendChild(ov);sfxVs();
  later(function(){ov.classList.add('out')},2300);
  later(function(){cb()},2650);
}
var RN=['دور الـ16','ربع النهائي','نصف النهائي','النهائي'];
var NAMES=['أحمد','محمد','محمود','مصطفى','عمر','علي','يوسف','إبراهيم','حسن','كريم','طارق','سامي','هدى','سارة','مريم','نور','آية','منى','ياسمين','دينا','رنا','ليلى','هبة','إسراء','خالد','ماجد','وليد','أسماء','فاطمة','عبدالله'];
var PERQ=5;
var FEM=['هدى','سارة','مريم','نور','آية','منى','ياسمين','دينا','رنا','ليلى','هبة','إسراء','أسماء','فاطمة'];
async function realPool(){
  var out=[];
  try{
    var d=await rpc('get_student_leaderboard',{p_student_code:code()});
    var mine=String((profile&&profile.full_name)||'').trim();
    (d||[]).forEach(function(x){
      var full=String(x.full_name||'').trim();if(!full||full===mine)return;
      var src='';try{src=(typeof avatarSrc==='function'&&avatarSrc(x.avatar_url))||''}catch(e){}
      var g='m';try{g=(typeof guessGender==='function'&&guessGender(full))||'m'}catch(e){}
      if(!src){try{src=(typeof AVATAR_SQ!=='undefined'&&AVATAR_SQ[g])||''}catch(e){}}
      out.push({n:firstName(full),src:src,g:g});
    });
  }catch(e){}
  return out;
}
async function mkSeats(){
  var real=shuffle(await realPool()),seen={},list=[];
  real.forEach(function(r){if(list.length<15&&!seen[r.n]){seen[r.n]=1;list.push(r)}});
  var pool=shuffle(NAMES.slice()),fam=['السيد','حسن','علي','محمود','إبراهيم','عبدالله','فتحي','سالم'];
  while(list.length<15&&pool.length){var f=pool.shift();list.push({n:f+' '+fam[Math.random()*fam.length|0],g:FEM.indexOf(f)>=0?'f':'m'})}
  var seats=[{n:'أنت',me:true,s:0.5}];
  list.forEach(function(r){seats.push({n:r.n,me:false,s:Math.random(),g:r.g||'m',src:r.src||''})});
  seats.forEach(function(s,i){s.id=i});
  return shuffle(seats);
}
var BASE=[.5,.63,.76,.88],SPD=[.75,.6,.45,.32];
function acc(s,r){return Math.min(.95,Math.max(.4,BASE[Math.min(r,3)]+(s.s-.5)*.12))}
function simMatch(a,b,r){var x=0,y=0,pa=acc(a,r),pb=acc(b,r);for(var i=0;i<PERQ;i++){if(Math.random()<pa)x++;if(Math.random()<pb)y++}if(x===y){return Math.random()<(a.s/(a.s+b.s+.001))?a:b}return x>y?a:b}
function home(keep){
  clearT();S=null;B=null;root.dataset.screen='home';
  var cat=(home.cat=home.cat||'all');
  var chips=Object.keys(CATN2).map(function(k){return '<button class="cx-chip'+(k===cat?' on':'')+'" data-c="'+k+'">'+CATN2[k]+'</button>'}).join('');
  var body=
   '<div class="cx-hero"><div class="cx-cup">🏆</div><h2>بطولة التحدي</h2><p>16 متسابق، 4 أدوار إقصاء. كل دور مواجهة مباشرة من '+PERQ+' أسئلة ضد منافس واحد. اللي يكسب يكمل، واللي يخسر يخرج.</p></div>'+
   '<div class="cx-stats"><div class="cx-stat"><b>'+(me.streak||0)+' 🔥</b><span>أيام متتالية</span></div><div class="cx-stat"><b>'+(me.best||0)+'</b><span>أعلى نقاطك هذا الأسبوع</span></div><div class="cx-stat"><b>'+(me.rank?('#'+me.rank):'-')+'</b><span>ترتيبك</span></div></div>'+
   '<div class="cx-h">اختر نوع الأسئلة</div><div class="cx-chips" id="cxChips">'+chips+'</div>'+
   '<div class="cx-h">طريقك للكأس</div><div class="cx-path">'+RN.map(function(n,i){return '<span><b>'+(i+1)+'</b>'+n+'</span>'}).join('<em>›</em>')+'</div>'+
   '<div class="cx-h">إزاي بتلعب</div><div class="cx-rules"><div class="cx-rule"><i>⏱️</i>'+TL+' ثانية للسؤال</div><div class="cx-rule"><i>⚔️</i>الأكتر إجابات صح يكسب، والأسرع يحسم التعادل</div><div class="cx-rule"><i>✂️</i>مساعدة واحدة: حذف إجابتين</div></div>';
  shell('المسابقة','تتصفّر النقاط كل سبت',body,'<div class="cx-row"><button class="cx-btn sec" id="cxLb">🏅 المتفوقين</button></div><div style="height:10px"></div><button class="cx-btn" id="cxGo">ابدأ البطولة ▶</button>');
  root.querySelectorAll('.cx-chip').forEach(function(b){b.onclick=function(){home.cat=b.dataset.c;root.querySelectorAll('.cx-chip').forEach(function(x){x.classList.toggle('on',x===b)})}});
  $('#cxGo').onclick=start;$('#cxLb').onclick=board;
}
var B=null;
async function start(){
  if(!code()){toast('سجّل دخولك الأول');return}
  var qs=pick(home.cat||'all');
  if(qs.length<PERQ*2){toast('مفيش أسئلة كفاية دلوقتي');return}
  while(qs.length<PERQ*8)qs=qs.concat(shuffle(qs).slice(0,PERQ*8-qs.length));
  qs=qs.slice(0,PERQ*8);var by=[[],[],[],[]];qs.forEach(function(q,i){by[Math.min(3,Math.floor(i/(PERQ*2)))].push(q)});
  qs=[];by.forEach(function(g){qs=qs.concat(g.sort(function(x,y){return (x.l||1)-(y.l||1)}))});
  var seats=await mkSeats();
  B={qs:qs,seats:seats,rounds:[seats.slice()],alive:seats.slice(),r:0,wins:0,correct:0,asked:0,log:[],used5050:false,history:[]};
  drawView();
}
function pairs(alive){var p=[];for(var i=0;i<alive.length;i+=2)p.push([alive[i],alive[i+1]]);return p}

function drawView(){
  clearT();root.dataset.screen='draw';ac();
  var pr=pairs(B.alive);
  var cards=pr.map(function(p,i){var mine=p[0].me||p[1].me;return '<div class="cx-m cx-dr'+(mine?' mine':'')+'" style="animation-delay:'+(0.5+i*0.28).toFixed(2)+'s">'+avHtml(p[0],'cx-mav')+'<span class="'+(p[0].me?'me':'')+'">'+E(p[0].me?myName():p[0].n)+'</span><i>ضد</i><span class="'+(p[1].me?'me':'')+'">'+E(p[1].me?myName():p[1].n)+'</span>'+avHtml(p[1],'cx-mav')+'</div>'}).join('');
  var body='<div class="cx-round"><small>قرعة البطولة</small><h2>🎲 تم سحب المواجهات<br><span>16 متسابق · '+RN[0]+'</span></h2></div>'+
   '<div class="cx-note">🤖 باقي المتسابقين لاعبين بالكمبيوتر بأسماء من قائمة المتفوقين. وكل دور بتقابل خصم أذكى وأقوى من اللي قبله.</div>'+
   '<div class="cx-ms">'+cards+'</div>';
  shell('قرعة البطولة','سحب عشوائي',body,'<button class="cx-btn" id="cxDrawGo">تمام، ابدأ ▶</button>',function(){quitAsk()});
  pr.forEach(function(p,i){later(function(){tone(520+i*45,0,.09,'triangle',.12)},500+i*280)});
  $('#cxDrawGo').onclick=bracketView;
}
function myPair(){return pairs(B.alive).filter(function(p){return p[0].me||p[1].me})[0]}
/* ---------- الشبكة (16 متسابق) ---------- */
var GW=386,SW=50,SH=44,GT=24,CXS=[0,56,112,168,224,280,336];
function slotC(r,i){ /* مركز المربع: [x,y] , r=0..3 */
  var side,j,col,x,y;
  if(r===3){x=CXS[3];y=GT+4*SH+(i===0?-64:64);return {x:x,y:y,l:x,rt:x+SW}}
  var per=[8,4,2][r];side=i<per?0:1;j=i%per;col=r;
  x=side===0?CXS[col]:CXS[6-col];
  y=GT+(j*Math.pow(2,col)+(Math.pow(2,col)/2))*SH;
  return {x:x,y:y,l:x,rt:x+SW,side:side};
}
function seatShort(s){if(!s)return '؟';return s.me?myName().split(' ')[0]:String(s.n||'').split(' ')[0]}
function slotHtml(r,i,vis){
  var s=B.rounds[r]&&B.rounds[r][i],p=slotC(r,i),lost=false;
  if(s&&B.rounds[r+1]&&B.rounds.length>r+1&&r<=vis&&r+1<=vis&&B.rounds[r+1].indexOf(s)<0)lost=true;
  var show=s&&r<=vis;
  var cls='cx-s'+(show?'':' empty')+(show&&s.me?' me':'')+(lost?' lose':'');
  return '<div class="'+cls+'" id="cxs'+r+'_'+i+'" style="left:'+p.x+'px;top:'+(p.y-SH/2+1)+'px">'+(show?avHtml(s,'cx-sa')+'<span>'+E(seatShort(s))+'</span>':'<em>؟</em>')+'</div>';
}
function bracketHtml(vis){
  var h='<div class="cx-bg" id="cxBg" style="width:'+GW+'px;height:'+(GT+8*SH+14)+'px">';
  var lines='',L=function(a,b,fromRight){var xs=fromRight?a.rt:a.l,xd=fromRight?b.l:b.rt,xm=(xs+xd)/2;return 'M'+xs+' '+a.y+'H'+xm+'V'+b.y+'H'+xd+' '};
  var nsrc=[16,8,4];
  for(var r=0;r<3;r++){for(var k=0;k<nsrc[r];k++){var a=slotC(r,k),b=slotC(r+1,r===2?(k<2?0:1):(k>>1));var side=r===2?(k<2?0:1):a.side;lines+=L(a,b,side===0)}}
  h+='<svg class="cx-lines" width="'+GW+'" height="'+(GT+8*SH+14)+'"><path d="'+lines+'" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.5"/></svg>';
  var labs=['دور الـ16','ربع النهائي','نصف النهائي'];
  for(var c=0;c<3;c++){h+='<div class="cx-lab" style="left:'+CXS[c]+'px">'+labs[c]+'</div><div class="cx-lab" style="left:'+CXS[6-c]+'px">'+labs[c]+'</div>'}
  h+='<div class="cx-lab fin" style="left:'+(CXS[3]-6)+'px;width:'+(SW+12)+'px">النهائي</div>';
  h+='<div class="cx-troph" style="left:'+(CXS[3]-8)+'px;top:'+(GT+4*SH-34)+'px">🏆</div>';
  for(var r2=0;r2<4;r2++){var n=[16,8,4,2][r2];for(var i=0;i<n;i++)h+=slotHtml(r2,i,vis)}
  return h+'</div>';
}
function fitBracket(){var w=root&&root.querySelector('#cxBw'),g=root&&root.querySelector('#cxBg');if(!w||!g)return;var s=Math.min(1,w.clientWidth/GW);g.style.transform='scale('+s+')';g.style.transformOrigin='top right';w.style.height=(g.offsetHeight*s)+'px'}
function showBracket(vis,sub,foot,btnFn){
  clearT();root.dataset.screen='bracket';
  shell('بطولة التحدي',sub,'<div id="cxBw" class="cx-bw">'+bracketHtml(vis)+'</div><div class="cx-leg" id="cxLeg"></div>',foot,function(){quitAsk()});
  fitBracket();
  if(btnFn){var b=$('#cxBtn');if(b)b.onclick=btnFn}
}
function bracketView(){
  var r=B.r,mp=myPair(),opp=mp[0].me?mp[1]:mp[0];
  showBracket(r,RN[r]+' · أنت ضد '+opp.n,'<button class="cx-btn" id="cxBtn">⚔️ ابدأ المواجهة</button>',function(){startDuel(opp)});
  var lg=$('#cxLeg');if(lg)lg.innerHTML='<b>مواجهتك:</b> '+E(myName())+' ⚔️ '+E(opp.n)+' <small>(الكمبيوتر)</small>';
}
function flyTo(r,i,r2,i2,seat){
  var g=root.querySelector('#cxBg');if(!g)return;
  var a=slotC(r,i),b=slotC(r2,i2);
  var f=document.createElement('div');f.className='cx-s cx-fly'+(seat.me?' me':'');f.innerHTML=avHtml(seat,'cx-sa')+'<span>'+E(seatShort(seat))+'</span>';
  f.style.left=a.x+'px';f.style.top=(a.y-SH/2+1)+'px';g.appendChild(f);
  void f.offsetWidth;f.style.left=b.x+'px';f.style.top=(b.y-SH/2+1)+'px';
  later(function(){f.remove()},1000);
}
function bracketAnim(r,win,final){
  /* اعرض الدور r، علّم الخاسرين، ثم حرّك الفائزين للأمام */
  showBracket(r,RN[r]+' · النتائج','<button class="cx-btn" id="cxBtn" disabled style="opacity:.5">...</button>');
  var cur=B.rounds[r],nxt=B.rounds[r+1];
  later(function(){
    sfxWrong();
    cur.forEach(function(s,i){if(nxt.indexOf(s)<0){var e=root.querySelector('#cxs'+r+'_'+i);if(e)e.classList.add('lose')}});
  },500);
  later(function(){
    tone(400,0,.4,'sine',.1,900);
    nxt.forEach(function(s,k){var i=cur.indexOf(s);flyTo(r,i,r+1,k,s)});
  },1800);
  later(function(){
    showBracket(r+1,final?'النتيجة النهائية':RN[r+1],'<button class="cx-btn" id="cxBtn"></button>');
    root.querySelectorAll('.cx-s.lose').forEach(function(e){});
    var btn=$('#cxBtn'),mineOut=!win;
    /* أبقِ علامة X على من خسر في الأدوار السابقة */
    if(final){btn.textContent='🏆 منصة التتويج';btn.onclick=podium}
    else if(mineOut){btn.textContent='عرض النتيجة';btn.onclick=function(){eliminate(false)}}
    else{btn.textContent='الدور التالي ▶';btn.onclick=function(){B.alive=B.rounds[r+1];B.r=r+1;bracketView()}}
  },3000);
}
function startDuel(opp){
  var base=B.r*PERQ*2;
  S={opp:opp,i:0,mine:[],theirs:[],tm:0,ttm:0,lock:false,left:TL,t0:0,qs:B.qs.slice(base,base+PERQ*2),log:[]};
  ac();vsIntro(opp,function(){question()});
}
function playHud(turnTxt){
  var meSeat=B.seats.filter(function(x){return x.me})[0];
  return '<div class="cx-vs"><div class="cx-side'+(S.turn==='me'?' act':'')+'">'+avHtml(meSeat,'cx-sav')+'<b>'+E(myName())+'</b><div class="cx-dots">'+dotsHtml(S.mine)+'</div></div><div class="cx-vsm">'+RN[B.r]+'<br>'+(S.i+1)+' / '+PERQ+'</div><div class="cx-side'+(S.turn==='opp'?' act':'')+'">'+avHtml(S.opp,'cx-sav')+'<b>'+E(S.opp.n)+'</b><div class="cx-dots">'+dotsHtml(S.theirs)+'</div></div></div>';
}
function question(){
  clearT();root.dataset.screen='play';S.turn='me';
  var q=S.qs[S.i*2];S.lock=false;S.left=TL;S.t0=Date.now();
  var L=['أ','ب','ج','د'];
  var opts=q.o.map(function(t,k){return '<button class="cx-opt" data-k="'+k+'"><b>'+L[k]+'</b><span>'+E(t)+'</span></button>'}).join('');
  var body=playHud()+
   '<div class="cx-turn me">🎯 دورك تجاوب</div><div class="cx-timer" id="cxTm"><i></i></div>'+
   '<div class="cx-q"><small>'+(CATN2[q.cat]||'')+'</small><h3>'+E(q.q)+'</h3></div>'+
   '<div class="cx-opts" id="cxOpts">'+opts+'</div>'+
   '<div class="cx-life"><button id="cxL1"'+(B.used5050?' disabled':'')+'>✂️ حذف إجابتين</button><button id="cxSnd" style="flex:0 0 56px">'+(sndOn()?'🔊':'🔇')+'</button></div>';
  shell('المواجهة',RN[B.r],body,'',quitAsk);
  root.querySelectorAll('.cx-opt').forEach(function(b){b.onclick=function(){answer(+b.dataset.k)}});
  $('#cxL1').onclick=fifty;
  $('#cxSnd').onclick=function(){try{localStorage.setItem('cx_snd',sndOn()?'0':'1')}catch(e){}this.textContent=sndOn()?'🔊':'🔇';ac()};
  tick=setInterval(function(){
    var el=(Date.now()-S.t0)/1000;S.left=Math.max(0,TL-el);
    var tm=$('#cxTm');if(!tm)return;
    tm.firstChild.style.width=(S.left/TL*100)+'%';tm.classList.toggle('low',S.left<=4);
    if(S.left<=0){clearInterval(tick);tick=null;answer(-1)}
  },100);
}
function oppTurn(){
  clearT();root.dataset.screen='play';S.turn='opp';
  var q=S.qs[S.i*2+1],L=['أ','ب','ج','د'];
  var pa=acc(S.opp,B.r),ok=Math.random()<pa,think=Math.min(TL-1,1.4+TL*SPD[Math.min(B.r,3)]*(1.1-S.opp.s*.3)*.6+Math.random()*1.2);
  var wrong=[];q.o.forEach(function(_,k){if(k!==q.c)wrong.push(k)});
  var pickK=ok?q.c:wrong[Math.random()*wrong.length|0];
  var opts=q.o.map(function(t,k){return '<button class="cx-opt lock" data-k="'+k+'"><b>'+L[k]+'</b><span>'+E(t)+'</span></button>'}).join('');
  var body=playHud()+
   '<div class="cx-turn opp" id="cxTurn">🤖 دور '+E(S.opp.n)+' يجاوب...</div><div class="cx-timer" id="cxTm"><i style="width:0;transition:width '+think.toFixed(1)+'s linear"></i></div>'+
   '<div class="cx-q"><small>'+(CATN2[q.cat]||'')+'</small><h3>'+E(q.q)+'</h3></div>'+
   '<div class="cx-opts" id="cxOpts">'+opts+'</div><div class="cx-life" style="visibility:hidden"><button>.</button></div>';
  shell('المواجهة',RN[B.r],body,'',quitAsk);
  var bar=$('#cxTm').firstChild;bar.style.width='0';void bar.offsetWidth;bar.style.width='100%';
  later(function(){
    S.theirs.push(ok);if(ok)S.ttm+=think;
    root.querySelectorAll('.cx-opt').forEach(function(b,j){if(j===pickK)b.classList.add(ok?'ok':'no');if(j===q.c&&!ok)b.classList.add('ok')});
    var t=$('#cxTurn');if(t)t.textContent=(ok?'✅ ':'❌ ')+S.opp.n+(ok?' جاوب صح':' جاوب غلط');
    var ds=root.querySelectorAll('.cx-dots');if(ds.length>1){ds[1].innerHTML=dotsHtml(S.theirs)}
    if(ok)tone(660,0,.15,'triangle',.1);else tone(200,0,.25,'sawtooth',.05,120);
    later(next,1400);
  },think*1000);
}
function fifty(){
  if(!S||S.lock||B.used5050||S.turn!=='me')return;B.used5050=true;$('#cxL1').disabled=true;
  var q=S.qs[S.i*2],bad=[];q.o.forEach(function(_,k){if(k!==q.c)bad.push(k)});
  shuffle(bad).slice(0,2).forEach(function(k){var b=root.querySelector('.cx-opt[data-k="'+k+'"]');if(b)b.classList.add('off')});
}
function answer(k){
  if(!S||S.lock||S.turn!=='me')return;S.lock=true;clearT();
  var q=S.qs[S.i*2],ok=k===q.c,spent=Math.min(TL,(Date.now()-S.t0)/1000);
  S.mine.push(ok);S.tm+=ok?spent:0;
  S.log.push({q:q,pick:k,ok:ok});B.asked++;if(ok)B.correct++;
  root.querySelectorAll('.cx-opt').forEach(function(b,j){b.classList.add('lock');if(j===q.c)b.classList.add('ok');else if(j===k)b.classList.add('no')});
  var ds=root.querySelectorAll('.cx-dots');if(ds.length>1){ds[0].innerHTML=dotsHtml(S.mine)}
  if(ok){sfxCheer();var pp=document.createElement('div');pp.className='cx-pop';pp.textContent=['برافو! 👏','ممتاز! 🔥','كمّل كده! 💪','جامد! ⭐'][Math.random()*4|0];root.appendChild(pp);later(function(){pp.remove()},950)}else sfxWrong();
  later(oppTurn,1300);
}
function next(){S.i++;if(S.i>=PERQ)duelEnd();else question()}
function quitAsk(){
  if(!S&&!B){close();return}
  var ov=document.createElement('div');ov.className='cx-ov';
  ov.innerHTML='<div class="cx-dlg"><h3>تخرج من البطولة؟</h3><p>لو خرجت هتتحسب عليك هزيمة.</p><div class="cx-row"><button class="cx-btn sec" id="cxNo">كمّل</button><button class="cx-btn" id="cxYes">خروج</button></div></div>';
  root.appendChild(ov);
  ov.querySelector('#cxNo').onclick=function(){ov.remove()};
  ov.querySelector('#cxYes').onclick=function(){ov.remove();clearT();eliminate(true)};
}
function duelEnd(){
  var a=S.mine.filter(Boolean).length,b=S.theirs.filter(Boolean).length,win;
  if(a!==b)win=a>b;else win=S.tm<=S.ttm||!S.theirs.some(Boolean);
  B.history.push({ok:S.mine.slice(),opp:S.opp.n,win:win,a:a,b:b});
  var r=B.r,opp=S.opp,cur=B.rounds[r],nxt=[];
  pairs(cur).forEach(function(p){if(p[0].me||p[1].me){nxt.push(win?(p[0].me?p[0]:p[1]):opp)}else nxt.push(simMatch(p[0],p[1],r))});
  B.rounds[r+1]=nxt;
  if(win)B.wins++;
  var final=r>=3;
  root.dataset.screen='win';
  if(win)sfxWin();
  shell(win?'فزت! 🎉':'خسرت',RN[r],'<div class="cx-res"><div class="cx-cup">'+(win?'⚔️':'💔')+'</div><h2>'+(win?'كسبت ':'خسرت ')+a+' - '+b+'</h2><p>'+(win?(final?'وصلت للقمة!':'تأهلت إلى '+RN[r+1]):'خرجت من '+RN[r])+'</p></div>','<button class="cx-btn" id="cxCont">شوف الشبكة ▶</button>',function(){quitAsk()});
  $('#cxCont').onclick=function(){bracketAnim(r,win,final)};
}
function podium(){
  clearT();root.dataset.screen='podium';
  var fin=B.rounds[3],champ=B.rounds[4][0],run=fin.filter(function(s){return s!==champ})[0];
  var sf=B.rounds[2].filter(function(s){return fin.indexOf(s)<0}),third=sf.sort(function(x,y){return y.s-x.s})[0]||run;
  var iAmChamp=champ.me,iAmRun=run.me;
  var mk=function(s,pos,h,medal){return '<div class="cx-pod p'+pos+'"><div class="cx-pav">'+(pos===1?'<em>👑</em>':'')+avHtml(s,'cx-podav')+'</div><b>'+E(s.me?myName():s.n)+(s.me?' (أنت)':'')+'</b><div class="cx-blk" style="height:'+h+'px">'+medal+'</div></div>'};
  var head='<div class="cx-podium">'+mk(run,2,86,'🥈')+mk(champ,1,118,'🥇')+mk(third,3,66,'🥉')+'</div><div class="cx-conf">'+Array(18).join('<i></i>')+'</div>';
  sfxWin();later(sfxWin,900);
  finalize(head,iAmChamp?'كسبت '+B.wins+' مواجهات من 4':'وصلت للنهائي وخسرت',iAmChamp?'أنت البطل! 👑':'وصيف البطولة 🥈');
}
function lastReview(){
  var miss=[];(B.log||[]).forEach(function(l){if(!l.ok)miss.push(l)});
  return miss;
}
async function submit(){
  var total=Math.max(1,Math.min(20,B.asked)),corr=Math.min(B.correct,total);
  var score=Math.min(corr*200,corr*100+B.wins*150+(B.wins>=4?300:0));
  return {score:score,corr:corr,total:total,res:await rpc('contest2_submit',{p_code:code(),p_score:score,p_correct:corr,p_total:total})};
}
function finishUi(head,sub,extra){
  var el;root.dataset.screen='result';
  shell('النتيجة','',
   '<div class="cx-res">'+head+'<div class="cx-score" id="cxSc">0</div><h2 id="cxTt"></h2><p>'+sub+'</p><div class="cx-stats"><div class="cx-stat"><b id="cxSt">...</b><span>أيام متتالية</span></div><div class="cx-stat"><b id="cxWb">...</b><span>أعلى نقاطك هذا الأسبوع</span></div><div class="cx-stat"><b id="cxRk">...</b><span>ترتيبك</span></div></div></div>'+(extra||''),
   '<div class="cx-row"><button class="cx-btn sec" id="cxLb2">🏅 المتفوقين</button><button class="cx-btn sec" id="cxHm">خروج</button></div><div style="height:10px"></div><button class="cx-btn" id="cxAg">بطولة جديدة ▶</button>');
  $('#cxLb2').onclick=board;$('#cxHm').onclick=close;$('#cxAg').onclick=function(){home(true);setTimeout(start,0)};
}
async function finalize(head,sub,title){
  finishUi(head,sub,'');$('#cxTt').textContent=title;
  try{
    var o=await submit(),r=o.res;me.streak=r.streak;me.best=r.week_best;me.rank=r.rank;
    var t0=Date.now(),dur=Math.min(1400,300+o.score),sc=o.score;
    var iv=setInterval(function(){var p=Math.min(1,(Date.now()-t0)/dur);if(!$('#cxSc')){clearInterval(iv);return}$('#cxSc').textContent=Math.round(sc*p);if(p>=1)clearInterval(iv)},40);
    if($('#cxSt')){$('#cxSt').textContent=r.streak+' 🔥';$('#cxWb').textContent=r.week_best;$('#cxRk').textContent='#'+r.rank}
    if(r.new_best&&sc>0)toast('رقم جديد! أعلى نقاطك هذا الأسبوع 🎉');
  }catch(e){
    if($('#cxSt')){$('#cxSt').textContent='-';$('#cxWb').textContent='-';$('#cxRk').textContent='-'}
    toast('النتيجة ظهرت بس مقدرناش نسجلها. تأكد من النت.');
  }
}
function eliminate(quit){
  clearT();
  var rev='';
  if(S&&S.log&&S.log.length){var miss=S.log.filter(function(l){return !l.ok});
    if(miss.length)rev='<div class="cx-rev"><div class="cx-h">راجع الأسئلة اللي غلطت فيها</div>'+miss.map(function(l){return '<div class="cx-rv">'+E(l.q.q)+'<br><u>✔ '+E(l.q.o[l.q.c])+'</u>'+(l.pick>=0?'<br><em>✘ '+E(l.q.o[l.pick])+'</em>':'<br><em>خلص الوقت</em>')+'</div>'}).join('')+'</div>'}
  var h=B.history[B.history.length-1];
  var round=RN[Math.min(B.r,3)];
  var sub=quit?'خرجت من '+round:'خسرت في '+round+(h?' ('+h.a+' - '+h.b+')':'');
  finishUi('<div class="cx-cup" style="font-size:52px">'+(B.wins>=3?'🥈':B.wins>=1?'💪':'🌱')+'</div>',sub,rev);
  $('#cxTt').textContent=quit?'خرجت من البطولة':'خرجت من البطولة';
  (async function(){try{var o=await submit(),r=o.res;me.streak=r.streak;me.best=r.week_best;me.rank=r.rank;var sc=o.score,t0=Date.now(),iv=setInterval(function(){var p=Math.min(1,(Date.now()-t0)/1000);if(!$('#cxSc')){clearInterval(iv);return}$('#cxSc').textContent=Math.round(sc*p);if(p>=1)clearInterval(iv)},40);if($('#cxSt')){$('#cxSt').textContent=r.streak+' 🔥';$('#cxWb').textContent=r.week_best;$('#cxRk').textContent='#'+r.rank}}catch(e){if($('#cxSt')){$('#cxSt').textContent='-';$('#cxWb').textContent='-';$('#cxRk').textContent='-'}toast('مقدرناش نسجل النتيجة. تأكد من النت.')}})();
}
function champion(){
  clearT();sfxWin();later(sfxWin,900);finalize('<div class="cx-cup" style="font-size:72px;margin-bottom:22px">🏆</div><div class="cx-conf">'+Array(18).join('<i></i>')+'</div>','كسبت '+B.wins+' مواجهات من 4','أنت البطل! 👑');
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
window.__cx={open:open,pick:pick,dbg:function(){return S},bdbg:function(){return B}};
})();
