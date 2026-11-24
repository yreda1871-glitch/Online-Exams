/* توثيق الملف الشخصي (اكتمال البيانات) - بيتحمّل من 8-pwa.js */
(function(){
'use strict';
if(window.__verifyLoaded)return;window.__verifyLoaded=true;
const css=document.createElement('style');
css.textContent=`
.vf-card{background:#fff;border:1px solid #E2E8F0;border-radius:18px;padding:14px 16px;margin:0 0 16px;display:flex;align-items:center;gap:12px;font-family:Cairo,Tahoma,Arial,sans-serif;direction:rtl}
.vf-ico{flex:0 0 40px;height:40px;border-radius:12px;background:#EBF4FF;color:#1877F2;display:flex;align-items:center;justify-content:center}
.vf-ico svg{width:22px;height:22px}
.vf-txt{flex:1;min-width:0}
.vf-txt b{display:block;font-size:15px;color:#0F172A}
.vf-txt small{display:block;font-size:12.5px;color:#64748B;line-height:1.6;margin-top:2px}
.vf-btn{border:0;border-radius:12px;background:#1877F2;color:#fff;padding:10px 14px;font:800 14px Cairo,Tahoma,Arial,sans-serif;cursor:pointer;white-space:nowrap}
.vf-btn[disabled]{opacity:.6}
.vf-card.ok{background:#F0FDF4;border-color:#BBF7D0}.vf-card.ok .vf-ico{background:#DCFCE7;color:#16A34A}
.vf-card.bad{background:#FEF2F2;border-color:#FECACA}.vf-card.bad .vf-ico{background:#FEE2E2;color:#DC2626}
.vf-pill{display:inline-flex;align-items:center;gap:4px;vertical-align:middle;background:#DCFCE7;color:#15803D;border-radius:999px;padding:2px 9px;font:800 11.5px Cairo,Tahoma,Arial,sans-serif;margin-inline-start:6px}
.vf-pill svg{width:14px;height:14px}
.vf-modal{position:fixed;inset:0;z-index:420;background:rgba(7,25,54,.6);display:none;align-items:flex-end;justify-content:center}
.vf-modal.show{display:flex}
.vf-sheet{background:#fff;color:#0F172A;width:min(520px,100%);border-radius:22px 22px 0 0;padding:18px 16px calc(20px + env(safe-area-inset-bottom,0px));font-family:Cairo,Tahoma,Arial,sans-serif;direction:rtl;max-height:90vh;overflow:auto}
.vf-sheet h3{margin:0 0 4px;font-size:19px}
.vf-note{background:#FFFBEB;border:1px solid #FDE68A;color:#92400E;border-radius:12px;padding:9px 12px;font-size:12.5px;line-height:1.7;margin:8px 0 12px}
.vf-sheet label{display:block;font-weight:700;font-size:13.5px;margin:10px 0 5px}
.vf-sheet input[type=text],.vf-sheet textarea{width:100%;box-sizing:border-box;border:1.5px solid #CBD5E1;border-radius:12px;padding:10px 12px;font:600 15px Cairo,Tahoma,Arial,sans-serif;direction:rtl}
.vf-sheet textarea{min-height:84px;resize:vertical}
.vf-photo{display:flex;align-items:center;gap:12px}
.vf-photo img{width:72px;height:72px;border-radius:50%;object-fit:cover;background:#F1F5F9;border:2px solid #E2E8F0}
.vf-photo .vf-btn{background:#EBF4FF;color:#1877F2}
.vf-consent{display:flex;gap:9px;align-items:flex-start;margin-top:12px;font-size:12.5px;line-height:1.7;color:#334155}
.vf-consent input{margin-top:5px;width:18px;height:18px;flex:0 0 18px}
.vf-err{color:#DC2626;font-size:13px;font-weight:700;min-height:18px;margin-top:8px}
.vf-actions{display:flex;gap:8px;margin-top:10px}
.vf-actions .vf-btn{flex:1;padding:12px}
.vf-actions .vf-btn.sec{background:#F1F5F9;color:#334155}
`;
document.head.appendChild(css);
const SVG_SHIELD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.4-3 8.2-7 9.5C8 19.2 5 15.4 5 11V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>';
const SVG_CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const T=s=>{try{toast(s)}catch(e){alert(s)}};
let st={status:'loading'},photoData=null,busy=false;

async function loadStatus(){
  try{
    if(!profile||!profile.student_code||!db)return;
    const {data,error}=await db.rpc('verification_status',{p_student_code:profile.student_code});
    if(error)throw error;
    st=data||{status:'none'};
  }catch(e){st={status:'error'}}
  paint();
}
function paint(){
  const host=document.getElementById('profileChecklist');
  if(!host)return;
  let c=document.getElementById('vfCard');
  if(!c){c=document.createElement('div');c.id='vfCard';host.parentNode.insertBefore(c,host)}
  const s=st.status;
  if(s==='verified'){
    c.className='vf-card ok';
    c.innerHTML='<div class="vf-ico">'+SVG_CHECK+'</div><div class="vf-txt"><b>ملفك الشخصي مكتمل ✓</b><small>تم إكمال بيانات التوثيق. ده معناه إن ملفك مكتمل، مش تحقق من الهوية.</small></div><button class="vf-btn" id="vfEdit">تحديث</button>';
  }else if(s==='revoked'){
    c.className='vf-card bad';
    c.innerHTML='<div class="vf-ico">'+SVG_SHIELD+'</div><div class="vf-txt"><b>تم إيقاف علامة اكتمال الملف</b><small>من الإدارة'+(st.revoke_reason?': '+esc(st.revoke_reason):'')+'. تواصل مع الإدارة لو محتاج توضيح.</small></div>';
  }else if(s==='none'){
    c.className='vf-card';
    c.innerHTML='<div class="vf-ico">'+SVG_SHIELD+'</div><div class="vf-txt"><b>طلب التوثيق</b><small>أكمل اسمك الثلاثي وصورتك ونبذة قصيرة وهتاخد علامة "ملف مكتمل".</small></div><button class="vf-btn" id="vfStart">طلب التوثيق</button>';
  }else{c.className='';c.innerHTML=''}
  const b=document.getElementById('vfStart')||document.getElementById('vfEdit');
  if(b)b.onclick=openForm;
  decorateName();
}
function decorateName(){
  const n=document.getElementById('profileName');if(!n)return;
  n.querySelectorAll('.verified-mark,.vf-pill').forEach(x=>x.remove());
  if(st.status==='verified'){
    const p=document.createElement('span');p.className='vf-pill';p.title='ملف شخصي مكتمل (مش تحقق من الهوية)';
    p.innerHTML=SVG_CHECK+'ملف مكتمل';n.appendChild(p);
  }
}
function modal(){
  let m=document.getElementById('vfModal');
  if(m)return m;
  m=document.createElement('div');m.id='vfModal';m.className='vf-modal';
  m.innerHTML='<div class="vf-sheet" role="dialog" aria-modal="true"><h3>طلب التوثيق</h3>'
   +'<div class="vf-note">التوثيق هنا معناه إن ملفك الشخصي مكتمل (اسم ثلاثي وصورة ونبذة). المنصة مش بتتحقق من هويتك الحقيقية.</div>'
   +'<label for="vfName">الاسم الثلاثي الكامل</label><input id="vfName" type="text" maxlength="80" autocomplete="off" placeholder="مثال: أحمد محمد علي">'
   +'<label>صورتك الشخصية</label><div class="vf-photo"><img id="vfImg" alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="><button type="button" class="vf-btn" id="vfPick">اختر صورة</button></div>'
   +'<input id="vfFile" type="file" accept="image/jpeg,image/png,image/webp" style="display:none">'
   +'<label for="vfBio">نبذة قصيرة عنك</label><textarea id="vfBio" maxlength="300" placeholder="طالب في الفرقة ... بحب ..."></textarea>'
   +'<label class="vf-consent" for="vfConsent"><input id="vfConsent" type="checkbox"><span>أوافق على رفع صورتي وبياناتي لإدارة المنصة لمراجعتها. الصورة خاصة ومحفوظة بشكل آمن، ولا تظهر إلا لي ولإدارة المنصة، ولا تظهر لباقي الطلاب.</span></label>'
   +'<div class="vf-err" id="vfErr"></div>'
   +'<div class="vf-actions"><button class="vf-btn" id="vfSend">إرسال وتفعيل العلامة</button><button class="vf-btn sec" id="vfCancel">إلغاء</button></div></div>';
  document.body.appendChild(m);
  m.addEventListener('click',e=>{if(e.target===m)close()});
  m.querySelector('#vfCancel').onclick=close;
  m.querySelector('#vfPick').onclick=()=>m.querySelector('#vfFile').click();
  m.querySelector('#vfFile').onchange=onFile;
  m.querySelector('#vfSend').onclick=send;
  return m;
}
function close(){const m=document.getElementById('vfModal');if(m)m.classList.remove('show')}
function err(t){document.getElementById('vfErr').textContent=t||''}
function openForm(){
  const m=modal();photoData=null;err('');
  m.querySelector('#vfName').value=(st.full_name)||'';
  m.querySelector('#vfBio').value=(st.bio)||'';
  m.querySelector('#vfConsent').checked=false;
  m.querySelector('#vfImg').src=(st.photo)||'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  if(st.photo)photoData=st.photo;
  m.classList.add('show');
}
function onFile(ev){
  const f=ev.target.files&&ev.target.files[0];err('');
  if(!f)return;
  if(!['image/jpeg','image/png','image/webp'].includes(f.type)){err('اختر صورة JPG أو PNG أو WEBP.');ev.target.value='';return}
  if(f.size>8*1024*1024){err('الصورة كبيرة جدًا (الحد 8 ميجا قبل الضغط).');ev.target.value='';return}
  const url=URL.createObjectURL(f),img=new Image();
  img.onload=()=>{
    const M=480,r=Math.min(1,M/Math.max(img.width,img.height)),w=Math.round(img.width*r),h=Math.round(img.height*r);
    const cv=document.createElement('canvas');cv.width=w;cv.height=h;
    const cx=cv.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,w,h);cx.drawImage(img,0,0,w,h);
    let q=.85,d=cv.toDataURL('image/jpeg',q);
    while(d.length>380000&&q>.4){q-=.1;d=cv.toDataURL('image/jpeg',q)}
    URL.revokeObjectURL(url);
    if(d.length>440000){err('تعذر ضغط الصورة. جرّب صورة أصغر.');return}
    photoData=d;document.getElementById('vfImg').src=d;
  };
  img.onerror=()=>{URL.revokeObjectURL(url);err('تعذر قراءة الصورة.')};
  img.src=url;ev.target.value='';
}
async function send(){
  if(busy)return;
  const name=document.getElementById('vfName').value.replace(/\s+/g,' ').trim();
  const bio=document.getElementById('vfBio').value.trim();
  const ok=document.getElementById('vfConsent').checked;
  if(name.split(' ').filter(Boolean).length<3||name.length<8){err('اكتب اسمك ثلاثي كامل.');return}
  if(!photoData){err('اختر صورتك الشخصية.');return}
  if(bio.length<10){err('اكتب نبذة قصيرة (10 أحرف على الأقل).');return}
  if(!ok){err('لازم توافق على الإقرار الأول.');return}
  busy=true;const b=document.getElementById('vfSend');b.disabled=true;b.textContent='جاري الإرسال...';err('');
  try{
    const {data,error}=await db.rpc('submit_verification',{p_student_code:profile.student_code,p_full_name:name,p_bio:bio,p_photo:photoData,p_consent:true});
    if(error)throw error;
    if(!data||data.status!=='verified')throw new Error((data&&data.message)||'تعذر إكمال الطلب.');
    st={status:'verified',full_name:data.full_name,bio:data.bio,photo:photoData};
    close();paint();T('تم تفعيل علامة "ملف مكتمل" على ملفك.');
  }catch(e){err(e.message||'حصل خطأ، جرّب تاني.')}
  finally{busy=false;b.disabled=false;b.textContent='إرسال وتفعيل العلامة'}
}
let last='';
function hook(){
  if(typeof renderProfile!=='function'||renderProfile.__vf)return false;
  const orig=renderProfile;
  window.renderProfile=function(){
    orig.apply(this,arguments);
    try{
      const code=profile&&profile.student_code;
      if(code&&code!==last){last=code;st={status:'loading'};loadStatus()}
      else paint();
    }catch(e){}
  };
  window.renderProfile.__vf=true;
  return true;
}
let n=0;const iv=setInterval(()=>{if(hook()||++n>60)clearInterval(iv)},500);
})();
