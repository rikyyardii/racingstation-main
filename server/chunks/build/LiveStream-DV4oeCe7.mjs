import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as _export_sfc, c as useRouter, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { F as Footer } from './Footer-BlHNH0sG.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ChevronDownIcon, PlusIcon, SettingsIcon } from 'lucide-vue-next';
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
  __name: "LiveStream",
  __ssrInlineRender: true,
  setup(__props) {
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Artikel");
    const menuItems = ["Home", "Logout"];
    useRouter();
    const searchQuery = ref("");
    const currentPage = ref(1);
    const entriesPerPage = ref(5);
    const streams = ref([]);
    const isDropdownOpen = ref(false);
    ref(null);
    const { API_URL } = useRuntimeConfig().public;
    const filteredStreams = computed(() => {
      return streams.value.filter((stream) => {
        const searchTerm = searchQuery.value.toLowerCase();
        return Object.values(stream).some((value) => value.toString().toLowerCase().includes(searchTerm));
      });
    });
    const totalEntries = computed(() => filteredStreams.value.length);
    const totalPages = computed(() => Math.ceil(totalEntries.value / entriesPerPage.value));
    const displayedStreams = computed(() => {
      const start = (currentPage.value - 1) * entriesPerPage.value;
      const end = start + entriesPerPage.value;
      return filteredStreams.value.slice(start, end);
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
    const formatDateTime = (isoString) => {
      if (!isoString)
        return "-";
      const dt = DateTime.fromISO(isoString).setZone("UTC").setZone("Asia/Jakarta");
      return dt.isValid ? dt.toFormat("dd-MM-yyyy HH:mm") : "Invalid Date";
    };
    useSeoMeta({
      title: "Data Streaming",
      ogTitle: "Data Streaming"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-cc2d2e2c><header data-v-cc2d2e2c><div class="header-content" data-v-cc2d2e2c><h1 class="logo" data-v-cc2d2e2c><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-cc2d2e2c> Dashboard </h1><div class="header-controls" data-v-cc2d2e2c><button class="icon-button" data-v-cc2d2e2c>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-cc2d2e2c>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-cc2d2e2c><ul data-v-cc2d2e2c><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-cc2d2e2c><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-cc2d2e2c>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-cc2d2e2c><div class="mobile-nav-content" data-v-cc2d2e2c><button class="icon-button close-menu" data-v-cc2d2e2c>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-cc2d2e2c><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-cc2d2e2c><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-cc2d2e2c>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-cc2d2e2c><h2 class="black-text" data-v-cc2d2e2c>Livestream Management</h2><div class="table-controls" data-v-cc2d2e2c><div class="left-controls" data-v-cc2d2e2c><div class="dropdown" data-v-cc2d2e2c><button class="new-btn dropdown-toggle" data-v-cc2d2e2c> Setup `);
      _push(ssrRenderComponent(unref(ChevronDownIcon), {
        class: ["dropdown-icon", { "rotate-180": isDropdownOpen.value }]
      }, null, _parent));
      _push(`</button>`);
      if (isDropdownOpen.value) {
        _push(`<div class="dropdown-menu" data-v-cc2d2e2c><button class="dropdown-item" data-v-cc2d2e2c>`);
        _push(ssrRenderComponent(unref(PlusIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` New Stream </button><button class="dropdown-item" data-v-cc2d2e2c>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Livestream </button><button class="dropdown-item" data-v-cc2d2e2c>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Categories </button><button class="dropdown-item" data-v-cc2d2e2c>`);
        _push(ssrRenderComponent(unref(SettingsIcon), { class: "dropdown-item-icon" }, null, _parent));
        _push(` Session </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="search-box" data-v-cc2d2e2c><label data-v-cc2d2e2c>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-cc2d2e2c></div></div><div class="table-container" data-v-cc2d2e2c><table class="data-table" data-v-cc2d2e2c><thead data-v-cc2d2e2c><tr data-v-cc2d2e2c><th data-v-cc2d2e2c>Title</th><th data-v-cc2d2e2c>Event</th><th data-v-cc2d2e2c>Start Live</th><th data-v-cc2d2e2c>End Live</th><th data-v-cc2d2e2c>Status</th><th data-v-cc2d2e2c>Action</th></tr></thead><tbody data-v-cc2d2e2c><!--[-->`);
      ssrRenderList(displayedStreams.value, (stream) => {
        _push(`<tr data-v-cc2d2e2c><td data-v-cc2d2e2c>${ssrInterpolate(stream.title)}</td><td data-v-cc2d2e2c>${ssrInterpolate(stream.event)}</td><td data-v-cc2d2e2c>${ssrInterpolate(formatDateTime(stream.scheduled_enable_time))}</td><td data-v-cc2d2e2c>${ssrInterpolate(formatDateTime(stream.scheduled_disable_time))}</td><td data-v-cc2d2e2c>${ssrInterpolate(stream.status)}</td><td class="action-buttons" data-v-cc2d2e2c><button class="edit-btn" data-v-cc2d2e2c>Edit</button><button class="delete-btn" data-v-cc2d2e2c>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-cc2d2e2c><div class="entries-info" data-v-cc2d2e2c>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-cc2d2e2c><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-cc2d2e2c>Previous</button><span class="page-number" data-v-cc2d2e2c>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-cc2d2e2c>Next</button></div></div></div>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/LiveStream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LiveStream = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc2d2e2c"]]);

export { LiveStream as default };
//# sourceMappingURL=LiveStream-DV4oeCe7.mjs.map
