import{s as fe,r,k as pe,l as f,p as ge,v as _e,x as ye,c as l,a as e,b as u,h as m,d as E,_ as X,e as F,u as d,F as I,f as N,w as D,T as H,t as c,y as V,n as R,z as K,A as Y,B as ke,q as be,o,g as we}from"./oiRATSsh.js";import{c as Se,S as Ce,M as Ae,a as xe,X as Z,F as Le}from"./Bz_hUaix.js";import{u as Me}from"./vKBWnsXH.js";import{S as W,C as Ee,a as Fe}from"./DlHik8Ln.js";import{A as Ie}from"./BF6pliaY.js";/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=Se("ChevronDownIcon",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),De={class:"app"},Re={class:"header-content"},Pe={class:"header-controls"},$e={class:"desktop-nav"},Te={key:0,class:"mobile-nav"},Ve={class:"mobile-nav-content"},We={key:0,class:"articles-section"},je={class:"featured-article-content"},Ue={class:"featured-article-image"},ze=["src","alt"],Oe={key:1},qe={class:"featured-article-text"},Be={class:"article-category"},Qe={class:"excerpt"},Ge={class:"article-meta"},Je={class:"author-info"},Xe=["alt"],He={class:"author-name"},Ke={class:"article-details"},Ye={class:"latest-article-section"},Ze={class:"latest-article-controls"},et={class:"filter-container"},tt={class:"relative"},st={key:0,class:"filter-dropdown"},at=["onClick"],ot={key:0,class:"search-container"},lt={type:"submit",class:"search-button"},nt={type:"submit",class:"search-button"},it={class:"article-grid"},rt={key:0,class:"no-articles-message"},ct=["onClick"],ut={class:"article-image-container"},dt=["src","alt"],vt={key:1},ht={class:"article-content"},mt={class:"article-category"},ft={class:"text-left hover:text-justify"},pt={class:"article-footer"},gt={class:"article-date"},_t={class:"read-more"},yt={key:2,class:"pagination"},kt=["disabled"],bt={class:"pagination-info"},wt=["disabled"],_=6,St={__name:"index",setup(Ct){const ee=be(),te=r(null),b=r(!1),w=r(!0),j=r("Latest News");r(!1),r(""),r("");const v=r(""),g=r(!1),y=r(!1),p=r(!1),S=r("All"),se=["All","Tutorial","News"],k=r(!0),C=r(""),ae=async()=>{try{const t=await fetch(`${q}/adslink_card`);if(!t.ok)throw new Error("Network response was not ok");const s=await t.json();s&&s.length>0&&s[0].status==="enable"?(C.value=s[0].adslink,k.value=!0):(C.value="",k.value=!1)}catch(t){console.error("Error fetching adslink:",t),C.value="",k.value=!1}},oe=()=>{window.open(C.value,"_blank"),k.value=!1},le=()=>{const t=document.createElement("script");t.async=!0,t.setAttribute("data-cfasync","false"),t.src="//pl26356971.profitableratecpm.com/f7102c30eb715e25f6e3bf755bfbe92c/invoke.js",document.head.appendChild(t)},U=["Latest News","Watch Sports"],z=t=>{switch(t){case"Latest News":return"/";case"Watch Sports":return"/stream";default:return"/"}},P=()=>{b.value=!b.value},ne=()=>{w.value=!w.value,document.body.classList.toggle("light-mode",!w.value)},O=r([]),{API_URL:q,IMAGE_URL:A}=pe().public,$=f(()=>"RacingStation - News and Stream");f(()=>"Watch live streaming of your favorite events.");const ie=f(()=>`${A.startsWith("http")?A:`https://${A}`}/public/img/racingstation.png`);Me({title:$,ogTitle:$,description:"Stay updated with the latest sports news and enjoy live streaming of sports events, including Formula 1, MotoGP, WEC, Football, and more. Experience a mobile-friendly platform and reliable streaming services with RacingStation.",ogDescription:"Stay updated with the latest sports news and enjoy live streaming of sports events, including Formula 1, MotoGP, WEC, Football, and more. Experience a mobile-friendly platform and reliable streaming services with RacingStation.",ogImage:ie,twitterTitle:$,twitterDescription:"Stay updated with the latest sports news and enjoy live streaming of sports events, including Formula 1, MotoGP, WEC, Football, and more. Experience a mobile-friendly platform and reliable streaming services with RacingStation.",twitterCard:"summary_large_image"});const re=async()=>{try{const t=await fetch(`${q}/articles_card`);if(!t.ok)throw new Error("Network response was not ok");const s=await t.json();O.value=s.map(n=>({...n,image_path:`${A}${n.image_path}`,slug:n.slug}))}catch(t){console.error("Error fetching articles:",t)}},B=()=>{console.log("Searching for:",v.value),localStorage.setItem("searchQuery",v.value),g.value&&(y.value=!1)},ce=()=>{y.value=!y.value},T=()=>{g.value=window.innerWidth<=640,g.value||(y.value=!0)},ue=()=>{p.value=!p.value},de=t=>{S.value=t,p.value=!1,h.value=1};ge(()=>{le(),T(),window.addEventListener("resize",T),re(),ae();const t=localStorage.getItem("searchQuery");t&&(v.value=t),window.addEventListener("beforeunload",()=>{localStorage.removeItem("searchQuery")});const s=localStorage.getItem("selectedArticle");s&&(te.value=JSON.parse(s),j.value="Detailed Article"),document.addEventListener("click",n=>{const a=document.querySelector(".filter-container");a&&!a.contains(n.target)&&(p.value=!1)})}),_e(()=>{window.removeEventListener("resize",T)});const i=f(()=>O.value.slice().sort((t,s)=>new Date(s.date)-new Date(t.date))),x=f(()=>{let t=i.value;S.value!=="All"&&(t=t.filter(n=>n.category===S.value));const s=v.value.trim().toLowerCase();return s&&(t=t.filter(n=>n.title.toLowerCase().includes(s))),t}),Q=f(()=>{const t=(h.value-1)*_,s=t+_;return v.value.trim()?x.value.slice(t,s):x.value.slice(1).slice(t,s)}),h=r(1),L=f(()=>{if(v.value.trim())return Math.ceil(x.value.length/_);{const t=Math.max(0,x.value.length-1);return Math.ceil(t/_)}});ye(v,t=>{t.trim()&&(h.value=1)}),f(()=>{var M;const t=(M=i.value[0])==null?void 0:M.id,s=i.value.filter(me=>me.id!==t),n=(h.value-1)*_,a=n+_;return s.slice(n,a)});const ve=()=>{h.value<L.value&&h.value++},he=()=>{h.value>1&&h.value--},G=t=>{t&&t.slug?ee.push(`/article/${t.slug}`):console.error("Slug tidak ditemukan")},J=t=>{const s={year:"numeric",month:"long",day:"numeric"};return new Date(t).toLocaleDateString("en-US",s)};return(t,s)=>{const n=we;return o(),l("div",De,[e("header",null,[e("div",Re,[s[3]||(s[3]=e("h1",{class:"logo"},[e("img",{src:X,alt:"RacingStation Logo",class:"logo-image"}),E(" RacingStation ")],-1)),e("div",Pe,[e("button",{onClick:ne,class:"icon-button"},[w.value?(o(),F(d(Ce),{key:0})):(o(),F(d(Ae),{key:1}))]),e("button",{onClick:P,class:"icon-button menu-toggle"},[b.value?(o(),F(d(Z),{key:1})):(o(),F(d(xe),{key:0}))]),e("nav",$e,[e("ul",null,[(o(),l(I,null,N(U,a=>e("li",{key:a},[u(n,{to:z(a),class:"no-active-link"},{default:D(()=>[E(c(a),1)]),_:2},1032,["to"])])),64))])])])])]),u(H,{name:"slide"},{default:D(()=>[b.value?(o(),l("nav",Te,[e("div",Ve,[e("button",{onClick:P,class:"icon-button close-menu"},[u(d(Z))]),e("ul",null,[(o(),l(I,null,N(U,a=>e("li",{key:a},[u(n,{to:z(a),class:"no-active-link",onClick:P},{default:D(()=>[E(c(a),1)]),_:2},1032,["to"])])),64))])])])):m("",!0)]),_:1}),k.value?(o(),l("div",{key:0,class:"clickable-overlay",onClick:oe})):m("",!0),e("main",null,[s[10]||(s[10]=e("div",{class:"adsterra-container"},[e("div",{id:"container-f7102c30eb715e25f6e3bf755bfbe92c"})],-1)),j.value==="Latest News"?(o(),l("div",We,[s[9]||(s[9]=e("div",{class:"news-header"},[e("h2",{class:"font-sans font-normal"},"Latest Article")],-1)),i.value.length>0?(o(),l("article",{key:0,class:"featured-article",onClick:s[0]||(s[0]=a=>G(i.value[0]))},[e("div",je,[e("div",Ue,[i.value[0].image_path?(o(),l("img",{key:0,src:i.value[0].image_path,alt:i.value[0].title,loading:"lazy"},null,8,ze)):(o(),l("p",Oe,"Image not available"))]),e("div",qe,[e("span",Be,c(i.value[0].category),1),e("h3",null,c(i.value[0].title),1),e("p",Qe,c(i.value[0].excerpt),1),e("div",Ge,[e("div",Je,[i.value[0].author?(o(),l("img",{key:0,class:"author-image",src:X,alt:i.value[0].author},null,8,Xe)):m("",!0),e("div",null,[e("p",He,c(i.value[0].author),1),e("div",Ke,[e("time",null,c(J(i.value[0].date)),1),s[4]||(s[4]=e("span",{class:"separator"},"·",-1)),e("span",null,c(i.value[0].reading_time)+" min read",1)])])])])])])])):m("",!0),e("div",Ye,[s[6]||(s[6]=e("div",{class:"latest-article-title"},[e("h2",{class:"font-sans font-normal"},"Other Article")],-1)),e("div",Ze,[e("div",et,[e("div",tt,[e("button",{onClick:ue,class:R(["filter-button",{active:p.value}])},[s[5]||(s[5]=e("span",{class:"filter-text"},"FILTER",-1)),u(d(Ne),{class:R(["filter-icon",{"rotate-180":p.value}])},null,8,["class"])],2),u(H,{"enter-active-class":"transition duration-100 ease-out","enter-from-class":"transform scale-95 opacity-0","enter-to-class":"transform scale-100 opacity-100","leave-active-class":"transition duration-75 ease-in","leave-from-class":"transform scale-100 opacity-100","leave-to-class":"transform scale-95 opacity-0"},{default:D(()=>[p.value?(o(),l("div",st,[(o(),l(I,null,N(se,a=>e("button",{key:a,onClick:M=>de(a),class:R(["filter-option",{selected:S.value===a}])},c(a),11,at)),64))])):m("",!0)]),_:1})])]),g.value?m("",!0):(o(),l("div",ot,[e("form",{onSubmit:K(B,["prevent"]),class:"search-form"},[V(e("input",{type:"search","onUpdate:modelValue":s[1]||(s[1]=a=>v.value=a),placeholder:"Search articles...",class:"search-input","aria-label":"Search articles"},null,512),[[Y,v.value]]),e("button",lt,[u(d(W),{class:"search-icon"})])],32)])),V(e("button",{onClick:ce,class:"mobile-search-icon"},[u(d(W),{class:"search-icon"})],512),[[ke,g.value]])])]),g.value?(o(),l("div",{key:1,class:R(["search-container mobile-search",{"mobile-search-active":y.value}])},[e("form",{onSubmit:K(B,["prevent"]),class:"search-form"},[V(e("input",{type:"search","onUpdate:modelValue":s[2]||(s[2]=a=>v.value=a),placeholder:"Search articles...",class:"search-input"},null,512),[[Y,v.value]]),e("button",nt,[u(d(W),{class:"search-icon"})])],32)],2)):m("",!0),e("div",it,[Q.value.length===0?(o(),l("div",rt,s[7]||(s[7]=[e("p",null,"No articles found for the selected category or search query.",-1)]))):m("",!0),(o(!0),l(I,null,N(Q.value,a=>(o(),l("article",{key:a.slug,class:"article-card",onClick:M=>G(a)},[e("div",ut,[a.image_path?(o(),l("img",{key:0,src:a.image_path,alt:a.title,class:"article-image",loading:"lazy"},null,8,dt)):(o(),l("p",vt,"Image not available"))]),e("div",ht,[e("span",mt,c(a.category),1),e("h3",null,c(a.title),1),e("p",ft,c(a.excerpt),1),e("div",pt,[e("span",gt,c(J(a.date)),1),e("span",_t,[s[8]||(s[8]=E(" Read more ")),u(d(Ie))])])])],8,ct))),128))]),L.value>1?(o(),l("div",yt,[e("button",{onClick:he,disabled:h.value===1,class:"pagination-button"},[u(d(Ee))],8,kt),e("span",bt,"Page "+c(h.value)+" of "+c(L.value),1),e("button",{onClick:ve,disabled:h.value===L.value,class:"pagination-button"},[u(d(Fe))],8,wt)])):m("",!0)])):m("",!0),s[11]||(s[11]=e("div",{class:"adsterra-container"},null,-1))]),u(Le)])}}},Ft=fe(St,[["__scopeId","data-v-221e97e7"]]);export{Ft as default};
