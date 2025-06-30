import { mergeProps, ref, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { b as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
      link: "",
      status: ""
    });
    useRoute();
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const submitAdslink = async () => {
      try {
        const payload = {
          name: adslink.value.name,
          adslink: adslink.value.link,
          // Sesuaikan dengan nama field yang diharapkan API
          status: adslink.value.status
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-df6e42df><header data-v-df6e42df><div class="header-content" data-v-df6e42df><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-df6e42df><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-df6e42df> Dashboard </h1></div></header><div class="dashboard" data-v-df6e42df><div class="form-container" data-v-df6e42df><h1 class="black-text" data-v-df6e42df>Edit Ads Link</h1><form data-v-df6e42df><div class="form-group" data-v-df6e42df><label for="name" data-v-df6e42df>Nama:</label><input type="text" id="name"${ssrRenderAttr("value", $setup.adslink.name)} required data-v-df6e42df></div><div class="form-group" data-v-df6e42df><label for="link" data-v-df6e42df>Link:</label><input type="text" id="link"${ssrRenderAttr("value", $setup.adslink.link)} required data-v-df6e42df></div><div class="form-group" data-v-df6e42df><label for="status" data-v-df6e42df>Status</label><p class="status-warning" data-v-df6e42df>**Pastikan Status Selalu Enable Ketika Race Week/Match</p><select id="status" class="form-select" data-v-df6e42df><option value="enable" data-v-df6e42df${ssrIncludeBooleanAttr(Array.isArray($setup.adslink.status) ? ssrLooseContain($setup.adslink.status, "enable") : ssrLooseEqual($setup.adslink.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-df6e42df${ssrIncludeBooleanAttr(Array.isArray($setup.adslink.status) ? ssrLooseContain($setup.adslink.status, "disable") : ssrLooseEqual($setup.adslink.status, "disable")) ? " selected" : ""}>Disable</option></select></div><div class="buttons-container" data-v-df6e42df><button type="submit" class="action-btn update-btn" data-v-df6e42df>Update Ads Link</button><button type="button" class="action-btn cancel-btn" data-v-df6e42df>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_adslink/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-df6e42df"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-B1o3waU2.mjs.map
