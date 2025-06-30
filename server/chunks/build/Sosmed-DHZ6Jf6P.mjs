import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "Sosmed",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Data Sosmed",
      ogTitle: "Data Sosmed"
    });
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Artikel");
    const menuItems = ["Home", "Logout"];
    useRouter();
    const searchQuery = ref("");
    const currentPage = ref(1);
    const entriesPerPage = ref(7);
    const sosmedList = ref([]);
    const isDropdownOpen = ref(false);
    ref(null);
    const { API_URL } = useRuntimeConfig().public;
    const filteredSosmed = computed(() => {
      if (!sosmedList.value || sosmedList.value.length === 0) {
        return [];
      }
      return sosmedList.value.filter((item) => {
        const searchTerm = searchQuery.value.toLowerCase();
        return item.name && item.name.toLowerCase().includes(searchTerm) || item.description && item.description.toLowerCase().includes(searchTerm);
      });
    });
    const totalEntries = computed(() => filteredSosmed.value.length);
    const totalPages = computed(() => Math.ceil(totalEntries.value / entriesPerPage.value));
    const displayedSosmed = computed(() => {
      const start = (currentPage.value - 1) * entriesPerPage.value;
      const end = start + entriesPerPage.value;
      return filteredSosmed.value.slice(start, end);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-dc1cd9da><header data-v-dc1cd9da><div class="header-content" data-v-dc1cd9da><h1 class="logo" data-v-dc1cd9da><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-dc1cd9da> Dashboard </h1><div class="header-controls" data-v-dc1cd9da><button class="icon-button" data-v-dc1cd9da>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-dc1cd9da>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-dc1cd9da><ul data-v-dc1cd9da><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-dc1cd9da><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-dc1cd9da>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-dc1cd9da><div class="mobile-nav-content" data-v-dc1cd9da><button class="icon-button close-menu" data-v-dc1cd9da>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-dc1cd9da><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-dc1cd9da><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-dc1cd9da>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-dc1cd9da><h2 class="black-text" data-v-dc1cd9da>Sosmed Management</h2><div class="table-controls" data-v-dc1cd9da><div class="left-controls" data-v-dc1cd9da><div class="dropdown" data-v-dc1cd9da><button class="new-btn dropdown-toggle" data-v-dc1cd9da> Setup `);
      _push(ssrRenderComponent(unref(ChevronDownIcon), {
        class: ["dropdown-icon", { "rotate-180": isDropdownOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      if (isDropdownOpen.value) {
        _push(`<div class="dropdown-menu" data-v-dc1cd9da><button class="dropdown-item" data-v-dc1cd9da>`);
        _push(ssrRenderComponent(unref(PlusIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` New Sosmed </button><button class="dropdown-item" data-v-dc1cd9da>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Livestream </button><button class="dropdown-item" data-v-dc1cd9da>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Categories </button><button class="dropdown-item" data-v-dc1cd9da>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Session </button><button class="dropdown-item" data-v-dc1cd9da>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Sosmed </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="search-box" data-v-dc1cd9da><label data-v-dc1cd9da>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-dc1cd9da></div></div><div class="table-container" data-v-dc1cd9da><table class="data-table" data-v-dc1cd9da><thead data-v-dc1cd9da><tr data-v-dc1cd9da><th data-v-dc1cd9da>Sosmed</th><th data-v-dc1cd9da>Link</th><th data-v-dc1cd9da>Action</th></tr></thead><tbody data-v-dc1cd9da><!--[-->`);
      ssrRenderList(displayedSosmed.value, (item) => {
        _push(`<tr data-v-dc1cd9da><td data-v-dc1cd9da>${ssrInterpolate(item.name)}</td><td data-v-dc1cd9da>${ssrInterpolate(item.link || "N/A")}</td><td class="action-buttons" data-v-dc1cd9da><button class="edit-btn" data-v-dc1cd9da>Edit</button><button class="delete-btn" data-v-dc1cd9da>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-dc1cd9da><div class="entries-info" data-v-dc1cd9da>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-dc1cd9da><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-dc1cd9da>Previous</button><span class="page-number" data-v-dc1cd9da>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-dc1cd9da>Next</button></div></div></div>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/Sosmed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Sosmed = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dc1cd9da"]]);

export { Sosmed as default };
//# sourceMappingURL=Sosmed-DHZ6Jf6P.mjs.map
