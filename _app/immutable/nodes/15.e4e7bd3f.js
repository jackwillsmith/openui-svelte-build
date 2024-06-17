import{s as ne,e as ae,i as oe,C as le,d as f,w as H,P as ie,o as ue,f as c,l as U,a as I,g as d,h,m as N,c as w,j as n,r as t,u as ce,n as V}from"../chunks/scheduler.4a29073b.js";import{S as de,i as fe}from"../chunks/index.10afcf02.js";import{g as me}from"../chunks/navigation.88a60950.js";import{c as he,W as ve}from"../chunks/index.3cc0610f.js";function re(o){let r,e,a,l,v,p=o[1].t("{{webUIName}} Backend Required",{webUIName:o[2]})+"",g,W,s,B=o[1].t("Oops! You're using an unsupported method (frontend only). Please serve the WebUI from the backend.")+"",x,O,P,T,R,Y,_,y=o[1].t("See readme.md for instructions")+"",S,J,A=o[1].t("or")+"",q,Q,b,j=o[1].t("join our Discord for help.")+"",z,F,E,k,C=o[1].t("Check Again")+"",M,G,K;return{c(){r=c("div"),e=c("div"),a=c("div"),l=c("div"),v=c("div"),g=U(p),W=I(),s=c("div"),x=U(B),O=I(),P=c("br"),T=I(),R=c("br"),Y=I(),_=c("a"),S=U(y),J=I(),q=U(A),Q=I(),b=c("a"),z=U(j),F=I(),E=c("div"),k=c("button"),M=U(C),this.h()},l(i){r=d(i,"DIV",{class:!0});var m=h(r);e=d(m,"DIV",{class:!0});var L=h(e);a=d(L,"DIV",{class:!0});var X=h(a);l=d(X,"DIV",{class:!0});var D=h(l);v=d(D,"DIV",{class:!0});var Z=h(v);g=N(Z,p),Z.forEach(f),W=w(D),s=d(D,"DIV",{class:!0});var u=h(s);x=N(u,B),O=w(u),P=d(u,"BR",{class:!0}),T=w(u),R=d(u,"BR",{class:!0}),Y=w(u),_=d(u,"A",{class:!0,href:!0,target:!0});var $=h(_);S=N($,y),$.forEach(f),J=w(u),q=N(u,A),Q=w(u),b=d(u,"A",{class:!0,href:!0,target:!0});var ee=h(b);z=N(ee,j),ee.forEach(f),u.forEach(f),F=w(D),E=d(D,"DIV",{class:!0});var te=h(E);k=d(te,"BUTTON",{class:!0});var se=h(k);M=N(se,C),se.forEach(f),te.forEach(f),D.forEach(f),X.forEach(f),L.forEach(f),m.forEach(f),this.h()},h(){n(v,"class","text-center text-2xl font-medium z-50"),n(P,"class",""),n(R,"class",""),n(_,"class","font-semibold underline"),n(_,"href","https://github.com/open-webui/open-webui#how-to-install-"),n(_,"target","_blank"),n(b,"class","font-semibold underline"),n(b,"href","https://discord.gg/5rJgQTnV4s"),n(b,"target","_blank"),n(s,"class","mt-4 text-center text-sm w-full"),n(k,"class","relative z-20 flex px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition font-medium text-sm"),n(E,"class","mt-6 mx-auto relative group w-fit"),n(l,"class","max-w-md"),n(a,"class","m-auto pb-44 flex flex-col justify-center"),n(e,"class","absolute rounded-xl w-full h-full backdrop-blur flex justify-center"),n(r,"class","absolute w-full h-full flex z-50")},m(i,m){oe(i,r,m),t(r,e),t(e,a),t(a,l),t(l,v),t(v,g),t(l,W),t(l,s),t(s,x),t(s,O),t(s,P),t(s,T),t(s,R),t(s,Y),t(s,_),t(_,S),t(s,J),t(s,q),t(s,Q),t(s,b),t(b,z),t(l,F),t(l,E),t(E,k),t(k,M),G||(K=ce(k,"click",o[4]),G=!0)},p(i,m){m&6&&p!==(p=i[1].t("{{webUIName}} Backend Required",{webUIName:i[2]})+"")&&V(g,p),m&2&&B!==(B=i[1].t("Oops! You're using an unsupported method (frontend only). Please serve the WebUI from the backend.")+"")&&V(x,B),m&2&&y!==(y=i[1].t("See readme.md for instructions")+"")&&V(S,y),m&2&&A!==(A=i[1].t("or")+"")&&V(q,A),m&2&&j!==(j=i[1].t("join our Discord for help.")+"")&&V(z,j),m&2&&C!==(C=i[1].t("Check Again")+"")&&V(M,C)},d(i){i&&f(r),G=!1,K()}}}function pe(o){let r,e=o[0]&&re(o);return{c(){e&&e.c(),r=ae()},l(a){e&&e.l(a),r=ae()},m(a,l){e&&e.m(a,l),oe(a,r,l)},p(a,[l]){a[0]?e?e.p(a,l):(e=re(a),e.c(),e.m(r.parentNode,r)):e&&(e.d(1),e=null)},i:le,o:le,d(a){a&&f(r),e&&e.d(a)}}}function _e(o,r,e){let a,l,v;H(o,he,s=>e(5,a=s)),H(o,ve,s=>e(2,v=s));const p=ie("i18n");H(o,p,s=>e(1,l=s));let g=!1;return ue(async()=>{a&&await me("/"),e(0,g=!0)}),[g,l,v,p,()=>{location.href="/"}]}class we extends de{constructor(r){super(),fe(this,r,_e,pe,ne,{})}}export{we as component};
