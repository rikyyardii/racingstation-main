import { mergeProps, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
import { b as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-B1WKmCGa.mjs';
import '@unhead/shared';
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

const _sfc_main = {
  data() {
    return {
      stream: {
        image: null,
        title: "",
        category: "",
        event: "",
        excerpt: "",
        link: "",
        link2: "",
        link3: "",
        link4: "",
        content: "",
        scheduled_enable_time: null,
        scheduled_disable_time: null
      }
    };
  },
  setup() {
    const router = useRouter();
    useSeoMeta({
      title: "Tambah Data Stream",
      ogTitle: "Tambah Data Stream"
    });
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
          category: this.stream.category,
          event: this.stream.event,
          excerpt: this.stream.excerpt,
          link: this.stream.link,
          link2: this.stream.link2,
          link3: this.stream.link3,
          link4: this.stream.link4,
          content: this.stream.content,
          scheduled_enable_time: this.stream.scheduled_enable_time,
          scheduled_disable_time: this.stream.scheduled_disable_time,
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
        category: "",
        excerpt: "",
        link: "",
        link2: "",
        link3: "",
        link4: "",
        content: "",
        status: ""
      };
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-26304148><header data-v-26304148><header data-v-26304148><div class="header-content" data-v-26304148><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-26304148><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-26304148> Dashboard </h1></div></header></header><div class="dashboard" data-v-26304148><h1 class="black-text" data-v-26304148>Add Live stream</h1><div class="form-container" data-v-26304148><form data-v-26304148><div class="form-group" data-v-26304148><label for="image" data-v-26304148>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-26304148></div><div class="form-group" data-v-26304148><label for="title" data-v-26304148>Title</label><input type="text" id="title"${ssrRenderAttr("value", $data.stream.title)} required data-v-26304148></div><div class="form-group" data-v-26304148><label for="category" data-v-26304148>Category:</label><select id="category" required data-v-26304148><option value="Motorsport" data-v-26304148${ssrIncludeBooleanAttr(Array.isArray($data.stream.category) ? ssrLooseContain($data.stream.category, "Motorsport") : ssrLooseEqual($data.stream.category, "Motorsport")) ? " selected" : ""}>Motorsport</option><option value="Football" data-v-26304148${ssrIncludeBooleanAttr(Array.isArray($data.stream.category) ? ssrLooseContain($data.stream.category, "Football") : ssrLooseEqual($data.stream.category, "Football")) ? " selected" : ""}>Football</option><option value="Basketball" data-v-26304148${ssrIncludeBooleanAttr(Array.isArray($data.stream.category) ? ssrLooseContain($data.stream.category, "Basketball") : ssrLooseEqual($data.stream.category, "Basketball")) ? " selected" : ""}>Basketball</option></select></div><div class="form-group" data-v-26304148><label for="title" data-v-26304148>Live Event</label><input type="text" id="event"${ssrRenderAttr("value", $data.stream.event)} required data-v-26304148></div><div class="form-group" data-v-26304148><label for="excerpt" data-v-26304148>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $data.stream.excerpt)} required data-v-26304148></div><div class="form-group" data-v-26304148><label for="link" data-v-26304148>Link 1</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link)} required data-v-26304148></div><div class="form-group" data-v-26304148><label for="link" data-v-26304148>Link 2</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link2)} data-v-26304148></div><div class="form-group" data-v-26304148><label for="link" data-v-26304148>Link 3</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link3)} data-v-26304148></div><div class="form-group" data-v-26304148><label for="link" data-v-26304148>Link 4</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link4)} data-v-26304148></div><div class="form-group" data-v-26304148><label for="content" data-v-26304148>Content</label><textarea id="content" required data-v-26304148>${ssrInterpolate($data.stream.content)}</textarea></div><div class="form-group" data-v-26304148><label for="scheduledEnableTime" data-v-26304148>Jadwal Start Live (opsional)</label><input type="datetime-local" id="scheduledEnableTime"${ssrRenderAttr("value", $data.stream.scheduled_enable_time)} data-v-26304148><small data-v-26304148>Biarkan kosong untuk status disable</small></div><div class="form-group" data-v-26304148><label for="scheduledDisableTime" data-v-26304148>Jadwal End Live (opsional)</label><input type="datetime-local" id="scheduledDisableTime"${ssrRenderAttr("value", $data.stream.scheduled_disable_time)} data-v-26304148><small data-v-26304148>Biarkan kosong untuk status disable</small></div><button type="submit" data-v-26304148>Submit Stream</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_livestream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_livestream = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-26304148"]]);

export { add_livestream as default };
//# sourceMappingURL=add_livestream-dOaaV3xt.mjs.map
