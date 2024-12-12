import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRouter } from './server.mjs';
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
    const getDynamicHost = () => {
      const url = new URL((void 0).location.href);
      url.port = "5000";
      return url.origin;
    };
    getDynamicHost();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-650e15bc><h2 class="black-text" data-v-650e15bc>Livestream Management</h2><div class="table-controls" data-v-650e15bc><div class="left-controls" data-v-650e15bc><button class="new-btn" data-v-650e15bc><span class="plus-icon" data-v-650e15bc>+</span> New</button></div><div class="right-controls" data-v-650e15bc><div class="search-box" data-v-650e15bc><label data-v-650e15bc>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-650e15bc></div></div></div><div class="table-container" data-v-650e15bc><table class="data-table" data-v-650e15bc><thead data-v-650e15bc><tr data-v-650e15bc><th data-v-650e15bc>ID</th><th data-v-650e15bc>Title</th><th data-v-650e15bc>Excerpt</th><th data-v-650e15bc>Status</th><th data-v-650e15bc>Action</th></tr></thead><tbody data-v-650e15bc><!--[-->`);
      ssrRenderList(displayedStreams.value, (stream) => {
        _push(`<tr data-v-650e15bc><td data-v-650e15bc>${ssrInterpolate(stream.id)}</td><td data-v-650e15bc>${ssrInterpolate(stream.title)}</td><td data-v-650e15bc>${ssrInterpolate(stream.excerpt)}</td><td data-v-650e15bc>${ssrInterpolate(stream.status)}</td><td class="action-buttons" data-v-650e15bc><button class="edit-btn" data-v-650e15bc>Edit</button><button class="delete-btn" data-v-650e15bc>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-650e15bc><div class="entries-info" data-v-650e15bc>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-650e15bc><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-650e15bc>Previous</button><span class="page-number" data-v-650e15bc>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-650e15bc>Next</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/LiveStream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LiveStream = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-650e15bc"]]);

export { LiveStream as default };
//# sourceMappingURL=LiveStream-C7_pDPfM.mjs.map
