import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { c as _export_sfc, b as useRouter, u as useRuntimeConfig } from './server.mjs';
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
    useRouter();
    const searchQuery = ref("");
    const currentPage = ref(1);
    const entriesPerPage = ref(5);
    const streams = ref([]);
    useRuntimeConfig().public;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-a6844067><h2 class="black-text" data-v-a6844067>Livestream Management</h2><div class="table-controls" data-v-a6844067><div class="left-controls" data-v-a6844067><button class="new-btn" data-v-a6844067><span class="plus-icon" data-v-a6844067>+</span> New</button></div><div class="right-controls" data-v-a6844067><div class="search-box" data-v-a6844067><label data-v-a6844067>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-a6844067></div></div></div><div class="table-container" data-v-a6844067><table class="data-table" data-v-a6844067><thead data-v-a6844067><tr data-v-a6844067><th data-v-a6844067>Title</th><th data-v-a6844067>Event</th><th data-v-a6844067>Start Live</th><th data-v-a6844067>End Live</th><th data-v-a6844067>Status</th><th data-v-a6844067>Action</th></tr></thead><tbody data-v-a6844067><!--[-->`);
      ssrRenderList(displayedStreams.value, (stream) => {
        _push(`<tr data-v-a6844067><td data-v-a6844067>${ssrInterpolate(stream.title)}</td><td data-v-a6844067>${ssrInterpolate(stream.event)}</td><td data-v-a6844067>${ssrInterpolate(formatDateTime(stream.scheduled_enable_time))}</td><td data-v-a6844067>${ssrInterpolate(formatDateTime(stream.scheduled_disable_time))}</td><td data-v-a6844067>${ssrInterpolate(stream.status)}</td><td class="action-buttons" data-v-a6844067><button class="edit-btn" data-v-a6844067>Edit</button><button class="delete-btn" data-v-a6844067>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-a6844067><div class="entries-info" data-v-a6844067>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-a6844067><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-a6844067>Previous</button><span class="page-number" data-v-a6844067>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-a6844067>Next</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/LiveStream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LiveStream = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a6844067"]]);

export { LiveStream as default };
//# sourceMappingURL=LiveStream-DZLZfEIy.mjs.map
