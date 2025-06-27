import { mergeProps, ref, nextTick, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { b as _export_sfc, u as useRuntimeConfig } from './server.mjs';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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
      id: null,
      category_id: "",
      session_name: "",
      session_order: 1,
      is_active: true
    });
    const categories = ref([]);
    const isLoading = ref(true);
    const isSubmitting = ref(false);
    const error = ref(null);
    const showDebug = ref(false);
    const route = useRoute();
    const router = useRouter();
    const { API_URL } = useRuntimeConfig().public;
    const handleApiError = async (response, context = "API call") => {
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
          } else {
            const textData = await response.text();
            if (textData) {
              errorMessage = textData;
            }
          }
        } catch (e) {
          console.log("Could not parse error response");
        }
        throw new Error(`${context}: ${errorMessage}`);
      }
    };
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories for dropdown...");
        const response = await fetch(`${API_URL}/event-categories`);
        await handleApiError(response, "Fetching categories");
        const data = await response.json();
        console.log("Categories loaded:", data);
        if (!Array.isArray(data)) {
          throw new Error("Categories data is not an array");
        }
        categories.value = data;
      } catch (error2) {
        console.error("Error fetching categories:", error2);
        throw new Error(`Failed to load categories: ${error2.message}`);
      }
    };
    const fetchSession = async (id) => {
      try {
        console.log("Fetching session with ID:", id);
        const sessionId = parseInt(id);
        if (isNaN(sessionId) || sessionId <= 0) {
          throw new Error("Invalid session ID format");
        }
        const apiUrl = `${API_URL}/sessions/${sessionId}`;
        console.log("Full URL:", apiUrl);
        const response = await fetch(apiUrl);
        console.log("Response status:", response.status);
        await handleApiError(response, "Fetching session");
        const data = await response.json();
        console.log("Fetched session data:", data);
        if (!data) {
          throw new Error("No data received from server");
        }
        if (data.id === void 0 || data.id === null) {
          console.error("Session data missing ID:", data);
          throw new Error("Session data is missing required ID field");
        }
        session.value = {
          id: Number(data.id),
          category_id: data.category_id ? String(data.category_id) : "",
          // Convert to string for select
          session_name: data.session_name || "",
          session_order: data.session_order ? Number(data.session_order) : 1,
          is_active: data.is_active !== void 0 ? Boolean(data.is_active) : true
        };
        console.log("Session value after assignment:", session.value);
        await nextTick();
        console.log("Session value after nextTick:", session.value);
        if (!session.value.session_name) {
          console.warn("Session name is empty");
        }
        if (!session.value.category_id) {
          console.warn("Category ID is empty");
        }
      } catch (error2) {
        console.error("Error fetching session:", error2);
        throw new Error(`Failed to load session data: ${error2.message}`);
      }
    };
    const submitSession = async () => {
      try {
        isSubmitting.value = true;
        error.value = null;
        if (!session.value.category_id || !session.value.session_name || !session.value.session_order) {
          throw new Error("Please fill in all required fields");
        }
        if (!session.value.id) {
          throw new Error("Session ID is missing");
        }
        const payload = {
          category_id: parseInt(session.value.category_id),
          session_name: session.value.session_name.trim(),
          session_order: parseInt(session.value.session_order),
          is_active: Boolean(session.value.is_active)
        };
        if (isNaN(payload.category_id) || payload.category_id <= 0) {
          throw new Error("Invalid category selection");
        }
        if (isNaN(payload.session_order) || payload.session_order <= 0) {
          throw new Error("Session order must be a positive number");
        }
        if (!payload.session_name) {
          throw new Error("Session name cannot be empty");
        }
        console.log("Submitting payload:", payload);
        const updateUrl = `${API_URL}/sessions/${session.value.id}`;
        console.log("Update URL:", updateUrl);
        const response = await fetch(updateUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        console.log("Update response status:", response.status);
        await handleApiError(response, "Updating session");
        const contentType = response.headers.get("content-type");
        let result = null;
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
          console.log("Update result:", result);
          if (result.success === false) {
            throw new Error(result.error || "Failed to update session");
          }
        } else {
          const responseText = await response.text();
          console.log("Update response text:", responseText);
        }
        alert("Session berhasil diperbarui!");
        router.push("/rikya/components/Session");
      } catch (error2) {
        console.error("Error updating session:", error2);
        error2.value = error2.message;
        alert(`Error: ${error2.message}`);
      } finally {
        isSubmitting.value = false;
      }
    };
    const navigateToSessions = () => {
      router.push("/rikya/components/Session");
    };
    const retryLoading = async () => {
      const sessionId = route.params.id;
      if (!sessionId) {
        error.value = "Invalid session ID";
        return;
      }
      try {
        isLoading.value = true;
        error.value = null;
        await Promise.all([fetchCategories(), fetchSession(sessionId)]);
      } catch (err) {
        console.error("Retry failed:", err);
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    };
    useSeoMeta({
      title: "Edit Session",
      ogTitle: "Edit Session"
    });
    return {
      session,
      categories,
      isLoading,
      isSubmitting,
      error,
      showDebug,
      route,
      API_URL,
      submitSession,
      navigateToSessions,
      retryLoading
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-6a22d297><header data-v-6a22d297><div class="header-content" data-v-6a22d297><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-6a22d297><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-6a22d297> Dashboard </h1></div></header>`);
  if ($setup.isLoading) {
    _push(`<div class="dashboard" data-v-6a22d297><div class="form-container" data-v-6a22d297><h1 class="black-text" data-v-6a22d297>Loading...</h1></div></div>`);
  } else if ($setup.error) {
    _push(`<div class="dashboard" data-v-6a22d297><div class="form-container" data-v-6a22d297><h1 class="black-text" data-v-6a22d297>Error</h1><p data-v-6a22d297>${ssrInterpolate($setup.error)}</p><button type="button" class="action-btn cancel-btn" data-v-6a22d297>Back to Sessions</button></div></div>`);
  } else {
    _push(`<div class="dashboard" data-v-6a22d297><div class="form-container" data-v-6a22d297><h1 class="black-text" data-v-6a22d297>Edit Session</h1><form data-v-6a22d297><div class="form-group" data-v-6a22d297><label for="category_id" data-v-6a22d297>Category</label><select id="category_id" required data-v-6a22d297><option value="" data-v-6a22d297${ssrIncludeBooleanAttr(Array.isArray($setup.session.category_id) ? ssrLooseContain($setup.session.category_id, "") : ssrLooseEqual($setup.session.category_id, "")) ? " selected" : ""}>Pilih Category</option><!--[-->`);
    ssrRenderList($setup.categories, (category) => {
      _push(`<option${ssrRenderAttr("value", category.id)} data-v-6a22d297${ssrIncludeBooleanAttr(Array.isArray($setup.session.category_id) ? ssrLooseContain($setup.session.category_id, category.id) : ssrLooseEqual($setup.session.category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)} (ID: ${ssrInterpolate(category.id)})</option>`);
    });
    _push(`<!--]--></select></div><div class="form-group" data-v-6a22d297><label for="session_name" data-v-6a22d297>Session Name</label><input type="text" id="session_name"${ssrRenderAttr("value", $setup.session.session_name)} required data-v-6a22d297></div><div class="form-group" data-v-6a22d297><label for="session_order" data-v-6a22d297>Session Order</label><input type="number" id="session_order"${ssrRenderAttr("value", $setup.session.session_order)} min="1" required data-v-6a22d297></div><div class="form-group" data-v-6a22d297><label for="is_active" data-v-6a22d297>Status</label><select id="is_active" required data-v-6a22d297><option${ssrRenderAttr("value", true)} data-v-6a22d297${ssrIncludeBooleanAttr(Array.isArray($setup.session.is_active) ? ssrLooseContain($setup.session.is_active, true) : ssrLooseEqual($setup.session.is_active, true)) ? " selected" : ""}>Active</option><option${ssrRenderAttr("value", false)} data-v-6a22d297${ssrIncludeBooleanAttr(Array.isArray($setup.session.is_active) ? ssrLooseContain($setup.session.is_active, false) : ssrLooseEqual($setup.session.is_active, false)) ? " selected" : ""}>Inactive</option></select></div><div class="buttons-container" data-v-6a22d297><button type="submit" class="action-btn update-btn"${ssrIncludeBooleanAttr($setup.isSubmitting) ? " disabled" : ""} data-v-6a22d297>${ssrInterpolate($setup.isSubmitting ? "Updating..." : "Update Session")}</button><button type="button" class="action-btn cancel-btn" data-v-6a22d297>Cancel</button></div></form>`);
    if ($setup.showDebug) {
      _push(`<div class="debug-info" style="${ssrRenderStyle({ "margin-top": "20px", "padding": "10px", "background": "#f5f5f5", "border-radius": "5px" })}" data-v-6a22d297><h3 data-v-6a22d297>Debug Info:</h3><p data-v-6a22d297><strong data-v-6a22d297>Session ID:</strong> ${ssrInterpolate($setup.route.params.id)}</p><p data-v-6a22d297><strong data-v-6a22d297>API URL:</strong> ${ssrInterpolate($setup.API_URL)}</p><p data-v-6a22d297><strong data-v-6a22d297>Session Data:</strong></p><pre data-v-6a22d297>${ssrInterpolate(JSON.stringify($setup.session, null, 2))}</pre></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_session/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-6a22d297"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CEX3TgtD.mjs.map
