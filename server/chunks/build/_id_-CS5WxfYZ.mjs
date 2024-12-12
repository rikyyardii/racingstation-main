import { ref, mergeProps, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-B1WKmCGa.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
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
    const getDynamicHost = () => {
      const url = new URL((void 0).location.href);
      url.port = "5000";
      return url.origin;
    };
    const submitArticle = async () => {
      if (!article.value.id) {
        alert("ID artikel tidak valid.");
        return;
      }
      try {
        const response = await fetch(`${getDynamicHost()}/api/articles/${article.value.id}`, {
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-37c04ccf><header data-v-37c04ccf><div class="header-content" data-v-37c04ccf><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-37c04ccf><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-37c04ccf> Dashboard </h1></div></header><div class="dashboard" data-v-37c04ccf><h1 data-v-37c04ccf>Edit Articles</h1><div class="form-container" data-v-37c04ccf><form data-v-37c04ccf><div class="form-group" data-v-37c04ccf><label data-v-37c04ccf>Current Image:</label>`);
  if ($setup.article.image) {
    _push(`<div data-v-37c04ccf><img${ssrRenderAttr("src", $setup.article.image)} alt="Current Article Image" class="current-image" data-v-37c04ccf></div>`);
  } else {
    _push(`<div data-v-37c04ccf><span data-v-37c04ccf>No image available</span></div>`);
  }
  _push(`</div><div class="form-group" data-v-37c04ccf><label for="category" data-v-37c04ccf>Category:</label><input type="text" id="category"${ssrRenderAttr("value", $setup.article.category)} required data-v-37c04ccf></div><div class="form-group" data-v-37c04ccf><label for="title" data-v-37c04ccf>Title:</label><input type="text" id="title"${ssrRenderAttr("value", $setup.article.title)} required data-v-37c04ccf></div><div class="form-group" data-v-37c04ccf><label for="excerpt" data-v-37c04ccf>Excerpt:</label><input type="text" id="excerpt"${ssrRenderAttr("value", $setup.article.excerpt)} required data-v-37c04ccf></div><div class="form-group" data-v-37c04ccf><label for="date" data-v-37c04ccf>Date:</label><input type="date" id="date"${ssrRenderAttr("value", $setup.article.date)} required data-v-37c04ccf></div><div class="form-group" data-v-37c04ccf><label for="author" data-v-37c04ccf>Author:</label><input type="text" id="author"${ssrRenderAttr("value", $setup.article.author)} required data-v-37c04ccf></div><div class="form-group" data-v-37c04ccf><label for="readingTime" data-v-37c04ccf>Reading Time (min):</label><input type="number" id="readingTime"${ssrRenderAttr("value", $setup.article.readingTime)} required data-v-37c04ccf></div><div class="form-group" data-v-37c04ccf><label for="content" data-v-37c04ccf>Content:</label><textarea id="content" required data-v-37c04ccf>${ssrInterpolate($setup.article.content)}</textarea></div><button type="submit" data-v-37c04ccf>Update Article</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_artikel/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-37c04ccf"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CS5WxfYZ.mjs.map
