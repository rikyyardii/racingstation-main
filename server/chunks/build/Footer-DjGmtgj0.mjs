import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo-DOf2J2A_.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-ab99b977><div class="footer-content" data-v-ab99b977><div class="footer-logo" data-v-ab99b977><span data-v-ab99b977><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation" class="racingstation-logo" data-v-ab99b977></span><span class="logo-text" data-v-ab99b977>RacingStation</span></div><div class="footer-info" data-v-ab99b977><p class="made-with" data-v-ab99b977>Made by <img${ssrRenderAttr("src", _imports_0)} alt="RacingStation" class="racingstation-logo" data-v-ab99b977> RacingStation</p><p class="data-provider" data-v-ab99b977>Support me on<a class="support-link" href="https://saweria.co/RacingStation" target="_blank" data-v-ab99b977>Saweria</a> or <a class="support-link" href="https://ko-fi.com/racingstations" target="_blank" data-v-ab99b977>Ko-fi</a></p><p class="disclaimer" data-v-ab99b977>We&#39;re also on YouTube. Don&#39;t forget to <a class="support-link" target="_blank" href="https://youtube.com/@RacingStations" data-v-ab99b977>Subscribe</a>!</p></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("component/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ab99b977"]]);

export { Footer as F };
//# sourceMappingURL=Footer-DjGmtgj0.mjs.map
