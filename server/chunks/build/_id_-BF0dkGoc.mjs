import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { c as _export_sfc, a as useRouter, d as useRoute, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
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
      slug: "",
      newSlug: "",
      title: "",
      event: "",
      excerpt: "",
      link: "",
      link2: "",
      link3: "",
      link4: "",
      content: "",
      status: ""
    });
    useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-c4407cff><header data-v-c4407cff><div class="header-content" data-v-c4407cff><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-c4407cff><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-c4407cff> Dashboard </h1></div></header><div class="container" data-v-c4407cff><h2 class="black-text" data-v-c4407cff>Edit Livestream</h2><form data-v-c4407cff><div data-v-c4407cff><label for="title" data-v-c4407cff>Title</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" required data-v-c4407cff></div><div data-v-c4407cff><label for="event" data-v-c4407cff>Live Event</label><input type="text"${ssrRenderAttr("value", stream.value.event)} id="event" data-v-c4407cff></div><div data-v-c4407cff><label for="excerpt" data-v-c4407cff>Excerpt</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" required data-v-c4407cff></div><div data-v-c4407cff><label for="link" data-v-c4407cff>Link 1</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" required data-v-c4407cff></div><div data-v-c4407cff><label for="link2" data-v-c4407cff>Link 2</label><input type="text"${ssrRenderAttr("value", stream.value.link2)} id="link2" data-v-c4407cff></div><div data-v-c4407cff><label for="link3" data-v-c4407cff>Link 3</label><input type="text"${ssrRenderAttr("value", stream.value.link3)} id="link3" data-v-c4407cff></div><div data-v-c4407cff><label for="link4" data-v-c4407cff>Link 4</label><input type="text"${ssrRenderAttr("value", stream.value.link4)} id="link4" data-v-c4407cff></div><div data-v-c4407cff><label for="content" data-v-c4407cff>Content</label><textarea id="content" required data-v-c4407cff>${ssrInterpolate(stream.value.content)}</textarea></div><div data-v-c4407cff><label for="status" data-v-c4407cff>Status</label><select id="status" data-v-c4407cff><option value="enable" data-v-c4407cff${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-c4407cff${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div><button type="submit" data-v-c4407cff>Update Stream</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4407cff"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BF0dkGoc.mjs.map
