import{_ as g,r as f,p as v,c as d,a as e,d as y,A as b,B as l,C as n,x,z as k,o as u}from"./NOtjPhkj.js";import{_ as T}from"./DDHPc_ep.js";const A={setup(){const i=f({id:null,category:"",title:"",excerpt:"",date:"",author:"",readingTime:"",content:"",image:null}),t=x(),m=k(),o=()=>{const r=new URL(window.location.href);return r.port="5000",r.origin},c=async r=>{try{const a=await(await fetch(`${o()}/api/articles/${r}`)).json();i.value={id:a.id,category:a.category,title:a.title,excerpt:a.excerpt||generateExcerpt(a.content),date:a.date?a.date.substring(0,10):"",author:a.author,readingTime:a.reading_time,content:a.content,image:a.image_path?`${o()}${a.image_path}`:null}}catch(s){console.error("Error fetching article:",s)}},p=async()=>{if(!i.value.id){alert("ID artikel tidak valid.");return}try{const r=await fetch(`${o()}/api/articles/${i.value.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({category:i.value.category,title:i.value.title,excerpt:i.value.excerpt,date:i.value.date,author:i.value.author,readingTime:i.value.readingTime,content:i.value.content})}),s=await r.json();r.ok?(alert("Artikel berhasil diperbarui!"),m.push("../components/Home")):alert("Gagal memperbarui artikel: "+s.error)}catch(r){console.error("Error updating article:",r),alert("Terjadi kesalahan saat memperbarui artikel.")}};return v(()=>{const r=t.params.id;r?(c(r),i.value.id=r):console.error("ID artikel tidak ditemukan pada route.")}),{article:i,submitArticle:p}}},w={class:"app-wrapper"},U={class:"header-content"},V={class:"dashboard"},q={class:"form-container"},C={class:"form-group"},D={key:0},h=["src"],E={key:1},I={class:"form-group"},R={class:"form-group"},_={class:"form-group"},j={class:"form-group"},B={class:"form-group"},N={class:"form-group"},M={class:"form-group"};function S(i,t,m,o,c,p){return u(),d("div",w,[e("header",null,[e("div",U,[e("h1",{class:"logo",onClick:t[0]||(t[0]=(...r)=>i.navigateToArtikel&&i.navigateToArtikel(...r)),style:{cursor:"pointer"}},t[9]||(t[9]=[e("img",{src:T,alt:"RacingStation Logo",class:"logo-image"},null,-1),y(" Dashboard ")]))])]),e("div",V,[t[20]||(t[20]=e("h1",null,"Edit Articles",-1)),e("div",q,[e("form",{onSubmit:t[8]||(t[8]=b((...r)=>o.submitArticle&&o.submitArticle(...r),["prevent"]))},[e("div",C,[t[11]||(t[11]=e("label",null,"Current Image:",-1)),o.article.image?(u(),d("div",D,[e("img",{src:o.article.image,alt:"Current Article Image",class:"current-image"},null,8,h)])):(u(),d("div",E,t[10]||(t[10]=[e("span",null,"No image available",-1)])))]),e("div",I,[t[12]||(t[12]=e("label",{for:"category"},"Category:",-1)),l(e("input",{type:"text",id:"category","onUpdate:modelValue":t[1]||(t[1]=r=>o.article.category=r),required:""},null,512),[[n,o.article.category]])]),e("div",R,[t[13]||(t[13]=e("label",{for:"title"},"Title:",-1)),l(e("input",{type:"text",id:"title","onUpdate:modelValue":t[2]||(t[2]=r=>o.article.title=r),required:""},null,512),[[n,o.article.title]])]),e("div",_,[t[14]||(t[14]=e("label",{for:"excerpt"},"Excerpt:",-1)),l(e("input",{type:"text",id:"excerpt","onUpdate:modelValue":t[3]||(t[3]=r=>o.article.excerpt=r),required:""},null,512),[[n,o.article.excerpt]])]),e("div",j,[t[15]||(t[15]=e("label",{for:"date"},"Date:",-1)),l(e("input",{type:"date",id:"date","onUpdate:modelValue":t[4]||(t[4]=r=>o.article.date=r),required:""},null,512),[[n,o.article.date]])]),e("div",B,[t[16]||(t[16]=e("label",{for:"author"},"Author:",-1)),l(e("input",{type:"text",id:"author","onUpdate:modelValue":t[5]||(t[5]=r=>o.article.author=r),required:""},null,512),[[n,o.article.author]])]),e("div",N,[t[17]||(t[17]=e("label",{for:"readingTime"},"Reading Time (min):",-1)),l(e("input",{type:"number",id:"readingTime","onUpdate:modelValue":t[6]||(t[6]=r=>o.article.readingTime=r),required:""},null,512),[[n,o.article.readingTime]])]),e("div",M,[t[18]||(t[18]=e("label",{for:"content"},"Content:",-1)),l(e("textarea",{id:"content","onUpdate:modelValue":t[7]||(t[7]=r=>o.article.content=r),required:""},null,512),[[n,o.article.content]])]),t[19]||(t[19]=e("button",{type:"submit"},"Update Article",-1))],32)])])])}const z=g(A,[["render",S],["__scopeId","data-v-37c04ccf"]]);export{z as default};