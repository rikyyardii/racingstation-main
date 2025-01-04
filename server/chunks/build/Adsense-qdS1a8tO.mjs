import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "Adsense",
  __ssrInlineRender: true,
  setup(__props) {
    const showAds = ref(true);
    const adSlot = ref("1234567890");
    return (_ctx, _push, _parent, _attrs) => {
      if (showAds.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "ads-container" }, _attrs))} data-v-2ac7c2f2><ins class="adsbygoogle" style="${ssrRenderStyle({ "display": "block", "width": "100%" })}" data-ad-client="ca-pub-4828507555708828"${ssrRenderAttr("data-ad-slot", adSlot.value)} data-ad-format="auto" data-full-width-responsive="true" data-v-2ac7c2f2></ins></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("component/Adsense.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Adsense = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2ac7c2f2"]]);

export { Adsense as A };
//# sourceMappingURL=Adsense-qdS1a8tO.mjs.map
