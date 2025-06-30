import { mergeProps, ref, useSSRContext } from 'vue';
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
    const sosmed = ref({
      id: null,
      name: "",
      link: ""
    });
    useRoute();
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const submitSosmed = async () => {
      try {
        const payload = {
          name: sosmed.value.name,
          link: sosmed.value.link
        };
        console.log("Submitting payload:", payload);
        console.log("Update URL:", `${API_URL}/sosmed-links/${sosmed.value.id}`);
        const response = await fetch(`${API_URL}/sosmed-links/${sosmed.value.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        console.log("Update response status:", response.status);
        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorText = await response.text();
            console.log("Update error response:", errorText);
            if (errorText) {
              errorMessage += ` - ${errorText}`;
            }
          } catch (e) {
            console.log("Could not read update error response");
          }
          throw new Error(errorMessage);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const responseText = await response.text();
          console.log("Non-JSON update response:", responseText);
          throw new Error("Server returned non-JSON response");
        }
        const result = await response.json();
        console.log("Update result:", result);
        if (result.message) {
          alert("Sosmed Link berhasil diperbarui!");
          router.push("/rikya/components/Sosmed");
        } else {
          throw new Error(result.error || "Gagal memperbarui sosmed link");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error.message || "Terjadi kesalahan saat memperbarui");
      }
    };
    const navigateToSosmed = () => {
      router.push("/rikya/components/Sosmed");
    };
    useSeoMeta({
      title: "Edit Sosmed",
      ogTitle: "Edit Sosmed"
    });
    return {
      sosmed,
      submitSosmed,
      navigateToSosmed
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-c681ca0b><header data-v-c681ca0b><div class="header-content" data-v-c681ca0b><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-c681ca0b><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-c681ca0b> Dashboard </h1></div></header><div class="dashboard" data-v-c681ca0b><div class="form-container" data-v-c681ca0b><h1 class="black-text" data-v-c681ca0b>Edit Sosmed</h1><form data-v-c681ca0b><div class="form-group" data-v-c681ca0b><label for="name" data-v-c681ca0b>Nama</label><input type="text" id="name"${ssrRenderAttr("value", $setup.sosmed.name)} required data-v-c681ca0b></div><div class="form-group" data-v-c681ca0b><label for="description" data-v-c681ca0b>Link</label><input type="text" id="description"${ssrRenderAttr("value", $setup.sosmed.link)} required data-v-c681ca0b></div><div class="buttons-container" data-v-c681ca0b><button type="submit" class="action-btn update-btn" data-v-c681ca0b>Update Sosmed</button><button type="button" class="action-btn cancel-btn" data-v-c681ca0b>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_sosmed/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c681ca0b"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-D9GEjHXY.mjs.map
