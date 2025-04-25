import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { b as _export_sfc, c as useRouter, d as useRoute, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
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
import 'vue-router';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const stream = ref({
      title: "",
      category: "",
      event: "",
      excerpt: "",
      link: "",
      link2: "",
      link3: "",
      link4: "",
      content: "",
      scheduled_enable_time: null,
      scheduled_disable_time: null,
      status: ""
    });
    useRuntimeConfig().public;
    useSeoMeta({
      title: "Edit Streaming",
      ogTitle: "Edit Streaming"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-2f8699d1><header data-v-2f8699d1><div class="header-content" data-v-2f8699d1><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-2f8699d1><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-2f8699d1> Dashboard </h1></div></header><div class="container" data-v-2f8699d1><h2 class="black-text" data-v-2f8699d1>Edit Livestream</h2><form data-v-2f8699d1><div data-v-2f8699d1><label for="title" data-v-2f8699d1>Title</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" required data-v-2f8699d1></div><div class="form-group" data-v-2f8699d1><label for="category" data-v-2f8699d1>Category:</label><select id="category" required data-v-2f8699d1><option value="Motorsport" data-v-2f8699d1${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Motorsport") : ssrLooseEqual(stream.value.category, "Motorsport")) ? " selected" : ""}>Motorsport</option><option value="Football" data-v-2f8699d1${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Football") : ssrLooseEqual(stream.value.category, "Football")) ? " selected" : ""}>Football</option></select></div><div data-v-2f8699d1><label for="event" data-v-2f8699d1>Live Event</label><input type="text"${ssrRenderAttr("value", stream.value.event)} id="event" data-v-2f8699d1></div><div data-v-2f8699d1><label for="excerpt" data-v-2f8699d1>Excerpt</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" required data-v-2f8699d1></div><div data-v-2f8699d1><label for="link" data-v-2f8699d1>Link 1</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" required data-v-2f8699d1></div><div data-v-2f8699d1><label for="link2" data-v-2f8699d1>Link 2</label><input type="text"${ssrRenderAttr("value", stream.value.link2)} id="link2" data-v-2f8699d1></div><div data-v-2f8699d1><label for="link3" data-v-2f8699d1>Link 3</label><input type="text"${ssrRenderAttr("value", stream.value.link3)} id="link3" data-v-2f8699d1></div><div data-v-2f8699d1><label for="link4" data-v-2f8699d1>Link 4</label><input type="text"${ssrRenderAttr("value", stream.value.link4)} id="link4" data-v-2f8699d1></div><div data-v-2f8699d1><label for="content" data-v-2f8699d1>Content</label><textarea id="content" required data-v-2f8699d1>${ssrInterpolate(stream.value.content)}</textarea></div><div data-v-2f8699d1><label for="scheduledEnableTime" data-v-2f8699d1>Jadwal Enable (WIB)</label><input type="datetime-local" id="scheduledEnableTime"${ssrRenderAttr("value", stream.value.scheduled_enable_time)} data-v-2f8699d1></div><div data-v-2f8699d1><label for="scheduledDisableTime" data-v-2f8699d1>Jadwal Disable (WIB)</label><input type="datetime-local" id="scheduledDisableTime"${ssrRenderAttr("value", stream.value.scheduled_disable_time)} data-v-2f8699d1></div><div data-v-2f8699d1><label for="status" data-v-2f8699d1>Status</label><select id="status" data-v-2f8699d1><option value="enable" data-v-2f8699d1${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-2f8699d1${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div><div class="buttons-container" data-v-2f8699d1><button type="submit" class="action-btn update-btn" data-v-2f8699d1>Update Stream</button><button type="button" class="action-btn cancel-btn" data-v-2f8699d1>Cancel</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f8699d1"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-B6A6dXqF.mjs.map
