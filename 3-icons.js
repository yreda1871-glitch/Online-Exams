document.addEventListener("DOMContentLoaded",()=>{const icons=["<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m3 10 9-7 9 7v11h-6v-7H9v7H3z\"/></svg>", "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"3\" width=\"14\" height=\"18\" rx=\"2\"/><path d=\"M9 8h6M9 12h6M9 16h3\"/></svg>", "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-2a8 8 0 0 1 16 0v2\"/></svg>", "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z\"/></svg>", "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3zM12 6v16\"/></svg>", "<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m2 8 10-5 10 5-10 5zM6 10v7c4 3 8 3 12 0v-7M22 8v9\"/></svg>"];document.querySelectorAll(".nav-ico").forEach((e,i)=>{if(icons[i])e.innerHTML=icons[i]});const b=document.querySelector(".notif-btn");if(b){b.childNodes.forEach(n=>{if(n.nodeType===3)n.textContent=""});b.insertAdjacentHTML("afterbegin","<svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21 11a9 9 0 0 1-9 9H5l-4 3 2-7a9 9 0 1 1 18-5z\"/><path d=\"M7 10h10M7 14h6\"/></svg>")}});;(function(){var s=document.createElement("script");s.src="8-pwa.js?v=9";document.head.appendChild(s)})();

;document.addEventListener("DOMContentLoaded",function(){
if(!document.getElementById('examModal'))return;
window.examTabSwitches=0;
window.pendingExamBuddy=null;
window.examShuffle=function(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t;}return a;};
window.examAnsweredCount=function(){return ((activeExam&&activeExam.questions)||[]).filter(function(q){return examSelections[q.id]!==undefined;}).length;};
window.updateExamProgress=function(){var count=((activeExam&&activeExam.questions)||[]).length;document.getElementById('examProgress').textContent='السؤال '+(currentQuestionIndex+1)+' من '+count+' · أجبت عن '+examAnsweredCount();};
window.selectExamOption=function(questionId,index){
 if(!activeExam||examReviewMode)return;
 var q=activeExam.questions[currentQuestionIndex];
 if(!q||q.id!==questionId)return;
 examSelections[questionId]=Number(index);
 if(activeExam.attempt_id){try{localStorage.setItem('exam_answers_'+activeExam.attempt_id,JSON.stringify(examSelections));}catch(e){}}
 updateExamProgress();
};
window.moveExamQuestion=function(step){
 if(!activeExam||examReviewMode)return;
 var count=activeExam.questions.length;
 var next=Math.min(count-1,Math.max(0,currentQuestionIndex+step));
 if(next===currentQuestionIndex)return;
 currentQuestionIndex=next;
 renderCurrentExamQuestion();
};
window.renderActiveExam=function(){
 clearInterval(examTimerHandle);
 currentQuestionIndex=0;
 examTabSwitches=0;
 if(!Array.isArray(activeExam&&activeExam.questions)||!activeExam.questions.length){toast('الامتحان لا يحتوي على أسئلة قابلة للعرض.');return;}
 activeExam.questions=examShuffle(activeExam.questions);
 activeExam.questions.forEach(function(q){var opts=examOptions(q.options);q.__order=examShuffle(opts.map(function(_,i){return i;}));});
 document.getElementById('examModalTitle').textContent=activeExam.title||'الامتحان';
 document.getElementById('examModalSub').textContent='أجب عن الأسئلة وتنقّل بينها بحرية، ثم اضغط تسليم الامتحان قبل انتهاء الوقت.';
 document.getElementById('examModal').classList.remove('hidden');
 document.getElementById('examModalActions').classList.remove('hidden');
 ['prevQuestionBtn','nextQuestionBtn','submitExamBtn'].forEach(function(id){document.getElementById(id).classList.remove('hidden');});
 renderCurrentExamQuestion();
 startExamTimer();
};
window.renderCurrentExamQuestion=function(){
 var questions=(activeExam&&activeExam.questions)||[];
 if(!questions.length)return;
 var q=questions[currentQuestionIndex];
 var opts=examOptions(q.options);
 var order=Array.isArray(q.__order)&&q.__order.length===opts.length?q.__order:opts.map(function(_,i){return i;});
 updateExamProgress();
 document.getElementById('examModalBody').innerHTML='<article class="exam-question"><h3><span>'+(currentQuestionIndex+1)+'.</span>'+esc(q.question_text)+' <small class="muted">('+esc(q.marks)+' درجة)</small></h3>'+order.map(function(oi){return '<label class="exam-option"><input type="radio" name="answer_'+q.id+'" value="'+oi+'" '+(Number(examSelections[q.id])===oi?'checked':'')+' onchange="selectExamOption(\''+q.id+'\','+oi+')"><span>'+esc(opts[oi])+'</span></label>';}).join('')+'</article>';
 ['prevQuestionBtn','nextQuestionBtn','submitExamBtn'].forEach(function(id){document.getElementById(id).classList.remove('hidden');});
 document.getElementById('prevQuestionBtn').disabled=currentQuestionIndex===0;
 document.getElementById('nextQuestionBtn').disabled=currentQuestionIndex>=questions.length-1;
};
window.startExamTimer=function(){
 clearInterval(examTimerHandle);
 var count=((activeExam&&activeExam.questions)||[]).length;
 var minutes=Number(activeExam&&activeExam.duration_minutes)||Math.ceil((count*30)/60)||30;
 var remaining=Math.max(60,Math.round(minutes*60));
 var box=document.getElementById('examTimer');
 var tick=function(){
  var mm=Math.floor(remaining/60),ss=String(remaining%60).padStart(2,'0');
  box.textContent='⏱ '+mm+':'+ss;
  box.style.color=remaining<=60?'#ffd0d0':'#ffffff';
  if(remaining<=0){clearInterval(examTimerHandle);toast('انتهى وقت الامتحان، سيتم التسليم تلقائيًا.');submitCurrentExam(true);return;}
  remaining--;
 };
 tick();
 examTimerHandle=setInterval(tick,1000);
};
window.startExamNotice=async function(id){
 if(!profile||!profile.student_code){toast('سجّل دخولك أولًا');return;}
 var btns=[].slice.call(document.querySelectorAll('button[onclick="startExamNotice(\''+id+'\')"]'));btns.forEach(function(b){b.disabled=true;});
 toast('جاري فتح الامتحان...');
 try{
  var rpcStart=db.rpc('start_student_exam',{p_student_code:profile.student_code,p_exam_id:id});
  var raced=await Promise.race([rpcStart,new Promise(function(_,rej){setTimeout(function(){rej(new Error('الخادم استغرق وقتًا طويلًا. حاول مرة أخرى.'));},20000);})]);
  var data=raced.data,error=raced.error;
  if(error)throw error;
  if(!data)throw new Error('لم يصل رد من قاعدة البيانات.');
  if(data.status==='already_completed'){toast('لقد أكملت هذا الامتحان من قبل.');await loadExams();await loadMyResults();return;}
  if(data.status==='exam_unavailable')throw new Error('هذا الامتحان غير منشور أو لم يعد متاحًا.');
  if(data.status==='no_questions')throw new Error('الامتحان لا يحتوي على أسئلة بعد.');
  if(data.status!=='started')throw new Error('تعذر بدء الامتحان: '+data.status);
  activeExam=data;activeExam.__examId=id;
  activeExam.duration_minutes=(examCache.find(function(x){return x.id===id;})||{}).duration_minutes||data.duration_minutes;
  try{examSelections=JSON.parse(localStorage.getItem('exam_answers_'+data.attempt_id)||'{}')||{};}catch(e){examSelections={};}
  examReviewMode=false;renderActiveExam();
 }catch(e){toast('تعذر فتح الامتحان: '+(e.message||e));}finally{btns.forEach(function(b){b.disabled=false;});}
};
window.showExamResult=function(result){
 examReviewMode=true;
 document.getElementById('examModalSub').textContent='تم حفظ إجاباتك وتصحيح الامتحان بنجاح';
 document.getElementById('examTimer').textContent='انتهى';
 var pct=Number(result.percentage||0);
 var isSuccess=pct>=50;
 var _eid=activeExam&&activeExam.__examId;
 pendingExamBuddy={pct:pct,examId:_eid};
 var emoji=isSuccess?'🎉':'💔';
 var statusText=isSuccess?'مبروك! لقد نجحت في الامتحان':'عفواً، لم تحقق نسبة النجاح';
 document.getElementById('examModalBody').innerHTML='<div class="exam-result"><div style="font-size:42px">'+emoji+'</div><h2>'+statusText+'</h2><p>درجتك النهائية</p><strong dir="ltr">'+Number(result.score||0)+' / '+Number(result.total_marks||0)+'</strong><p style="font-size:20px;color:'+(isSuccess?'var(--emerald-green)':'var(--red-accent)')+';font-weight:bold">'+pct.toFixed(1)+'%</p><p class="muted">تم حفظ نتيجتك في حسابك.</p></div>';
 document.getElementById('examProgress').textContent='تم التسليم';
 document.getElementById('prevQuestionBtn').classList.add('hidden');document.getElementById('nextQuestionBtn').classList.add('hidden');
 var sb=document.getElementById('submitExamBtn');sb.classList.remove('hidden');sb.textContent='إغلاق';sb.disabled=false;sb.onclick=closeExamModal;
};
window.closeExamModal=function(){
 clearInterval(examTimerHandle);
 document.getElementById('examModal').classList.add('hidden');
 activeExam=null;examSelections={};examReviewMode=false;
 var b=document.getElementById('submitExamBtn');b.onclick=function(){submitCurrentExam();};b.textContent='تسليم الامتحان';b.disabled=false;
 document.getElementById('prevQuestionBtn').classList.remove('hidden');document.getElementById('nextQuestionBtn').classList.remove('hidden');
 var pb=pendingExamBuddy;pendingExamBuddy=null;
 if(pb)setTimeout(function(){examBuddy(pb.pct,pb.examId);},400);
};
window.showReviewNotice=async function(id){
 try{
  var res=await db.rpc('get_student_exam_review',{p_student_code:profile.student_code,p_exam_id:id});
  var data=res.data,error=res.error;
  if(error)throw error;if(!data||data.status!=='ok')throw new Error('لا يوجد تصحيح متاح لهذا الامتحان.');
  activeExam={title:'مراجعة الامتحان',questions:data.questions||[]};examReviewMode=true;
  document.getElementById('examModalTitle').textContent='مراجعة: '+((examCache.find(function(x){return x.id===id;})||{}).title||'الامتحان');
  document.getElementById('examModalSub').innerHTML='النتيجة: <b dir="ltr">'+data.score+' / '+data.total_marks+'</b> — '+Number(data.percentage||0).toFixed(1)+'%';
  document.getElementById('examTimer').textContent='التصحيح';
  document.getElementById('examModalBody').innerHTML=(data.questions||[]).map(function(q,i){
   var opts=examOptions(q.options);
   return '<article class="exam-question"><h3><span>'+(i+1)+'.</span>'+esc(q.question_text)+'</h3>'+opts.map(function(op,j){return '<div class="exam-option '+(j===Number(q.correct_option)?'review-correct':'')+' '+(q.selected_option!==null&&j===Number(q.selected_option)&&!q.is_correct?'review-wrong':'')+'"><span>'+esc(op)+' '+(j===Number(q.correct_option)?'✓ الإجابة الصحيحة':'')+' '+(q.selected_option!==null&&j===Number(q.selected_option)?' — إجابتك':'')+'</span></div>';}).join('')+'</article>';
  }).join('');
  document.getElementById('examProgress').textContent='مراجعة الإجابات';
  document.getElementById('prevQuestionBtn').classList.add('hidden');document.getElementById('nextQuestionBtn').classList.add('hidden');
  var sb2=document.getElementById('submitExamBtn');sb2.classList.remove('hidden');sb2.textContent='إغلاق';sb2.disabled=false;sb2.onclick=closeExamModal;
  document.getElementById('examModalActions').classList.remove('hidden');document.getElementById('examModal').classList.remove('hidden');
 }catch(e){toast('تعذر عرض التصحيح: '+(e.message||'خطأ غير معروف'));}
};
window.loadMyResults=async function(){
 var res=await db.rpc('get_student_attempts',{p_student_code:profile.student_code});
 var data=res.data,error=res.error;
 var body=document.querySelector('#myResults tbody');
 if(error){body.innerHTML='<tr><td colspan="5">'+esc(error.message)+'</td></tr>';return;}
 var rows=(data||[]).filter(function(a){return a.completed;}).sort(function(a,b){return new Date(b.finished_at||0)-new Date(a.finished_at||0);});
 body.innerHTML=rows.map(function(a){return '<tr><td>'+esc(a.exam_title||'امتحان')+'</td><td dir="ltr">'+a.score+' / '+a.total_marks+'</td><td>'+Number(a.percentage||0).toFixed(1)+'%</td><td>'+date(a.finished_at)+'</td><td><button class="btn outline small" style="color:var(--accent-blue);" onclick="showReviewNotice(\''+a.exam_id+'\')">عرض التصحيح</button></td></tr>';}).join('')||'<tr><td colspan="5">لم تكمل أي امتحان بعد.</td></tr>';
 var avg=rows.length?rows.reduce(function(s,a){return s+Number(a.percentage||0);},0)/rows.length:0;
 myDoneCount=rows.length;renderChecklist();document.getElementById('profileAverage').textContent=avg.toFixed(1)+'%';document.getElementById('profileCount').textContent=rows.length;document.getElementById('profileScores').textContent=rows.reduce(function(s,a){return s+Number(a.score||0);},0);
};
document.addEventListener('visibilitychange',function(){
 if(!activeExam||examReviewMode)return;
 if(document.hidden){examTabSwitches++;}
 else if(examTabSwitches>0){toast('تنبيه: تم تسجيل خروجك من صفحة الامتحان '+examTabSwitches+(examTabSwitches===1?' مرة':' مرات')+'.');}
});
});
