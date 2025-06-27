import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as _export_sfc, c as useRouter, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { F as Footer } from './Footer-BlHNH0sG.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ChevronDownIcon, PlusIcon, SettingsIcon } from 'lucide-vue-next';
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
  __name: "Session",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Data Sessions",
      ogTitle: "Data Sessions"
    });
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Artikel");
    const menuItems = ["Home", "Logout"];
    useRouter();
    const searchQuery = ref("");
    const currentPage = ref(1);
    const entriesPerPage = ref(7);
    const sessionsList = ref([]);
    const isDropdownOpen = ref(false);
    ref(null);
    const { API_URL } = useRuntimeConfig().public;
    const filteredSessions = computed(() => {
      if (!sessionsList.value || sessionsList.value.length === 0) {
        return [];
      }
      const searchTerm = searchQuery.value.toLowerCase();
      if (!searchTerm) {
        return sessionsList.value;
      }
      const filtered = sessionsList.value.filter((item) => {
        return item.session_name && item.session_name.toLowerCase().includes(searchTerm) || item.name && item.name.toLowerCase().includes(searchTerm) || item.category_description && item.category_description.toLowerCase().includes(searchTerm) || item.category_name && item.category_name.toLowerCase().includes(searchTerm) || item.category_id && item.category_id.toString().includes(searchTerm) || item.id && item.id.toString().includes(searchTerm);
      });
      return filtered.sort((a, b) => a.id - b.id);
    });
    const totalEntries = computed(() => filteredSessions.value.length);
    const totalPages = computed(() => Math.ceil(totalEntries.value / entriesPerPage.value));
    const displayedSessions = computed(() => {
      const start = (currentPage.value - 1) * entriesPerPage.value;
      const end = start + entriesPerPage.value;
      return filteredSessions.value.slice(start, end);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-93082fff><header data-v-93082fff><div class="header-content" data-v-93082fff><h1 class="logo" data-v-93082fff><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-93082fff> Dashboard </h1><div class="header-controls" data-v-93082fff><button class="icon-button" data-v-93082fff>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-93082fff>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-93082fff><ul data-v-93082fff><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-93082fff><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-93082fff>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-93082fff><div class="mobile-nav-content" data-v-93082fff><button class="icon-button close-menu" data-v-93082fff>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-93082fff><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-93082fff><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-93082fff>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-93082fff><h2 class="black-text" data-v-93082fff>Session Management</h2>`);
      if (sessionsList.value.length === 0) {
        _push(`<div class="debug-info" data-v-93082fff><p data-v-93082fff>Loading sessions... Total: ${ssrInterpolate(sessionsList.value.length)}</p><p data-v-93082fff>API URL: ${ssrInterpolate(unref(API_URL))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="table-controls" data-v-93082fff><div class="left-controls" data-v-93082fff><div class="dropdown" data-v-93082fff><button class="new-btn dropdown-toggle" data-v-93082fff> Setup `);
      _push(ssrRenderComponent(unref(ChevronDownIcon), {
        class: ["dropdown-icon", { "rotate-180": isDropdownOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      if (isDropdownOpen.value) {
        _push(`<div class="dropdown-menu" data-v-93082fff><button class="dropdown-item" data-v-93082fff>`);
        _push(ssrRenderComponent(unref(PlusIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` New Session </button><button class="dropdown-item" data-v-93082fff>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Livestream </button><button class="dropdown-item" data-v-93082fff>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Categories </button><button class="dropdown-item" data-v-93082fff>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Session </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="search-box" data-v-93082fff><label data-v-93082fff>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-93082fff></div></div><div class="table-container" data-v-93082fff><table class="data-table" data-v-93082fff><thead data-v-93082fff><tr data-v-93082fff><th data-v-93082fff>ID</th><th data-v-93082fff>Session Name</th><th data-v-93082fff>Category</th><th data-v-93082fff>Order</th><th data-v-93082fff>Action</th></tr></thead><tbody data-v-93082fff>`);
      if (displayedSessions.value.length === 0) {
        _push(`<tr data-v-93082fff><td colspan="5" style="${ssrRenderStyle({ "text-align": "center", "padding": "20px" })}" data-v-93082fff>${ssrInterpolate(sessionsList.value.length === 0 ? "Loading sessions..." : "No sessions found")}</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(displayedSessions.value, (item) => {
        _push(`<tr data-v-93082fff><td data-v-93082fff>${ssrInterpolate(item.id)}</td><td data-v-93082fff>${ssrInterpolate(item.session_name || item.name || "N/A")}</td><td data-v-93082fff>${ssrInterpolate(item.category_description || "N/A")}</td><td data-v-93082fff>${ssrInterpolate(item.session_order || item.order || "N/A")}</td><td class="action-buttons" data-v-93082fff><button class="edit-btn" data-v-93082fff>Edit</button><button class="delete-btn" data-v-93082fff>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-93082fff><div class="entries-info" data-v-93082fff>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-93082fff><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-93082fff>Previous</button><span class="page-number" data-v-93082fff>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-93082fff>Next</button></div></div></div>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/Session.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Session = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93082fff"]]);

export { Session as default };
//# sourceMappingURL=Session-CuWjCJO8.mjs.map
