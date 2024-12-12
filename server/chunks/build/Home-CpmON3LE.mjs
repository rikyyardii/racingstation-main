import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-DOf2J2A_.mjs';
import Artikel from './Artikel-B85MEMwZ.mjs';
import LiveStream from './LiveStream-C7_pDPfM.mjs';
import { F as Footer } from './Footer-DjGmtgj0.mjs';
import { useRouter } from 'vue-router';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-vue-next';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
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
    const menuItems = ["Home", "Artikel", "Live Stream", "Logout"];
    useRouter();
    const getDynamicHost = () => {
      const url = new URL((void 0).location.href);
      url.port = "5000";
      return url.origin;
    };
    getDynamicHost();
    const memoryUsage = ref({
      rss: "0 MB",
      heapTotal: "0 MB",
      heapUsed: "0 MB",
      external: "0 MB"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-f911439f><header data-v-f911439f><div class="header-content" data-v-f911439f><h1 class="logo" data-v-f911439f><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-f911439f> Dashboard </h1><div class="header-controls" data-v-f911439f><button class="icon-button" data-v-f911439f>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-f911439f>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-f911439f><ul data-v-f911439f><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li data-v-f911439f><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-f911439f>${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-f911439f><div class="mobile-nav-content" data-v-f911439f><button class="icon-button close-menu" data-v-f911439f>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-f911439f><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li data-v-f911439f><a href="#" class="${ssrRenderClass({ active: currentView.value === item })}" data-v-f911439f>${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Home") {
        _push(`<div class="home-view section" data-v-f911439f><div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto px-6" data-v-f911439f><div class="stats-container" data-v-f911439f><div class="stat-card" data-v-f911439f><h3 data-v-f911439f>Total Articles</h3><div class="stat-value" data-v-f911439f>${ssrInterpolate(articleCount.value)}</div><p class="stat-description" data-v-f911439f>Published articles on your platform</p></div><div class="stat-card" data-v-f911439f><h3 data-v-f911439f>Total Streams</h3><div class="stat-value" data-v-f911439f>${ssrInterpolate(streamCount.value)}</div><p class="stat-description" data-v-f911439f>Currently live streams</p></div><div class="stat-card" data-v-f911439f><h3 data-v-f911439f>Nuxt Memory Usage</h3><div class="stat-value" data-v-f911439f>${ssrInterpolate(memoryUsage.value.rss)}</div><p class="stat-description" data-v-f911439f> RSS: ${ssrInterpolate(memoryUsage.value.rss)} <br data-v-f911439f> Heap Total: ${ssrInterpolate(memoryUsage.value.heapTotal)} <br data-v-f911439f> Heap Used: ${ssrInterpolate(memoryUsage.value.heapUsed)} <br data-v-f911439f> External: ${ssrInterpolate(memoryUsage.value.external)}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Artikel") {
        _push(ssrRenderComponent(Artikel, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (currentView.value === "Live Stream") {
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
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f911439f"]]);

export { Home as default };
//# sourceMappingURL=Home-CpmON3LE.mjs.map
