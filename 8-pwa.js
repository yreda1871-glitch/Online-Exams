/* تثبيت المنصة كتطبيق (PWA) - بيتحمّل من 3-icons.js */
(function(){
'use strict';
if(window.__pwaLoaded)return;window.__pwaLoaded=true;
const head=document.head;
function add(tag,attrs){const e=document.createElement(tag);for(const k in attrs)e.setAttribute(k,attrs[k]);head.appendChild(e);return e}
if(!document.querySelector('link[rel="manifest"]'))add('link',{rel:'manifest',href:'7-manifest.webmanifest?v=2'});
add('link',{rel:'apple-touch-icon',href:'5-apple-touch-icon.png?v=2'});
if(!document.querySelector('meta[name="theme-color"]'))add('meta',{name:'theme-color',content:'#0D2B56'});
add('meta',{name:'apple-mobile-web-app-capable',content:'yes'});
add('meta',{name:'mobile-web-app-capable',content:'yes'});
add('meta',{name:'apple-mobile-web-app-title',content:'الامتحانات الجامعية'});
add('meta',{name:'apple-mobile-web-app-status-bar-style',content:'black-translucent'});


/* الشعار الجديد: الهيدر وشاشة الدخول والأيقونة */
function swapLogo(){
  const LOGO='9-logo.svg?v=2';
  document.querySelectorAll('.brand .mark img,.authlogo img').forEach(i=>{if(i.getAttribute('src')!==LOGO)i.setAttribute('src',LOGO)});
  document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"]').forEach(l=>l.remove());
  if(!document.querySelector('link[data-logo]')){const l=add('link',{rel:'icon',type:'image/svg+xml',href:LOGO});l.setAttribute('data-logo','1')}
}
swapLogo();
const standalone=()=>(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
let deferred=null;

const css=document.createElement('style');
css.textContent=`
.pwa-pill{position:fixed;inset-inline-start:12px;bottom:calc(122px + env(safe-area-inset-bottom,0px));z-index:250;display:none;align-items:center;gap:8px;background:#0D2B56;color:#fff;border:0;border-radius:999px;padding:10px 16px;font:700 14px Cairo,Tahoma,Arial,sans-serif;box-shadow:0 8px 20px rgba(7,25,54,.35);cursor:pointer}
.pwa-pill.show{display:inline-flex}
.pwa-pill svg{width:18px;height:18px}
.pwa-x{background:rgba(255,255,255,.18);border:0;color:#fff;width:22px;height:22px;border-radius:50%;margin-inline-start:2px;font-size:14px;line-height:1;cursor:pointer;padding:0}
.pwa-modal{position:fixed;inset:0;z-index:400;background:rgba(7,25,54,.6);display:none;align-items:flex-end;justify-content:center}
.pwa-modal.show{display:flex}
.pwa-sheet{background:#fff;color:#0F172A;width:min(520px,100%);border-radius:22px 22px 0 0;padding:20px 18px calc(22px + env(safe-area-inset-bottom,0px));font-family:Cairo,Tahoma,Arial,sans-serif;direction:rtl;max-height:85vh;overflow:auto}
.pwa-sheet h3{margin:0 0 6px;font-size:19px}
.pwa-sheet p{margin:0 0 12px;color:#64748B;font-size:14px}
.pwa-sheet ol{margin:0 0 14px;padding:0;list-style:none;counter-reset:s}
.pwa-sheet li{counter-increment:s;display:flex;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid #E2E8F0;font-size:15px;font-weight:600}
.pwa-sheet li:before{content:counter(s);flex:0 0 28px;height:28px;border-radius:50%;background:#EBF4FF;color:#1877F2;display:flex;align-items:center;justify-content:center;font-weight:800}
.pwa-sheet li svg{width:22px;height:22px;flex:0 0 22px;color:#1877F2;vertical-align:middle}
.pwa-close{width:100%;border:0;border-radius:14px;background:#1877F2;color:#fff;padding:12px;font:800 15px Cairo,Tahoma,Arial,sans-serif;cursor:pointer}
`;
head.appendChild(css);


/* كروت المسابقة والمساعد: أصغر على الموبايل (حوالي نص الارتفاع) */
const compact=document.createElement('style');
compact.textContent=`@media(max-width:600px){
.home-cards{gap:8px!important}
.home-cards .contest-card{min-height:84px!important;padding:10px 12px!important;gap:2px!important;justify-content:center!important;border-radius:16px!important;box-shadow:0 5px 14px rgba(7,25,54,.22)!important}
.home-cards .contest-card b{font-size:15px!important;line-height:1.4!important;padding-inline-end:40px}
.home-cards .shortcut-caption{font-size:10.5px!important;line-height:1.4!important;padding-inline-end:40px}
.home-cards .shortcut-go{display:none!important}
.home-cards .shortcut-face,.home-cards .shortcut-icon{width:34px!important;height:34px!important;top:50%!important;transform:translateY(-50%);inset-inline-end:10px!important;border-radius:11px!important;font-size:20px!important}
}`;
head.appendChild(compact);
const BELL='<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:#1877F2"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>';
function fixBell(){const sp=document.querySelector('#notifCard > span');if(sp&&!sp.querySelector('svg'))sp.innerHTML=BELL}
const ICON_DL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/></svg>';
const ICON_SHARE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3m0 0L8 7m4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>';
const ICON_PLUS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/></svg>';
const ICON_DOTS='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>';

const pill=document.createElement('div');pill.className='pwa-pill';pill.setAttribute('role','button');
pill.innerHTML=ICON_DL+'<span>تثبيت المنصة</span><button class="pwa-x" type="button" aria-label="إخفاء">×</button>';
const modal=document.createElement('div');modal.className='pwa-modal';
function steps(){
  if(isIOS)return {t:'تثبيت المنصة على الآيفون',p:'لازم تفتح المنصة من متصفح Safari.',s:[ICON_SHARE+' افتح زر المشاركة أسفل الشاشة',ICON_PLUS+' اختار "إضافة إلى الشاشة الرئيسية"','اضغط "إضافة" وهتلاقي المنصة على شاشتك']};
  return {t:'تثبيت المنصة على الموبايل',p:'من متصفح Chrome.',s:[ICON_DOTS+' افتح قائمة المتصفح (الثلاث نقط)','اختار "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"','اضغط "تثبيت" وهتلاقي المنصة على شاشتك']};
}
function showHelp(){const x=steps();modal.innerHTML='<div class="pwa-sheet"><h3>'+x.t+'</h3><p>'+x.p+'</p><ol>'+x.s.map(s=>'<li><span>'+s+'</span></li>').join('')+'</ol><button class="pwa-close" type="button">تمام</button></div>';modal.classList.add('show')}
modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('pwa-close'))modal.classList.remove('show')});

async function doInstall(){
  if(deferred){const d=deferred;deferred=null;try{d.prompt();const r=await d.userChoice;if(r&&r.outcome==='accepted'){LS.set('pwa_installed','1');refresh()}}catch(e){showHelp()}refresh();return}
  showHelp();
}
window.installPlatform=doInstall;
function refresh(){
  const hidden=standalone()||LS.get('pwa_installed')==='1'||(+LS.get('pwa_pill_hide')||0)>Date.now();
  const sv=document.getElementById('studentView'),hp=document.getElementById('homePage'),cm=document.getElementById('contestModal');const busy=!hp||hp.offsetParent===null||(cm&&!cm.classList.contains('hidden'))||!!document.querySelector('.ai-shell')&&document.querySelector('.ai-shell').offsetParent!==null;pill.classList.toggle('show',!hidden&&!!sv&&!sv.classList.contains('hidden')&&!busy);
}
pill.addEventListener('click',e=>{if(e.target.classList.contains('pwa-x')){LS.set('pwa_pill_hide',String(Date.now()+7*864e5));refresh();return}doInstall()});

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;refresh()});
window.addEventListener('appinstalled',()=>{LS.set('pwa_installed','1');deferred=null;refresh()});

function mount(){fixBell();swapLogo();document.body.appendChild(pill);document.body.appendChild(modal);refresh();setInterval(refresh,4000);watchOffer()}
if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount);

if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});

/* الأفاتار يعرض التثبيت مرة واحدة على كل جهاز */
function watchOffer(){
  try{if(typeof BUDDY_AUDIO==='object'&&!BUDDY_AUDIO.install_v1)BUDDY_AUDIO.install_v1='6-install_v1.mp3'}catch(e){}
  if(standalone()||LS.get('pwa_offer_v1')||LS.get('pwa_installed')==='1')return;
  let welcomeAt=0,tries=0;
  const t=setInterval(()=>{
    tries++;if(tries>400){clearInterval(t);return}
    let ready=false;
    try{ready=!!profile&&!!buddyGender&&typeof buddySay==='function'&&buddySeen.has('welcome')}catch(e){}
    if(!ready)return;
    if(!welcomeAt){welcomeAt=Date.now();return}
    if(Date.now()-welcomeAt<32000)return; // بعد ما ترحيب الأفاتار يخلص
    const el=document.getElementById('buddy');
    if(el&&el.classList.contains('in'))return;
    clearInterval(t);
    LS.set('pwa_offer_v1','1');
    try{buddySay({title:'تثبيت المنصة',mood:'tip',tone:'info',text:'تقدر تثبّت المنصة على موبايلك وتفتحها زي أي تطبيق. اضغط تثبيت المنصة، ولو بتستخدم آيفون افتح المشاركة واختار إضافة إلى الشاشة الرئيسية.',duration:22000,voiceId:'install_v1',actions:[{label:'تثبيت المنصة',cls:'green',fn:doInstall},{label:'مش دلوقتي',fn:()=>{}}]})}catch(e){}
  },1500);
}
})();
;(function(){var s=document.createElement("script");s.src="10-verify.js?v=2";document.head.appendChild(s)})();
;(function(){var s=document.createElement("script");s.src="11-leaders.js?v=2";document.head.appendChild(s)})();
;(function(){var s=document.createElement("script");s.src="12-exam-ux.js?v=4";document.head.appendChild(s)})();
;(function(){var s=document.createElement("script");s.src="13-contest.js?v=1";document.head.appendChild(s)})();
