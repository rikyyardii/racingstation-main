import { mergeProps, ref, reactive, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { b as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const eventCategories = ref([]);
    const stream = reactive({
      image: null,
      title: "",
      category: "",
      event: "",
      event_type: "",
      excerpt: "",
      link: "",
      link2: "",
      link3: "",
      link4: "",
      content: "",
      scheduled_enable_time: null,
      scheduled_disable_time: null
    });
    useSeoMeta({
      title: "Tambah Data Stream",
      ogTitle: "Tambah Data Stream"
    });
    const navigateToArtikel = () => {
      router.push("/rikya/components/Livestream");
    };
    return {
      stream,
      eventCategories,
      navigateToArtikel,
      router,
      API_URL
    };
  },
  methods: {
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === "image/png") {
        const formData = new FormData();
        formData.append("image", file);
        try {
          const response = await fetch(`${this.API_URL}/upload-image`, {
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
      try {
        const payload = {
          title: this.stream.title,
          category: this.stream.category,
          event: this.stream.event,
          event_type: this.stream.event_type || null,
          // Pastikan null jika kosong
          excerpt: this.stream.excerpt,
          link: this.stream.link,
          link2: this.stream.link2 || null,
          // Pastikan null jika kosong
          link3: this.stream.link3 || null,
          // Pastikan null jika kosong
          link4: this.stream.link4 || null,
          // Pastikan null jika kosong
          content: this.stream.content,
          session_name: null,
          // Tambahkan field yang missing
          scheduled_enable_time: this.stream.scheduled_enable_time || null,
          scheduled_disable_time: this.stream.scheduled_disable_time || null,
          image_path: this.stream.image || null
          // Ubah dari imagePath ke image_path
        };
        console.log("Payload being sent:", payload);
        const response = await fetch(`${this.API_URL}/streams`, {
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
          this.router.push("/rikya/components/Livestream");
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
        event: "",
        event_type: "",
        excerpt: "",
        link: "",
        link2: "",
        link3: "",
        link4: "",
        content: "",
        scheduled_enable_time: null,
        scheduled_disable_time: null
      };
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-a988e482><header data-v-a988e482><header data-v-a988e482><div class="header-content" data-v-a988e482><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-a988e482><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-a988e482> Dashboard </h1></div></header></header><div class="dashboard" data-v-a988e482><h1 class="black-text" data-v-a988e482>Add Live stream</h1><div class="form-container" data-v-a988e482><form data-v-a988e482><div class="form-group" data-v-a988e482><label for="image" data-v-a988e482>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-a988e482></div><div class="form-group" data-v-a988e482><label for="title" data-v-a988e482>Title</label><input type="text" id="title"${ssrRenderAttr("value", $setup.stream.title)} required data-v-a988e482></div><div class="form-group" data-v-a988e482><label for="category" data-v-a988e482>Category</label><select id="category" required data-v-a988e482><option value="Motorsport" data-v-a988e482${ssrIncludeBooleanAttr(Array.isArray($setup.stream.category) ? ssrLooseContain($setup.stream.category, "Motorsport") : ssrLooseEqual($setup.stream.category, "Motorsport")) ? " selected" : ""}>Motorsport</option><option value="Football" data-v-a988e482${ssrIncludeBooleanAttr(Array.isArray($setup.stream.category) ? ssrLooseContain($setup.stream.category, "Football") : ssrLooseEqual($setup.stream.category, "Football")) ? " selected" : ""}>Football</option><option value="Basketball" data-v-a988e482${ssrIncludeBooleanAttr(Array.isArray($setup.stream.category) ? ssrLooseContain($setup.stream.category, "Basketball") : ssrLooseEqual($setup.stream.category, "Basketball")) ? " selected" : ""}>Basketball</option><option value="Other" data-v-a988e482${ssrIncludeBooleanAttr(Array.isArray($setup.stream.category) ? ssrLooseContain($setup.stream.category, "Other") : ssrLooseEqual($setup.stream.category, "Other")) ? " selected" : ""}>Other</option></select></div><div class="form-group" data-v-a988e482><label for="title" data-v-a988e482>Live Event</label><input type="text" id="event"${ssrRenderAttr("value", $setup.stream.event)} required data-v-a988e482></div><div class="form-group" data-v-a988e482><label for="event_type" data-v-a988e482>Tipe Race Week</label><select id="event_type" data-v-a988e482><!--[-->`);
  ssrRenderList($setup.eventCategories, (category) => {
    _push(`<option${ssrRenderAttr("value", category.event_type_description)} data-v-a988e482${ssrIncludeBooleanAttr(Array.isArray($setup.stream.event_type) ? ssrLooseContain($setup.stream.event_type, category.event_type_description) : ssrLooseEqual($setup.stream.event_type, category.event_type_description)) ? " selected" : ""}>${ssrInterpolate(category.name.toUpperCase())} - ${ssrInterpolate(category.description)}</option>`);
  });
  _push(`<!--]--></select></div><div class="form-group" data-v-a988e482><label for="excerpt" data-v-a988e482>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $setup.stream.excerpt)} required data-v-a988e482></div><div class="form-group" data-v-a988e482><label for="link" data-v-a988e482>Link 1</label><input type="text" id="link"${ssrRenderAttr("value", $setup.stream.link)} required data-v-a988e482></div><div class="form-group" data-v-a988e482><label for="link2" data-v-a988e482>Link 2</label><input type="text" id="link2"${ssrRenderAttr("value", $setup.stream.link2)} data-v-a988e482></div><div class="form-group" data-v-a988e482><label for="link3" data-v-a988e482>Link 3</label><input type="text" id="link3"${ssrRenderAttr("value", $setup.stream.link3)} data-v-a988e482></div><div class="form-group" data-v-a988e482><label for="link4" data-v-a988e482>Link 4</label><input type="text" id="link4"${ssrRenderAttr("value", $setup.stream.link4)} data-v-a988e482></div><div class="form-group" data-v-a988e482><label for="content" data-v-a988e482>Content</label><textarea id="content" required data-v-a988e482>${ssrInterpolate($setup.stream.content)}</textarea></div><div class="form-group" data-v-a988e482><label for="scheduledEnableTime" data-v-a988e482>Jadwal Start Live (opsional)</label><input type="datetime-local" id="scheduledEnableTime"${ssrRenderAttr("value", $setup.stream.scheduled_enable_time)} data-v-a988e482><small data-v-a988e482>Biarkan kosong untuk status disable</small></div><div class="form-group" data-v-a988e482><label for="scheduledDisableTime" data-v-a988e482>Jadwal End Live (opsional)</label><input type="datetime-local" id="scheduledDisableTime"${ssrRenderAttr("value", $setup.stream.scheduled_disable_time)} data-v-a988e482><small data-v-a988e482>Biarkan kosong untuk status disable</small></div><div class="buttons-container" data-v-a988e482><button type="submit" class="action-btn update-btn" data-v-a988e482>Submit Stream</button><button type="button" class="action-btn cancel-btn" data-v-a988e482>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_livestream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_livestream = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a988e482"]]);

export { add_livestream as default };
//# sourceMappingURL=add_livestream-DRfxF8zK.mjs.map
