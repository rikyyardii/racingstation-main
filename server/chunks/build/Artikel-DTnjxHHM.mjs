import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { c as _export_sfc, a as useRouter, u as useRuntimeConfig } from './server.mjs';
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
  __name: "Artikel",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const searchQuery = ref("");
    const currentPage = ref(1);
    const entriesPerPage = ref(5);
    const articles = ref([]);
    useRuntimeConfig().public;
    const filteredArticles = computed(() => {
      return articles.value.filter((article) => {
        const searchTerm = searchQuery.value.toLowerCase();
        return Object.values(article).some((value) => value.toString().toLowerCase().includes(searchTerm));
      });
    });
    const totalEntries = computed(() => filteredArticles.value.length);
    const totalPages = computed(() => Math.ceil(totalEntries.value / entriesPerPage.value));
    const displayedArticles = computed(() => {
      const start = (currentPage.value - 1) * entriesPerPage.value;
      const end = start + entriesPerPage.value;
      return filteredArticles.value.slice(start, end);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-73697e58><h2 class="black-text" data-v-73697e58>Article Management</h2><div class="table-controls" data-v-73697e58><div class="left-controls" data-v-73697e58><button class="new-btn" data-v-73697e58><span class="plus-icon" data-v-73697e58>+</span> New</button></div><div class="right-controls" data-v-73697e58><div class="search-box" data-v-73697e58><label data-v-73697e58>Search:</label><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="search-input" data-v-73697e58></div></div></div><div class="table-container" data-v-73697e58><table class="data-table" data-v-73697e58><thead data-v-73697e58><tr data-v-73697e58><th data-v-73697e58>ID</th><th data-v-73697e58>Title</th><th data-v-73697e58>Author</th><th data-v-73697e58>Action</th></tr></thead><tbody data-v-73697e58><!--[-->`);
      ssrRenderList(displayedArticles.value, (article) => {
        _push(`<tr data-v-73697e58><td data-v-73697e58>${ssrInterpolate(article.id)}</td><td data-v-73697e58>${ssrInterpolate(article.title)}</td><td data-v-73697e58>${ssrInterpolate(article.author)}</td><td class="action-buttons" data-v-73697e58><button class="edit-btn" data-v-73697e58>Edit</button><button class="delete-btn" data-v-73697e58>Delete</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="table-footer" data-v-73697e58><div class="entries-info" data-v-73697e58>Showing ${ssrInterpolate(startEntry.value)} to ${ssrInterpolate(endEntry.value)} of ${ssrInterpolate(totalEntries.value)} entries</div><div class="pagination" data-v-73697e58><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-btn" data-v-73697e58>Previous</button><span class="page-number" data-v-73697e58>${ssrInterpolate(currentPage.value)}</span><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-btn" data-v-73697e58>Next</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/Artikel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Artikel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-73697e58"]]);

export { Artikel as default };
//# sourceMappingURL=Artikel-DTnjxHHM.mjs.map
