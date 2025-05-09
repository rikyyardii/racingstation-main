import { u as useRuntimeConfig, _ as _imports_0, a as __nuxt_component_0 } from './server.mjs';
import { ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { F as Footer } from './Footer-Dg4gkY7h.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, SearchIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
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

const streamsPerPage = 6;
const _sfc_main = {
  __name: "stream",
  __ssrInlineRender: true,
  setup(__props) {
    ref("");
    useRouter();
    ref("");
    const showOverlay = ref(true);
    ref("");
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
    const streams = ref([]);
    const { API_URL, IMAGE_URL } = useRuntimeConfig().public;
    const seoTitle = computed(() => "RacingStation Stream");
    const seoDescription = computed(() => "Watch live streaming of your favorite sports events with RacingStation Stream");
    const seoImage = computed(() => `${IMAGE_URL.startsWith("http") ? IMAGE_URL : `https://${IMAGE_URL}`}/public/img/racingstation-stream.png`);
    useSeoMeta({
      title: seoTitle,
      // Judul dinamis untuk tab browser
      ogTitle: "RacingStation Stream",
      // Judul statis untuk share link
      description: seoDescription,
      // Deskripsi dinamis
      ogDescription: "Watch live streaming of your favorite events.",
      // Deskripsi statis untuk share link
      ogImage: seoImage,
      // Gambar untuk share link
      twitterTitle: "RacingStation Stream",
      // Judul statis untuk Twitter card
      twitterDescription: "Watch live streaming of your favorite sports events with RacingStation Stream",
      // Deskripsi statis untuk Twitter card
      twitterCard: "summary_large_image"
      // Format card Twitter
    });
    const filteredStreams = computed(() => {
      const query = searchQuery.value.trim().toLowerCase();
      if (!query)
        return sortedStreams.value;
      return sortedStreams.value.filter((stream) => {
        var _a;
        const titleMatch = stream.title.toLowerCase().includes(query);
        const categoryMatch = ((_a = stream.category) == null ? void 0 : _a.toLowerCase().includes(query)) || false;
        return titleMatch || categoryMatch;
      });
    });
    const sortedStreams = computed(() => {
      return streams.value.slice().sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
      });
    });
    const currentPage = ref(1);
    const totalPages = computed(() => {
      return Math.ceil(filteredStreams.value.length / streamsPerPage);
    });
    watch(searchQuery, (newVal) => {
      if (newVal.trim()) {
        currentPage.value = 1;
      }
    });
    const paginatedStreams = computed(() => {
      const start = (currentPage.value - 1) * streamsPerPage;
      const end = start + streamsPerPage;
      return filteredStreams.value.slice(start, end);
    });
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
      if (showOverlay.value) {
        _push(`<div class="clickable-overlay"></div>`);
      } else {
        _push(`<!---->`);
      }
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
      _push(`<main><div class="adsterra-container"><div id="container-f7102c30eb715e25f6e3bf755bfbe92c"></div></div>`);
      if (currentView.value === "Latest News") {
        _push(`<div class="articles-section"><div class="stream-header"><h2 class="font-sans font-normal">Live Sports</h2>`);
        if (!isMobile.value) {
          _push(`<div class="search-container"><form class="search-form"><input type="search"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search live streams..." class="search-input" aria-label="Search streams"><button type="submit" class="search-button">`);
          _push(ssrRenderComponent(unref(SearchIcon), { class: "search-icon" }, null, _parent));
          _push(`</button></form></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="mobile-search-icon" style="${ssrRenderStyle(isMobile.value ? null : { display: "none" })}">`);
        _push(ssrRenderComponent(unref(SearchIcon), { class: "search-icon" }, null, _parent));
        _push(`</button></div>`);
        if (isMobile.value) {
          _push(`<div class="${ssrRenderClass([{ "mobile-search-active": isSearchVisible.value }, "search-container mobile-search"])}"><form class="search-form"><input type="search"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search live streams..." class="search-input" aria-label="Search streams"><button type="submit" class="search-button">`);
          _push(ssrRenderComponent(unref(SearchIcon), { class: "search-icon" }, null, _parent));
          _push(`</button></form></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="stream-grid"><!--[-->`);
        ssrRenderList(paginatedStreams.value, (stream) => {
          _push(`<article class="stream-card"><div class="stream-image-container">`);
          if (stream.image_path) {
            _push(`<img${ssrRenderAttr("src", stream.image_path)}${ssrRenderAttr("alt", stream.title)} class="stream-image">`);
          } else {
            _push(`<p>Image not available</p>`);
          }
          _push(`</div><div class="stream-content"><span class="stream-category">${ssrInterpolate(stream.category)}</span><h3>${ssrInterpolate(stream.title)}</h3><p>${ssrInterpolate(stream.excerpt)}</p><div class="stream-footer"><span class="read-more"> Watch stream `);
          _push(ssrRenderComponent(unref(ArrowRightIcon), null, null, _parent));
          _push(`</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
        if (totalPages.value > 1) {
          _push(`<div class="pagination"><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-button">`);
          _push(ssrRenderComponent(unref(ChevronLeftIcon), null, null, _parent));
          _push(`</button><span class="pagination-info">Page ${ssrInterpolate(currentPage.value)} of ${ssrInterpolate(totalPages.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-button">`);
          _push(ssrRenderComponent(unref(ChevronRightIcon), null, null, _parent));
          _push(`</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="adsterra-container"></div></main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=stream-CKLFhJ0R.mjs.map
