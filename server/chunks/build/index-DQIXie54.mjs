import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { b as _export_sfc, u as useRuntimeConfig } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    useRouter();
    useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-container" }, _attrs))} data-v-78444936><form class="login-form" data-v-78444936><h1 data-v-78444936>RacingStation</h1><div class="form-group" data-v-78444936><label for="username" data-v-78444936>Username</label><input type="text" id="username"${ssrRenderAttr("value", username.value)} required autocomplete="off" data-v-78444936></div><div class="form-group" data-v-78444936><label for="password" data-v-78444936>Password</label><input type="password" id="password"${ssrRenderAttr("value", password.value)} required autocomplete="off" data-v-78444936></div><button type="submit" data-v-78444936>Log In</button>`);
      if (errorMessage.value) {
        _push(`<div class="error" data-v-78444936>${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78444936"]]);

export { index as default };
//# sourceMappingURL=index-DQIXie54.mjs.map
