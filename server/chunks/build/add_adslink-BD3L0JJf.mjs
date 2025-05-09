import { mergeProps, reactive, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { b as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
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
    const adslink = reactive({
      name: "",
      link: ""
    });
    const { API_URL } = useRuntimeConfig().public;
    const navigateToAds = () => {
      router.push("/rikya/components/Ads");
    };
    const submitStream = async () => {
      try {
        if (!adslink.name || !adslink.link) {
          alert("Name and link are required!");
          return;
        }
        const payload = {
          name: adslink.name,
          adslink: adslink.link
          // Perbaikan nama field sesuai kebutuhan backend
        };
        const response = await fetch(`${API_URL}/adslink`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          alert("Ads Link submitted successfully!");
          router.push("/rikya/components/Ads");
          adslink.name = "";
          adslink.link = "";
        } else {
          const error = await response.json();
          throw new Error(error.message || "Failed to submit");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error.message || "Error submitting Ads Link");
      }
    };
    useSeoMeta({
      title: "Tambah Data Direct Link",
      ogTitle: "Tambah Data Direct Link"
    });
    return {
      adslink,
      navigateToAds,
      submitStream
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-43698cd5><header data-v-43698cd5><header data-v-43698cd5><div class="header-content" data-v-43698cd5><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-43698cd5><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-43698cd5> Dashboard </h1></div></header></header><div class="dashboard" data-v-43698cd5><h1 class="black-text" data-v-43698cd5>Add Ads Link (Direct Link)</h1><div class="form-container" data-v-43698cd5><form data-v-43698cd5><div class="form-group" data-v-43698cd5><label for="name" data-v-43698cd5>Nama</label><input type="text" id="name"${ssrRenderAttr("value", $setup.adslink.name)} required data-v-43698cd5></div><div class="form-group" data-v-43698cd5><label for="link" data-v-43698cd5>Link</label><input type="text" id="link"${ssrRenderAttr("value", $setup.adslink.link)} required data-v-43698cd5></div><button type="submit" data-v-43698cd5>Submit Stream</button></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_adslink.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_adslink = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-43698cd5"]]);

export { add_adslink as default };
//# sourceMappingURL=add_adslink-BD3L0JJf.mjs.map
