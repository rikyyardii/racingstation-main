import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRuntimeConfig, a as _imports_0 } from './server.mjs';
import Artikel from './Artikel.vue.mjs';
import LiveStream from './LiveStream.vue.mjs';
import Ads from './Ads.vue.mjs';
import { F as Footer } from './Footer.vue.mjs';
import { useRouter } from 'vue-router';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ArrowRightIcon } from 'lucide-vue-next';
import { u as useSeoMeta } from './v3.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'luxon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'devalue';

const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const articleCount = ref(0);
    const streamCount = ref(0);
    const adslinkCount = ref(0);
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Home");
    const menuItems = ["Home", "Logout"];
    useRouter();
    const { API_URL } = useRuntimeConfig().public;
    ref(false);
    const memoryUsage = ref({
      rss: "0 MB",
      heapTotal: "0 MB",
      heapUsed: "0 MB",
      external: "0 MB"
    });
    useSeoMeta({
      title: "RacingStation Dashboard",
      ogTitle: "RacingStation Dashboard"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-6319ebea><header data-v-6319ebea><div class="header-content" data-v-6319ebea><h1 class="logo" data-v-6319ebea><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-6319ebea> Dashboard </h1><div class="header-controls" data-v-6319ebea><button class="icon-button" data-v-6319ebea>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-6319ebea>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-6319ebea><ul data-v-6319ebea><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-6319ebea><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-6319ebea>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-6319ebea><div class="mobile-nav-content" data-v-6319ebea><button class="icon-button close-menu" data-v-6319ebea>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-6319ebea><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-6319ebea><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-6319ebea>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Home") {
        _push(`<div class="home-view section" data-v-6319ebea><div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto px-6" data-v-6319ebea><div class="stats-container" data-v-6319ebea><div class="stat-card clickable" data-v-6319ebea><h3 data-v-6319ebea>Total Articles</h3><div class="stat-value" data-v-6319ebea>${ssrInterpolate(articleCount.value)}</div><p class="stat-description" data-v-6319ebea>Published articles on your platform</p>`);
        _push(ssrRenderComponent(unref(ArrowRightIcon), { class: "card-arrow" }, null, _parent));
        _push(`</div><div class="stat-card clickable" data-v-6319ebea><h3 data-v-6319ebea>Total Streams</h3><div class="stat-value" data-v-6319ebea>${ssrInterpolate(streamCount.value)}</div><p class="stat-description" data-v-6319ebea>Currently live streams</p>`);
        _push(ssrRenderComponent(unref(ArrowRightIcon), { class: "card-arrow" }, null, _parent));
        _push(`</div><div class="stat-card clickable" data-v-6319ebea><h3 data-v-6319ebea>Ads Direct Link</h3><div class="stat-value" data-v-6319ebea>${ssrInterpolate(adslinkCount.value)}</div><p class="stat-description" data-v-6319ebea>Currently place on website</p>`);
        _push(ssrRenderComponent(unref(ArrowRightIcon), { class: "card-arrow" }, null, _parent));
        _push(`</div><div class="stat-card" data-v-6319ebea><h3 data-v-6319ebea>Nuxt Memory Usage</h3><div class="stat-value" data-v-6319ebea>${ssrInterpolate(memoryUsage.value.rss)}</div><p class="stat-description" data-v-6319ebea> RSS: ${ssrInterpolate(memoryUsage.value.rss)} <br data-v-6319ebea> Heap Total: ${ssrInterpolate(memoryUsage.value.heapTotal)} <br data-v-6319ebea> Heap Used: ${ssrInterpolate(memoryUsage.value.heapUsed)} <br data-v-6319ebea> External: ${ssrInterpolate(memoryUsage.value.external)}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Artikel") {
        _push(ssrRenderComponent(Artikel, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Livestream") {
        _push(ssrRenderComponent(LiveStream, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Ads") {
        _push(ssrRenderComponent(Ads, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/components/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6319ebea"]]);

export { Home as default };
//# sourceMappingURL=Home.vue.mjs.map
