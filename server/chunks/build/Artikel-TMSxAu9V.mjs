import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as _export_sfc, c as useRouter, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { F as Footer } from './Footer-BlHNH0sG.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-vue-next';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
import { DateTime } from 'luxon';
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
import 'vue-router';

const _sfc_main = {
  __name: "Artikel",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Data Artikel",
      ogTitle: "Data Artikel"
    });
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Artikel");
    const menuItems = ["Home", "Logout"];
    useRouter();
    const searchQuery = ref("");
    const currentPage = ref(1);
    const entriesPerPage = ref(7);
    const articles = ref([]);
    const { API_URL } = useRuntimeConfig().public;
    const filteredArticles = computed(() => {
      return articles.value.filter((article) => {
        const searchTerm = searchQuery.value.toLowerCase();
        return Object.values(article).some((value) => value.toString().toLowerCase().includes(searchTerm));
      });
    });
    const totalEntries = computed(() => filteredArticles.value.length);
    const totalPages = computed(() => Math.ceil(totalEntries.value / entriesPerPage.value));
    const displayedArticles = computed(() => {
      const start = (currentPage.value - 1) * entriesPerPage.value;
      const end = start + entriesPerPage.value;
      return filteredArticles.value.slice(start, end);
    });
    const startEntry = computed(() => {
      if (totalEntries.value === 0)
        return 0;
      return (currentPage.value - 1) * entriesPerPage.value + 1;
    });
    const endEntry = computed(() => {
      const end = currentPage.value * entriesPerPage.value;
      return end > totalEntries.value ? totalEntries.value : end;
    });
    const formatDate = (dateString) => {
      return DateTime.fromISO(dateString).setZone("Asia/Jakarta").toFormat("yyyy-MM-dd HH:mm:ss");
    };
    watch(searchQuery, () => {
      currentPage.value = 1;
    });
    watch(entriesPerPage, () => {
      currentPage.value = 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-1b67234a><header data-v-1b67234a><div class="header-content" data-v-1b67234a><h1 class="logo" data-v-1b67234a><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-1b67234a> Dashboard </h1><div class="header-controls" data-v-1b67234a><button class="icon-button" data-v-1b67234a>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-1b67234a>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-1b67234a><ul data-v-1b67234a><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-1b67234a><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-1b67234a>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-1b67234a><div class="mobile-nav-content" data-v-1b67234a><button class="icon-button close-menu" data-v-1b67234a>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-1b67234a><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-1b67234a><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-1b67234a>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-1b67234a><h2 class="black-text" data-v-1b67234a>Article Management</h2><div class="table-controls" data-v-1b67234a><div class="left-controls" data-v-1b67234a><button class="new-btn" data-v-1b67234a><span class="plus-icon" data-v-1b67234a>+</span> New</button></div><div class="search-box" data-v-1b67234a><label data-v-1b67234a>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-1b67234a></div></div><div class="table-container" data-v-1b67234a><table class="data-table" data-v-1b67234a><thead data-v-1b67234a><tr data-v-1b67234a><th data-v-1b67234a>ID</th><th data-v-1b67234a>Title</th><th data-v-1b67234a>Date</th><th data-v-1b67234a>Action</th></tr></thead><tbody data-v-1b67234a><!--[-->`);
      ssrRenderList(displayedArticles.value, (article) => {
        _push(`<tr data-v-1b67234a><td data-v-1b67234a>${ssrInterpolate(article.id)}</td><td data-v-1b67234a>${ssrInterpolate(article.title)}</td><td data-v-1b67234a>${ssrInterpolate(formatDate(article.date))}</td><td class="action-buttons" data-v-1b67234a><button class="edit-btn" data-v-1b67234a>Edit</button><button class="delete-btn" data-v-1b67234a>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-1b67234a><div class="entries-info" data-v-1b67234a>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-1b67234a><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-1b67234a>Previous</button><span class="page-number" data-v-1b67234a>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-1b67234a>Next</button></div></div></div>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/Artikel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Artikel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1b67234a"]]);

export { Artikel as default };
//# sourceMappingURL=Artikel-TMSxAu9V.mjs.map
