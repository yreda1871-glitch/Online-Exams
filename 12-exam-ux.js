/* تحسينات: زر خروج من الامتحان + المساعد ما يغطيش الصفحة على الموبايل (بيتحمّل من 8-pwa.js) */
(function(){
'use strict';
if(window.__examUxLoaded)return;window.__examUxLoaded=true;
var css=document.createElement('style');
css.textContent=
'.exam-exit{background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:12px;padding:8px 12px;font:700 13px Cairo,Tahoma,sans-serif;cursor:pointer;white-space:nowrap;flex-shrink:0}'+
'.exam-exit:active{background:rgba(255,255,255,.28)}.exam-exit[hidden]{display:none}'+
'@media(max-width:740px){.buddy{top:calc(8px + env(safe-area-inset-top,0px));width:calc(100% - 16px)}.buddy-avatar{width:56px}.buddy-bubble{padding:10px 12px 13px}.buddy-text{font-size:13px;line-height:1.6}.buddy-title{font-size:13px}}';
document.head.appendChild(css);

/* 1) زر الخروج: بيسلّم الامتحان بالإجابات الحالية وبيتصحح (محاولة واحدة) */
function build(){
  var head=document.querySelector('#examModal .exam-head');
  if(!head||document.getElementById('examExitBtn'))return;
  var b=document.createElement('button');b.type='button';b.id='examExitBtn';b.className='exam-exit';b.textContent='✕ خروج';b.hidden=true;
  b.onclick=function(){
    try{if(!activeExam||examReviewMode)return}catch(e){return}
    if(b.dataset.busy)return;
    var n=0,tot=0;try{tot=(activeExam.questions||[]).length;n=Object.keys(examSelections).length}catch(e){}
    if(!confirm('الخروج من الامتحان؟\n\nهيتسلّم الامتحان فورًا وتتصحح إجاباتك الحالية ('+n+' من '+tot+'). الأسئلة اللي ما جاوبتش عنها هتتحسب صفر، ومش هتقدر تعيد المحاولة.'))return;
    b.dataset.busy='1';b.disabled=true;
    Promise.resolve(submitCurrentExam(true)).finally(function(){delete b.dataset.busy;b.disabled=false});
  };
  var t=head.querySelector('#examTimer');head.insertBefore(b,t);
  head.style.alignItems='center';
}
function sync(){
  build();
  var b=document.getElementById('examExitBtn'),m=document.getElementById('examModal');
  if(!b||!m)return;
  var on=false;try{on=!m.classList.contains('hidden')&&!!activeExam&&!examReviewMode}catch(e){}
  if(b.hidden===on)b.hidden=!on;
}
setInterval(sync,300);

/* 2) المساعد: ما يفضلش فوق الصفحة بعد التنقل، وأقصر مدة على الموبايل */
function mobile(){return window.matchMedia&&matchMedia('(max-width:740px)').matches}
function wrap(){
  if(typeof window.buddySay==='function'&&!window.buddySay.__w){
    var o=window.buddySay;
    window.buddySay=function(a){
      try{if(a&&!a.voiceId&&mobile()&&buddyGender&&(a.duration||0)>9000)a=Object.assign({},a,{duration:9000})}catch(e){}
      return o.call(this,a);
    };window.buddySay.__w=1;
  }
  if(typeof window.showPage==='function'&&!window.showPage.__w){
    var s=window.showPage;
    window.showPage=function(){
      var r=s.apply(this,arguments);
      try{if(mobile()&&buddyGender)closeBuddy()}catch(e){}
      return r;
    };window.showPage.__w=1;
  }
}
wrap();setTimeout(wrap,800);setTimeout(wrap,2500);

/* 3) إيقاف صوت المساعد (الأفاتار) بالكامل: النص يفضل زي ما هو */
(function(){
  var css2=document.createElement('style');css2.textContent='.buddy-voice-tools{display:none!important}';document.head.appendChild(css2);
  function kill(){
    try{
      window.queueBuddyVoice=function(){try{buddyVoicePending=null}catch(e){}};
      window.playBuddyVoice=function(){try{buddyVoicePending=null}catch(e){}};
      if(typeof stopBuddyVoice==='function')stopBuddyVoice();
    }catch(e){}
  }
  kill();setTimeout(kill,800);setTimeout(kill,2500);
})();
})();
