import { mergeProps, reactive, ref, watch, useSSRContext } from 'vue';
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
    const allSessionOptions = {
      f1: [
        { value: "Free Practice 1 F1", text: "FP1 (F1)" },
        { value: "Free Practice 2 F1", text: "FP2 (F1)" },
        { value: "Free Practice 3 F1", text: "FP3 (F1)" },
        { value: "Qualifying F1", text: "Qualifying (F1)" },
        { value: "Spint Race F1", text: "Sprint (F1)" },
        { value: "Race F1", text: "Race (F1)" }
      ],
      f1Sprint: [
        { value: "Free Practice 1 F1", text: "FP1 (F1)" },
        { value: "Sprint Qualifying F1", text: "Sprint Qualifying (F1)" },
        { value: "Sprint Race F1", text: "Sprint (F1)" },
        { value: "Qualifying F1", text: "Qualifying (F1)" },
        { value: "Race F1", text: "Race (F1)" }
      ],
      motogp: [
        { value: "Free Practice 1 MotoGP", text: "FP1 (MotoGP)" },
        { value: "Practice MotoGP", text: "Practice (MotoGP)" },
        { value: "Free Practice 2 MotoGP", text: "FP2 (MotoGP)" },
        { value: "Qualifying MotoGP", text: "Qualifying (MotoGP)" },
        { value: "Free Practice 2 & Qualifying MotoGP", text: "FP2 & Quali (MotoGP)" },
        { value: "Sprint Race MotoGP", text: "Sprint (MotoGP)" },
        { value: "Warm Up", text: "Warm Up (MotoGP)" },
        { value: "Race MotoGP", text: "Race (MotoGP)" }
      ],
      other: [
        { value: "Race FIA WEC", text: "Race (WEC)" },
        { value: "Match", text: "Match (All Football)" }
      ]
    };
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
      session_name: "",
      event_type: "",
      scheduled_enable_time: null,
      scheduled_disable_time: null
    });
    const filteredSessionOptions = ref(allSessionOptions.other);
    const updateSessionOptions = () => {
      const eventType = stream.event_type;
      if (eventType === "(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)") {
        filteredSessionOptions.value = allSessionOptions.f1;
      } else if (eventType === "(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)") {
        filteredSessionOptions.value = allSessionOptions.f1Sprint;
      } else if (eventType === "(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)") {
        filteredSessionOptions.value = allSessionOptions.motogp;
      } else {
        filteredSessionOptions.value = allSessionOptions.other;
      }
      const validValues = filteredSessionOptions.value.map((option) => option.value);
      if (!validValues.includes(stream.session_name)) {
        stream.session_name = validValues[0] || "";
      }
    };
    updateSessionOptions();
    watch(() => stream.event_type, updateSessionOptions);
    useSeoMeta({
      title: "Tambah Data Stream",
      ogTitle: "Tambah Data Stream"
    });
    const navigateToArtikel = () => {
      router.push("/rikya/components/Livestream");
    };
    return {
      stream,
      navigateToArtikel,
      router,
      filteredSessionOptions,
      updateSessionOptions,
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
          event_type: this.stream.event_type,
          excerpt: this.stream.excerpt,
          link: this.stream.link,
          link2: this.stream.link2,
          link3: this.stream.link3,
          link4: this.stream.link4,
          content: this.stream.content,
          session_name: this.stream.session_name,
          event_type: this.stream.event_type,
          scheduled_enable_time: this.stream.scheduled_enable_time,
          scheduled_disable_time: this.stream.scheduled_disable_time,
          imagePath: this.stream.image
          // Sertakan path gambar
        };
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
        session_name: "",
        event_type: "",
        scheduled_enable_time: null,
        scheduled_disable_time: null
      };
      this.updateSessionOptions();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-e9d684d1><header data-v-e9d684d1><header data-v-e9d684d1><div class="header-content" data-v-e9d684d1><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-e9d684d1><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-e9d684d1> Dashboard </h1></div></header></header><div class="dashboard" data-v-e9d684d1><h1 class="black-text" data-v-e9d684d1>Add Live stream</h1><div class="form-container" data-v-e9d684d1><form data-v-e9d684d1><div class="form-group" data-v-e9d684d1><label for="image" data-v-e9d684d1>Upload PNG Image:</label><input type="file" id="image" accept=".png" required data-v-e9d684d1></div><div class="form-group" data-v-e9d684d1><label for="title" data-v-e9d684d1>Title</label><input type="text" id="title"${ssrRenderAttr("value", $setup.stream.title)} required data-v-e9d684d1></div><div class="form-group" data-v-e9d684d1><label for="category" data-v-e9d684d1>Category:</label><select id="category" required data-v-e9d684d1><option value="Motorsport" data-v-e9d684d1${ssrIncludeBooleanAttr(Array.isArray($setup.stream.category) ? ssrLooseContain($setup.stream.category, "Motorsport") : ssrLooseEqual($setup.stream.category, "Motorsport")) ? " selected" : ""}>Motorsport</option><option value="Football" data-v-e9d684d1${ssrIncludeBooleanAttr(Array.isArray($setup.stream.category) ? ssrLooseContain($setup.stream.category, "Football") : ssrLooseEqual($setup.stream.category, "Football")) ? " selected" : ""}>Football</option><option value="Basketball" data-v-e9d684d1${ssrIncludeBooleanAttr(Array.isArray($setup.stream.category) ? ssrLooseContain($setup.stream.category, "Basketball") : ssrLooseEqual($setup.stream.category, "Basketball")) ? " selected" : ""}>Basketball</option></select></div><div class="form-group" data-v-e9d684d1><label for="title" data-v-e9d684d1>Live Event</label><input type="text" id="event"${ssrRenderAttr("value", $setup.stream.event)} required data-v-e9d684d1></div><div class="form-group" data-v-e9d684d1><label for="event_type" data-v-e9d684d1>Tipe Race Week</label><select id="event_type" data-v-e9d684d1><option value="" data-v-e9d684d1${ssrIncludeBooleanAttr(Array.isArray($setup.stream.event_type) ? ssrLooseContain($setup.stream.event_type, "") : ssrLooseEqual($setup.stream.event_type, "")) ? " selected" : ""}>kosong (Race WEC dan lainnya)</option><option value="(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)" data-v-e9d684d1${ssrIncludeBooleanAttr(Array.isArray($setup.stream.event_type) ? ssrLooseContain($setup.stream.event_type, "(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)") : ssrLooseEqual($setup.stream.event_type, "(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)")) ? " selected" : ""}>Normal (F1)</option><option value="(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)" data-v-e9d684d1${ssrIncludeBooleanAttr(Array.isArray($setup.stream.event_type) ? ssrLooseContain($setup.stream.event_type, "(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)") : ssrLooseEqual($setup.stream.event_type, "(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)")) ? " selected" : ""}>Sprint (F1)</option><option value="(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)" data-v-e9d684d1${ssrIncludeBooleanAttr(Array.isArray($setup.stream.event_type) ? ssrLooseContain($setup.stream.event_type, "(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)") : ssrLooseEqual($setup.stream.event_type, "(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)")) ? " selected" : ""}>Normal (MotoGP)</option></select></div><div class="form-group" data-v-e9d684d1><label for="excerpt" data-v-e9d684d1>Excerpt</label><input type="text" id="excerpt"${ssrRenderAttr("value", $setup.stream.excerpt)} required data-v-e9d684d1></div><div class="form-group" data-v-e9d684d1><label for="link" data-v-e9d684d1>Link 1</label><input type="text" id="link"${ssrRenderAttr("value", $setup.stream.link)} required data-v-e9d684d1></div><div class="form-group" data-v-e9d684d1><label for="link2" data-v-e9d684d1>Link 2</label><input type="text" id="link2"${ssrRenderAttr("value", $setup.stream.link2)} data-v-e9d684d1></div><div class="form-group" data-v-e9d684d1><label for="link3" data-v-e9d684d1>Link 3</label><input type="text" id="link3"${ssrRenderAttr("value", $setup.stream.link3)} data-v-e9d684d1></div><div class="form-group" data-v-e9d684d1><label for="link4" data-v-e9d684d1>Link 4</label><input type="text" id="link4"${ssrRenderAttr("value", $setup.stream.link4)} data-v-e9d684d1></div><div class="form-group" data-v-e9d684d1><label for="session_name" data-v-e9d684d1>Pilih sesi</label><select id="session_name" data-v-e9d684d1><!--[-->`);
  ssrRenderList($setup.filteredSessionOptions, (option) => {
    _push(`<option${ssrRenderAttr("value", option.value)} data-v-e9d684d1${ssrIncludeBooleanAttr(Array.isArray($setup.stream.session_name) ? ssrLooseContain($setup.stream.session_name, option.value) : ssrLooseEqual($setup.stream.session_name, option.value)) ? " selected" : ""}>${ssrInterpolate(option.text)}</option>`);
  });
  _push(`<!--]--></select></div><div class="form-group" data-v-e9d684d1><label for="content" data-v-e9d684d1>Content</label><textarea id="content" required data-v-e9d684d1>${ssrInterpolate($setup.stream.content)}</textarea></div><div class="form-group" data-v-e9d684d1><label for="scheduledEnableTime" data-v-e9d684d1>Jadwal Start Live (opsional)</label><input type="datetime-local" id="scheduledEnableTime"${ssrRenderAttr("value", $setup.stream.scheduled_enable_time)} data-v-e9d684d1><small data-v-e9d684d1>Biarkan kosong untuk status disable</small></div><div class="form-group" data-v-e9d684d1><label for="scheduledDisableTime" data-v-e9d684d1>Jadwal End Live (opsional)</label><input type="datetime-local" id="scheduledDisableTime"${ssrRenderAttr("value", $setup.stream.scheduled_disable_time)} data-v-e9d684d1><small data-v-e9d684d1>Biarkan kosong untuk status disable</small></div><div class="buttons-container" data-v-e9d684d1><button type="submit" class="action-btn update-btn" data-v-e9d684d1>Submit Stream</button><button type="button" class="action-btn cancel-btn" data-v-e9d684d1>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_livestream.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_livestream = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e9d684d1"]]);

export { add_livestream as default };
//# sourceMappingURL=add_livestream-IInFjL1s.mjs.map
