import { ref, resolveComponent, mergeProps, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
    const router = useRouter();
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Home");
    const menuItems = ["Home", "Artikel", "Live Stream", "Logout"];
    const article = ref({
      image: null,
      category: "",
      title: "",
      excerpt: "",
      date: "",
      author: "",
      readingTime: "",
      content: ""
    });
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
    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (file && file.type === "image/png") {
        const formData = new FormData();
        formData.append("image", file);
        const host = `${(void 0).location.origin.replace((void 0).location.port, "5000")}`;
        try {
          const response = await fetch(`${host}/api/upload-image`, {
            method: "POST",
            body: formData
          });
          const result = await response.json();
          if (result.success) {
            article.value.image = result.imagePath;
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
    };
    const submitArticle = async () => {
      const getDynamicHost = () => {
        const url = new URL((void 0).location.href);
        url.port = "5000";
        return url.origin;
      };
      const host = getDynamicHost();
      try {
        const response = await fetch(`${host}/api/articles`, {
          method: "POST",
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
            content: article.value.content,
            imagePath: article.value.image
            // Include the image path
          })
        });
        const result = await response.json();
        if (response.ok) {
          alert("Article submitted successfully!");
          router.push("Home");
          resetForm();
        } else {
          alert("Error submitting article: " + result.error);
        }
      } catch (error) {
        console.error("Error submitting article:", error);
        alert("Error submitting article.");
      }
    };
    const resetForm = () => {
      article.value = {
        image: null,
        category: "",
        title: "",
        excerpt: "",
        date: "",
        author: "",
        readingTime: "",
        content: ""
      };
    };
    return {
      isMenuOpen,
      isDarkMode,
      currentView,
      menuItems,
      article,
      navigateToArtikel,
      toggleDarkMode,
      toggleMenu,
      selectView,
      handleImageUpload,
      submitArticle,
      resetForm,
      router
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SunIcon = resolveComponent("SunIcon");
  const _component_MoonIcon = resolveComponent("MoonIcon");
  const _component_MenuIcon = resolveComponent("MenuIcon");
  const _component_XIcon = resolveComponent("XIcon");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-2eabaf9d><header data-v-2eabaf9d><header data-v-2eabaf9d><div class="header-content" data-v-2eabaf9d><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-2eabaf9d><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-2eabaf9d> Dashboard </h1><div class="header-controls" data-v-2eabaf9d><button class="icon-button" data-v-2eabaf9d>`);
  if ($setup.isDarkMode) {
    _push(ssrRenderComponent(_component_SunIcon, null, null, _parent));
  } else {
    _push(ssrRenderComponent(_component_MoonIcon, null, null, _parent));
  }
  _push(`</button><button class="icon-button menu-toggle" data-v-2eabaf9d>`);
  if (!$setup.isMenuOpen) {
    _push(ssrRenderComponent(_component_MenuIcon, null, null, _parent));
  } else {
    _push(ssrRenderComponent(_component_XIcon, null, null, _parent));
  }
  _push(`</button><nav class="desktop-nav" data-v-2eabaf9d><ul data-v-2eabaf9d><!--[-->`);
  ssrRenderList($setup.menuItems, (item) => {
    _push(`<li data-v-2eabaf9d><a href="#" class="${ssrRenderClass({ active: $setup.currentView === item })}" data-v-2eabaf9d>${ssrInterpolate(item)}</a></li>`);
  });
  _push(`<!--]--></ul></nav></div></div></header></header><div class="dashboard" data-v-2eabaf9d><h1 data-v-2eabaf9d>Add Articles</h1><div class="form-container" data-v-2eabaf9d><form data-v-2eabaf9d><div class="form-group" data-v-2eabaf9d><label for="image" data-v-2eabaf9d>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-2eabaf9d></div><div class="form-group" data-v-2eabaf9d><label for="category" data-v-2eabaf9d>Category:</label><input type="text" id="category"${ssrRenderAttr("value", $setup.article.category)} required data-v-2eabaf9d></div><div class="form-group" data-v-2eabaf9d><label for="title" data-v-2eabaf9d>Title:</label><input type="text" id="title"${ssrRenderAttr("value", $setup.article.title)} required data-v-2eabaf9d></div><div class="form-group" data-v-2eabaf9d><label for="title" data-v-2eabaf9d>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $setup.article.excerpt)} required data-v-2eabaf9d></div><div class="form-group" data-v-2eabaf9d><label for="date" data-v-2eabaf9d>Date:</label><input type="date" id="date"${ssrRenderAttr("value", $setup.article.date)} required data-v-2eabaf9d></div><div class="form-group" data-v-2eabaf9d><label for="author" data-v-2eabaf9d>Author:</label><input type="text" id="author"${ssrRenderAttr("value", $setup.article.author)} required data-v-2eabaf9d></div><div class="form-group" data-v-2eabaf9d><label for="readingTime" data-v-2eabaf9d>Reading Time (min):</label><input type="number" id="readingTime"${ssrRenderAttr("value", $setup.article.readingTime)} required data-v-2eabaf9d></div><div class="form-group" data-v-2eabaf9d><label for="content" data-v-2eabaf9d>Content:</label><textarea id="content" required data-v-2eabaf9d>${ssrInterpolate($setup.article.content)}</textarea></div><button type="submit" data-v-2eabaf9d>Submit Article</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_artikel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_artikel = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2eabaf9d"]]);

export { add_artikel as default };
//# sourceMappingURL=add_artikel-DWCtTjxc.mjs.map
