import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { c as _export_sfc, b as useRouter, d as useRoute, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
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
      status: ""
    });
    useRuntimeConfig().public;
    useSeoMeta({
      title: "Edit Streaming",
      ogTitle: "Edit Streaming"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-bc260a57><header data-v-bc260a57><div class="header-content" data-v-bc260a57><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-bc260a57><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-bc260a57> Dashboard </h1></div></header><div class="container" data-v-bc260a57><h2 class="black-text" data-v-bc260a57>Edit Livestream</h2><form data-v-bc260a57><div data-v-bc260a57><label for="title" data-v-bc260a57>Title</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" required data-v-bc260a57></div><div class="form-group" data-v-bc260a57><label for="category" data-v-bc260a57>Category:</label><select id="category" required data-v-bc260a57><option value="Motorsport" data-v-bc260a57${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Motorsport") : ssrLooseEqual(stream.value.category, "Motorsport")) ? " selected" : ""}>Motorsport</option><option value="Football" data-v-bc260a57${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Football") : ssrLooseEqual(stream.value.category, "Football")) ? " selected" : ""}>Football</option></select></div><div data-v-bc260a57><label for="event" data-v-bc260a57>Live Event</label><input type="text"${ssrRenderAttr("value", stream.value.event)} id="event" data-v-bc260a57></div><div data-v-bc260a57><label for="excerpt" data-v-bc260a57>Excerpt</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" required data-v-bc260a57></div><div data-v-bc260a57><label for="link" data-v-bc260a57>Link 1</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" required data-v-bc260a57></div><div data-v-bc260a57><label for="link2" data-v-bc260a57>Link 2</label><input type="text"${ssrRenderAttr("value", stream.value.link2)} id="link2" data-v-bc260a57></div><div data-v-bc260a57><label for="link3" data-v-bc260a57>Link 3</label><input type="text"${ssrRenderAttr("value", stream.value.link3)} id="link3" data-v-bc260a57></div><div data-v-bc260a57><label for="link4" data-v-bc260a57>Link 4</label><input type="text"${ssrRenderAttr("value", stream.value.link4)} id="link4" data-v-bc260a57></div><div data-v-bc260a57><label for="content" data-v-bc260a57>Content</label><textarea id="content" required data-v-bc260a57>${ssrInterpolate(stream.value.content)}</textarea></div><div data-v-bc260a57><label for="scheduledEnableTime" data-v-bc260a57>Jadwal Enable (WIB)</label><input type="datetime-local" id="scheduledEnableTime"${ssrRenderAttr("value", stream.value.scheduled_enable_time)} data-v-bc260a57></div><div data-v-bc260a57><label for="scheduledDisableTime" data-v-bc260a57>Jadwal Disable (WIB)</label><input type="datetime-local" id="scheduledDisableTime"${ssrRenderAttr("value", stream.value.scheduled_disable_time)} data-v-bc260a57></div><div data-v-bc260a57><label for="status" data-v-bc260a57>Status</label><select id="status" data-v-bc260a57><option value="enable" data-v-bc260a57${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-bc260a57${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div><button type="submit" data-v-bc260a57>Update Stream</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc260a57"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Ba4B5UdV.mjs.map
