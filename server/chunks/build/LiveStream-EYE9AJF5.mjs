import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { c as _export_sfc, b as useRouter, u as useRuntimeConfig } from './server.mjs';
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-d0368052><h2 class="black-text" data-v-d0368052>Livestream Management</h2><div class="table-controls" data-v-d0368052><div class="left-controls" data-v-d0368052><button class="new-btn" data-v-d0368052><span class="plus-icon" data-v-d0368052>+</span> New</button></div><div class="right-controls" data-v-d0368052><div class="search-box" data-v-d0368052><label data-v-d0368052>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-d0368052></div></div></div><div class="table-container" data-v-d0368052><table class="data-table" data-v-d0368052><thead data-v-d0368052><tr data-v-d0368052><th data-v-d0368052>ID</th><th data-v-d0368052>Title</th><th data-v-d0368052>Event</th><th data-v-d0368052>Status</th><th data-v-d0368052>Action</th></tr></thead><tbody data-v-d0368052><!--[-->`);
      ssrRenderList(displayedStreams.value, (stream) => {
        _push(`<tr data-v-d0368052><td data-v-d0368052>${ssrInterpolate(stream.id)}</td><td data-v-d0368052>${ssrInterpolate(stream.title)}</td><td data-v-d0368052>${ssrInterpolate(stream.event)}</td><td data-v-d0368052>${ssrInterpolate(stream.status)}</td><td class="action-buttons" data-v-d0368052><button class="edit-btn" data-v-d0368052>Edit</button><button class="delete-btn" data-v-d0368052>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-d0368052><div class="entries-info" data-v-d0368052>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-d0368052><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-d0368052>Previous</button><span class="page-number" data-v-d0368052>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-d0368052>Next</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/LiveStream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LiveStream = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d0368052"]]);

export { LiveStream as default };
//# sourceMappingURL=LiveStream-EYE9AJF5.mjs.map
