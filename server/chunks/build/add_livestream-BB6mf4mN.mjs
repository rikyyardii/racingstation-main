import { mergeProps, useSSRContext } from 'vue';
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
      stream: {
        image: null,
        title: "",
        event: "",
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
      const { API_URL } = useRuntimeConfig().public;
      try {
        const payload = {
          title: this.stream.title,
          event: this.stream.event,
          excerpt: this.stream.excerpt,
          link: this.stream.link,
          content: this.stream.content,
          imagePath: this.stream.image
          // Sertakan path gambar
        };
        const response = await fetch(`${API_URL}/streams`, {
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
          this.router.push("Home");
          this.resetForm();
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-76d541ea><header data-v-76d541ea><header data-v-76d541ea><div class="header-content" data-v-76d541ea><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-76d541ea><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-76d541ea> Dashboard </h1></div></header></header><div class="dashboard" data-v-76d541ea><h1 class="black-text" data-v-76d541ea>Manage Livestream</h1><div class="form-container" data-v-76d541ea><form data-v-76d541ea><div class="form-group" data-v-76d541ea><label for="image" data-v-76d541ea>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-76d541ea></div><div class="form-group" data-v-76d541ea><label for="title" data-v-76d541ea>Title</label><input type="text" id="title"${ssrRenderAttr("value", $data.stream.title)} required data-v-76d541ea></div><div class="form-group" data-v-76d541ea><label for="title" data-v-76d541ea>Live Event</label><input type="text" id="event"${ssrRenderAttr("value", $data.stream.event)} required data-v-76d541ea></div><div class="form-group" data-v-76d541ea><label for="excerpt" data-v-76d541ea>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $data.stream.excerpt)} required data-v-76d541ea></div><div class="form-group" data-v-76d541ea><label for="link" data-v-76d541ea>Link</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link)} required data-v-76d541ea></div><div class="form-group" data-v-76d541ea><label for="content" data-v-76d541ea>Content</label><textarea id="content" required data-v-76d541ea>${ssrInterpolate($data.stream.content)}</textarea></div><button type="submit" data-v-76d541ea>Submit Stream</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_livestream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_livestream = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-76d541ea"]]);

export { add_livestream as default };
//# sourceMappingURL=add_livestream-BB6mf4mN.mjs.map