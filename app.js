
let profile;
let language='en';
const $=s=>document.querySelector(s);
function icon(id){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','#'+id);svg.setAttribute('aria-hidden','true');svg.append(use);return svg}
function renderTheme(){
  const dark=document.documentElement.dataset.theme==='dark';
  const label=language==='ar'?(dark?'تفعيل الوضع الفاتح':'تفعيل الوضع الداكن'):(dark?'Switch to light mode':'Switch to dark mode');
  $('#theme-icon').setAttribute('href',dark?'#sun':'#moon');
  $('#theme').setAttribute('aria-pressed',String(dark));
  $('#theme').setAttribute('aria-label',label);
  $('#theme').title=label;
  document.querySelector('meta[name="theme-color"]').content=dark?'#111214':'#f5f0e8';
}
function render(){
  document.documentElement.lang=language;
  document.documentElement.dir=language==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-ar]').forEach(el=>el.textContent=el.dataset[language]);
  $('#language').textContent=language==='ar'?'English':'العربية';
  $('#language').lang=language==='ar'?'en':'ar';
  renderTheme();
  $('#socials').setAttribute('aria-label',language==='ar'?'حسابات التواصل الاجتماعي':'Social media accounts');
  if(!profile)return;
  $('#title').textContent=language==='ar'?profile.nameAr:profile.name;
  $('#description').textContent=language==='ar'?profile.descriptionAr:profile.descriptionEn;
  document.title=language==='ar'?profile.nameAr+' | روابطنا':profile.name+' | Connect';
  $('#website').href=profile.website;
  $('#website-host').textContent=new URL(profile.website).hostname;
  $('#socials').replaceChildren();
  profile.socials.forEach(s=>{
    const a=document.createElement('a');a.className='social-link';a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';a.title=s.name;a.setAttribute('aria-label',s.name);a.append(icon(s.icon));$('#socials').append(a);
  });
}
$('#year').textContent=new Date().getFullYear();
renderTheme();
$('#theme').addEventListener('click',()=>{
  const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=theme;
  try{localStorage.setItem('alam-theme',theme)}catch{}
  renderTheme();
});
$('#language').addEventListener('click',()=>{language=language==='ar'?'en':'ar';render()});
fetch('profile.json').then(r=>{if(!r.ok)throw Error(r.status);return r.json()}).then(data=>{profile=data;render()}).catch(()=>{$('#load-error').hidden=false});
