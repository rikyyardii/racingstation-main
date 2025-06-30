import { b as _export_sfc, u as useRuntimeConfig, _ as _imports_0, a as __nuxt_component_0 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const sosmedLinks = ref([]);
    ref(true);
    ref(null);
    const {
      public: { API_URL }
    } = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-d0becd9c><div class="footer-content" data-v-d0becd9c><div class="footer-section" data-v-d0becd9c><div class="footer-logo" data-v-d0becd9c><span data-v-d0becd9c><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation" class="racingstation-logo" data-v-d0becd9c></span><span class="logo-text" data-v-d0becd9c>RacingStation</span></div><nav class="footer-nav" data-v-d0becd9c><div class="nav-column" data-v-d0becd9c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/article/tutorial/tutorial",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Tutorial`);
          } else {
            return [
              createTextVNode("Tutorial")
            ];
          }
        }),
        _: 1
      }, _parent));
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
      _push(`</div><div class="nav-column" data-v-d0becd9c>`);
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
      _push(`</div></nav></div><div class="footer-info" data-v-d0becd9c><p class="made-with" data-v-d0becd9c>Made by <img${ssrRenderAttr("src", _imports_0)} alt="RacingStation" class="racingstation-logo" data-v-d0becd9c> RacingStation</p><p class="data-provider" data-v-d0becd9c> Subscribe and Follow our <a class="support-link" href="https://youtube.com/@RacingStation-2" target="_blank" data-v-d0becd9c>Youtube</a> and <!--[-->`);
      ssrRenderList(sosmedLinks.value, (sosmedLink, index) => {
        _push(`<span data-v-d0becd9c><a class="support-link"${ssrRenderAttr("href", sosmedLink.link)} target="_blank" data-v-d0becd9c>${ssrInterpolate(sosmedLink.name)}</a>`);
        if (index < sosmedLinks.value.length - 1) {
          _push(`<span data-v-d0becd9c> and </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></p><p class="disclaimer" data-v-d0becd9c>For more Information and Live Streaming Schedule Info.</p></div></div></footer>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("component/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d0becd9c"]]);

export { Footer as F };
//# sourceMappingURL=Footer-09VditFc.mjs.map
