import { mergeProps, ref, watch, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DateTime } from 'luxon';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { u as useSeoMeta } from './v3.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'devalue';

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
    const formatDate = (dateString) => {
      return DateTime.fromISO(dateString).setZone("Asia/Jakarta").toFormat("yyyy-MM-dd");
    };
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      return DateTime.fromISO(dateString).setZone("Asia/Jakarta").toFormat("yyyy-MM-dd'T'HH:mm");
    };
    const { API_URL, IMAGE_URL } = useRuntimeConfig().public;
    const calculateReadingTime = (content) => {
      const wordsPerMinute = 200;
      const trimmedContent = content.trim();
      if (!trimmedContent) {
        article.value.readingTime = 0;
        return;
      }
      const wordCount = trimmedContent.split(/\s+/).length;
      article.value.readingTime = Math.ceil(wordCount / wordsPerMinute);
    };
    const navigateToArtikel = () => {
      router.push("/rikya/components/Artikel");
    };
    watch(
      () => article.value.content,
      (newContent) => {
        calculateReadingTime(newContent);
      },
      { immediate: true }
    );
    const submitArticle = async () => {
      if (!article.value.id) {
        alert("ID artikel tidak valid.");
        return;
      }
      try {
        const utcDate = DateTime.fromISO(article.value.date, { zone: "Asia/Jakarta" }).toUTC().toISO();
        const response = await fetch(`${API_URL}/articles/${article.value.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            category: article.value.category,
            title: article.value.title,
            excerpt: article.value.excerpt,
            date: utcDate,
            author: article.value.author,
            readingTime: article.value.readingTime,
            content: article.value.content
          })
        });
        const result = await response.json();
        if (response.ok) {
          alert("Artikel berhasil diperbarui!");
          router.push("../components/Artikel");
        } else {
          alert("Gagal memperbarui artikel: " + result.error);
        }
      } catch (error) {
        console.error("Error updating article:", error);
        alert("Terjadi kesalahan saat memperbarui artikel.");
      }
    };
    useSeoMeta({
      title: "Edit Artikel",
      ogTitle: "Edit Artikel"
    });
    return {
      article,
      submitArticle,
      formatDate,
      formatDateForInput,
      navigateToArtikel
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-a4da8310><header data-v-a4da8310><div class="header-content" data-v-a4da8310><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-a4da8310><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-a4da8310> Dashboard </h1></div></header><div class="dashboard" data-v-a4da8310><h1 data-v-a4da8310>Edit Articles</h1><div class="form-container" data-v-a4da8310><form data-v-a4da8310><div class="form-group" data-v-a4da8310><label data-v-a4da8310>Current Image:</label>`);
  if ($setup.article.image) {
    _push(`<div data-v-a4da8310><img${ssrRenderAttr("src", $setup.article.image)} alt="Current Article Image" class="current-image" data-v-a4da8310></div>`);
  } else {
    _push(`<div data-v-a4da8310><span data-v-a4da8310>No image available</span></div>`);
  }
  _push(`</div><div class="form-group" data-v-a4da8310><label for="category" data-v-a4da8310>Category:</label><select id="category" required data-v-a4da8310><option value="Formula 1" data-v-a4da8310${ssrIncludeBooleanAttr(Array.isArray($setup.article.category) ? ssrLooseContain($setup.article.category, "Formula 1") : ssrLooseEqual($setup.article.category, "Formula 1")) ? " selected" : ""}>Formula 1</option><option value="MotoGP" data-v-a4da8310${ssrIncludeBooleanAttr(Array.isArray($setup.article.category) ? ssrLooseContain($setup.article.category, "MotoGP") : ssrLooseEqual($setup.article.category, "MotoGP")) ? " selected" : ""}>MotoGP</option><option value="WEC" data-v-a4da8310${ssrIncludeBooleanAttr(Array.isArray($setup.article.category) ? ssrLooseContain($setup.article.category, "WEC") : ssrLooseEqual($setup.article.category, "WEC")) ? " selected" : ""}>WEC</option><option value="WRC" data-v-a4da8310${ssrIncludeBooleanAttr(Array.isArray($setup.article.category) ? ssrLooseContain($setup.article.category, "WRC") : ssrLooseEqual($setup.article.category, "WRC")) ? " selected" : ""}>WRC</option></select></div><div class="form-group" data-v-a4da8310><label for="title" data-v-a4da8310>Title:</label><input type="text" id="title"${ssrRenderAttr("value", $setup.article.title)} required data-v-a4da8310></div><div class="form-group" data-v-a4da8310><label for="excerpt" data-v-a4da8310>Excerpt:</label><input type="text" id="excerpt"${ssrRenderAttr("value", $setup.article.excerpt)} required data-v-a4da8310></div><div class="form-group" data-v-a4da8310><label for="date" data-v-a4da8310>Date:</label><input type="datetime-local" id="date"${ssrRenderAttr("value", $setup.formatDateForInput($setup.article.date))} required data-v-a4da8310></div><div class="form-group" data-v-a4da8310><label for="author" data-v-a4da8310>Author:</label><input type="text" id="author"${ssrRenderAttr("value", $setup.article.author)} required data-v-a4da8310></div><div class="form-group" data-v-a4da8310><label for="content" data-v-a4da8310>Content:</label><textarea id="content" required data-v-a4da8310>${ssrInterpolate($setup.article.content)}</textarea></div><div class="form-group" data-v-a4da8310><label for="readingTime" data-v-a4da8310>Reading Time (min):</label><input type="number" id="readingTime"${ssrRenderAttr("value", $setup.article.readingTime)} required disabled data-v-a4da8310></div><div class="buttons-container" data-v-a4da8310><button type="submit" class="action-btn update-btn" data-v-a4da8310>Update Article</button><button type="button" class="action-btn cancel-btn" data-v-a4da8310>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_artikel/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a4da8310"]]);

export { _id_ as default };
//# sourceMappingURL=_id_.vue5.mjs.map
