import { b as _export_sfc, u as useRuntimeConfig, _ as _imports_0, a as __nuxt_component_0 } from './server.mjs';
import { ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { F as Footer } from './Footer-09VditFc.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ChevronDownIcon, SearchIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
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
    const searchQuery = ref("");
    const isMobile = ref(false);
    const isSearchVisible = ref(false);
    const isFilterOpen = ref(false);
    const selectedCategory = ref("All");
    const categories = ["All", "Tutorial", "News"];
    const showOverlay = ref(true);
    ref("");
    const featuredArticle = ref({
      id: "tutorial-featured",
      title: "How to watch Formula 1, MotoGP, WEC and other live streaming in RacingStation?",
      excerpt: "Free live streaming Formula 1, MotoGP, WEC and more in RacingStation Stream.",
      category: "Tutorial",
      author: "RacingStation",
      date: (/* @__PURE__ */ new Date()).toISOString(),
      reading_time: 15,
      image_path: "/img/tutorial-img.jpg",
      slug: "article/tutorial/tutorial"
      // Path ke halaman tutorial
    });
    const menuItems = ["Latest News", "Watch Sports", "Tutorial"];
    const getLink = (item) => {
      switch (item) {
        case "Latest News":
          return "/";
        case "Watch Sports":
          return "/stream";
        case "Tutorial":
          return "/article/tutorial/tutorial";
        default:
          return "/";
      }
    };
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    const articles = ref([]);
    const { API_URL, IMAGE_URL } = useRuntimeConfig().public;
    const seoTitle = computed(() => "RacingStation - News and Stream");
    computed(() => "Watch live streaming of your favorite events.");
    const seoImage = computed(() => `${IMAGE_URL.startsWith("http") ? IMAGE_URL : `https://${IMAGE_URL}`}/public/img/racingstation.png`);
    useSeoMeta({
      title: seoTitle,
      ogTitle: seoTitle,
      description: "Stay updated with the latest sports news and enjoy live streaming of sports events, including Formula 1, MotoGP, WEC, Football, and more. Experience a mobile-friendly platform and reliable streaming services with RacingStation.",
      ogDescription: "Stay updated with the latest sports news and enjoy live streaming of sports events, including Formula 1, MotoGP, WEC, Football, and more. Experience a mobile-friendly platform and reliable streaming services with RacingStation.",
      ogImage: seoImage,
      twitterTitle: seoTitle,
      twitterDescription: "Stay updated with the latest sports news and enjoy live streaming of sports events, including Formula 1, MotoGP, WEC, Football, and more. Experience a mobile-friendly platform and reliable streaming services with RacingStation.",
      twitterCard: "summary_large_image"
    });
    const sortedArticles = computed(() => {
      return articles.value.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    const filteredArticles = computed(() => {
      let filtered = sortedArticles.value;
      if (selectedCategory.value !== "All") {
        filtered = filtered.filter((article) => article.category === selectedCategory.value);
      }
      const query = searchQuery.value.trim().toLowerCase();
      if (query) {
        filtered = filtered.filter((article) => article.title.toLowerCase().includes(query));
      }
      return filtered;
    });
    const displayedArticles = computed(() => {
      const start = (currentPage.value - 1) * articlesPerPage;
      const end = start + articlesPerPage;
      return filteredArticles.value.slice(start, end);
    });
    const currentPage = ref(1);
    const totalPages = computed(() => {
      return Math.ceil(filteredArticles.value.length / articlesPerPage);
    });
    watch(searchQuery, (newVal) => {
      if (newVal.trim()) {
        currentPage.value = 1;
      }
    });
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))} data-v-859b618a><header data-v-859b618a><div class="header-content" data-v-859b618a><h1 class="logo" data-v-859b618a><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-859b618a> RacingStation </h1><div class="header-controls" data-v-859b618a><button class="icon-button" data-v-859b618a>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-859b618a>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-859b618a><ul data-v-859b618a><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-859b618a>`);
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
        _push(`<nav class="mobile-nav" data-v-859b618a><div class="mobile-nav-content" data-v-859b618a><button class="icon-button close-menu" data-v-859b618a>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-859b618a><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-859b618a>`);
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
      if (showOverlay.value) {
        _push(`<div class="clickable-overlay" data-v-859b618a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main data-v-859b618a><div class="adsterra-container" data-v-859b618a><div id="container-f7102c30eb715e25f6e3bf755bfbe92c" data-v-859b618a></div></div>`);
      if (currentView.value === "Latest News") {
        _push(`<div class="articles-section" data-v-859b618a><div class="news-header" data-v-859b618a><h2 class="font-sans font-normal" data-v-859b618a>Tutorial</h2></div><article class="featured-article" data-v-859b618a><div class="featured-article-content" data-v-859b618a><div class="featured-article-image" data-v-859b618a>`);
        if (featuredArticle.value.image_path) {
          _push(`<img${ssrRenderAttr("src", featuredArticle.value.image_path)}${ssrRenderAttr("alt", featuredArticle.value.title)} loading="lazy" data-v-859b618a>`);
        } else {
          _push(`<p data-v-859b618a>Image not available</p>`);
        }
        _push(`</div><div class="featured-article-text" data-v-859b618a><span class="article-category" data-v-859b618a>${ssrInterpolate(featuredArticle.value.category)}</span><h3 data-v-859b618a>${ssrInterpolate(featuredArticle.value.title)}</h3><p class="excerpt" data-v-859b618a>${ssrInterpolate(featuredArticle.value.excerpt)}</p><div class="article-meta" data-v-859b618a><div class="author-info" data-v-859b618a>`);
        if (featuredArticle.value.author) {
          _push(`<img class="author-image"${ssrRenderAttr("src", _imports_0)}${ssrRenderAttr("alt", featuredArticle.value.author)} data-v-859b618a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-859b618a><p class="author-name" data-v-859b618a>${ssrInterpolate(featuredArticle.value.author)}</p><div class="article-details" data-v-859b618a><time data-v-859b618a>${ssrInterpolate(formatDate(featuredArticle.value.date))}</time><span class="separator" data-v-859b618a>\xB7</span><span data-v-859b618a>${ssrInterpolate(featuredArticle.value.reading_time)} min read</span></div></div></div></div></div></div></article><div class="latest-article-section" data-v-859b618a><div class="latest-article-title" data-v-859b618a><h2 class="font-sans font-normal" data-v-859b618a>Latest Article</h2></div><div class="latest-article-controls" data-v-859b618a><div class="filter-container" data-v-859b618a><div class="relative" data-v-859b618a><button class="${ssrRenderClass([{ active: isFilterOpen.value }, "filter-button"])}" data-v-859b618a><span class="filter-text" data-v-859b618a>FILTER</span>`);
        _push(ssrRenderComponent(unref(ChevronDownIcon), {
          class: ["filter-icon", { "rotate-180": isFilterOpen.value }]
        }, null, _parent));
        _push(`</button>`);
        if (isFilterOpen.value) {
          _push(`<div class="filter-dropdown" data-v-859b618a><!--[-->`);
          ssrRenderList(categories, (category) => {
            _push(`<button class="${ssrRenderClass([{ selected: selectedCategory.value === category }, "filter-option"])}" data-v-859b618a>${ssrInterpolate(category)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (!isMobile.value) {
          _push(`<div class="search-container" data-v-859b618a><form class="search-form" data-v-859b618a><input type="search"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search articles..." class="search-input" aria-label="Search articles" data-v-859b618a><button type="submit" class="search-button" data-v-859b618a>`);
          _push(ssrRenderComponent(unref(SearchIcon), { class: "search-icon" }, null, _parent));
          _push(`</button></form></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button style="${ssrRenderStyle(isMobile.value ? null : { display: "none" })}" class="mobile-search-icon" data-v-859b618a>`);
        _push(ssrRenderComponent(unref(SearchIcon), { class: "search-icon" }, null, _parent));
        _push(`</button></div></div>`);
        if (isMobile.value) {
          _push(`<div class="${ssrRenderClass([{ "mobile-search-active": isSearchVisible.value }, "search-container mobile-search"])}" data-v-859b618a><form class="search-form" data-v-859b618a><input type="search"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search articles..." class="search-input" data-v-859b618a><button type="submit" class="search-button" data-v-859b618a>`);
          _push(ssrRenderComponent(unref(SearchIcon), { class: "search-icon" }, null, _parent));
          _push(`</button></form></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="article-grid" data-v-859b618a>`);
        if (displayedArticles.value.length === 0) {
          _push(`<div class="no-articles-message" data-v-859b618a><p data-v-859b618a>No articles found for the selected category or search query.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(displayedArticles.value, (article) => {
          _push(`<article class="article-card" data-v-859b618a><div class="article-image-container" data-v-859b618a>`);
          if (article.image_path) {
            _push(`<img${ssrRenderAttr("src", article.image_path)}${ssrRenderAttr("alt", article.title)} class="article-image" loading="lazy" data-v-859b618a>`);
          } else {
            _push(`<p data-v-859b618a>Image not available</p>`);
          }
          _push(`</div><div class="article-content" data-v-859b618a><span class="article-category" data-v-859b618a>${ssrInterpolate(article.category)}</span><h3 data-v-859b618a>${ssrInterpolate(article.title)}</h3><p class="text-left hover:text-justify" data-v-859b618a>${ssrInterpolate(article.excerpt)}</p><div class="article-footer" data-v-859b618a><span class="article-date" data-v-859b618a>${ssrInterpolate(formatDate(article.date))}</span><span class="read-more" data-v-859b618a> Read more `);
          _push(ssrRenderComponent(unref(ArrowRightIcon), null, null, _parent));
          _push(`</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
        if (totalPages.value > 1) {
          _push(`<div class="pagination" data-v-859b618a><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-button" data-v-859b618a>`);
          _push(ssrRenderComponent(unref(ChevronLeftIcon), null, null, _parent));
          _push(`</button><span class="pagination-info" data-v-859b618a>Page ${ssrInterpolate(currentPage.value)} of ${ssrInterpolate(totalPages.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-button" data-v-859b618a>`);
          _push(ssrRenderComponent(unref(ChevronRightIcon), null, null, _parent));
          _push(`</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="adsterra-container" data-v-859b618a></div></main>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-859b618a"]]);

export { index as default };
//# sourceMappingURL=index-6dgB4x67.mjs.map
