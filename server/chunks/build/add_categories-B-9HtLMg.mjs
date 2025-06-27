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
    const categories = ref({
      name: "",
      description: "",
      event_type_description: ""
    });
    const isSubmitting = ref(false);
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const submitCategories = async () => {
      if (isSubmitting.value)
        return;
      try {
        isSubmitting.value = true;
        const payload = {
          name: categories.value.name.trim(),
          description: categories.value.description.trim(),
          event_type_description: categories.value.event_type_description.trim()
        };
        console.log("Creating new category with payload:", payload);
        console.log("API URL:", `${API_URL}/event-categories`);
        const response = await fetch(`${API_URL}/event-categories`, {
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
          alert("Categories berhasil dibuat!");
          router.push("/rikya/components/Categories");
        } else {
          throw new Error(result.error || "Gagal membuat categories");
        }
      } catch (error) {
        console.error("Error creating category:", error);
        alert(error.message || "Terjadi kesalahan saat membuat categories");
      } finally {
        isSubmitting.value = false;
      }
    };
    const navigateToCategories = () => {
      router.push("/rikya/components/Categories");
    };
    const resetForm = () => {
      categories.value = {
        name: "",
        description: "",
        event_type_description: ""
      };
    };
    useSeoMeta({
      title: "Add New Categories",
      ogTitle: "Add New Categories"
    });
    return {
      categories,
      isSubmitting,
      submitCategories,
      navigateToCategories,
      resetForm
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-d0dc3189><header data-v-d0dc3189><div class="header-content" data-v-d0dc3189><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-d0dc3189><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-d0dc3189> Dashboard </h1></div></header><div class="dashboard" data-v-d0dc3189><div class="form-container" data-v-d0dc3189><h1 class="black-text" data-v-d0dc3189>Add New Categories</h1><form data-v-d0dc3189><div class="form-group" data-v-d0dc3189><label for="name" data-v-d0dc3189>Nama <span class="required" data-v-d0dc3189>*</span></label><input type="text" id="name"${ssrRenderAttr("value", $setup.categories.name)} required placeholder="Masukkan nama kategori" data-v-d0dc3189></div><div class="form-group" data-v-d0dc3189><label for="description" data-v-d0dc3189>Deskripsi</label><input id="description"${ssrRenderAttr("value", $setup.categories.description)} rows="3" placeholder="Masukkan deskripsi kategori (opsional)" data-v-d0dc3189></div><div class="form-group" data-v-d0dc3189><label for="event_type_description" data-v-d0dc3189>Event Type</label><textarea type="text" id="event_type_description" placeholder="Masukkan tipe event (opsional)" data-v-d0dc3189>${ssrInterpolate($setup.categories.event_type_description)}</textarea></div><div class="buttons-container" data-v-d0dc3189><button type="submit" class="action-btn create-btn"${ssrIncludeBooleanAttr($setup.isSubmitting) ? " disabled" : ""} data-v-d0dc3189>${ssrInterpolate($setup.isSubmitting ? "Creating..." : "Create Categories")}</button><button type="button" class="action-btn cancel-btn" data-v-d0dc3189>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_categories = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d0dc3189"]]);

export { add_categories as default };
//# sourceMappingURL=add_categories-B-9HtLMg.mjs.map
