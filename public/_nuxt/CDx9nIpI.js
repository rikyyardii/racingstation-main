import{v as w,r as y,k as x,p as S,c as p,o as k,a as o,_ as b,b as r,w as c,d as s,g as M,F as I,f as C,h as F,t as N,N as h}from"./VlqL9xn_.js";const R={class:"footer"},L={class:"footer-content"},$={class:"footer-section"},j={class:"footer-nav"},A={class:"nav-column"},B={class:"nav-column"},T={class:"footer-info"},V={class:"data-provider"},P=["href"],z={key:0},D={__name:"Footer",setup(e){const a=y([]),i=y(!0),l=y(null),{public:{API_URL:f}}=x(),g=async()=>{try{i.value=!0,l.value=null;const d=await $fetch(`${f}/sosmed-links`);a.value=d}catch(d){console.error("Error fetching sosmed links:",d),l.value="Failed to load social media links",a.value=[{id:1,name:"Youtube",link:"https://youtube.com/@RacingStation-2"},{id:2,name:"Twitter",link:"https://x.com/racingstation_"}]}finally{i.value=!1}};return S(()=>{g()}),(d,t)=>{const n=M;return k(),p("footer",R,[o("div",L,[o("div",$,[t[6]||(t[6]=o("div",{class:"footer-logo"},[o("span",null,[o("img",{src:b,alt:"RacingStation",class:"racingstation-logo"})]),o("span",{class:"logo-text"},"RacingStation")],-1)),o("nav",j,[o("div",A,[r(n,{to:"/article/tutorial/tutorial",class:"nav-link"},{default:c(()=>t[0]||(t[0]=[s("Tutorial")])),_:1}),r(n,{to:"/about/racingstation",class:"nav-link"},{default:c(()=>t[1]||(t[1]=[s("About us")])),_:1}),r(n,{to:"/about/contact-page",class:"nav-link"},{default:c(()=>t[2]||(t[2]=[s("Contact Us")])),_:1})]),o("div",B,[r(n,{to:"/about/disclaimer",class:"nav-link"},{default:c(()=>t[3]||(t[3]=[s("Disclaimer")])),_:1}),r(n,{to:"/about/privacy-policy",class:"nav-link"},{default:c(()=>t[4]||(t[4]=[s("Privacy Policy")])),_:1}),r(n,{to:"/about/tos",class:"nav-link"},{default:c(()=>t[5]||(t[5]=[s("Terms and Conditions")])),_:1})])])]),o("div",T,[t[10]||(t[10]=o("p",{class:"made-with"},[s("Made by "),o("img",{src:b,alt:"RacingStation",class:"racingstation-logo"}),s(" RacingStation")],-1)),o("p",V,[t[7]||(t[7]=s(" Subscribe and Follow our ")),t[8]||(t[8]=o("a",{class:"support-link",href:"https://youtube.com/@RacingStation-2",target:"_blank"},"Youtube",-1)),t[9]||(t[9]=s(" and ")),(k(!0),p(I,null,C(a.value,(u,_)=>(k(),p("span",{key:u.id},[o("a",{class:"support-link",href:u.link,target:"_blank"},N(u.name),9,P),_<a.value.length-1?(k(),p("span",z," and ")):F("",!0)]))),128))]),t[11]||(t[11]=o("p",{class:"disclaimer"},"For more Information and Live Streaming Schedule Info.",-1))])])])}}},Y=w(D,[["__scopeId","data-v-d0becd9c"]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var m={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=({size:e,strokeWidth:a=2,absoluteStrokeWidth:i,color:l,iconNode:f,name:g,class:d,...t},{slots:n})=>h("svg",{...m,width:e||m.width,height:e||m.height,stroke:l||m.stroke,"stroke-width":i?Number(a)*24/Number(e):a,class:["lucide",`lucide-${E(g??"icon")}`],...t},[...f.map(u=>h(...u)),...n.default?[n.default()]:[]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,a)=>(i,{slots:l})=>h(U,{...i,iconNode:a,name:e},l);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=v("MenuIcon",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=v("MoonIcon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=v("SunIcon",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=v("XIcon",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);export{Y as F,q as M,K as S,G as X,Z as a,v as c};
