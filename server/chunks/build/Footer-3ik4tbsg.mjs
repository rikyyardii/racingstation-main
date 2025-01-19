import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { c as _export_sfc, _ as _imports_0 } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-0e7dfd03><div class="footer-content" data-v-0e7dfd03><div class="footer-logo" data-v-0e7dfd03><span data-v-0e7dfd03><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation" class="racingstation-logo" data-v-0e7dfd03></span><span class="logo-text" data-v-0e7dfd03>RacingStation</span></div><div class="footer-info" data-v-0e7dfd03><p class="made-with" data-v-0e7dfd03>Made by <img${ssrRenderAttr("src", _imports_0)} alt="RacingStation" class="racingstation-logo" data-v-0e7dfd03> RacingStation</p><p class="data-provider" data-v-0e7dfd03>Support me on<a class="support-link" href="https://saweria.co/RacingStation" target="_blank" data-v-0e7dfd03>Saweria</a> or <a class="support-link" href="https://ko-fi.com/racingstations" target="_blank" data-v-0e7dfd03>Ko-fi</a></p><p class="disclaimer" data-v-0e7dfd03>We&#39;re also on YouTube. Don&#39;t forget to <a class="support-link" target="_blank" href="https://youtube.com/@RacingStations" data-v-0e7dfd03>Subscribe</a></p></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("component/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0e7dfd03"]]);

export { Footer as F };
//# sourceMappingURL=Footer-3ik4tbsg.mjs.map
