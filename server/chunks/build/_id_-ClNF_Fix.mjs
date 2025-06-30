import { ref, computed, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { d as useRoute, c as useRouter, u as useRuntimeConfig, e as createError, _ as _imports_0 } from './server.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ClockIcon } from 'lucide-vue-next';
import { F as Footer } from './Footer-09VditFc.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const currentTime = ref("");
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const menuItems = ["Latest News", "Watch Sports", "Tutorial"];
    const streamTitle = ref("");
    const streamEvent = ref("");
    const videoLink = ref("");
    const streamContent = ref("");
    const streamImage = ref("");
    const currentView = ref(null);
    const buttons = ref([]);
    const slugStatus = ref("");
    ref(0);
    const showOverlay = ref(false);
    const redirectUrl = ref("");
    const route = useRoute();
    useRouter();
    const slug = route.params.id || null;
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;
    const IMAGE_URL = config.public.IMAGE_URL;
    const getLink = (item) => {
      switch (item) {
        case "Latest News":
          return "/";
        case "Watch Sports":
          return "/stream";
        case "Tutorial":
          return "/article/tutorial/tutorial";
        default:
          return "/";
      }
    };
    const getImagePath = (image) => {
      if (!IMAGE_URL)
        return "";
      const baseUrl = IMAGE_URL.startsWith("http") ? IMAGE_URL : `https://${IMAGE_URL}`;
      if (!image || typeof image !== "string") {
        return `${baseUrl}/public/img/racingstation-stream.png`;
      }
      if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
      }
      if (image.startsWith("/public/img/")) {
        return `${baseUrl}${image}`;
      }
      return `${baseUrl}/public/img/${image}`;
    };
    const seoTitle = computed(() => streamTitle.value || "RacingStation Stream");
    const fullSeoTitle = computed(() => `${seoTitle.value} on RacingStation`);
    const seoDescription = computed(
      () => streamContent.value || "Stream live sports events including Formula 1, MotoGP, WEC, Football, and more on RacingStation Stream. Enjoy high-quality streaming and stay updated on all your favorite sports."
    );
    const seoImage = computed(() => {
      if (!IMAGE_URL)
        return "";
      return `${IMAGE_URL.startsWith("http") ? IMAGE_URL : `https://${IMAGE_URL}`}/public/img/racingstation-stream.png`;
    });
    const effectiveVideoLink = computed(() => {
      if (slugStatus.value === "enable" && videoLink.value) {
        return videoLink.value;
      } else {
        return "/watch/offline_screen";
      }
    });
    const fetchStreamBySlug = async (slug2) => {
      try {
        const data = await $fetch(`${API_URL}/streams/${slug2}`);
        streamTitle.value = data.title;
        streamEvent.value = data.event;
        streamContent.value = data.content;
        slugStatus.value = data.status;
        streamImage.value = getImagePath(data.image_path);
        if (data.redirect_url) {
          redirectUrl.value = data.redirect_url;
        }
        if (data.status === "enable") {
          videoLink.value = data.link;
        } else {
          videoLink.value = "/watch/offline_screen";
        }
      } catch (error) {
        console.error("Error fetching stream:", error);
        if (error.statusCode === 404) {
          throw createError({
            statusCode: 404,
            statusMessage: "Stream not found"
          });
        }
        throw error;
      }
    };
    const fetchButtonsBySlug = async (slug2) => {
      try {
        const data = await $fetch(`${API_URL}/streams/${slug2}`);
        buttons.value = [];
        ["link", "link2", "link3", "link4"].forEach((key, index) => {
          if (data[key]) {
            buttons.value.push({
              label: `Server ${index + 1}`,
              url: data[key],
              status: data.status
            });
          }
        });
      } catch (error) {
        console.error("Error fetching buttons:", error);
      }
    };
    useSeoMeta({
      title: fullSeoTitle,
      ogTitle: "RacingStation Stream",
      description: seoDescription,
      ogDescription: "Stream live sports events including Formula 1, MotoGP, WEC, Football, and more on RacingStation Stream. Enjoy high-quality streaming and stay updated on all your favorite sports.",
      ogImage: seoImage,
      twitterTitle: "RacingStation Stream",
      twitterDescription: "Stream live sports events including Formula 1, MotoGP, WEC, Football, and more on RacingStation Stream. Enjoy high-quality streaming and stay updated on all your favorite sports.",
      twitterCard: "summary_large_image"
    });
    if (slug) {
      [__temp, __restore] = withAsyncContext(() => fetchStreamBySlug(slug)), await __temp, __restore();
      [__temp, __restore] = withAsyncContext(() => fetchButtonsBySlug(slug)), await __temp, __restore();
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: "Stream not found"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))}><header><div class="header-content"><h1 class="logo"><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image"> RacingStation </h1><div class="header-controls"><button class="icon-button">`);
      if (unref(isDarkMode)) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle">`);
      if (!unref(isMenuOpen)) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav"><ul><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li><a${ssrRenderAttr("href", getLink(item))} class="${ssrRenderClass({ active: unref(currentView) === item })}">${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (unref(isMenuOpen)) {
        _push(`<nav class="mobile-nav"><div class="mobile-nav-content"><button class="icon-button close-menu">`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li><a${ssrRenderAttr("href", getLink(item))} class="${ssrRenderClass({ active: unref(currentView) === item })}">${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showOverlay)) {
        _push(`<div class="clickable-overlay"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main><div class="adsterra-container"><div id="container-f7102c30eb715e25f6e3bf755bfbe92c"></div></div><div class="live-streaming"><h1>${ssrInterpolate(unref(streamTitle))} `);
      if (unref(slugStatus) === "enable") {
        _push(`<span>${ssrInterpolate(unref(streamEvent))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><div class="video-container"><iframe${ssrRenderAttr("src", unref(effectiveVideoLink))} seamless="seamless" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; encrypted-media" allowfullscreen allowtransparency style="${ssrRenderStyle({ "width": "100%", "height": "100%", "overflow": "hidden", "border": "none" })}"></iframe><div class="iframe-overlay"></div></div>`);
      if (unref(slugStatus) === "enable") {
        _push(`<div class="enabled-content"><div class="audio-notice">*If the video player has no sound (muted), press the unmute button or click the sound logo on the bottom right video player.</div><div class="button-container"><!--[-->`);
        ssrRenderList(unref(buttons), (button, index) => {
          _push(`<button class="action-button">${ssrInterpolate(button.label)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="live-commentary"><div class="update-info">`);
      _push(ssrRenderComponent(unref(ClockIcon), null, null, _parent));
      _push(`<span class="time">${ssrInterpolate(unref(currentTime))}</span></div><h1>What is ${ssrInterpolate(unref(streamTitle))}?</h1><p class="text-justify">${ssrInterpolate(unref(streamContent))}</p></div></div><div class="adsterra-container"></div></main>`);
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
//# sourceMappingURL=_id_-ClNF_Fix.mjs.map
