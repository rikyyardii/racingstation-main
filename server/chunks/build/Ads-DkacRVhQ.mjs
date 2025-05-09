import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as _export_sfc, c as useRouter, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { F as Footer } from './Footer-CY3A-4y_.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-vue-next';
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
import 'vue-router';

const _sfc_main = {
  __name: "Ads",
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
    const adslinkList = ref([]);
    useRuntimeConfig().public;
    const filteredAdslink = computed(() => {
      return adslinkList.value.filter((item) => {
        const searchTerm = searchQuery.value.toLowerCase();
        return item.name.toLowerCase().includes(searchTerm) || item.adslink.toLowerCase().includes(searchTerm);
      });
    });
    const totalEntries = computed(() => filteredAdslink.value.length);
    const totalPages = computed(() => Math.ceil(totalEntries.value / entriesPerPage.value));
    const displayedAdslink = computed(() => {
      const start = (currentPage.value - 1) * entriesPerPage.value;
      const end = start + entriesPerPage.value;
      return filteredAdslink.value.slice(start, end);
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
    watch(searchQuery, () => {
      currentPage.value = 1;
    });
    watch(entriesPerPage, () => {
      currentPage.value = 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-bd0d6f54><header data-v-bd0d6f54><div class="header-content" data-v-bd0d6f54><h1 class="logo" data-v-bd0d6f54><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-bd0d6f54> Dashboard </h1><div class="header-controls" data-v-bd0d6f54><button class="icon-button" data-v-bd0d6f54>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-bd0d6f54>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-bd0d6f54><ul data-v-bd0d6f54><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-bd0d6f54><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-bd0d6f54>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-bd0d6f54><div class="mobile-nav-content" data-v-bd0d6f54><button class="icon-button close-menu" data-v-bd0d6f54>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-bd0d6f54><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-bd0d6f54><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-bd0d6f54>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-bd0d6f54><h2 class="black-text" data-v-bd0d6f54>Ads Management</h2><div class="table-controls" data-v-bd0d6f54><div class="left-controls" data-v-bd0d6f54><button class="new-btn" data-v-bd0d6f54><span class="plus-icon" data-v-bd0d6f54>+</span>New</button></div><div class="right-controls" data-v-bd0d6f54><div class="search-box" data-v-bd0d6f54><label data-v-bd0d6f54>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-bd0d6f54></div></div></div><div class="table-container" data-v-bd0d6f54><table class="data-table" data-v-bd0d6f54><thead data-v-bd0d6f54><tr data-v-bd0d6f54><th data-v-bd0d6f54>ID</th><th data-v-bd0d6f54>Nama</th><th data-v-bd0d6f54>Link</th><th data-v-bd0d6f54>Action</th></tr></thead><tbody data-v-bd0d6f54><!--[-->`);
      ssrRenderList(displayedAdslink.value, (item) => {
        _push(`<tr data-v-bd0d6f54><td data-v-bd0d6f54>${ssrInterpolate(item.id)}</td><td data-v-bd0d6f54>${ssrInterpolate(item.name)}</td><td data-v-bd0d6f54>${ssrInterpolate(item.adslink)}</td><td class="action-buttons" data-v-bd0d6f54><button class="edit-btn" data-v-bd0d6f54>Edit</button><button class="delete-btn" data-v-bd0d6f54>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-bd0d6f54><div class="entries-info" data-v-bd0d6f54>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-bd0d6f54><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-bd0d6f54>Previous</button><span class="page-number" data-v-bd0d6f54>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-bd0d6f54>Next</button></div></div></div>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/Ads.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Ads = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd0d6f54"]]);

export { Ads as default };
//# sourceMappingURL=Ads-DkacRVhQ.mjs.map
