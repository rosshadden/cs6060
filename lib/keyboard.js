(function(d,b){[].indexOf||(Array.prototype.indexOf=function(f,e,g){for(g=this.length,e=(g+~~e)%g;e<g&&(!(e in this)||this[e]!==f);e++){}return e^g?e:-1});if(typeof define==="function"&&define.amd){define(a)}else{c()}function a(){return e();function e(){var f;f=b("amd");f.fork=e;return f}}function c(){var e;e=f();e.noConflict("KeyboardJS","k");function f(){var i,j=[],g={};i=b("global");i.fork=f;i.noConflict=h;return i;function h(){var m,l,k;k=Array.prototype.slice.apply(arguments);for(l=0;l<j.length;l+=1){if(typeof g[j[l]]==="undefined"){delete d[j[l]]}else{d[j[l]]=g[j[l]]}}g={};for(l=0;l<k.length;l+=1){if(typeof k[l]!=="string"){throw new Error("Cannot replace namespaces. All new namespaces must be strings.")}g[k[l]]=d[k[l]];d[k[l]]=i}j=k;return j}}}})(this,function(e){var i={},w={},o,u,B,l=[],I=[],n=[],L=[],v,m;m={map:{"3":["cancel"],"8":["backspace"],"9":["tab"],"12":["clear"],"13":["enter"],"16":["shift"],"17":["ctrl"],"18":["alt","menu"],"19":["pause","break"],"20":["capslock"],"27":["escape","esc"],"32":["space","spacebar"],"33":["pageup"],"34":["pagedown"],"35":["end"],"36":["home"],"37":["left"],"38":["up"],"39":["right"],"40":["down"],"41":["select"],"42":["printscreen"],"43":["execute"],"44":["snapshot"],"45":["insert","ins"],"46":["delete","del"],"47":["help"],"91":["command","windows","win","super","leftcommand","leftwindows","leftwin","leftsuper"],"92":["command","windows","win","super","rightcommand","rightwindows","rightwin","rightsuper"],"145":["scrolllock","scroll"],"186":["semicolon",";"],"187":["equal","equalsign","="],"188":["comma",","],"189":["dash","-"],"190":["period","."],"191":["slash","forwardslash","/"],"192":["graveaccent","`"],"219":["openbracket","["],"220":["backslash","\\"],"221":["closebracket","]"],"222":["apostrophe","'"],"48":["zero","0"],"49":["one","1"],"50":["two","2"],"51":["three","3"],"52":["four","4"],"53":["five","5"],"54":["six","6"],"55":["seven","7"],"56":["eight","8"],"57":["nine","9"],"96":["numzero","num0"],"97":["numone","num1"],"98":["numtwo","num2"],"99":["numthree","num3"],"100":["numfour","num4"],"101":["numfive","num5"],"102":["numsix","num6"],"103":["numseven","num7"],"104":["numeight","num8"],"105":["numnine","num9"],"106":["nummultiply","num*"],"107":["numadd","num+"],"108":["numenter"],"109":["numsubtract","num-"],"110":["numdecimal","num."],"111":["numdevide","num/"],"144":["numlock","num"],"112":["f1"],"113":["f2"],"114":["f3"],"115":["f4"],"116":["f5"],"117":["f6"],"118":["f7"],"119":["f8"],"120":["f9"],"121":["f10"],"122":["f11"],"123":["f12"]},macros:[["shift + `",["tilde","~"]],["shift + 1",["exclamation","exclamationpoint","!"]],["shift + 2",["at","@"]],["shift + 3",["number","#"]],["shift + 4",["dollar","dollars","dollarsign","$"]],["shift + 5",["percent","%"]],["shift + 6",["caret","^"]],["shift + 7",["ampersand","and","&"]],["shift + 8",["asterisk","*"]],["shift + 9",["openparen","("]],["shift + 0",["closeparen",")"]],["shift + -",["underscore","_"]],["shift + =",["plus","+"]],["shift + (",["opencurlybrace","opencurlybracket","{"]],["shift + )",["closecurlybrace","closecurlybracket","}"]],["shift + \\",["verticalbar","|"]],["shift + ;",["colon",":"]],["shift + '",["quotationmark",'"']],["shift + !,",["openanglebracket","<"]],["shift + .",["closeanglebracket",">"]],["shift + /",["questionmark","?"]]]};for(v=65;v<=90;v+=1){m.map[v]=String.fromCharCode(v+32);m.macros.push(["shift + "+String.fromCharCode(v+32)+", capslock + "+String.fromCharCode(v+32),[String.fromCharCode(v)]])}C("us",m);g("us");f();i.enable=f;i.disable=d;i.activeKeys=K;i.on=t;i.clear=A;i.clear.key=c;i.locale=g;i.locale.register=C;i.macro=G;i.macro.remove=h;i.key={};i.key.name=H;i.key.code=z;i.combo={};i.combo.active=a;i.combo.parse=q;i.combo.stringify=y;return i;function f(){if(window.addEventListener){document.addEventListener("keydown",p,false);document.addEventListener("keyup",F,false);window.addEventListener("blur",E,false);window.addEventListener("webkitfullscreenchange",E,false);window.addEventListener("mozfullscreenchange",E,false)}else{if(window.attachEvent){document.attachEvent("onkeydown",p);
document.attachEvent("onkeyup",F);window.attachEvent("onblur",E)}}}function d(){E();if(window.removeEventListener){document.removeEventListener("keydown",p,false);document.removeEventListener("keyup",F,false);window.removeEventListener("blur",E,false);window.removeEventListener("webkitfullscreenchange",E,false);window.removeEventListener("mozfullscreenchange",E,false)}else{if(window.detachEvent){document.detachEvent("onkeydown",p);document.detachEvent("onkeyup",F);window.detachEvent("onblur",E)}}}function E(M){l=[];r();j(M)}function p(M){var O,N;O=H(M.keyCode);if(O.length<1){return}for(N=0;N<O.length;N+=1){J(O[N])}s();b(M)}function F(M){var O,N;O=H(M.keyCode);if(O.length<1){return}for(N=0;N<O.length;N+=1){k(O[N])}r();j(M)}function H(M){return u[M]||[]}function z(M){var N;for(N in u){if(!u.hasOwnProperty(N)){continue}if(u[N].indexOf(M)>-1){return N}}return false}function G(N,M){if(typeof N!=="string"&&(typeof N!=="object"||typeof N.push!=="function")){throw new Error("Cannot create macro. The combo must be a string or array.")}if(typeof M!=="object"||typeof M.push!=="function"){throw new Error("Cannot create macro. The injectedKeys must be an array.")}B.push([N,M])}function h(N){var M;if(typeof N!=="string"&&(typeof N!=="object"||typeof N.push!=="function")){throw new Error("Cannot remove macro. The combo must be a string or array.")}for(mI=0;mI<B.length;mI+=1){M=B[mI];if(D(N,M[0])){k(M[1]);B.splice(mI,1);break}}}function s(){var M,O,N;for(M=0;M<B.length;M+=1){O=q(B[M][0]);if(L.indexOf(B[M])===-1&&a(O)){L.push(B[M]);for(N=0;N<B[M][1].length;N+=1){J(B[M][1][N])}}}}function r(){var M,O,N;for(M=0;M<L.length;M+=1){O=q(L[M][0]);if(a(O)===false){for(N=0;N<L[M][1].length;N+=1){k(L[M][1][N])}L.splice(M,1);M-=1}}}function t(U,W,N){var Q={},T,M=[],P={},S,V;if(typeof U==="string"){U=q(U)}for(S=0;S<U.length;S+=1){T={};V=y([U[S]]);if(typeof V!=="string"){throw new Error("Failed to bind key combo. The key combo must be string.")}T.keyCombo=V;T.keyDownCallback=[];T.keyUpCallback=[];if(W){T.keyDownCallback.push(W)}if(N){T.keyUpCallback.push(N)}I.push(T);M.push(T)}Q.clear=O;Q.on=R;return Q;function O(){var X;for(X=0;X<M.length;X+=1){I.splice(I.indexOf(M[X]),1)}}function R(Z){var ab={},ac,aa,Y;if(typeof Z!=="string"){throw new Error("Cannot bind callback. The event name must be a string.")}if(Z!=="keyup"&&Z!=="keydown"){throw new Error('Cannot bind callback. The event name must be a "keyup" or "keydown".')}ac=Array.prototype.slice.apply(arguments,[1]);for(aa=0;aa<ac.length;aa+=1){if(typeof ac[aa]==="function"){if(Z==="keyup"){for(Y=0;Y<M.length;Y+=1){M[Y].keyUpCallback.push(ac[aa])}}else{if(Z==="keydown"){for(Y=0;Y<M.length;Y+=1){M[Y].keyDownCallback.push(ac[aa])}}}}}ab.clear=X;return ab;function X(){var ae,ad;for(ae=0;ae<ac.length;ae+=1){if(typeof ac[ae]==="function"){if(Z==="keyup"){for(ad=0;ad<M.length;ad+=1){M[ad].keyUpCallback.splice(M[ad].keyUpCallback.indexOf(ac[ae]),1)}}else{for(ad=0;ad<M.length;ad+=1){M[ad].keyDownCallback.splice(M[ad].keyDownCallback.indexOf(ac[ae]),1)}}}}}}}function A(P){var M,O,N;for(M=0;M<I.length;M+=1){O=I[M];if(D(P,O.keyCombo)){I.splice(M,1);M-=1}}}function c(N){var M,O,P;if(N){for(M=0;M<I.length;M+=1){P=I[M];for(O=0;O<P.keyCombo.length;O+=1){if(P.keyCombo[O].indexOf(N)>-1){I.splice(M,1);M-=1;break}}}}else{I=[]}}function b(N){var U,W,T,M,Y,P,Q,S,X,R,O=[],V;Y=[].concat(l);for(U=0;U<I.length;U+=1){V=x(I[U].keyCombo).length;if(!O[V]){O[V]=[]}O[V].push(I[U])}for(W=O.length-1;W>=0;W-=1){if(!O[W]){continue}for(U=0;U<O[W].length;U+=1){T=O[W][U];M=x(T.keyCombo);X=true;for(S=0;S<M.length;S+=1){if(Y.indexOf(M[S])===-1){X=false;break}}if(X&&a(T.keyCombo)){n.push(T);for(S=0;S<M.length;S+=1){R=Y.indexOf(M[S]);if(R>-1){Y.splice(R,1);S-=1}}for(P=0;P<T.keyDownCallback.length;P+=1){if(T.keyDownCallback[P](N,K(),T.keyCombo)===false){Q=true}}if(Q===true){N.preventDefault();N.stopPropagation()}}}}}function j(P){var M,O,Q,N;for(M=0;M<n.length;M+=1){Q=n[M];if(a(Q.keyCombo)===false){for(O=0;O<Q.keyUpCallback.length;O+=1){if(Q.keyUpCallback[O](P,K(),Q.keyCombo)===false){N=true}}if(N===true){P.preventDefault();P.stopPropagation()}n.splice(M,1);
M-=1}}}function D(P,O){var N,M,Q;P=q(P);O=q(O);if(P.length!==O.length){return false}for(N=0;N<P.length;N+=1){if(P[N].length!==O[N].length){return false}for(M=0;M<P[N].length;M+=1){if(P[N][M].length!==O[N][M].length){return false}for(Q=0;Q<P[N][M].length;Q+=1){if(O[N][M].indexOf(P[N][M][Q])===-1){return false}}}}return true}function a(T){var Q,N,P,S,R=0,O,M;T=q(T);for(Q=0;Q<T.length;Q+=1){M=true;R=0;for(N=0;N<T[Q].length;N+=1){P=[].concat(T[Q][N]);for(S=R;S<l.length;S+=1){O=P.indexOf(l[S]);if(O>-1){P.splice(O,1);R=S}}if(P.length!==0){M=false;break}}if(M){return true}}return false}function x(Q){var N,M,P,O=[];Q=q(Q);for(N=0;N<Q.length;N+=1){for(M=0;M<Q[N].length;M+=1){O=O.concat(Q[N][M])}}return O}function q(S){var U=S,O=0,P=0,R=false,N=false,V=[],M=[],Q=[],T="";if(typeof S==="object"&&typeof S.push==="function"){return S}if(typeof S!=="string"){throw new Error('Cannot parse "keyCombo" because its type is "'+(typeof S)+'". It must be a "string".')}while(U.charAt(O)===" "){O+=1}while(true){if(U.charAt(O)===" "){while(U.charAt(O)===" "){O+=1}R=true}else{if(U.charAt(O)===","){if(P||N){throw new Error("Failed to parse key combo. Unexpected , at character index "+O+".")}N=true;O+=1}else{if(U.charAt(O)==="+"){if(T.length){Q.push(T);T=""}if(P||N){throw new Error("Failed to parse key combo. Unexpected + at character index "+O+".")}P=true;O+=1}else{if(U.charAt(O)===">"){if(T.length){Q.push(T);T=""}if(Q.length){M.push(Q);Q=[]}if(P||N){throw new Error("Failed to parse key combo. Unexpected > at character index "+O+".")}P=true;O+=1}else{if(O<U.length-1&&U.charAt(O)==="!"&&(U.charAt(O+1)===">"||U.charAt(O+1)===","||U.charAt(O+1)==="+")){T+=U.charAt(O+1);P=false;R=false;N=false;O+=2}else{if(O<U.length&&U.charAt(O)!=="+"&&U.charAt(O)!==">"&&U.charAt(O)!==","&&U.charAt(O)!==" "){if(P===false&&R===true||N===true){if(T.length){Q.push(T);T=""}if(Q.length){M.push(Q);Q=[]}if(M.length){V.push(M);M=[]}}P=false;R=false;N=false;while(O<U.length&&U.charAt(O)!=="+"&&U.charAt(O)!==">"&&U.charAt(O)!==","&&U.charAt(O)!==" "){T+=U.charAt(O);O+=1}}else{O+=1;continue}}}}}}if(O>=U.length){if(T.length){Q.push(T);T=""}if(Q.length){M.push(Q);Q=[]}if(M.length){V.push(M);M=[]}break}}return V}function y(M){var P,O,N=[];if(typeof M==="string"){return M}if(typeof M!=="object"||typeof M.push!=="function"){throw new Error("Cannot stringify key combo.")}for(P=0;P<M.length;P+=1){N[P]=[];for(O=0;O<M[P].length;O+=1){N[P][O]=M[P][O].join(" + ")}N[P]=N[P].join(" > ")}return N.join(" ")}function K(){return[].concat(l)}function J(M){if(M.match(/\s/)){throw new Error("Cannot add key name "+M+" to active keys because it contains whitespace.")}if(l.indexOf(M)>-1){return}l.push(M)}function k(M){var N=z(M);if(N==="91"||N==="92"){l=[]}else{l.splice(l.indexOf(M),1)}}function C(N,M){if(typeof N!=="string"){throw new Error("Cannot register new locale. The locale name must be a string.")}if(typeof M!=="object"){throw new Error("Cannot register "+N+" locale. The locale map must be an object.")}if(typeof M.map!=="object"){throw new Error("Cannot register "+N+" locale. The locale map is invalid.")}if(!M.macros){M.macros=[]}w[N]=M}function g(M){if(M){if(typeof M!=="string"){throw new Error("Cannot set locale. The locale name must be a string.")}if(!w[M]){throw new Error("Cannot set locale to "+M+" because it does not exist. If you would like to submit a "+M+" locale map for KeyboardJS please submit it at https://github.com/RobertWHurst/KeyboardJS/issues.")}u=w[M].map;B=w[M].macros;o=M}return o}});