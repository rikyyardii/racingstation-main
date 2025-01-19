import { u as useRuntimeConfig, _ as _imports_0, b as __nuxt_component_0 } from './server.mjs';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { F as Footer } from './Footer-3ik4tbsg.mjs';
import { A as Adsense } from './Adsense-BQOULn5G.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
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

const articlesPerPage = 6;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    ref(null);
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Latest News");
    ref(false);
    ref("");
    ref("");
    const menuItems = ["Latest News", "Watch Sports"];
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
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    const articles = ref([]);
    useRuntimeConfig().public;
    const sortedArticles = computed(() => {
      return articles.value.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    const currentPage = ref(1);
    const totalPages = computed(() => {
      const filteredArticles = sortedArticles.value.filter((article, index) => index !== 0);
      return Math.ceil(filteredArticles.length / articlesPerPage);
    });
    const paginatedArticles = computed(() => {
      var _a;
      const featuredArticleId = (_a = sortedArticles.value[0]) == null ? void 0 : _a.id;
      const filteredArticles = sortedArticles.value.filter((article) => article.id !== featuredArticleId);
      const start = (currentPage.value - 1) * articlesPerPage;
      const end = start + articlesPerPage;
      return filteredArticles.slice(start, end);
    });
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
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
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: getLink(item),
          class: "no-active-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav"><div class="mobile-nav-content"><button class="icon-button close-menu">`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: getLink(item),
            class: "no-active-link",
            onClick: toggleMenu
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      _push(ssrRenderComponent(Adsense, null, null, _parent));
      if (currentView.value === "Latest News") {
        _push(`<div class="articles-section"><h2 class="font-sans font-normal">News</h2>`);
        if (sortedArticles.value.length > 0) {
          _push(`<article class="featured-article"><div class="featured-article-content"><div class="featured-article-image">`);
          if (sortedArticles.value[0].image_path) {
            _push(`<img${ssrRenderAttr("src", sortedArticles.value[0].image_path)}${ssrRenderAttr("alt", sortedArticles.value[0].title)} loading="lazy">`);
          } else {
            _push(`<p>Image not available</p>`);
          }
          _push(`</div><div class="featured-article-text"><span class="article-category">${ssrInterpolate(sortedArticles.value[0].category)}</span><h3>${ssrInterpolate(sortedArticles.value[0].title)}</h3><p class="excerpt">${ssrInterpolate(sortedArticles.value[0].excerpt)}</p><div class="article-meta"><div class="author-info">`);
          if (sortedArticles.value[0].author) {
            _push(`<img class="author-image"${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", sortedArticles.value[0].author)}>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div><p class="author-name">${ssrInterpolate(sortedArticles.value[0].author)}</p><div class="article-details"><time>${ssrInterpolate(formatDate(sortedArticles.value[0].date))}</time><span class="separator">\xB7</span><span>${ssrInterpolate(sortedArticles.value[0].reading_time)} min read</span></div></div></div></div></div></div></article>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h2 class="font-sans font-normal">Latest Article</h2><div class="article-grid"><!--[-->`);
        ssrRenderList(paginatedArticles.value, (article) => {
          _push(`<article class="article-card"><div class="article-image-container">`);
          if (article.image_path) {
            _push(`<img${ssrRenderAttr("src", article.image_path)}${ssrRenderAttr("alt", article.title)} class="article-image" loading="lazy">`);
          } else {
            _push(`<p>Image not available</p>`);
          }
          _push(`</div><div class="article-content"><span class="article-category">${ssrInterpolate(article.category)}</span><h3>${ssrInterpolate(article.title)}</h3><p class="text-left hover:text-justify">${ssrInterpolate(article.excerpt)}</p><div class="article-footer"><span class="article-date">${ssrInterpolate(formatDate(article.date))}</span><span class="read-more"> Read more `);
          _push(ssrRenderComponent(unref(ArrowRightIcon), null, null, _parent));
          _push(`</span></div></div></article>`);
        });
        _push(`<!--]--></div><div class="pagination"><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-button">`);
        _push(ssrRenderComponent(unref(ChevronLeftIcon), null, null, _parent));
        _push(`</button><span class="pagination-info">Page ${ssrInterpolate(currentPage.value)} of ${ssrInterpolate(totalPages.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-button">`);
        _push(ssrRenderComponent(unref(ChevronRightIcon), null, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(Adsense, null, null, _parent));
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D3o6NgKG.mjs.map
