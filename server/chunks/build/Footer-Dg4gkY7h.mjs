import { b as _export_sfc, _ as _imports_0, a as __nuxt_component_0 } from './server.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-7879c1d2><div class="footer-content" data-v-7879c1d2><div class="footer-section" data-v-7879c1d2><div class="footer-logo" data-v-7879c1d2><span data-v-7879c1d2><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation" class="racingstation-logo" data-v-7879c1d2></span><span class="logo-text" data-v-7879c1d2>RacingStation</span></div><nav class="footer-nav" data-v-7879c1d2><div class="nav-column" data-v-7879c1d2>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about/racingstation",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`About us`);
      } else {
        return [
          createTextVNode("About us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about/contact-page",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Contact Us`);
      } else {
        return [
          createTextVNode("Contact Us")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about/privacy-policy",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Privacy Policy`);
      } else {
        return [
          createTextVNode("Privacy Policy")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="nav-column" data-v-7879c1d2>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about/disclaimer",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Disclaimer`);
      } else {
        return [
          createTextVNode("Disclaimer")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/about/tos",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Terms and Conditions`);
      } else {
        return [
          createTextVNode("Terms and Conditions")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></nav></div><div class="footer-info" data-v-7879c1d2><p class="made-with" data-v-7879c1d2>Made by <img${ssrRenderAttr("src", _imports_0)} alt="RacingStation" class="racingstation-logo" data-v-7879c1d2> RacingStation</p><p class="data-provider" data-v-7879c1d2> Subscribe and Follow our<a class="support-link" href="https://youtube.com/@RacingStation-2" target="_blank" data-v-7879c1d2>Youtube</a> and <a class="support-link" href="https://x.com/racingstation15" target="_blank" data-v-7879c1d2>Twitter</a></p><p class="disclaimer" data-v-7879c1d2>For more Information and Live Streaming Schedule Info.</p></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("component/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7879c1d2"]]);

export { Footer as F };
//# sourceMappingURL=Footer-Dg4gkY7h.mjs.map
