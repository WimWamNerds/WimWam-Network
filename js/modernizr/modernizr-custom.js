/*! modernizr 3.11.7 (Custom Build) | MIT *
 * https://modernizr.com/download/?-inputtypes-setclasses !*/
!function(e,t,n,a){function s(e,t){return typeof e===t}var o=[],i={_version:"3.11.7",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){o.push({name:e,fn:t,options:n})},addAsyncTest:function(e){o.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=i,Modernizr=new Modernizr;var l=[],r=n.documentElement,c="svg"===r.nodeName.toLowerCase(),f=function(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):c?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}("input");!function(){for(var e,t,a,s=["search","tel","url","email","datetime","date","month","week","time","datetime-local","number","range","color"],o=0;o<s.length;o++)f.setAttribute("type",e=s[o]),a="text"!==f.type&&"style"in f,a&&(f.value="1)",f.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(e)&&void 0!==f.style.WebkitAppearance?(r.appendChild(f),t=n.defaultView,a=t.getComputedStyle&&"textfield"!==t.getComputedStyle(f,null).WebkitAppearance&&0!==f.offsetHeight,r.removeChild(f)):/^(search|tel)$/.test(e)||(a=/^(url|email)$/.test(e)?f.checkValidity&&!1===f.checkValidity():"1)"!==f.value)),Modernizr.addTest("inputtypes."+e,!!a)}(),function(){var e,t,n,a,i,r,c;for(var f in o)if(o.hasOwnProperty(f)){if(e=[],t=o[f],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(a=s(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)r=e[i],c=r.split("."),1===c.length?Modernizr[c[0]]=a:(Modernizr[c[0]]&&(!Modernizr[c[0]]||Modernizr[c[0]]instanceof Boolean)||(Modernizr[c[0]]=new Boolean(Modernizr[c[0]])),Modernizr[c[0]][c[1]]=a),l.push((a?"":"no-")+c.join("-"))}}(),function(e){var t=r.className,n=Modernizr._config.classPrefix||"";if(c&&(t=t.baseVal),Modernizr._config.enableJSClass){var a=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(a,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(e.length>0&&(t+=" "+n+e.join(" "+n)),c?r.className.baseVal=t:r.className=t)}(l),delete i.addTest,delete i.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();e.Modernizr=Modernizr}(window,window,document);