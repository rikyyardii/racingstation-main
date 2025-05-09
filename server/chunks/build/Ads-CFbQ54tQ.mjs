import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as _export_sfc, c as useRouter, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { F as Footer } from './Footer-Dg4gkY7h.mjs';
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
    const { API_URL } = useRuntimeConfig().public;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-5e2de6c2><header data-v-5e2de6c2><div class="header-content" data-v-5e2de6c2><h1 class="logo" data-v-5e2de6c2><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-5e2de6c2> Dashboard </h1><div class="header-controls" data-v-5e2de6c2><button class="icon-button" data-v-5e2de6c2>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-5e2de6c2>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-5e2de6c2><ul data-v-5e2de6c2><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-5e2de6c2><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-5e2de6c2>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-5e2de6c2><div class="mobile-nav-content" data-v-5e2de6c2><button class="icon-button close-menu" data-v-5e2de6c2>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-5e2de6c2><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-5e2de6c2><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-5e2de6c2>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-5e2de6c2><h2 class="black-text" data-v-5e2de6c2>Ads Management</h2><p style="${ssrRenderStyle({ "color": "red", "font-size": "0.9em", "margin-top": "-10px" })}" data-v-5e2de6c2>**Pastikan Status Selalu Enable Ketika Race Week/Match</p><div class="table-controls" data-v-5e2de6c2><div class="left-controls" data-v-5e2de6c2><button class="new-btn-ads" data-v-5e2de6c2><span class="plus-icon" data-v-5e2de6c2>+</span>New</button></div></div><div class="table-container" data-v-5e2de6c2><table class="data-table" data-v-5e2de6c2><thead data-v-5e2de6c2><tr data-v-5e2de6c2><th data-v-5e2de6c2>Nama</th><th data-v-5e2de6c2>Status</th><th data-v-5e2de6c2>Link</th><th data-v-5e2de6c2>Action</th></tr></thead><tbody data-v-5e2de6c2><!--[-->`);
      ssrRenderList(displayedAdslink.value, (item) => {
        _push(`<tr data-v-5e2de6c2><td data-v-5e2de6c2>${ssrInterpolate(item.name)}</td><td data-v-5e2de6c2>${ssrInterpolate(item.status)}</td><td data-v-5e2de6c2>${ssrInterpolate(item.adslink)}</td><td class="action-buttons" data-v-5e2de6c2><button class="edit-btn" data-v-5e2de6c2>Edit</button><button class="delete-btn" data-v-5e2de6c2>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-5e2de6c2><div class="entries-info" data-v-5e2de6c2>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-5e2de6c2><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-5e2de6c2>Previous</button><span class="page-number" data-v-5e2de6c2>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-5e2de6c2>Next</button></div></div></div>`);
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
const Ads = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5e2de6c2"]]);

export { Ads as default };
//# sourceMappingURL=Ads-CFbQ54tQ.mjs.map
