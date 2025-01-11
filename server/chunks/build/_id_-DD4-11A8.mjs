import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-DOf2J2A_.mjs';
import { _ as _export_sfc, a as useRouter, b as useRoute, u as useRuntimeConfig } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
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
      event: "",
      excerpt: "",
      link: "",
      content: "",
      status: ""
      // Status akan ditangani saat submit
    });
    useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-d4cd32af><header data-v-d4cd32af><div class="header-content" data-v-d4cd32af><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-d4cd32af><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-d4cd32af> Dashboard </h1></div></header><div class="container" data-v-d4cd32af><h2 class="black-text" data-v-d4cd32af>Edit Livestream</h2><form data-v-d4cd32af><div data-v-d4cd32af><label for="title" data-v-d4cd32af>Title</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" required data-v-d4cd32af></div><div data-v-d4cd32af><label for="event" data-v-d4cd32af>Live Event</label><input type="text"${ssrRenderAttr("value", stream.value.event)} id="event" data-v-d4cd32af></div><div data-v-d4cd32af><label for="excerpt" data-v-d4cd32af>Excerpt</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" required data-v-d4cd32af></div><div data-v-d4cd32af><label for="link" data-v-d4cd32af>Link</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" required data-v-d4cd32af></div><div data-v-d4cd32af><label for="content" data-v-d4cd32af>Content</label><textarea id="content" required data-v-d4cd32af>${ssrInterpolate(stream.value.content)}</textarea></div><div data-v-d4cd32af><label for="status" data-v-d4cd32af>Status</label><select id="status" data-v-d4cd32af><option value="enable" data-v-d4cd32af${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-d4cd32af${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div><button type="submit" data-v-d4cd32af>Update Stream</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d4cd32af"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DD4-11A8.mjs.map
