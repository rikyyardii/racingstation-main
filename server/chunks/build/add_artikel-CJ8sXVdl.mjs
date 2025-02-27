import { ref, mergeProps, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { c as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
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
  watch: {
    "article.content": {
      handler(newContent) {
        this.calculateReadingTime(newContent);
      },
      immediate: true
    }
  },
  methods: {
    calculateReadingTime(content) {
      const wordsPerMinute = 200;
      const wordCount = content.trim().split(/\s+/).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      this.article.readingTime = minutes > 0 ? minutes : 0;
    },
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-f753946a><header data-v-f753946a><header data-v-f753946a><div class="header-content" data-v-f753946a><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-f753946a><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-f753946a> Dashboard </h1></div></header></header><div class="dashboard" data-v-f753946a><h1 data-v-f753946a>Add Articles</h1><div class="form-container" data-v-f753946a><form data-v-f753946a><div class="form-group" data-v-f753946a><label for="image" data-v-f753946a>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-f753946a></div><div class="form-group" data-v-f753946a><label for="category" data-v-f753946a>Category:</label><select id="category" required data-v-f753946a><option value="Formula 1" data-v-f753946a${ssrIncludeBooleanAttr(Array.isArray($data.article.category) ? ssrLooseContain($data.article.category, "Formula 1") : ssrLooseEqual($data.article.category, "Formula 1")) ? " selected" : ""}>Formula 1</option><option value="MotoGP" data-v-f753946a${ssrIncludeBooleanAttr(Array.isArray($data.article.category) ? ssrLooseContain($data.article.category, "MotoGP") : ssrLooseEqual($data.article.category, "MotoGP")) ? " selected" : ""}>MotoGP</option><option value="WEC" data-v-f753946a${ssrIncludeBooleanAttr(Array.isArray($data.article.category) ? ssrLooseContain($data.article.category, "WEC") : ssrLooseEqual($data.article.category, "WEC")) ? " selected" : ""}>WEC</option><option value="WRC" data-v-f753946a${ssrIncludeBooleanAttr(Array.isArray($data.article.category) ? ssrLooseContain($data.article.category, "WRC") : ssrLooseEqual($data.article.category, "WRC")) ? " selected" : ""}>WRC</option></select></div><div class="form-group" data-v-f753946a><label for="title" data-v-f753946a>Title:</label><input type="text" id="title"${ssrRenderAttr("value", $data.article.title)} required data-v-f753946a></div><div class="form-group" data-v-f753946a><label for="title" data-v-f753946a>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $data.article.excerpt)} required data-v-f753946a></div><div class="form-group" data-v-f753946a><label for="date" data-v-f753946a>Date:</label><input type="datetime-local" id="date"${ssrRenderAttr("value", $data.article.date)} required data-v-f753946a></div><div class="form-group" data-v-f753946a><label for="author" data-v-f753946a>Author:</label><input type="text" id="author"${ssrRenderAttr("value", $data.article.author)} required data-v-f753946a></div><div class="form-group" data-v-f753946a><label for="content" data-v-f753946a>Content:</label><textarea id="content" required data-v-f753946a>${ssrInterpolate($data.article.content)}</textarea></div><div class="form-group" data-v-f753946a><label for="readingTime" data-v-f753946a>Reading Time (min):</label><input type="number" id="readingTime"${ssrRenderAttr("value", $data.article.readingTime)} required disabled data-v-f753946a></div><button type="submit" data-v-f753946a>Submit Article</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_artikel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_artikel = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f753946a"]]);

export { add_artikel as default };
//# sourceMappingURL=add_artikel-CJ8sXVdl.mjs.map
