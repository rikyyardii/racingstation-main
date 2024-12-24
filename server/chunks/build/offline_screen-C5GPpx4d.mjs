import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-B1WKmCGa.mjs';
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
import 'vue-router';

const _sfc_main = {
  name: "OfflineScreen",
  data() {
    return {
      resizeTimeout: null
    };
  },
  mounted() {
    this.createBackgroundLines();
    this.createMovingLine();
    (void 0).addEventListener("resize", this.handleResize);
    this.adjustForIframe();
  },
  beforeUnmount() {
    (void 0).removeEventListener("resize", this.handleResize);
  },
  methods: {
    createBackgroundLines() {
      const backgroundLines = this.$refs.backgroundLines;
      if (!backgroundLines)
        return;
      backgroundLines.innerHTML = "";
      const screenWidth = this.$el.clientWidth;
      const lineCount = screenWidth <= 768 ? 10 : 20;
      const spacing = 100 / lineCount;
      for (let i = 0; i < lineCount; i++) {
        const line = (void 0).createElement("div");
        line.className = "line";
        line.style.top = `${i * spacing}%`;
        line.style.background = `linear-gradient(90deg, 
              transparent 0%, 
              ${i % 2 === 0 ? "#4DD8E6" : "#0066FF"} 50%, 
              transparent 100%
            )`;
        line.style.animationDelay = `${i * 0.2}s`;
        backgroundLines.appendChild(line);
      }
    },
    createMovingLine() {
      const backgroundLines = this.$refs.backgroundLines;
      const movingLine = (void 0).createElement("div");
      movingLine.className = "moving-line";
      backgroundLines.appendChild(movingLine);
      const animateLine = () => {
        const progress = Date.now() % 4e3 / 4e3;
        const xPos = progress * this.$el.clientWidth;
        movingLine.style.transform = `translateX(${xPos}px)`;
        requestAnimationFrame(animateLine);
      };
      animateLine();
    },
    handleResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.createBackgroundLines();
        this.adjustForIframe();
      }, 250);
    },
    adjustForIframe() {
      const isInIframe = (void 0).self !== (void 0).top;
      if (isInIframe) {
        this.$el.style.position = "absolute";
        this.$el.style.inset = "0";
        this.$el.style.height = "100%";
        this.$el.style.minHeight = "0";
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "offline-screen" }, _attrs))} data-v-81961ae9><div class="background-lines" data-v-81961ae9></div><div class="content" data-v-81961ae9><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo" data-v-81961ae9><div class="offline-status" data-v-81961ae9><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wifi-off-icon" data-v-81961ae9><line x1="1" y1="1" x2="23" y2="23" data-v-81961ae9></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" data-v-81961ae9></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" data-v-81961ae9></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9" data-v-81961ae9></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" data-v-81961ae9></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0" data-v-81961ae9></path><line x1="12" y1="20" x2="12.01" y2="20" data-v-81961ae9></line></svg><span data-v-81961ae9>Stream Offline</span></div><h1 data-v-81961ae9>We&#39;ll Be Back Soon!</h1><p data-v-81961ae9>The stream is temporarily offline.</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/watch/offline_screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const offline_screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-81961ae9"]]);

export { offline_screen as default };
//# sourceMappingURL=offline_screen-C5GPpx4d.mjs.map
