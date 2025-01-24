import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { useRoute } from 'vue-router';
import { F as Footer } from './Footer-3ik4tbsg.mjs';
import { A as Adsense } from './Adsense-BQOULn5G.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ClockIcon } from 'lucide-vue-next';
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

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const currentTime = ref("");
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const menuItems = ["Latest News", "Watch Sports"];
    const route = useRoute();
    route.params.id || null;
    const streamTitle = ref("");
    const streamEvent = ref("");
    const videoLink = ref("");
    const streamContent = ref("");
    ref("");
    const currentView = ref(null);
    const buttons = ref([]);
    const slugStatus = ref("");
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
    const { API_URL, IMAGE_URL } = useRuntimeConfig().public;
    computed(() => streamTitle.value || "RacingStation Stream");
    computed(() => streamContent.value || "Watch live streaming of your favorite events.");
    const seoImage = computed(() => `${IMAGE_URL.startsWith("http") ? IMAGE_URL : `https://${IMAGE_URL}`}/public/img/racingstation-stream.png`);
    useSeoMeta({
      title: "RacingStation Stream",
      ogTitle: "RacingStation Stream",
      description: "Watch live streaming of your favorite events.",
      ogDescription: "Watch live streaming of your favorite events.",
      ogImage: seoImage,
      twitterTitle: "RacingStation Stream",
      twitterDescription: "Watch live streaming of your favorite events.",
      twitterCard: "summary_large_image"
    });
    computed(() => {
      return streamEvent.value ? `(${streamEvent.value})` : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
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
        _push(`<li><a${ssrRenderAttr("href", getLink(item))} class="${ssrRenderClass({ active: currentView.value === item })}">${ssrInterpolate(item)}</a></li>`);
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
      _push(`<main>`);
      _push(ssrRenderComponent(Adsense, null, null, _parent));
      _push(`<div class="live-streaming"><h1>${ssrInterpolate(streamTitle.value)} `);
      if (streamEvent.value) {
        _push(`<span>(${ssrInterpolate(streamEvent.value)})</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><div class="video-container"><iframe${ssrRenderAttr("src", videoLink.value)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; encrypted-media" allowfullscreen allowtransparency style="${ssrRenderStyle({ "width": "100%", "height": "100%", "overflow": "hidden", "border": "none" })}"></iframe><div class="iframe-overlay"></div></div>`);
      if (slugStatus.value === "enable") {
        _push(`<div class="button-container"><!--[-->`);
        ssrRenderList(buttons.value, (button, index) => {
          _push(`<button class="action-button">${ssrInterpolate(button.label)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="live-commentary"><div class="update-info">`);
      _push(ssrRenderComponent(unref(ClockIcon), null, null, _parent));
      _push(`<span class="time">${ssrInterpolate(currentTime.value)}</span></div><h1>What is ${ssrInterpolate(streamTitle.value)}?</h1><p class="text-justify">${ssrInterpolate(streamContent.value)}</p></div></div></main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/watch/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CwXLC2eY.mjs.map
