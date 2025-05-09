import { mergeProps, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
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
        session_name: "",
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
      router.push("/rikya/components/Livestream");
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
          session_name: this.stream.session_name,
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
        excerpt: "",
        link: "",
        link2: "",
        link3: "",
        link4: "",
        content: "",
        session_name: "",
        status: ""
      };
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-99fad16e><header data-v-99fad16e><header data-v-99fad16e><div class="header-content" data-v-99fad16e><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-99fad16e><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-99fad16e> Dashboard </h1></div></header></header><div class="dashboard" data-v-99fad16e><h1 class="black-text" data-v-99fad16e>Add Live stream</h1><div class="form-container" data-v-99fad16e><form data-v-99fad16e><div class="form-group" data-v-99fad16e><label for="image" data-v-99fad16e>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-99fad16e></div><div class="form-group" data-v-99fad16e><label for="title" data-v-99fad16e>Title</label><input type="text" id="title"${ssrRenderAttr("value", $data.stream.title)} required data-v-99fad16e></div><div class="form-group" data-v-99fad16e><label for="category" data-v-99fad16e>Category:</label><select id="category" required data-v-99fad16e><option value="Motorsport" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.category) ? ssrLooseContain($data.stream.category, "Motorsport") : ssrLooseEqual($data.stream.category, "Motorsport")) ? " selected" : ""}>Motorsport</option><option value="Football" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.category) ? ssrLooseContain($data.stream.category, "Football") : ssrLooseEqual($data.stream.category, "Football")) ? " selected" : ""}>Football</option><option value="Basketball" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.category) ? ssrLooseContain($data.stream.category, "Basketball") : ssrLooseEqual($data.stream.category, "Basketball")) ? " selected" : ""}>Basketball</option></select></div><div class="form-group" data-v-99fad16e><label for="title" data-v-99fad16e>Live Event</label><input type="text" id="event"${ssrRenderAttr("value", $data.stream.event)} required data-v-99fad16e></div><div class="form-group" data-v-99fad16e><label for="excerpt" data-v-99fad16e>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $data.stream.excerpt)} required data-v-99fad16e></div><div class="form-group" data-v-99fad16e><label for="link" data-v-99fad16e>Link 1</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link)} required data-v-99fad16e></div><div class="form-group" data-v-99fad16e><label for="link" data-v-99fad16e>Link 2</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link2)} data-v-99fad16e></div><div class="form-group" data-v-99fad16e><label for="link" data-v-99fad16e>Link 3</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link3)} data-v-99fad16e></div><div class="form-group" data-v-99fad16e><label for="link" data-v-99fad16e>Link 4</label><input type="text" id="link"${ssrRenderAttr("value", $data.stream.link4)} data-v-99fad16e></div><div class="form-group" data-v-99fad16e><label for="session_name" data-v-99fad16e>Pilih sesi</label><select id="session_name" required data-v-99fad16e><option value="Free Practice 1 F1" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Free Practice 1 F1") : ssrLooseEqual($data.stream.session_name, "Free Practice 1 F1")) ? " selected" : ""}>FP1 (F1)</option><option value="Free Practice 2 F1" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Free Practice 2 F1") : ssrLooseEqual($data.stream.session_name, "Free Practice 2 F1")) ? " selected" : ""}>FP2 (F1)</option><option value="Free Practice 3 F1" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Free Practice 3 F1") : ssrLooseEqual($data.stream.session_name, "Free Practice 3 F1")) ? " selected" : ""}>FP3 (F1)</option><option value="Qualifying F1" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Qualifying F1") : ssrLooseEqual($data.stream.session_name, "Qualifying F1")) ? " selected" : ""}>Qualifying (F1)</option><option value="Spint Race F1" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Spint Race F1") : ssrLooseEqual($data.stream.session_name, "Spint Race F1")) ? " selected" : ""}>Sprint (F1)</option><option value="Race F1" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Race F1") : ssrLooseEqual($data.stream.session_name, "Race F1")) ? " selected" : ""}>Race (F1)</option><option value="Free Practice 1 MotoGP" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Free Practice 1 MotoGP") : ssrLooseEqual($data.stream.session_name, "Free Practice 1 MotoGP")) ? " selected" : ""}>FP3 (MotoGP)</option><option value="Practice MotoGP" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Practice MotoGP") : ssrLooseEqual($data.stream.session_name, "Practice MotoGP")) ? " selected" : ""}>Practice (MotoGP)</option><option value="Free Practice 2 MotoGP" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Free Practice 2 MotoGP") : ssrLooseEqual($data.stream.session_name, "Free Practice 2 MotoGP")) ? " selected" : ""}>FP2 (MotoGP)</option><option value="Qualifying MotoGP" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Qualifying MotoGP") : ssrLooseEqual($data.stream.session_name, "Qualifying MotoGP")) ? " selected" : ""}>Qualifying (MotoGP)</option><option value="Spint Race MotoGP" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Spint Race MotoGP") : ssrLooseEqual($data.stream.session_name, "Spint Race MotoGP")) ? " selected" : ""}>Sprint (MotoGP)</option><option value="Race MotoGP" data-v-99fad16e${ssrIncludeBooleanAttr(Array.isArray($data.stream.session_name) ? ssrLooseContain($data.stream.session_name, "Race MotoGP") : ssrLooseEqual($data.stream.session_name, "Race MotoGP")) ? " selected" : ""}>Race (MotoGP)</option></select></div><div class="form-group" data-v-99fad16e><label for="content" data-v-99fad16e>Content</label><textarea id="content" required data-v-99fad16e>${ssrInterpolate($data.stream.content)}</textarea></div><div class="form-group" data-v-99fad16e><label for="scheduledEnableTime" data-v-99fad16e>Jadwal Start Live (opsional)</label><input type="datetime-local" id="scheduledEnableTime"${ssrRenderAttr("value", $data.stream.scheduled_enable_time)} data-v-99fad16e><small data-v-99fad16e>Biarkan kosong untuk status disable</small></div><div class="form-group" data-v-99fad16e><label for="scheduledDisableTime" data-v-99fad16e>Jadwal End Live (opsional)</label><input type="datetime-local" id="scheduledDisableTime"${ssrRenderAttr("value", $data.stream.scheduled_disable_time)} data-v-99fad16e><small data-v-99fad16e>Biarkan kosong untuk status disable</small></div><div class="buttons-container" data-v-99fad16e><button type="submit" class="action-btn update-btn" data-v-99fad16e>Submit Stream</button><button type="button" class="action-btn cancel-btn" data-v-99fad16e>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_livestream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_livestream = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-99fad16e"]]);

export { add_livestream as default };
//# sourceMappingURL=add_livestream.vue.mjs.map
