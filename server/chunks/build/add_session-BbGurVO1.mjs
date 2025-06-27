import { mergeProps, ref, useSSRContext } from 'vue';
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
    const session = ref({
      category_id: "",
      session_name: "",
      session_order: 1
    });
    const categories = ref([]);
    const isSubmitting = ref(false);
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const submitSession = async () => {
      if (isSubmitting.value)
        return;
      try {
        isSubmitting.value = true;
        const payload = {
          category_id: parseInt(session.value.category_id),
          session_name: session.value.session_name.trim(),
          session_order: parseInt(session.value.session_order)
        };
        console.log("Creating new session with payload:", payload);
        console.log("API URL:", `${API_URL}/sessions`);
        const response = await fetch(`${API_URL}/sessions`, {
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
          alert("Session berhasil dibuat!");
          router.push("/rikya/components/Session");
        } else {
          throw new Error(result.error || "Gagal membuat session");
        }
      } catch (error) {
        console.error("Error creating session:", error);
        alert(error.message || "Terjadi kesalahan saat membuat session");
      } finally {
        isSubmitting.value = false;
      }
    };
    const navigateToSessions = () => {
      router.push("/rikya/components/Session");
    };
    const resetForm = () => {
      session.value = {
        category_id: "",
        session_name: "",
        session_order: 1
      };
    };
    useSeoMeta({
      title: "Add New Session",
      ogTitle: "Add New Session"
    });
    return {
      session,
      categories,
      isSubmitting,
      submitSession,
      navigateToSessions,
      resetForm
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-414da0e0><header data-v-414da0e0><div class="header-content" data-v-414da0e0><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-414da0e0><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-414da0e0> Dashboard </h1></div></header><div class="dashboard" data-v-414da0e0><div class="form-container" data-v-414da0e0><h1 class="black-text" data-v-414da0e0>Add New Session</h1><form data-v-414da0e0><div class="form-group" data-v-414da0e0><label for="category_id" data-v-414da0e0>Category <span class="required" data-v-414da0e0>*</span></label><select id="category_id" required data-v-414da0e0><option value="" data-v-414da0e0${ssrIncludeBooleanAttr(Array.isArray($setup.session.category_id) ? ssrLooseContain($setup.session.category_id, "") : ssrLooseEqual($setup.session.category_id, "")) ? " selected" : ""}>Pilih Category</option><!--[-->`);
  ssrRenderList($setup.categories, (category) => {
    _push(`<option${ssrRenderAttr("value", category.id)} data-v-414da0e0${ssrIncludeBooleanAttr(Array.isArray($setup.session.category_id) ? ssrLooseContain($setup.session.category_id, category.id) : ssrLooseEqual($setup.session.category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)} (ID: ${ssrInterpolate(category.id)})</option>`);
  });
  _push(`<!--]--></select></div><div class="form-group" data-v-414da0e0><label for="session_name" data-v-414da0e0>Session Name <span class="required" data-v-414da0e0>*</span></label><input type="text" id="session_name"${ssrRenderAttr("value", $setup.session.session_name)} required placeholder="Masukkan nama session" data-v-414da0e0></div><div class="form-group" data-v-414da0e0><label for="session_order" data-v-414da0e0>Session Order <span class="required" data-v-414da0e0>*</span></label><input type="number" id="session_order"${ssrRenderAttr("value", $setup.session.session_order)} min="1" required placeholder="Masukkan urutan session" data-v-414da0e0></div><div class="buttons-container" data-v-414da0e0><button type="submit" class="action-btn create-btn"${ssrIncludeBooleanAttr($setup.isSubmitting) ? " disabled" : ""} data-v-414da0e0>${ssrInterpolate($setup.isSubmitting ? "Creating..." : "Create Session")}</button><button type="button" class="action-btn cancel-btn" data-v-414da0e0>Cancel</button></div></form></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/add_session.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const add_session = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-414da0e0"]]);

export { add_session as default };
//# sourceMappingURL=add_session-BbGurVO1.mjs.map
