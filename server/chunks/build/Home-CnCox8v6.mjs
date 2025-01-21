import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { c as _export_sfc, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import Artikel from './Artikel-DTnjxHHM.mjs';
import LiveStream from './LiveStream-ezrx8RAG.mjs';
import { F as Footer } from './Footer-3ik4tbsg.mjs';
import { useRouter } from 'vue-router';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-vue-next';
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-cbe4beaa><header data-v-cbe4beaa><div class="header-content" data-v-cbe4beaa><h1 class="logo" data-v-cbe4beaa><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-cbe4beaa> Dashboard </h1><div class="header-controls" data-v-cbe4beaa><button class="icon-button" data-v-cbe4beaa>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-cbe4beaa>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-cbe4beaa><ul data-v-cbe4beaa><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-cbe4beaa><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-cbe4beaa>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-cbe4beaa><div class="mobile-nav-content" data-v-cbe4beaa><button class="icon-button close-menu" data-v-cbe4beaa>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-cbe4beaa><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-cbe4beaa><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-cbe4beaa>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Home") {
        _push(`<div class="home-view section" data-v-cbe4beaa><div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto px-6" data-v-cbe4beaa><div class="stats-container" data-v-cbe4beaa><div class="stat-card" data-v-cbe4beaa><h3 data-v-cbe4beaa>Total Articles</h3><div class="stat-value" data-v-cbe4beaa>${ssrInterpolate(articleCount.value)}</div><p class="stat-description" data-v-cbe4beaa>Published articles on your platform</p></div><div class="stat-card" data-v-cbe4beaa><h3 data-v-cbe4beaa>Total Streams</h3><div class="stat-value" data-v-cbe4beaa>${ssrInterpolate(streamCount.value)}</div><p class="stat-description" data-v-cbe4beaa>Currently live streams</p></div><div class="stat-card" data-v-cbe4beaa><h3 data-v-cbe4beaa>Nuxt Memory Usage</h3><div class="stat-value" data-v-cbe4beaa>${ssrInterpolate(memoryUsage.value.rss)}</div><p class="stat-description" data-v-cbe4beaa> RSS: ${ssrInterpolate(memoryUsage.value.rss)} <br data-v-cbe4beaa> Heap Total: ${ssrInterpolate(memoryUsage.value.heapTotal)} <br data-v-cbe4beaa> Heap Used: ${ssrInterpolate(memoryUsage.value.heapUsed)} <br data-v-cbe4beaa> External: ${ssrInterpolate(memoryUsage.value.external)}</p></div></div></div></div>`);
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
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cbe4beaa"]]);

export { Home as default };
//# sourceMappingURL=Home-CnCox8v6.mjs.map
