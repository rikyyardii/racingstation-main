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
    const categories = ref({
      id: null,
      name: "",
      description: "",
      event_type_description: ""
    });
    useRoute();
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const submitCategories = async () => {
      try {
        const payload = {
          name: categories.value.name,
          description: categories.value.description,
          event_type_description: categories.value.event_type_description
        };
        console.log("Submitting payload:", payload);
        console.log("Update URL:", `${API_URL}/event-categories/${categories.value.id}`);
        const response = await fetch(`${API_URL}/event-categories/${categories.value.id}`, {
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
          alert("Categories berhasil diperbarui!");
          router.push("/rikya/components/Categories");
        } else {
          throw new Error(result.error || "Gagal memperbarui categories");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error.message || "Terjadi kesalahan saat memperbarui");
      }
    };
    const navigateToCategories = () => {
      router.push("/rikya/components/Categories");
    };
    useSeoMeta({
      title: "Edit Categories",
      ogTitle: "Edit Categories"
    });
    return {
      categories,
      submitCategories,
      navigateToCategories
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-12c846ee><header data-v-12c846ee><div class="header-content" data-v-12c846ee><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-12c846ee><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-12c846ee> Dashboard </h1></div></header><div class="dashboard" data-v-12c846ee><div class="form-container" data-v-12c846ee><h1 class="black-text" data-v-12c846ee>Edit Categories</h1><form data-v-12c846ee><div class="form-group" data-v-12c846ee><label for="name" data-v-12c846ee>Nama</label><input type="text" id="name"${ssrRenderAttr("value", $setup.categories.name)} required data-v-12c846ee></div><div class="form-group" data-v-12c846ee><label for="description" data-v-12c846ee>Deskripsi</label><input type="text" id="description"${ssrRenderAttr("value", $setup.categories.description)} required data-v-12c846ee></div><div class="form-group" data-v-12c846ee><label for="event_type_description" data-v-12c846ee>Event Type</label><input type="text" id="event_type_description"${ssrRenderAttr("value", $setup.categories.event_type_description)} data-v-12c846ee></div><div class="buttons-container" data-v-12c846ee><button type="submit" class="action-btn update-btn" data-v-12c846ee>Update Categories</button><button type="button" class="action-btn cancel-btn" data-v-12c846ee>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_categories/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-12c846ee"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-3Q6mGK8f.mjs.map
