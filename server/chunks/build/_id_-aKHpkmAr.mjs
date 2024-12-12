import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-DOf2J2A_.mjs';
import { _ as _export_sfc, u as useRouter, a as useRoute } from './server.mjs';
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
      excerpt: "",
      link: "",
      content: "",
      status: ""
      // Status akan ditangani saat submit
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-48f972df><header data-v-48f972df><div class="header-content" data-v-48f972df><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-48f972df><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-48f972df> Dashboard </h1></div></header><div class="container" data-v-48f972df><h2 class="black-text" data-v-48f972df>Edit Livestream</h2><form data-v-48f972df><div data-v-48f972df><label for="title" data-v-48f972df>Title:</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" data-v-48f972df></div><div data-v-48f972df><label for="excerpt" data-v-48f972df>Excerpt:</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" data-v-48f972df></div><div data-v-48f972df><label for="link" data-v-48f972df>Link:</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" data-v-48f972df></div><div data-v-48f972df><label for="content" data-v-48f972df>Content:</label><textarea id="content" data-v-48f972df>${ssrInterpolate(stream.value.content)}</textarea></div><div data-v-48f972df><label for="status" data-v-48f972df>Status:</label><select id="status" data-v-48f972df><option value="enable" data-v-48f972df${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-48f972df${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div><button type="submit" data-v-48f972df>Update Stream</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48f972df"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-aKHpkmAr.mjs.map
