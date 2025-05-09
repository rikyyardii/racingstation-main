import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc, c as useRouter, u as useRuntimeConfig, a as _imports_0 } from './server.mjs';
import { F as Footer } from './Footer.vue.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-vue-next';
import { u as useSeoMeta } from './v3.mjs';
import { DateTime } from 'luxon';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'devalue';

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
      if (totalEntries.value === 0) return 0;
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
      if (!isoString) return "-";
      const dt = DateTime.fromISO(isoString).setZone("UTC").setZone("Asia/Jakarta");
      return dt.isValid ? dt.toFormat("dd-MM-yyyy HH:mm") : "Invalid Date";
    };
    useSeoMeta({
      title: "Data Streaming",
      ogTitle: "Data Streaming"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-065a6bca><header data-v-065a6bca><div class="header-content" data-v-065a6bca><h1 class="logo" data-v-065a6bca><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-065a6bca> Dashboard </h1><div class="header-controls" data-v-065a6bca><button class="icon-button" data-v-065a6bca>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-065a6bca>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-065a6bca><ul data-v-065a6bca><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-065a6bca><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-065a6bca>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-065a6bca><div class="mobile-nav-content" data-v-065a6bca><button class="icon-button close-menu" data-v-065a6bca>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-065a6bca><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-065a6bca><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-065a6bca>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container" data-v-065a6bca><h2 class="black-text" data-v-065a6bca>Livestream Management</h2><div class="table-controls" data-v-065a6bca><div class="left-controls" data-v-065a6bca><button class="new-btn" data-v-065a6bca><span class="plus-icon" data-v-065a6bca>+</span> New</button></div><div class="search-box" data-v-065a6bca><label data-v-065a6bca>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-065a6bca></div></div><div class="table-container" data-v-065a6bca><table class="data-table" data-v-065a6bca><thead data-v-065a6bca><tr data-v-065a6bca><th data-v-065a6bca>Title</th><th data-v-065a6bca>Event</th><th data-v-065a6bca>Start Live</th><th data-v-065a6bca>End Live</th><th data-v-065a6bca>Status</th><th data-v-065a6bca>Action</th></tr></thead><tbody data-v-065a6bca><!--[-->`);
      ssrRenderList(displayedStreams.value, (stream) => {
        _push(`<tr data-v-065a6bca><td data-v-065a6bca>${ssrInterpolate(stream.title)}</td><td data-v-065a6bca>${ssrInterpolate(stream.event)}</td><td data-v-065a6bca>${ssrInterpolate(formatDateTime(stream.scheduled_enable_time))}</td><td data-v-065a6bca>${ssrInterpolate(formatDateTime(stream.scheduled_disable_time))}</td><td data-v-065a6bca>${ssrInterpolate(stream.status)}</td><td class="action-buttons" data-v-065a6bca><button class="edit-btn" data-v-065a6bca>Edit</button><button class="delete-btn" data-v-065a6bca>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-065a6bca><div class="entries-info" data-v-065a6bca>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-065a6bca><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-065a6bca>Previous</button><span class="page-number" data-v-065a6bca>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-065a6bca>Next</button></div></div></div>`);
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
const LiveStream = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-065a6bca"]]);

export { LiveStream as default };
//# sourceMappingURL=LiveStream.vue.mjs.map
