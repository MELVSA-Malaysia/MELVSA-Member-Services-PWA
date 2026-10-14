(function(){
const offer=document.getElementById('installOffer'),btn=document.getElementById('installNow'),dismiss=document.getElementById('installDismiss'),msg=document.getElementById('installText');
const ios=/iPhone|iPad|iPod/i.test(navigator.userAgent),android=/Android/i.test(navigator.userAgent),installed=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
let pending=null;const key='melvsa-install-snooze';
function eligible(){try{return Date.now()>Number(localStorage.getItem(key)||0)}catch(e){return true}}
function hide(days){offer.hidden=true;try{localStorage.setItem(key,String(Date.now()+days*86400000))}catch(e){}}
function show(){if(!installed&&(ios||android)&&eligible())offer.hidden=false}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();pending=e;show()});
window.addEventListener('appinstalled',()=>{pending=null;hide(365)});
if(ios){msg.textContent='iPhone: Safari requires Share > Add to Home Screen. Automatic installation is not supported by iOS.';btn.textContent='Show instructions';setTimeout(show,1200)}
if(android)setTimeout(()=>{if(!pending){msg.textContent='Chrome: select Install app or Add to Home Screen from the browser menu if automatic installation is unavailable.';btn.textContent='Installation help';show()}},3500);
btn.addEventListener('click',async()=>{
if(pending){const event=pending;pending=null;try{await event.prompt();const result=await event.userChoice;hide(result&&result.outcome==='accepted'?365:7)}catch(e){msg.textContent='Open the browser menu and choose Install app.'}return}
msg.textContent=ios?'Open in Safari, tap Share (square with arrow), choose Add to Home Screen, then Add.':'Open Chrome menu (three dots), choose Install app or Add to Home Screen, then confirm.';
btn.textContent='Got it';});
dismiss.addEventListener('click',()=>hide(7));
})();