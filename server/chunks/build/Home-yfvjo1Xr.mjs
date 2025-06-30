import { b as _export_sfc, u as useRuntimeConfig, _ as _imports_0, a as __nuxt_component_0 } from './server.mjs';
import { ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { F as Footer } from './Footer-09VditFc.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ArrowRightIcon, CalendarIcon } from 'lucide-vue-next';
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
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const articleCount = ref(0);
    const streamCount = ref(0);
    const adslinkCount = ref(0);
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    ref(false);
    const currentDate = ref(/* @__PURE__ */ new Date());
    const memoryUsage = ref({
      rss: "0 MB",
      heapTotal: "0 MB",
      heapUsed: "0 MB",
      external: "0 MB"
    });
    ref(null);
    const isJumping = ref(false);
    const obstaclePosition = ref(300);
    ref(2);
    const gameScore = ref(0);
    const highScore = ref(0);
    ref(false);
    const formattedMonthDayYear = computed(() => {
      const day = currentDate.value.getDate();
      const month = currentDate.value.toLocaleString("en-US", { month: "long" });
      const year = currentDate.value.getFullYear();
      return `${day} ${month} ${year}`;
    });
    const dayOfWeek = computed(() => {
      const options = { weekday: "long" };
      return currentDate.value.toLocaleDateString(void 0, options);
    });
    const formattedTime = computed(() => {
      const hours = currentDate.value.getHours().toString().padStart(2, "0");
      const minutes = currentDate.value.getMinutes().toString().padStart(2, "0");
      const seconds = currentDate.value.getSeconds().toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    });
    const greetingMessage = computed(() => {
      const hour = currentDate.value.getHours();
      if (hour >= 5 && hour < 12) {
        return "Good morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    });
    const toggleMenu = () => {
      if ((void 0).innerWidth <= 768) {
        isMenuOpen.value = !isMenuOpen.value;
      }
    };
    const { API_URL } = useRuntimeConfig().public;
    useSeoMeta({
      title: "RacingStation Dashboard",
      ogTitle: "RacingStation Dashboard"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app admin" }, _attrs))} data-v-deffa98b><header data-v-deffa98b><div class="header-content" data-v-deffa98b><h1 class="logo" data-v-deffa98b><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-deffa98b> Dashboard </h1><div class="header-controls" data-v-deffa98b><button class="icon-button" data-v-deffa98b>`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle" data-v-deffa98b>`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav" data-v-deffa98b><ul data-v-deffa98b><li data-v-deffa98b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "#",
        class: { active: _ctx.$route.path === "/rikya" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-deffa98b><a href="#" data-v-deffa98b>Logout</a></li></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav" data-v-deffa98b><div class="mobile-nav-content" data-v-deffa98b><button class="icon-button close-menu" data-v-deffa98b>`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul data-v-deffa98b><li data-v-deffa98b>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/rikya/components",
          onClick: toggleMenu,
          class: { active: _ctx.$route.path === "/rikya" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Home `);
            } else {
              return [
                createTextVNode(" Home ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-deffa98b><a href="#" data-v-deffa98b>Logout</a></li></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="home-view section" data-v-deffa98b><div class="dashboard-container" data-v-deffa98b><div class="dashboard-grid" data-v-deffa98b><div class="stats-column" data-v-deffa98b><div class="stat-card clickable" data-v-deffa98b><h3 data-v-deffa98b>Total Articles</h3><div class="stat-value" data-v-deffa98b>${ssrInterpolate(articleCount.value)}</div><p class="stat-description" data-v-deffa98b>Published articles on your platform</p>`);
      _push(ssrRenderComponent(unref(ArrowRightIcon), { class: "card-arrow" }, null, _parent));
      _push(`</div><div class="stat-card clickable" data-v-deffa98b><h3 data-v-deffa98b>Total Streams</h3><div class="stat-value" data-v-deffa98b>${ssrInterpolate(streamCount.value)}</div><p class="stat-description" data-v-deffa98b>Currently live streams</p>`);
      _push(ssrRenderComponent(unref(ArrowRightIcon), { class: "card-arrow" }, null, _parent));
      _push(`</div><div class="stat-card clickable" data-v-deffa98b><h3 data-v-deffa98b>Ads Direct Link</h3><div class="stat-value" data-v-deffa98b>${ssrInterpolate(adslinkCount.value)}</div><p class="stat-description" data-v-deffa98b>Currently place on website</p>`);
      _push(ssrRenderComponent(unref(ArrowRightIcon), { class: "card-arrow" }, null, _parent));
      _push(`</div><div class="stat-card" data-v-deffa98b><h3 data-v-deffa98b>Nuxt Memory Usage</h3><div class="stat-value" data-v-deffa98b>${ssrInterpolate(memoryUsage.value.rss)}</div><p class="stat-description" data-v-deffa98b> RSS: ${ssrInterpolate(memoryUsage.value.rss)} <br data-v-deffa98b> Heap Total: ${ssrInterpolate(memoryUsage.value.heapTotal)} <br data-v-deffa98b> Heap Used: ${ssrInterpolate(memoryUsage.value.heapUsed)} <br data-v-deffa98b> External: ${ssrInterpolate(memoryUsage.value.external)}</p></div></div><div class="date-column" data-v-deffa98b><div class="date-time-card" data-v-deffa98b><h3 data-v-deffa98b>${ssrInterpolate(greetingMessage.value)}, Riky.</h3><div class="date-value" data-v-deffa98b>${ssrInterpolate(formattedMonthDayYear.value)}</div><div class="time-value" data-v-deffa98b>${ssrInterpolate(formattedTime.value)}</div><div class="day-value" data-v-deffa98b>${ssrInterpolate(dayOfWeek.value)}</div><div class="dino-game-container" data-v-deffa98b><div class="dino-game" data-v-deffa98b><div class="game-score" data-v-deffa98b><span data-v-deffa98b>HI ${ssrInterpolate(String(highScore.value).padStart(5, "0"))}</span><span data-v-deffa98b>${ssrInterpolate(String(gameScore.value).padStart(5, "0"))}</span></div><div class="stars" data-v-deffa98b><div class="star" style="${ssrRenderStyle({ "left": "10%", "top": "15%" })}" data-v-deffa98b></div><div class="star" style="${ssrRenderStyle({ "left": "25%", "top": "25%" })}" data-v-deffa98b></div><div class="star" style="${ssrRenderStyle({ "left": "45%", "top": "10%" })}" data-v-deffa98b></div><div class="star" style="${ssrRenderStyle({ "left": "65%", "top": "20%" })}" data-v-deffa98b></div><div class="star" style="${ssrRenderStyle({ "left": "80%", "top": "15%" })}" data-v-deffa98b></div><div class="star" style="${ssrRenderStyle({ "left": "90%", "top": "30%" })}" data-v-deffa98b></div></div><div class="moon" data-v-deffa98b></div><div class="${ssrRenderClass([{ jump: isJumping.value }, "dino-character"])}" data-v-deffa98b><div class="dino-body" data-v-deffa98b></div><div class="dino-head" data-v-deffa98b></div><div class="dino-eye" data-v-deffa98b></div><div class="dino-leg1" data-v-deffa98b></div><div class="dino-leg2" data-v-deffa98b></div><div class="dino-arm" data-v-deffa98b></div><div class="dino-tail" data-v-deffa98b></div></div><div class="cactus" style="${ssrRenderStyle({ left: obstaclePosition.value + "px" })}" data-v-deffa98b><div class="cactus-body" data-v-deffa98b></div><div class="cactus-arm1" data-v-deffa98b></div><div class="cactus-arm2" data-v-deffa98b></div></div><div class="ground-line" data-v-deffa98b></div></div><div class="game-message" data-v-deffa98b>Have a great day</div></div>`);
      _push(ssrRenderComponent(unref(CalendarIcon), { class: "date-icon" }, null, _parent));
      _push(`</div></div></div></div></div>`);
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
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-deffa98b"]]);

export { Home as default };
//# sourceMappingURL=Home-yfvjo1Xr.mjs.map
