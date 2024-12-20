import { ref, resolveComponent, mergeProps, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { _ as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
    const menuItems = ["Home", "Artikel", "Live Stream", "Logout"];
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
      menuItems,
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
      if (file && file.type === "image/png") {
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
            alert("Failed to upload image.");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Error uploading image.");
        }
      } else {
        alert("Please upload a PNG file.");
        event.target.value = "";
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
  const _component_SunIcon = resolveComponent("SunIcon");
  const _component_MoonIcon = resolveComponent("MoonIcon");
  const _component_MenuIcon = resolveComponent("MenuIcon");
  const _component_XIcon = resolveComponent("XIcon");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-8a91f0c0><header data-v-8a91f0c0><header data-v-8a91f0c0><div class="header-content" data-v-8a91f0c0><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-8a91f0c0><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-8a91f0c0> Dashboard </h1><div class="header-controls" data-v-8a91f0c0><button class="icon-button" data-v-8a91f0c0>`);
  if ($setup.isDarkMode) {
    _push(ssrRenderComponent(_component_SunIcon, null, null, _parent));
  } else {
    _push(ssrRenderComponent(_component_MoonIcon, null, null, _parent));
  }
  _push(`</button><button class="icon-button menu-toggle" data-v-8a91f0c0>`);
  if (!$setup.isMenuOpen) {
    _push(ssrRenderComponent(_component_MenuIcon, null, null, _parent));
  } else {
    _push(ssrRenderComponent(_component_XIcon, null, null, _parent));
  }
  _push(`</button><nav class="desktop-nav" data-v-8a91f0c0><ul data-v-8a91f0c0><!--[-->`);
  ssrRenderList($setup.menuItems, (item) => {
    _push(`<li data-v-8a91f0c0><a href="#" class="${ssrRenderClass({ active: $setup.currentView === item })}" data-v-8a91f0c0>${ssrInterpolate(item)}</a></li>`);
  });
  _push(`<!--]--></ul></nav></div></div></header></header><div class="dashboard" data-v-8a91f0c0><h1 data-v-8a91f0c0>Add Articles</h1><div class="form-container" data-v-8a91f0c0><form data-v-8a91f0c0><div class="form-group" data-v-8a91f0c0><label for="image" data-v-8a91f0c0>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-8a91f0c0></div><div class="form-group" data-v-8a91f0c0><label for="category" data-v-8a91f0c0>Category:</label><input type="text" id="category"${ssrRenderAttr("value", $data.article.category)} required data-v-8a91f0c0></div><div class="form-group" data-v-8a91f0c0><label for="title" data-v-8a91f0c0>Title:</label><input type="text" id="title"${ssrRenderAttr("value", $data.article.title)} required data-v-8a91f0c0></div><div class="form-group" data-v-8a91f0c0><label for="title" data-v-8a91f0c0>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $data.article.excerpt)} required data-v-8a91f0c0></div><div class="form-group" data-v-8a91f0c0><label for="date" data-v-8a91f0c0>Date:</label><input type="date" id="date"${ssrRenderAttr("value", $data.article.date)} required data-v-8a91f0c0></div><div class="form-group" data-v-8a91f0c0><label for="author" data-v-8a91f0c0>Author:</label><input type="text" id="author"${ssrRenderAttr("value", $data.article.author)} required data-v-8a91f0c0></div><div class="form-group" data-v-8a91f0c0><label for="readingTime" data-v-8a91f0c0>Reading Time (min):</label><input type="number" id="readingTime"${ssrRenderAttr("value", $data.article.readingTime)} required data-v-8a91f0c0></div><div class="form-group" data-v-8a91f0c0><label for="content" data-v-8a91f0c0>Content:</label><textarea id="content" required data-v-8a91f0c0>${ssrInterpolate($data.article.content)}</textarea></div><button type="submit" data-v-8a91f0c0>Submit Article</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_artikel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_artikel = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8a91f0c0"]]);

export { add_artikel as default };
//# sourceMappingURL=add_artikel-GWDtW4i8.mjs.map
