function y(s){const e=s-1;return e*e*e+1}const p={y:-8,start:.95,duration:200},v=(s,e)=>{const o=getComputedStyle(s),l=o.transform==="none"?"":o.transform,a={...p,...e},c=(t,r,n)=>{const[u,f]=r,[i,m]=n;return(t-u)/(f-u)*(m-i)+i},d=t=>Object.keys(t).reduce((r,n)=>t[n]===void 0?r:r+`${n}:${t[n]};`,"");return{duration:a.duration??200,delay:0,css:t=>{const r=c(t,[0,1],[a.y,0]),n=c(t,[0,1],[a.start,1]);return d({transform:`${l} translate3d(0, ${r}px, 0) scale(${n})`,opacity:t})},easing:y}};export{v as f};
