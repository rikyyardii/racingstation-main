import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { b as _export_sfc, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import Artikel from './Artikel-DOuNtMK3.mjs';
import LiveStream from './LiveStream-DZkQPsV6.mjs';
import { F as Footer } from './Footer-CY3A-4y_.mjs';
import { useRouter } from 'vue-router';
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
import 'luxon';

const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const articleCount = ref(0);
    const streamCount = ref(0);
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const currentView = ref("Home");
    const menuItems = ["Home", "Artikel", "Livestream", "Logout"];
    useRouter();
    useRuntimeConfig().public;
    const memoryUsage = ref({
      rss: "0 MB",
      heapTotal: "0 MB",
      heapUsed: "0 MB",
      external: "0 MB"
    });
    useSeoMeta({
      title: "Dashboard",
      ogTitle: "Dashboard"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-9d238598><header data-v-9d238598><div class="header-content" data-v-9d238598><h1 class="logo" data-v-9d238598><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-9d238598> Dashboard </h1><div class="header-controls" data-v-9d238598><button class="icon-button" data-v-9d238598>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-9d238598>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-9d238598><ul data-v-9d238598><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-9d238598><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-9d238598>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-9d238598><div class="mobile-nav-content" data-v-9d238598><button class="icon-button close-menu" data-v-9d238598>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-9d238598><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-9d238598><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-9d238598>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Home") {
        _push(`<div class="home-view section" data-v-9d238598><div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto px-6" data-v-9d238598><div class="stats-container" data-v-9d238598><div class="stat-card" data-v-9d238598><h3 data-v-9d238598>Total Articles</h3><div class="stat-value" data-v-9d238598>${ssrInterpolate(articleCount.value)}</div><p class="stat-description" data-v-9d238598>Published articles on your platform</p></div><div class="stat-card" data-v-9d238598><h3 data-v-9d238598>Total Streams</h3><div class="stat-value" data-v-9d238598>${ssrInterpolate(streamCount.value)}</div><p class="stat-description" data-v-9d238598>Currently live streams</p></div><div class="stat-card" data-v-9d238598><h3 data-v-9d238598>Nuxt Memory Usage</h3><div class="stat-value" data-v-9d238598>${ssrInterpolate(memoryUsage.value.rss)}</div><p class="stat-description" data-v-9d238598> RSS: ${ssrInterpolate(memoryUsage.value.rss)} <br data-v-9d238598> Heap Total: ${ssrInterpolate(memoryUsage.value.heapTotal)} <br data-v-9d238598> Heap Used: ${ssrInterpolate(memoryUsage.value.heapUsed)} <br data-v-9d238598> External: ${ssrInterpolate(memoryUsage.value.external)}</p></div></div></div></div>`);
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
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9d238598"]]);

export { Home as default };
//# sourceMappingURL=Home-CVeNsvAC.mjs.map
