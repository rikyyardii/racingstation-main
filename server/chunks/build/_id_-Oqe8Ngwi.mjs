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
      // Status akan ditangani saat submit
    });
    useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-a83d705d><header data-v-a83d705d><div class="header-content" data-v-a83d705d><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-a83d705d><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-a83d705d> Dashboard </h1></div></header><div class="container" data-v-a83d705d><h2 class="black-text" data-v-a83d705d>Edit Livestream</h2><form data-v-a83d705d><div data-v-a83d705d><label for="title" data-v-a83d705d>Title</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" required data-v-a83d705d></div><div data-v-a83d705d><label for="event" data-v-a83d705d>Live Event</label><input type="text"${ssrRenderAttr("value", stream.value.event)} id="event" data-v-a83d705d></div><div data-v-a83d705d><label for="excerpt" data-v-a83d705d>Excerpt</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" required data-v-a83d705d></div><div data-v-a83d705d><label for="link" data-v-a83d705d>Link 1</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" required data-v-a83d705d></div><div data-v-a83d705d><label for="link2" data-v-a83d705d>Link 2</label><input type="text"${ssrRenderAttr("value", stream.value.link2)} id="link2" data-v-a83d705d></div><div data-v-a83d705d><label for="link3" data-v-a83d705d>Link 3</label><input type="text"${ssrRenderAttr("value", stream.value.link3)} id="link3" data-v-a83d705d></div><div data-v-a83d705d><label for="link4" data-v-a83d705d>Link 4</label><input type="text"${ssrRenderAttr("value", stream.value.link4)} id="link4" data-v-a83d705d></div><div data-v-a83d705d><label for="content" data-v-a83d705d>Content</label><textarea id="content" required data-v-a83d705d>${ssrInterpolate(stream.value.content)}</textarea></div><div data-v-a83d705d><label for="status" data-v-a83d705d>Status</label><select id="status" data-v-a83d705d><option value="enable" data-v-a83d705d${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-a83d705d${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div><button type="submit" data-v-a83d705d>Update Stream</button></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a83d705d"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Oqe8Ngwi.mjs.map
