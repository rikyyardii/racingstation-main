import { composableNames, unpackMeta } from '@unhead/shared';
import { ref, watchEffect, watch, getCurrentInstance, mergeProps, useSSRContext } from 'vue';
import { c as _export_sfc, i as injectHead, r as resolveUnrefHeadInput } from './server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';

function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  getCurrentInstance();
  return entry;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
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

export { Adsense as A, useSeoMeta as u };
//# sourceMappingURL=Adsense-BGZbEMjz.mjs.map
