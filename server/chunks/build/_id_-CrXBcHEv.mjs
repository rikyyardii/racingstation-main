import { ref, mergeProps, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
    const adslink = ref({
      id: null,
      name: "",
      link: ""
    });
    useRoute();
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const submitAdslink = async () => {
      try {
        const payload = {
          name: adslink.value.name,
          adslink: adslink.value.link
          // Sesuaikan dengan nama field yang diharapkan API
        };
        const response = await fetch(`${API_URL}/adslink/${adslink.value.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          alert("Ads Link berhasil diperbarui!");
          router.push("/rikya/components/Ads");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Gagal memperbarui Ads Link");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error.message || "Terjadi kesalahan saat memperbarui");
      }
    };
    const navigateToAds = () => {
      router.push("/rikya/components/Ads");
    };
    useSeoMeta({
      title: "Edit Direct Link",
      ogTitle: "Edit Direct Link"
    });
    return {
      adslink,
      submitAdslink,
      navigateToAds
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-0c514b24><header data-v-0c514b24><div class="header-content" data-v-0c514b24><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-0c514b24><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-0c514b24> Dashboard </h1></div></header><div class="dashboard" data-v-0c514b24><div class="form-container" data-v-0c514b24><h1 class="black-text" data-v-0c514b24>Edit Ads Link</h1><form data-v-0c514b24><div class="form-group" data-v-0c514b24><label for="name" data-v-0c514b24>Nama:</label><input type="text" id="name"${ssrRenderAttr("value", $setup.adslink.name)} required data-v-0c514b24></div><div class="form-group" data-v-0c514b24><label for="link" data-v-0c514b24>Link:</label><input type="text" id="link"${ssrRenderAttr("value", $setup.adslink.link)} required data-v-0c514b24></div><div class="buttons-container" data-v-0c514b24><button type="submit" class="action-btn update-btn" data-v-0c514b24>Update Ads Link</button><button type="button" class="action-btn cancel-btn" data-v-0c514b24>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_adslink/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0c514b24"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CrXBcHEv.mjs.map
