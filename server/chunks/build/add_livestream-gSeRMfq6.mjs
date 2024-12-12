import { mergeProps, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
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
  data() {
    return {
      stream: {
        image: null,
        title: "",
        excerpt: "",
        link: "",
        content: ""
      }
    };
  },
  setup() {
    const router = useRouter();
    const navigateToArtikel = () => {
      router.push("/Artikel");
    };
    return {
      navigateToArtikel,
      router
    };
  },
  methods: {
    async handleImageUpload(event) {
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
            this.stream.image = result.imagePath;
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
    async submitStream() {
      const getDynamicHost = () => {
        const url = new URL((void 0).location.href);
        url.port = "5000";
        return url.origin;
      };
      const host = getDynamicHost();
      try {
        const payload = {
          title: this.stream.title,
          excerpt: this.stream.excerpt,
          link: this.stream.link,
          content: this.stream.content,
          imagePath: this.stream.image
          // Include the image path
        };
        const response = await fetch(`${host}/api/streams`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log("Response status:", response.status);
        console.log("Result:", result);
        if (response.ok) {
          alert("Stream submitted successfully!");
          this.resetForm();
          this.$router.push("Home");
        } else {
          console.error("Error submitting stream:", result.error || result.message);
          alert("Error submitting stream: " + (result.error || result.message));
        }
      } catch (error) {
        console.error("Error submitting stream:", error);
        alert("Error submitting stream.");
      }
    },
    resetForm() {
      this.stream = {
        image: null,
        title: "",
        excerpt: "",
        link: "",
        content: ""
      };
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-45ed1731><header data-v-45ed1731><header data-v-45ed1731><div class="header-content" data-v-45ed1731><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-45ed1731><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-45ed1731> Dashboard </h1></div></header></header><div class="dashboard" data-v-45ed1731><h1 class="black-text" data-v-45ed1731>Manage Livestream</h1><div class="form-container" data-v-45ed1731><form data-v-45ed1731><div class="form-group" data-v-45ed1731><label for="image" data-v-45ed1731>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-45ed1731></div><div class="form-group" data-v-45ed1731><label for="title" data-v-45ed1731>Title:</label><input type="text" id="title"${ssrRenderAttr("value", $data.stream.title)} required data-v-45ed1731></div><div class="form-group" data-v-45ed1731><label for="excerpt" data-v-45ed1731>Excerpt:</label><input type="text" id="excerpt"${ssrRenderAttr("value", $data.stream.excerpt)} required data-v-45ed1731></div><div class="form-group" data-v-45ed1731><label for="link" data-v-45ed1731>Link:</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link)} required data-v-45ed1731></div><div class="form-group" data-v-45ed1731><label for="content" data-v-45ed1731>Content:</label><textarea id="content" required data-v-45ed1731>${ssrInterpolate($data.stream.content)}</textarea></div><button type="submit" data-v-45ed1731>Submit Stream</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_livestream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_livestream = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-45ed1731"]]);

export { add_livestream as default };
//# sourceMappingURL=add_livestream-gSeRMfq6.mjs.map
