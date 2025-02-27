import { _ as _imports_0, a as __nuxt_component_0 } from './server.mjs';
import { ref, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { F as Footer } from './Footer-B2nAXvD2.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-vue-next';
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
  __name: "disclaimer",
  __ssrInlineRender: true,
  setup(__props) {
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const menuItems = ["Latest News", "Watch Sports"];
    const currentView = ref("Detailed Article");
    useSeoMeta({
      title: "Disclaimer - RacingStation",
      ogTitle: "Disclaimer - RacingStation"
    });
    const getLink = (item) => {
      switch (item) {
        case "Latest News":
          return "/";
        case "Watch Sports":
          return "/stream";
        default:
          return "/";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_bdt = resolveComponent("bdt");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))}><header><div class="header-content"><h1 class="logo"><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image"> RacingStation </h1><div class="header-controls"><button class="icon-button">`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle">`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav"><ul><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: getLink(item),
          class: { active: currentView.value === item }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav"><div class="mobile-nav-content"><button class="icon-button close-menu">`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li><a${ssrRenderAttr("href", getLink(item))} class="${ssrRenderClass({ active: currentView.value === item })}">${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main><article class="article-container"><strong><h2>Website Content Disclaimer</h2></strong><p>Last updated: February 26, 2025</p><strong><p> No videos are hosted directly on this website. All streams are embedded from third-party platforms such as YouTube and other similar services. This site assumes no responsibility for the legality of external content. For any legal matters pertaining to media files, <em>please contact the respective content owners or hosting providers directly</em>. </p></strong><p> The information provided by RacingStation (&#39;we&#39;, &#39;us&#39;, or &#39;our&#39;) on <a style="${ssrRenderStyle({ "color": "blue" })}" href="https://racingstation.top/" target="_blank">RacingStation Website</a> (the &#39;Site&#39;)\xA0is for general informational purposes only. All information on <span style="${ssrRenderStyle({ "font-size": "15px" })}">`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`the Site`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`\xA0</span>is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on <span style="${ssrRenderStyle({ "font-size": "15px" })}"><span style="${ssrRenderStyle({ "font-size": "15px" })}">`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`the Site`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`</span></span>. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF <span style="${ssrRenderStyle({ "font-size": "15px" })}"><span style="${ssrRenderStyle({ "font-size": "15px" })}">`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`THE SITE`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`</span>\xA0 </span>OR RELIANCE ON ANY INFORMATION PROVIDED ON <span style="${ssrRenderStyle({ "font-size": "15px" })}"><span style="${ssrRenderStyle({ "font-size": "15px" })}"><span style="${ssrRenderStyle({ "font-size": "15px" })}">`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`THE SITE`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`</span></span></span>. YOUR USE OF <span style="${ssrRenderStyle({ "font-size": "15px" })}"><span style="${ssrRenderStyle({ "font-size": "15px" })}"><span style="${ssrRenderStyle({ "font-size": "15px" })}">`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`THE SITE`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`</span></span>\xA0 </span>AND YOUR RELIANCE ON ANY INFORMATION ON <span style="${ssrRenderStyle({ "font-size": "15px" })}"><span style="${ssrRenderStyle({ "font-size": "15px" })}"><span style="${ssrRenderStyle({ "font-size": "15px" })}">`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`THE SITE`);
      _push(ssrRenderComponent(_component_bdt, { class: "block-component" }, null, _parent));
      _push(`\xA0</span></span></span>IS SOLELY AT YOUR OWN RISK. </p></article></main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/disclaimer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=disclaimer-HOlDDRsg.mjs.map
