import { _ as _imports_0, a as __nuxt_component_0 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { F as Footer } from './Footer-CY3A-4y_.mjs';
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
  __name: "racingstation",
  __ssrInlineRender: true,
  setup(__props) {
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const menuItems = ["Latest News", "Watch Sports"];
    const currentView = ref("Detailed Article");
    useSeoMeta({
      title: "About Us - RacingStation",
      ogTitle: "About Us - RacingStation"
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
      _push(`<main><article class="article-container"><h2>About Us - RacingStation</h2><p> Welcome to RacingStation, your ultimate destination for motorsport news and streaming! Since our inception in 2018, we have been dedicated to bringing the latest updates, in-depth analysis, and thrilling coverage from the world of motorsports. What started as a passion project on YouTube has grown into a comprehensive platform, offering fans around the globe a one-stop hub for all things racing. </p><p> At RacingStation, we pride ourselves on delivering high-quality articles, breaking news, and exclusive insights into Formula 1, MotoGP, WRC, and other major motorsport events. Our team of enthusiasts and experts works tirelessly to ensure you stay informed and entertained, whether you&#39;re a casual fan or a hardcore racing aficionado. </p><p> In addition to our written content, we continue to expand our presence on YouTube, providing live streaming, race highlights, and engaging video content that captures the excitement of motorsport. Our commitment to quality and authenticity has earned us a loyal community of followers who share our love for speed, competition, and innovation. </p><p>Thank you for being part of the RacingStation journey. Together, let&#39;s fuel our passion for motorsport and keep the adrenaline racing!</p><p>RacingStation \u2013 Where Speed Meets Story.</p></article></main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/racingstation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=racingstation-DTzn_BuU.mjs.map
