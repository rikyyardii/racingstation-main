import { mergeProps, ref, useSSRContext } from 'vue';
import { useRouter } from 'vue-router';
import { b as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
      name: "",
      link: ""
    });
    const isSubmitting = ref(false);
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const submitSosmed = async () => {
      if (isSubmitting.value)
        return;
      try {
        isSubmitting.value = true;
        const payload = {
          name: sosmed.value.name.trim(),
          link: sosmed.value.link.trim()
        };
        console.log("Creating new category with payload:", payload);
        console.log("API URL:", `${API_URL}/sosmed-links`);
        const response = await fetch(`${API_URL}/sosmed-links`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        console.log("Create response status:", response.status);
        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            console.log("Create error response:", errorData);
            if (errorData.error) {
              errorMessage = errorData.error;
            }
          } catch (e) {
            console.log("Could not parse error response as JSON");
          }
          throw new Error(errorMessage);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const responseText = await response.text();
          console.log("Non-JSON create response:", responseText);
          throw new Error("Server returned non-JSON response");
        }
        const result = await response.json();
        console.log("Create result:", result);
        if (result.message && result.id) {
          alert("Sosmed Link berhasil dibuat!");
          router.push("/rikya/components/Sosmed");
        } else {
          throw new Error(result.error || "Gagal membuat sosmed link");
        }
      } catch (error) {
        console.error("Error creating sosmed:", error);
        alert(error.message || "Terjadi kesalahan saat membuat categories");
      } finally {
        isSubmitting.value = false;
      }
    };
    const navigateToCategories = () => {
      router.push("/rikya/components/Sosmed");
    };
    const resetForm = () => {
      categories.value = {
        name: "",
        link: ""
      };
    };
    useSeoMeta({
      title: "Add New Sosmed",
      ogTitle: "Add New Sosmed  "
    });
    return {
      sosmed,
      isSubmitting,
      submitSosmed,
      navigateToCategories,
      resetForm
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-4b76e668><header data-v-4b76e668><div class="header-content" data-v-4b76e668><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-4b76e668><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-4b76e668> Dashboard </h1></div></header><div class="dashboard" data-v-4b76e668><div class="form-container" data-v-4b76e668><h1 class="black-text" data-v-4b76e668>Add New Sosmed</h1><form data-v-4b76e668><div class="form-group" data-v-4b76e668><label for="name" data-v-4b76e668>Nama <span class="required" data-v-4b76e668>*</span></label><input type="text" id="name"${ssrRenderAttr("value", $setup.sosmed.name)} required placeholder="Masukkan nama sosmed" data-v-4b76e668></div><div class="form-group" data-v-4b76e668><label for="description" data-v-4b76e668>Link</label><input id="description"${ssrRenderAttr("value", $setup.sosmed.link)} required placeholder="Masukkan deskripsi sosmed" data-v-4b76e668></div><div class="buttons-container" data-v-4b76e668><button type="submit" class="action-btn create-btn"${ssrIncludeBooleanAttr($setup.isSubmitting) ? " disabled" : ""} data-v-4b76e668>${ssrInterpolate($setup.isSubmitting ? "Creating..." : "Create Sosmed Link")}</button><button type="button" class="action-btn cancel-btn" data-v-4b76e668>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_sosmed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_sosmed = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4b76e668"]]);

export { add_sosmed as default };
//# sourceMappingURL=add_sosmed-DLmAh49I.mjs.map
