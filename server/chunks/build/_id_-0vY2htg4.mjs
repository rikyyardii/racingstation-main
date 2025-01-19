import { ref, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useRuntimeConfig, _ as _imports_0, a as useRouter } from './server.mjs';
import { useRoute } from 'vue-router';
import { F as Footer } from './Footer-3ik4tbsg.mjs';
import { A as Adsense } from './Adsense-BQOULn5G.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ArrowLeft, Calendar, User, Clock } from 'lucide-vue-next';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const articleCategory = ref(null);
    const articleTitle = ref(null);
    const articleDate = ref(null);
    const articleAuthor = ref(null);
    const articleRead = ref(null);
    const articleContent = ref(null);
    const articleImage = ref(null);
    ref("");
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const menuItems = ["Latest News", "Watch Sports"];
    const currentView = ref("Detailed Article");
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    };
    const { API_URL, IMAGE_URL } = useRuntimeConfig().public;
    const fetchArticle = async (slug2) => {
      const router = useRouter();
      try {
        const response = await fetch(`${API_URL}/articles/${slug2}`);
        if (response.ok) {
          const data = await response.json();
          articleCategory.value = data.category;
          articleTitle.value = data.title;
          articleDate.value = formatDate(data.date);
          articleAuthor.value = data.author;
          articleRead.value = data.reading_time;
          articleContent.value = data.content;
          articleImage.value = getImagePath(data.image_path);
          console.log(articleImage.value);
        } else if (response.status === 404) {
          console.error("Artikel tidak ditemukan");
          router.push("/404");
        } else {
          console.error("Gagal memuat artikel");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        router.push("/404");
      }
    };
    const getImagePath = (image) => {
      if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
      }
      if (image.startsWith("/public/img/")) {
        return `${IMAGE_URL}${image}`;
      }
      return `${IMAGE_URL}/public/img/${image}`;
    };
    const slug = route.params.id;
    [__temp, __restore] = withAsyncContext(() => fetchArticle(slug)), await __temp, __restore();
    const getLink = (item) => {
      switch (item) {
        case "Latest News":
          return "/";
        case "Watch Sports":
          return "/stream";
        default:
          return "/";
      }
    };
    const formattedContent = computed(() => {
      return articleContent.value ? articleContent.value.replace(/\n/g, "<br>") : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))}><header><div class="header-content"><h1 class="logo"><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image"> RacingStation </h1><div class="header-controls"><button class="icon-button">`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle">`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav"><ul><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li><a${ssrRenderAttr("href", getLink(item))} class="${ssrRenderClass({ active: currentView.value === item })}">${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav"><div class="mobile-nav-content"><button class="icon-button close-menu">`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li><a${ssrRenderAttr("href", getLink(item))} class="${ssrRenderClass({ active: currentView.value === item })}">${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      _push(ssrRenderComponent(Adsense, null, null, _parent));
      _push(`<article class="article-container"><nav class="back-nav"><a href="/" class="back-link">`);
      _push(ssrRenderComponent(unref(ArrowLeft), { class: "icon" }, null, _parent));
      _push(` Back to Articles </a></nav><div class="hero-image">`);
      if (articleImage.value) {
        _push(`<img${ssrRenderAttr("src", getImagePath(articleImage.value))}${ssrRenderAttr("alt", articleTitle.value)}>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="article-content"><h1 class="category">${ssrInterpolate(articleCategory.value)}</h1><h1 class="title">${ssrInterpolate(articleTitle.value)}</h1><div class="metadata"><div class="metadata-item">`);
      _push(ssrRenderComponent(unref(Calendar), { class: "icon" }, null, _parent));
      _push(`<span>${ssrInterpolate(articleDate.value)}</span></div><div class="metadata-item">`);
      _push(ssrRenderComponent(unref(User), { class: "icon" }, null, _parent));
      _push(`<span>${ssrInterpolate(articleAuthor.value)}</span></div><div class="metadata-item">`);
      _push(ssrRenderComponent(unref(Clock), { class: "icon" }, null, _parent));
      _push(`<span>${ssrInterpolate(articleRead.value)} min read</span></div></div><p class="content">${(_a = unref(formattedContent)) != null ? _a : ""}</p></div></article></main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-0vY2htg4.mjs.map
