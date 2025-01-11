import { ref, mergeProps, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-B1WKmCGa.mjs';
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

const _sfc_main = {
  setup() {
    const article = ref({
      id: null,
      category: "",
      title: "",
      excerpt: "",
      date: "",
      author: "",
      readingTime: "",
      content: "",
      image: null
      // Gambar asli yang ditampilkan
    });
    useRoute();
    const router = useRouter();
    const { API_URL, IMAGE_URL } = useRuntimeConfig().public;
    const submitArticle = async () => {
      if (!article.value.id) {
        alert("ID artikel tidak valid.");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/articles/${article.value.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            category: article.value.category,
            title: article.value.title,
            excerpt: article.value.excerpt,
            date: article.value.date,
            author: article.value.author,
            readingTime: article.value.readingTime,
            content: article.value.content
          })
        });
        const result = await response.json();
        if (response.ok) {
          alert("Artikel berhasil diperbarui!");
          router.push("../components/Home");
        } else {
          alert("Gagal memperbarui artikel: " + result.error);
        }
      } catch (error) {
        console.error("Error updating article:", error);
        alert("Terjadi kesalahan saat memperbarui artikel.");
      }
    };
    return {
      article,
      submitArticle
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-6bab4251><header data-v-6bab4251><div class="header-content" data-v-6bab4251><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-6bab4251><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-6bab4251> Dashboard </h1></div></header><div class="dashboard" data-v-6bab4251><h1 data-v-6bab4251>Edit Articles</h1><div class="form-container" data-v-6bab4251><form data-v-6bab4251><div class="form-group" data-v-6bab4251><label data-v-6bab4251>Current Image:</label>`);
  if ($setup.article.image) {
    _push(`<div data-v-6bab4251><img${ssrRenderAttr("src", $setup.article.image)} alt="Current Article Image" class="current-image" data-v-6bab4251></div>`);
  } else {
    _push(`<div data-v-6bab4251><span data-v-6bab4251>No image available</span></div>`);
  }
  _push(`</div><div class="form-group" data-v-6bab4251><label for="category" data-v-6bab4251>Category:</label><input type="text" id="category"${ssrRenderAttr("value", $setup.article.category)} required data-v-6bab4251></div><div class="form-group" data-v-6bab4251><label for="title" data-v-6bab4251>Title:</label><input type="text" id="title"${ssrRenderAttr("value", $setup.article.title)} required data-v-6bab4251></div><div class="form-group" data-v-6bab4251><label for="excerpt" data-v-6bab4251>Excerpt:</label><input type="text" id="excerpt"${ssrRenderAttr("value", $setup.article.excerpt)} required data-v-6bab4251></div><div class="form-group" data-v-6bab4251><label for="date" data-v-6bab4251>Date:</label><input type="date" id="date"${ssrRenderAttr("value", $setup.article.date)} required data-v-6bab4251></div><div class="form-group" data-v-6bab4251><label for="author" data-v-6bab4251>Author:</label><input type="text" id="author"${ssrRenderAttr("value", $setup.article.author)} required data-v-6bab4251></div><div class="form-group" data-v-6bab4251><label for="readingTime" data-v-6bab4251>Reading Time (min):</label><input type="number" id="readingTime"${ssrRenderAttr("value", $setup.article.readingTime)} required data-v-6bab4251></div><div class="form-group" data-v-6bab4251><label for="content" data-v-6bab4251>Content:</label><textarea id="content" required data-v-6bab4251>${ssrInterpolate($setup.article.content)}</textarea></div><button type="submit" data-v-6bab4251>Update Article</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_artikel/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6bab4251"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BAuCTgx3.mjs.map
