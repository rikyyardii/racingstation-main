import { ref, mergeProps, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
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
  data() {
    return {
      article: {
        image: null,
        category: "",
        title: "",
        excerpt: "",
        date: "",
        author: "",
        readingTime: "",
        content: ""
      }
    };
  },
  setup() {
    const router = useRouter();
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Home");
    const navigateToArtikel = () => {
      router.push("/Artikel");
    };
    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
    };
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    const selectView = (view) => {
      currentView.value = view;
    };
    return {
      isMenuOpen,
      isDarkMode,
      currentView,
      navigateToArtikel,
      toggleDarkMode,
      toggleMenu,
      selectView,
      router
    };
  },
  methods: {
    async handleImageUpload(event) {
      const { API_URL } = useRuntimeConfig().public;
      const file = event.target.files[0];
      if (!file)
        return;
      if (file.type !== "image/png") {
        alert("Please upload a PNG file.");
        event.target.value = "";
        return;
      }
      if (file.size > 3 * 1024 * 1024) {
        alert("Ukuran file gambar terlalu besar. compress gambar terlebih dahulu");
        event.target.value = "";
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await fetch(`${API_URL}/upload-image`, {
          method: "POST",
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          this.article.image = result.imagePath;
        } else {
          alert(result.message || "Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image.");
      }
    },
    async submitArticle() {
      const { API_URL } = useRuntimeConfig().public;
      try {
        const response = await fetch(`${API_URL}/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            category: this.article.category,
            title: this.article.title,
            excerpt: this.article.excerpt,
            date: this.article.date,
            author: this.article.author,
            readingTime: this.article.readingTime,
            content: this.article.content,
            imagePath: this.article.image
            // Sertakan path gambar
          })
        });
        const result = await response.json();
        if (response.ok) {
          alert("Article submitted successfully!");
          this.router.push("Home");
          this.resetForm();
        } else {
          alert("Error submitting article: " + result.error);
        }
      } catch (error) {
        console.error("Error submitting article:", error);
        alert("Error submitting article.");
      }
    },
    resetForm() {
      this.article = {
        image: null,
        category: "",
        title: "",
        excerpt: "",
        date: "",
        author: "",
        readingTime: "",
        content: ""
      };
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-f2f599d7><header data-v-f2f599d7><header data-v-f2f599d7><div class="header-content" data-v-f2f599d7><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-f2f599d7><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-f2f599d7> Dashboard </h1></div></header></header><div class="dashboard" data-v-f2f599d7><h1 data-v-f2f599d7>Add Articles</h1><div class="form-container" data-v-f2f599d7><form data-v-f2f599d7><div class="form-group" data-v-f2f599d7><label for="image" data-v-f2f599d7>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-f2f599d7></div><div class="form-group" data-v-f2f599d7><label for="category" data-v-f2f599d7>Category:</label><input type="text" id="category"${ssrRenderAttr("value", $data.article.category)} required data-v-f2f599d7></div><div class="form-group" data-v-f2f599d7><label for="title" data-v-f2f599d7>Title:</label><input type="text" id="title"${ssrRenderAttr("value", $data.article.title)} required data-v-f2f599d7></div><div class="form-group" data-v-f2f599d7><label for="title" data-v-f2f599d7>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $data.article.excerpt)} required data-v-f2f599d7></div><div class="form-group" data-v-f2f599d7><label for="date" data-v-f2f599d7>Date:</label><input type="date" id="date"${ssrRenderAttr("value", $data.article.date)} required data-v-f2f599d7></div><div class="form-group" data-v-f2f599d7><label for="author" data-v-f2f599d7>Author:</label><input type="text" id="author"${ssrRenderAttr("value", $data.article.author)} required data-v-f2f599d7></div><div class="form-group" data-v-f2f599d7><label for="readingTime" data-v-f2f599d7>Reading Time (min):</label><input type="number" id="readingTime"${ssrRenderAttr("value", $data.article.readingTime)} required data-v-f2f599d7></div><div class="form-group" data-v-f2f599d7><label for="content" data-v-f2f599d7>Content:</label><textarea id="content" required data-v-f2f599d7>${ssrInterpolate($data.article.content)}</textarea></div><button type="submit" data-v-f2f599d7>Submit Article</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_artikel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_artikel = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f2f599d7"]]);

export { add_artikel as default };
//# sourceMappingURL=add_artikel-C5Ct-afL.mjs.map
