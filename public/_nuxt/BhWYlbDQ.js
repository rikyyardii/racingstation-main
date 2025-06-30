import{r as c,k as st,l as v,p as it,c as y,a as e,b as g,d as R,e as S,u as d,F as W,f as F,w as nt,T as at,h as G,t as h,s as $,m as rt,q as lt,o as u,n as D}from"./5_uCDQn8.js";import{_ as ct}from"./BjtU-hcP.js";import{S as dt,M as ut,a as mt,X as H,F as gt}from"./B-IJnHkL.js";import{u as ht}from"./DnHITmjJ.js";import{s as ft}from"./CkbJsGdZ.js";import{A as pt,U as vt}from"./CNslYC38.js";import{C as yt}from"./DcM9EgXX.js";import{C as wt}from"./BmdgOOjv.js";const bt={class:"app"},St={class:"header-content"},kt={class:"header-controls"},Lt={class:"desktop-nav"},xt=["href"],_t={key:0,class:"mobile-nav"},Ct={class:"mobile-nav-content"},Tt=["href"],Et={class:"article-container"},At={class:"back-nav"},It={href:"/",class:"back-link"},Mt={class:"hero-image"},jt=["src"],Rt={class:"article-content"},Wt={class:"category"},Ft={class:"title"},Gt={class:"metadata"},$t={class:"metadata-item"},Dt={class:"metadata-item"},Ht={class:"metadata-item"},Nt=["innerHTML"],Qt={__name:"tutorial",setup(Ot){rt(),lt();const N=c(""),w=c(!1),b=c(!0),k=["Latest News","Watch Sports"],L=c("Tutorial"),{public:{API_URL:O}}=st(),f=c(""),x=c(!0),_=c(null),V=async()=>{try{x.value=!0,_.value=null;const t=(await $fetch(`${O}/sosmed-links`)).find(i=>i.name.toLowerCase()==="twitter");t?f.value=t.link:f.value="https://twitter.com/racingstation_"}catch(s){console.error("Error fetching Twitter link:",s),_.value="Failed to load Twitter link",f.value="https://twitter.com/racingstation_"}finally{x.value=!1}},B=c([{id:1,src:"/img/tutorial-1.jpg",alt:"Google search results showing RacingStation - News and Stream",caption:"Search for 'racingstation' in Google and select the RacingStation - News and Stream result"},{id:2,src:"/img/tutorial-2.jpg",alt:"Mobile hamburger menu showing Watch Sports option",caption:"Mobile view: Click the hamburger menu (three lines) and select 'Watch Sports'"},{id:3,src:"/img/tutorial-3.jpg",alt:"Desktop view showing Watch Sports button in header",caption:"Desktop view: Click 'Watch Sports' in the top-right corner"},{id:4,src:"/img/tutorial-4.jpg",alt:"RacingStation Stream homepage showing event cards",caption:"RacingStation Stream homepage with various racing event cards"},{id:5,src:"/img/tutorial-5.jpg",alt:"Stream cards showing LIVE NOW indicators",caption:"Look for cards with 'LIVE NOW' tags to identify active streams"},{id:6,src:"/img/tutorial-6.jpg",alt:"Live video player showing active stream",caption:"Active live stream with video player running"},{id:7,src:"/img/tutorial-7.jpg",alt:"Video player showing Stream Offline message",caption:"Stream Offline message when the broadcast hasn't started yet"},{id:8,src:"/img/tutorial-8.jpg",alt:"Video player audio controls showing unmute button",caption:"Click the sound icon to unmute audio (🔇 → 🔊)"}]),n=c({category:"Tutorial",title:"How to watch Formula 1, MotoGP, WEC and other live streaming in RacingStation?",date:new Date().toISOString(),author:"RacingStation",reading_time:15,image:"/img/tutorial-img.jpg",content:`
    <div class="tutorial-content">
      <p>RacingStation is a popular platform for motorsport enthusiasts since 2018 to watch live streams of major racing events like Formula 1, MotoGP, and the World Endurance Championship (WEC). This step-by-step tutorial explains how to access these streams on RacingStation Website seamlessly :</p>
      
      <div class="troubleshoot-box">
        <p>⏱️ <strong>Before that, follow our Twitter for the most up-to-date, real-time RacingStation Stream live streaming schedule.</strong></p>
      </div>

      <h3>Step 1: Access the RacingStation Stream Page</h3>
      <ol>
        <li>Open your preferred web browser <em>(Chrome, Firefox, or Edge)</em></li>
        <li>Type <strong>racingstation</strong> in the Google search bar and then select the card titled <strong>RacingStation - News and Stream</strong> <em>(as shown in the image)</em></li>
        // IMAGE 1 //
        <li>On the RacingStation website:
          <ul>
            <li>On the mobile view, click the <strong>three-line icon (hamburger menu) in the top-right corner of the screen</strong>, then select the <strong>Watch Sports</strong> text to go to the RacingStation Stream page <em>(as shown in the image)</em></li>
            // IMAGE 2 //
            <li>On the desktop view, simply click the <strong>Watch Sports text in the top-right corner of the screen</strong> <em>(as shown in the image)</em></li>
            // IMAGE 3 //
            <li>Or just simply <a href="https://racingstation.top/stream" target="_blank" rel="noopener noreferrer">click here</a> to access the <strong>RacingStation Stream Page</strong></li>
          </ul>
        </li>
      </ol>

      <h3>Step 2: Locate Live Streams</h3>
      <ol>
        <li>On the <strong>RacingStation Stream</strong> homepage, you'll see a grid of "cards" representing ongoing/upcoming events.</li>
        // IMAGE 4 //
        <li><strong>Identify active streams</strong>:
          // IMAGE 5 //
          <ul>
            <li>Look for cards labeled <strong>"LIVE NOW"</strong> (usually in a red/colored banner).</li>
            <li>Cards <em>without</em> this tag are either upcoming or offline.</li>
          </ul>
        </li>
        <li><strong>Click the card</strong> for your desired event (e.g., Formula 1, MotoGP, or WEC).</li>
      </ol>
      
      <div class="note-box">
        <p>💡 <em>Note: If no streams are live, check back closer to race times. Schedules align with official race calendars.</em></p>
      </div>

      <h3>Step 3: Start Watching the Stream</h3>
      <ol>
        <li>After clicking a card:
          <ul>
            <li><strong>If the stream is live</strong>: A video player will launch automatically, showing the live broadcast.</li>
            // IMAGE 6 //
            <li><strong>If the stream hasn't started</strong>: The player displays <strong>"Stream Offline"</strong>.</li>
            // IMAGE 7 //
          </ul>
        </li>
      </ol>
      
      <div class="timing-reminder">
        <p>⏱️ RacingStation streams go live <strong>30 minutes before races start</strong>. Return at this time for uninterrupted viewing.</p>
      </div>

      <h3>Step 4: Troubleshoot Audio Issues</h3>
      <p>If the stream plays but has <strong>no sound</strong>:</p>
      <ol>
        <li>Click the <strong>sound icon</strong> (🔇) <strong>once</strong> to toggle <strong>unmute</strong> (icon changes to 🔊). at the <em>bottom-right corner</em> of the video player. or simply click the unmute icon on the video player if the unmute logo is available.</li>
        // IMAGE 8 //
        <li>Adjust the volume to your comfort level using the volume controls on your device.</li>
      </ol>
      
      <div class="troubleshoot-box">
        <p>🚫 <em>Still no audio?</em> Disable ad-blockers/extensions (they may interfere with the player) and refresh the page.</p>
      </div>

      <h3>Additional Tips</h3>
      <ul>
        <li><strong>Twitter Account:</strong> Follow our Twitter for the most up-to-date live streaming schedule in real-time.</li>
        <li><strong>Server:</strong> There are 4 server options for each live stream. Each server broadcasts the same live content, so if you experience lag while watching, you can switch to another server of your choice.</li>
        <li><strong>Best Browser Experience:</strong> Use Chrome or Firefox for optimal streaming performance.</li>
        <li><strong>Internet Connection:</strong> Ensure stable internet connection for smooth streaming.</li>
        <li><strong>Mobile Viewing:</strong> RacingStation is mobile-friendly and works on smartphones and tablets.</li>
        <li><strong>Race Schedules:</strong> Check official racing calendars for accurate race times.</li>
      </ul>
</div>
  `}),P=v(()=>{let s=n.value.content;B.value.forEach(r=>{const p=`// IMAGE ${r.id} //`,m=`
      <div class="tutorial-image" data-image-id="${r.id}">
        <figure>
          <img src="${r.src}" 
               alt="${r.alt}" 
               loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <div class="image-error" style="display: none; padding: 20px; background: #f3f4f6; border: 1px dashed #ccc; text-align: center; color: #666;">
            <p>⚠️ Image could not be loaded</p>
            <small>${r.alt}</small>
          </div>
          <figcaption class="image-caption">${r.caption}</figcaption>
        </figure>
      </div>
    `;s=s.replace(p,m)});const t="follow our Twitter",i=`
    <a href="${f.value}" target="_blank" rel="noopener noreferrer" class="twitter-link">
      follow our Twitter account 
    </a>
  `;s=s.replace(t,i);const a="Follow our Twitter",o=`
    <a href="${f.value}" target="_blank" rel="noopener noreferrer" class="twitter-link">
      Follow our Twitter account 
    </a>
  `;return s=s.replace(a,o),s}),q=()=>{$(()=>{setTimeout(()=>{const s=document.querySelectorAll(".tutorial-image img");console.log(`Found ${s.length} images to process`),s.forEach((t,i)=>{const a=t.closest(".tutorial-image");console.log(`Image ${i+1}:`,{src:t.src,complete:t.complete,naturalWidth:t.naturalWidth,naturalHeight:t.naturalHeight}),t.addEventListener("load",()=>{console.log(`Image loaded successfully: ${t.src}`),t.classList.add("loaded"),a&&(a.classList.remove("loading"),a.classList.add("image-loaded"))}),t.addEventListener("error",o=>{console.error(`Failed to load image: ${t.src}`,o),t.classList.add("error"),a&&(a.classList.remove("loading"),a.classList.add("image-error"))}),t.complete&&t.naturalWidth>0?(console.log(`Image already loaded: ${t.src}`),t.classList.add("loaded"),a&&a.classList.add("image-loaded")):a&&a.classList.add("loading")})},100)})},U=s=>{const t={year:"numeric",month:"long",day:"numeric"};return new Date(s).toLocaleDateString("en-US",t)},C=v(()=>n.value.content?n.value.content.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim().substring(0,160)+"...":"Complete Racing Tutorial Guide - Learn everything about racing techniques and strategies");ht({title:v(()=>n.value.title),ogTitle:v(()=>n.value.title),description:C,ogDescription:C,ogImage:v(()=>n.value.image),twitterCard:"summary_large_image"});const z=()=>{{const s=document.createElement("script");s.src="https://diarrhoeaeaglesunday.com/vxv0tjsb?key=7359390460eb0e7e34eba7b62f51752a",document.head.appendChild(s);const t=document.createElement("script");t.async=!0,t.setAttribute("data-cfasync","false"),t.src="//pl26356971.profitableratecpm.com/f7102c30eb715e25f6e3bf755bfbe92c/invoke.js",document.head.appendChild(t);const i=document.createElement("script");i.type="text/javascript",i.src="//pl26357408.profitableratecpm.com/b2/4b/1a/b24b1aeeaf743580d98186fc713b7de3.js",document.head.appendChild(i)}},T=()=>{{const s=new Date;N.value=s.toLocaleTimeString()}},E=()=>{w.value=!w.value},X=()=>{b.value=!b.value,document.body.classList.toggle("light-mode",!b.value)},A=s=>{switch(s){case"Latest News":return"/";case"Watch Sports":return"/stream";default:return"/"}},I=()=>{$(()=>{document.querySelectorAll(".tutorial-content p").forEach(o=>{if(o.closest(".note-box, .timing-reminder, .troubleshoot-box")){o.classList.add("text-left"),o.classList.remove("text-justify");return}const r=o.textContent.trim(),p=r.split(/\s+/).length,m=r.length,l=o.cloneNode(!0);l.style.position="absolute",l.style.visibility="hidden",l.style.width=o.offsetWidth+"px",l.style.textAlign="left",l.style.whiteSpace="normal",document.body.appendChild(l);const J=l.offsetHeight;l.style.textAlign="justify";const K=l.offsetHeight;document.body.removeChild(l);const M=K>J*1.2,Q=m<80,j=m<150,Y=p<12,Z=m>=150&&m<300,tt=m>=300;Q||Y?(o.classList.add("text-left"),o.classList.remove("text-justify")):j?M&&p>=8?(o.classList.add("text-justify"),o.classList.remove("text-left")):(o.classList.add("text-left"),o.classList.remove("text-justify")):Z?p/m>.08&&M?(o.classList.add("text-justify"),o.classList.remove("text-left")):(o.classList.add("text-left"),o.classList.remove("text-justify")):tt&&(o.classList.add("text-justify"),o.classList.remove("text-left"));const et=/\b(RacingStation|Formula|MotoGP|WEC|Chrome|Firefox|www\.|http|\.com|\.org)\b/i.test(r),ot=o.innerHTML.includes("<strong>")||o.innerHTML.includes("<em>");et&&j&&ot&&(o.classList.add("text-left"),o.classList.remove("text-justify"))}),document.querySelectorAll(".tutorial-content li").forEach(o=>{o.style.textAlign="left"}),document.querySelectorAll(".note-box p, .timing-reminder p, .troubleshoot-box p").forEach(o=>{o.style.textAlign="left",o.classList.add("text-left"),o.classList.remove("text-justify")}),document.querySelectorAll(".tutorial-content h1, .tutorial-content h2, .tutorial-content h3, .tutorial-content h4, .tutorial-content h5, .tutorial-content h6").forEach(o=>{o.style.textAlign="left"})})};return it(()=>{console.log("Component mounted, initializing..."),V(),z(),T(),ft(T,1e3),setTimeout(()=>{I(),q()},500),window.addEventListener("resize",()=>{setTimeout(I,100)})}),(s,t)=>(u(),y("div",bt,[e("header",null,[e("div",St,[t[0]||(t[0]=e("h1",{class:"logo"},[e("img",{src:ct,alt:"RacingStation Logo",class:"logo-image"}),R(" RacingStation ")],-1)),e("div",kt,[e("button",{onClick:X,class:"icon-button"},[b.value?(u(),S(d(dt),{key:0})):(u(),S(d(ut),{key:1}))]),e("button",{onClick:E,class:"icon-button menu-toggle"},[w.value?(u(),S(d(H),{key:1})):(u(),S(d(mt),{key:0}))]),e("nav",Lt,[e("ul",null,[(u(),y(W,null,F(k,i=>e("li",{key:i},[e("a",{href:A(i),class:D({active:L.value===i})},h(i),11,xt)])),64))])])])])]),g(at,{name:"slide"},{default:nt(()=>[w.value?(u(),y("nav",_t,[e("div",Ct,[e("button",{onClick:E,class:"icon-button close-menu"},[g(d(H))]),e("ul",null,[(u(),y(W,null,F(k,i=>e("li",{key:i},[e("a",{href:A(i),class:D({active:L.value===i})},h(i),11,Tt)])),64))])])])):G("",!0)]),_:1}),e("main",null,[t[2]||(t[2]=e("div",{class:"adsterra-container"},[e("div",{id:"container-f7102c30eb715e25f6e3bf755bfbe92c"})],-1)),e("article",Et,[e("nav",At,[e("a",It,[g(d(pt),{class:"icon"}),t[1]||(t[1]=R(" Back to Articles "))])]),e("div",Mt,[n.value.image?(u(),y("img",{key:0,src:n.value.image},null,8,jt)):G("",!0)]),e("div",Rt,[e("h1",Wt,h(n.value.category),1),e("h1",Ft,h(n.value.title),1),e("div",Gt,[e("div",$t,[g(d(yt),{class:"icon"}),e("span",null,h(U(n.value.date)),1)]),e("div",Dt,[g(d(vt),{class:"icon"}),e("span",null,h(n.value.author),1)]),e("div",Ht,[g(d(wt),{class:"icon"}),e("span",null,h(n.value.reading_time)+" min read",1)])]),e("div",{class:"rich-content",innerHTML:P.value},null,8,Nt)])]),t[3]||(t[3]=e("div",{class:"adsterra-container"},null,-1))]),g(gt)]))}};export{Qt as default};
