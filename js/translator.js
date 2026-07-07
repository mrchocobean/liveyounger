/* Custom Google Translate redirect - no external scripts needed */
(function(){
  "use strict";
  var langs=[
    {code:"af",name:"Afrikaans",flag:"🇿🇦"},{code:"sq",name:"Albanian",flag:"🇦🇱"},
    {code:"ar",name:"Arabic",flag:"🇸🇦"},{code:"hy",name:"Armenian",flag:"🇦🇲"},
    {code:"az",name:"Azerbaijani",flag:"🇦🇿"},{code:"eu",name:"Basque",flag:"🇪🇸"},
    {code:"be",name:"Belarusian",flag:"🇧🇾"},{code:"bn",name:"Bengali",flag:"🇧🇩"},
    {code:"bs",name:"Bosnian",flag:"🇧🇦"},{code:"bg",name:"Bulgarian",flag:"🇧🇬"},
    {code:"ca",name:"Catalan",flag:"🇪🇸"},{code:"ceb",name:"Cebuano",flag:"🇵🇭"},
    {code:"ny",name:"Chichewa",flag:"🇲🇼"},{code:"zh-CN",name:"Chinese (Simplified)",flag:"🇨🇳"},
    {code:"zh-TW",name:"Chinese (Traditional)",flag:"🇹🇼"},{code:"co",name:"Corsican",flag:"🇫🇷"},
    {code:"hr",name:"Croatian",flag:"🇭🇷"},{code:"cs",name:"Czech",flag:"🇨🇿"},
    {code:"da",name:"Danish",flag:"🇩🇰"},{code:"nl",name:"Dutch",flag:"🇳🇱"},
    {code:"en",name:"English",flag:"🇬🇧"},{code:"eo",name:"Esperanto",flag:"🌐"},
    {code:"et",name:"Estonian",flag:"🇪🇪"},{code:"fi",name:"Finnish",flag:"🇫🇮"},
    {code:"fr",name:"French",flag:"🇫🇷"},{code:"fy",name:"Frisian",flag:"🇳🇱"},
    {code:"gl",name:"Galician",flag:"🇪🇸"},{code:"ka",name:"Georgian",flag:"🇬🇪"},
    {code:"de",name:"German",flag:"🇩🇪"},{code:"el",name:"Greek",flag:"🇬🇷"},
    {code:"gu",name:"Gujarati",flag:"🇮🇳"},{code:"ht",name:"Haitian Creole",flag:"🇭🇹"},
    {code:"ha",name:"Hausa",flag:"🇳🇬"},{code:"haw",name:"Hawaiian",flag:"🇺🇸"},
    {code:"he",name:"Hebrew",flag:"🇮🇱"},{code:"hi",name:"Hindi",flag:"🇮🇳"},
    {code:"hmn",name:"Hmong",flag:"🌐"},{code:"hu",name:"Hungarian",flag:"🇭🇺"},
    {code:"is",name:"Icelandic",flag:"🇮🇸"},{code:"ig",name:"Igbo",flag:"🇳🇬"},
    {code:"id",name:"Indonesian",flag:"🇮🇩"},{code:"ga",name:"Irish",flag:"🇮🇪"},
    {code:"it",name:"Italian",flag:"🇮🇹"},{code:"ja",name:"Japanese",flag:"🇯🇵"},
    {code:"jw",name:"Javanese",flag:"🇮🇩"},{code:"kn",name:"Kannada",flag:"🇮🇳"},
    {code:"kk",name:"Kazakh",flag:"🇰🇿"},{code:"km",name:"Khmer",flag:"🇰🇭"},
    {code:"rw",name:"Kinyarwanda",flag:"🇷🇼"},{code:"ko",name:"Korean",flag:"🇰🇷"},
    {code:"ku",name:"Kurdish",flag:"🌐"},{code:"ky",name:"Kyrgyz",flag:"🇰🇬"},
    {code:"lo",name:"Lao",flag:"🇱🇦"},{code:"la",name:"Latin",flag:"🌐"},
    {code:"lv",name:"Latvian",flag:"🇱🇻"},{code:"lt",name:"Lithuanian",flag:"🇱🇹"},
    {code:"lb",name:"Luxembourgish",flag:"🇱🇺"},{code:"mk",name:"Macedonian",flag:"🇲🇰"},
    {code:"mg",name:"Malagasy",flag:"🇲🇬"},{code:"ms",name:"Malay",flag:"🇲🇾"},
    {code:"ml",name:"Malayalam",flag:"🇮🇳"},{code:"mt",name:"Maltese",flag:"🇲🇹"},
    {code:"mi",name:"Maori",flag:"🇳🇿"},{code:"mr",name:"Marathi",flag:"🇮🇳"},
    {code:"mn",name:"Mongolian",flag:"🇲🇳"},{code:"my",name:"Myanmar",flag:"🇲🇲"},
    {code:"ne",name:"Nepali",flag:"🇳🇵"},{code:"no",name:"Norwegian",flag:"🇳🇴"},
    {code:"ps",name:"Pashto",flag:"🇦🇫"},{code:"fa",name:"Persian",flag:"🇮🇷"},
    {code:"pl",name:"Polish",flag:"🇵🇱"},{code:"pt",name:"Portuguese",flag:"🇵🇹"},
    {code:"pa",name:"Punjabi",flag:"🇮🇳"},{code:"ro",name:"Romanian",flag:"🇷🇴"},
    {code:"ru",name:"Russian",flag:"🇷🇺"},{code:"sm",name:"Samoan",flag:"🇼🇸"},
    {code:"gd",name:"Scots Gaelic",flag:"🇬🇧"},{code:"sr",name:"Serbian",flag:"🇷🇸"},
    {code:"st",name:"Sesotho",flag:"🇱🇸"},{code:"sn",name:"Shona",flag:"🇿🇼"},
    {code:"sd",name:"Sindhi",flag:"🇵🇰"},{code:"si",name:"Sinhala",flag:"🇱🇰"},
    {code:"sk",name:"Slovak",flag:"🇸🇰"},{code:"sl",name:"Slovenian",flag:"🇸🇮"},
    {code:"so",name:"Somali",flag:"🇸🇴"},{code:"es",name:"Spanish",flag:"🇪🇸"},
    {code:"su",name:"Sundanese",flag:"🇮🇩"},{code:"sw",name:"Swahili",flag:"🇰🇪"},
    {code:"sv",name:"Swedish",flag:"🇸🇪"},{code:"tg",name:"Tajik",flag:"🇹🇯"},
    {code:"ta",name:"Tamil",flag:"🇮🇳"},{code:"tt",name:"Tatar",flag:"🇷🇺"},
    {code:"te",name:"Telugu",flag:"🇮🇳"},{code:"th",name:"Thai",flag:"🇹🇭"},
    {code:"tr",name:"Turkish",flag:"🇹🇷"},{code:"tk",name:"Turkmen",flag:"🇹🇲"},
    {code:"uk",name:"Ukrainian",flag:"🇺🇦"},{code:"ur",name:"Urdu",flag:"🇵🇰"},
    {code:"ug",name:"Uyghur",flag:"🌐"},{code:"uz",name:"Uzbek",flag:"🇺🇿"},
    {code:"vi",name:"Vietnamese",flag:"🇻🇳"},{code:"cy",name:"Welsh",flag:"🏴"},
    {code:"xh",name:"Xhosa",flag:"🇿🇦"},{code:"yi",name:"Yiddish",flag:"✡️"},
    {code:"yo",name:"Yoruba",flag:"🇳🇬"},{code:"zu",name:"Zulu",flag:"🇿🇦"}
  ];

  function init(){
    var containers=document.querySelectorAll('.translate-wrap');
    if(!containers.length)return;
    
    containers.forEach(function(wrap){
      if(wrap.querySelector('.translate-btn'))return; // already initialized
      
      var btn=document.createElement('button');
      btn.className='translate-btn';
      btn.type='button';
      btn.setAttribute('aria-label','Translate page');
      btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>Translate';
      
      var dropdown=document.createElement('div');
      dropdown.className='translate-dropdown';
      dropdown.setAttribute('role','menu');
      
      var search=document.createElement('input');
      search.type='text';
      search.className='lang-search';
      search.placeholder='Search language...';
      dropdown.appendChild(search);
      
      var list=document.createElement('div');
      list.className='lang-list';
      dropdown.appendChild(list);
      
      function renderList(filter){
        filter=(filter||'').toLowerCase();
        list.innerHTML='';
        langs.forEach(function(l){
          if(filter&&l.name.toLowerCase().indexOf(filter)===-1)return;
          var a=document.createElement('a');
          a.href='#';
          a.setAttribute('role','menuitem');
          a.innerHTML='<span class="flag">'+l.flag+'</span><span>'+l.name+'</span>';
          a.addEventListener('click',function(e){
            e.preventDefault();
            var url=window.location.href;
            window.location.href='https://translate.google.com/translate?sl=auto&tl='+l.code+'&u='+encodeURIComponent(url);
          });
          list.appendChild(a);
        });
      }
      renderList();
      
      search.addEventListener('input',function(){renderList(this.value);});
      
      btn.addEventListener('click',function(e){
        e.stopPropagation();
        var isOpen=dropdown.classList.contains('show');
        document.querySelectorAll('.translate-dropdown.show').forEach(function(d){d.classList.remove('show');});
        if(!isOpen){
          dropdown.classList.add('show');
          search.value='';
          renderList();
          setTimeout(function(){search.focus();},50);
        }
      });
      
      document.addEventListener('click',function(e){
        if(!wrap.contains(e.target))dropdown.classList.remove('show');
      });
      
      wrap.appendChild(btn);
      wrap.appendChild(dropdown);
    });
  }
  
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  }else{
    init();
  }
})();
