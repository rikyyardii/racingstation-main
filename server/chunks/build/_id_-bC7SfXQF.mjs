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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-7fbe7360><header data-v-7fbe7360><div class="header-content" data-v-7fbe7360><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-7fbe7360><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-7fbe7360> Dashboard </h1></div></header><div class="container" data-v-7fbe7360><h2 class="black-text" data-v-7fbe7360>Edit Livestream</h2><form data-v-7fbe7360><div data-v-7fbe7360><label for="title" data-v-7fbe7360>Title</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" required data-v-7fbe7360></div><div data-v-7fbe7360><label for="event" data-v-7fbe7360>Live Event</label><input type="text"${ssrRenderAttr("value", stream.value.event)} id="event" data-v-7fbe7360></div><div data-v-7fbe7360><label for="excerpt" data-v-7fbe7360>Excerpt</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" required data-v-7fbe7360></div><div data-v-7fbe7360><label for="link" data-v-7fbe7360>Link 1</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" required data-v-7fbe7360></div><div data-v-7fbe7360><label for="link2" data-v-7fbe7360>Link 2</label><input type="text"${ssrRenderAttr("value", stream.value.link2)} id="link2" data-v-7fbe7360></div><div data-v-7fbe7360><label for="link3" data-v-7fbe7360>Link 3</label><input type="text"${ssrRenderAttr("value", stream.value.link3)} id="link3" data-v-7fbe7360></div><div data-v-7fbe7360><label for="link4" data-v-7fbe7360>Link 4</label><input type="text"${ssrRenderAttr("value", stream.value.link4)} id="link4" data-v-7fbe7360></div><div data-v-7fbe7360><label for="content" data-v-7fbe7360>Content</label><textarea id="content" required data-v-7fbe7360>${ssrInterpolate(stream.value.content)}</textarea></div><div data-v-7fbe7360><label for="status" data-v-7fbe7360>Status</label><select id="status" data-v-7fbe7360><option value="enable" data-v-7fbe7360${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-7fbe7360${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div><button type="submit" data-v-7fbe7360>Update Stream</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7fbe7360"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-bC7SfXQF.mjs.map
