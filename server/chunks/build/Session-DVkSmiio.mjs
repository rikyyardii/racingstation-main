import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as _export_sfc, c as useRouter, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { F as Footer } from './Footer-09VditFc.mjs';
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-f310a31d><header data-v-f310a31d><div class="header-content" data-v-f310a31d><h1 class="logo" data-v-f310a31d><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-f310a31d> Dashboard </h1><div class="header-controls" data-v-f310a31d><button class="icon-button" data-v-f310a31d>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-f310a31d>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-f310a31d><ul data-v-f310a31d><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-f310a31d><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-f310a31d>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-f310a31d><div class="mobile-nav-content" data-v-f310a31d><button class="icon-button close-menu" data-v-f310a31d>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-f310a31d><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-f310a31d><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-f310a31d>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-f310a31d><h2 class="black-text" data-v-f310a31d>Session Management</h2>`);
      if (sessionsList.value.length === 0) {
        _push(`<div class="debug-info" data-v-f310a31d><p data-v-f310a31d>Loading sessions... Total: ${ssrInterpolate(sessionsList.value.length)}</p><p data-v-f310a31d>API URL: ${ssrInterpolate(unref(API_URL))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="table-controls" data-v-f310a31d><div class="left-controls" data-v-f310a31d><div class="dropdown" data-v-f310a31d><button class="new-btn dropdown-toggle" data-v-f310a31d> Setup `);
      _push(ssrRenderComponent(unref(ChevronDownIcon), {
        class: ["dropdown-icon", { "rotate-180": isDropdownOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      if (isDropdownOpen.value) {
        _push(`<div class="dropdown-menu" data-v-f310a31d><button class="dropdown-item" data-v-f310a31d>`);
        _push(ssrRenderComponent(unref(PlusIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` New Session </button><button class="dropdown-item" data-v-f310a31d>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Livestream </button><button class="dropdown-item" data-v-f310a31d>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Categories </button><button class="dropdown-item" data-v-f310a31d>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Session </button><button class="dropdown-item" data-v-f310a31d>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Sosmed </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="search-box" data-v-f310a31d><label data-v-f310a31d>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-f310a31d></div></div><div class="table-container" data-v-f310a31d><table class="data-table" data-v-f310a31d><thead data-v-f310a31d><tr data-v-f310a31d><th data-v-f310a31d>ID</th><th data-v-f310a31d>Session Name</th><th data-v-f310a31d>Category</th><th data-v-f310a31d>Order</th><th data-v-f310a31d>Action</th></tr></thead><tbody data-v-f310a31d>`);
      if (displayedSessions.value.length === 0) {
        _push(`<tr data-v-f310a31d><td colspan="5" style="${ssrRenderStyle({ "text-align": "center", "padding": "20px" })}" data-v-f310a31d>${ssrInterpolate(sessionsList.value.length === 0 ? "Loading sessions..." : "No sessions found")}</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(displayedSessions.value, (item) => {
        _push(`<tr data-v-f310a31d><td data-v-f310a31d>${ssrInterpolate(item.id)}</td><td data-v-f310a31d>${ssrInterpolate(item.session_name || item.name || "N/A")}</td><td data-v-f310a31d>${ssrInterpolate(item.category_description || "N/A")}</td><td data-v-f310a31d>${ssrInterpolate(item.session_order || item.order || "N/A")}</td><td class="action-buttons" data-v-f310a31d><button class="edit-btn" data-v-f310a31d>Edit</button><button class="delete-btn" data-v-f310a31d>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-f310a31d><div class="entries-info" data-v-f310a31d>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-f310a31d><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-f310a31d>Previous</button><span class="page-number" data-v-f310a31d>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-f310a31d>Next</button></div></div></div>`);
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
const Session = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f310a31d"]]);

export { Session as default };
//# sourceMappingURL=Session-DVkSmiio.mjs.map
