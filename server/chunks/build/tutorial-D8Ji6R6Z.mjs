import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-B1WKmCGa.mjs';
import { useRoute, useRouter } from 'vue-router';
import { F as Footer } from './Footer-09VditFc.mjs';
import { SunIcon, MoonIcon, MenuIcon, XIcon, ArrowLeft, Calendar, User, Clock } from 'lucide-vue-next';
import { u as useRuntimeConfig } from './server.mjs';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
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
  __name: "tutorial",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    ref("");
    const isMenuOpen = ref(false);
    const isDarkMode = ref(true);
    const menuItems = ["Latest News", "Watch Sports"];
    const currentView = ref("Tutorial");
    const {
      public: { API_URL }
    } = useRuntimeConfig();
    const twitterLink = ref("");
    ref(true);
    ref(null);
    const tutorialImages = ref([
      {
        id: 1,
        src: "/img/tutorial-1.jpg",
        alt: "Google search results showing RacingStation - News and Stream",
        caption: "Search for 'racingstation' in Google and select the RacingStation - News and Stream result"
      },
      {
        id: 2,
        src: "/img/tutorial-2.jpg",
        alt: "Mobile hamburger menu showing Watch Sports option",
        caption: "Mobile view: Click the hamburger menu (three lines) and select 'Watch Sports'"
      },
      {
        id: 3,
        src: "/img/tutorial-3.jpg",
        alt: "Desktop view showing Watch Sports button in header",
        caption: "Desktop view: Click 'Watch Sports' in the top-right corner"
      },
      {
        id: 4,
        src: "/img/tutorial-4.jpg",
        alt: "RacingStation Stream homepage showing event cards",
        caption: "RacingStation Stream homepage with various racing event cards"
      },
      {
        id: 5,
        src: "/img/tutorial-5.jpg",
        alt: "Stream cards showing LIVE NOW indicators",
        caption: "Look for cards with 'LIVE NOW' tags to identify active streams"
      },
      {
        id: 6,
        src: "/img/tutorial-6.jpg",
        alt: "Live video player showing active stream",
        caption: "Active live stream with video player running"
      },
      {
        id: 7,
        src: "/img/tutorial-7.jpg",
        alt: "Video player showing Stream Offline message",
        caption: "Stream Offline message when the broadcast hasn't started yet"
      },
      {
        id: 8,
        src: "/img/tutorial-8.jpg",
        alt: "Video player audio controls showing unmute button",
        caption: "Click the sound icon to unmute audio (\u{1F507} \u2192 \u{1F50A})"
      }
    ]);
    const tutorialData = ref({
      category: "Tutorial",
      title: "How to watch Formula 1, MotoGP, WEC and other live streaming in RacingStation?",
      date: (/* @__PURE__ */ new Date()).toISOString(),
      author: "RacingStation",
      reading_time: 15,
      image: "/img/tutorial-img.jpg",
      content: `
    <div class="tutorial-content">
      <p>RacingStation is a popular platform for motorsport enthusiasts since 2018 to watch live streams of major racing events like Formula 1, MotoGP, and the World Endurance Championship (WEC). This step-by-step tutorial explains how to access these streams on RacingStation Website seamlessly :</p>
      
      <div class="troubleshoot-box">
        <p>\u23F1\uFE0F <strong>Firstly, follow our Twitter for the most up-to-date, real-time RacingStation Stream live streaming schedule.</strong></p>
      </div>
      
      <h3>Step 1: Access the RacingStation Stream Page</h3>
      <ol>
        <li>Open your preferred web browser <em>(Chrome, Firefox, or Edge)</em></li>
        <li>Type <strong>racingstation</strong> in the Google search bar and then select the card titled <strong>RacingStation - News and Stream</strong> <em>(as shown in the image)</em></li>
        // IMAGE 1 //
        <li>On the RacingStation website:
          <ul>
            <li>On the mobile view, click the <strong>three-line icon (hamburger menu) in the top-right corner of the screen</strong>, then select the <strong>Watch Sports</strong> text to go to the RacingStation Stream page <em>(as shown in the image)</em></li>
            // IMAGE 2 //
            <li>On the desktop view, simply click the <strong>Watch Sports text in the top-right corner of the screen</strong> <em>(as shown in the image)</em></li>
            // IMAGE 3 //
            <li>Or just simply <a href="https://racingstation.top/stream" target="_blank" rel="noopener noreferrer">click here</a> to access the <strong>RacingStation Stream Page</strong></li>
          </ul>
        </li>
      </ol>

      <h3>Step 2: Locate Live Streams</h3>
      <ol>
        <li>On the <strong>RacingStation Stream</strong> homepage, you'll see a grid of "cards" representing ongoing/upcoming events.</li>
        // IMAGE 4 //
        <li><strong>Identify active streams</strong>:
          // IMAGE 5 //
          <ul>
            <li>Look for cards labeled <strong>"LIVE NOW"</strong> (usually in a red/colored banner).</li>
            <li>Cards <em>without</em> this tag are either upcoming or offline.</li>
          </ul>
        </li>
        <li><strong>Click the card</strong> for your desired event (e.g., Formula 1, MotoGP, or WEC).</li>
      </ol>
      
      <div class="note-box">
        <p>\u{1F4A1} <em>Note: If no streams are live, check back closer to race times. Schedules align with official race calendars.</em></p>
      </div>

      <h3>Step 3: Start Watching the Stream</h3>
      <ol>
        <li>After clicking a card:
          <ul>
            <li><strong>If the stream is live</strong>: A video player will launch automatically, showing the live broadcast.</li>
            // IMAGE 6 //
            <li><strong>If the stream hasn't started</strong>: The player displays <strong>"Stream Offline"</strong>.</li>
            // IMAGE 7 //
          </ul>
        </li>
      </ol>
      
      <div class="timing-reminder">
        <p>\u23F1\uFE0F RacingStation streams go live <strong>30 minutes before races start</strong>. Return at this time for uninterrupted viewing.</p>
      </div>

      <h3>Step 4: Troubleshoot Audio Issues</h3>
      <p>If the stream plays but has <strong>no sound</strong>:</p>
      <ol>
        <li>Click the <strong>sound icon</strong> (\u{1F507}) <strong>once</strong> to toggle <strong>unmute</strong> (icon changes to \u{1F50A}). at the <em>bottom-right corner</em> of the video player. or simply click the unmute icon on the video player if the unmute logo is available.</li>
        // IMAGE 8 //
        <li>Adjust the volume to your comfort level using the volume controls on your device.</li>
      </ol>
      
      <div class="troubleshoot-box">
        <p>\u{1F6AB} <em>Still no audio?</em> Disable ad-blockers/extensions (they may interfere with the player) and refresh the page.</p>
      </div>

      <h3>Additional Tips</h3>
      <ul>
        <li><strong>Twitter Account:</strong>Follow our Twitter for the most up-to-date live streaming schedule in real-time.</li>
        <li><strong>Server:</strong> There are 4 server options for each live stream. Each server broadcasts the same live content, so if you experience lag while watching, you can switch to another server of your choice.</li>
        <li><strong>Best Browser Experience:</strong> Use Chrome or Firefox for optimal streaming performance.</li>
        <li><strong>Internet Connection:</strong> Ensure stable internet connection for smooth streaming.</li>
        <li><strong>Mobile Viewing:</strong> RacingStation is mobile-friendly and works on smartphones and tablets.</li>
        <li><strong>Race Schedules:</strong> Check official racing calendars for accurate race times.</li>
      </ul>
</div>
  `
    });
    const processedContent = computed(() => {
      let content = tutorialData.value.content;
      tutorialImages.value.forEach((image) => {
        const marker = `// IMAGE ${image.id} //`;
        const imageHtml = `
      <div class="tutorial-image">
        <img src="${image.src}" alt="${image.alt}" loading="lazy" />
      </div>
    `;
        content = content.replace(marker, imageHtml);
      });
      const noteBoxTwitterText = "follow our Twitter";
      const noteBoxTwitterHtml = `
    <a href="${twitterLink.value}" target="_blank" rel="noopener noreferrer" class="twitter-link">
      follow our Twitter account 
    </a>
  `;
      content = content.replace(noteBoxTwitterText, noteBoxTwitterHtml);
      const tipsTwitterText = "Follow our Twitter";
      const tipsTwitterHtml = `
    <a href="${twitterLink.value}" target="_blank" rel="noopener noreferrer" class="twitter-link">
      Follow our Twitter account 
    </a>
  `;
      content = content.replace(tipsTwitterText, tipsTwitterHtml);
      return content;
    });
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    };
    const seoDescription = computed(() => {
      if (!tutorialData.value.content)
        return "How to watch F1, MotoGP, WEC and other live streaming for free";
      const strippedContent = tutorialData.value.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      return strippedContent.substring(0, 160) + "...";
    });
    useSeoMeta({
      title: computed(() => tutorialData.value.title),
      ogTitle: computed(() => tutorialData.value.title),
      description: "How to watch F1, Formula 1, MotoGP, WEC, World Endurance Championship and other live streaming for free in 2025 season in RacingStation",
      ogDescription: seoDescription,
      ogImage: computed(() => tutorialData.value.image),
      twitterCard: "summary_large_image"
    });
    const getLink = (item) => {
      switch (item) {
        case "Latest News":
          return "/";
        case "Watch Sports":
          return "/stream";
        default:
          return "/";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))}><header><div class="header-content"><h1 class="logo"><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image"> RacingStation </h1><div class="header-controls"><button class="icon-button">`);
      if (isDarkMode.value) {
        _push(ssrRenderComponent(unref(SunIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), null, null, _parent));
      }
      _push(`</button><button class="icon-button menu-toggle">`);
      if (!isMenuOpen.value) {
        _push(ssrRenderComponent(unref(MenuIcon), null, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
      }
      _push(`</button><nav class="desktop-nav"><ul><!--[-->`);
      ssrRenderList(menuItems, (item) => {
        _push(`<li><a${ssrRenderAttr("href", getLink(item))} class="${ssrRenderClass({ active: currentView.value === item })}">${ssrInterpolate(item)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div></div></header>`);
      if (isMenuOpen.value) {
        _push(`<nav class="mobile-nav"><div class="mobile-nav-content"><button class="icon-button close-menu">`);
        _push(ssrRenderComponent(unref(XIcon), null, null, _parent));
        _push(`</button><ul><!--[-->`);
        ssrRenderList(menuItems, (item) => {
          _push(`<li><a${ssrRenderAttr("href", getLink(item))} class="${ssrRenderClass({ active: currentView.value === item })}">${ssrInterpolate(item)}</a></li>`);
        });
        _push(`<!--]--></ul></div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main><div class="adsterra-container"><div id="container-f7102c30eb715e25f6e3bf755bfbe92c"></div></div><article class="article-container"><nav class="back-nav"><a href="/" class="back-link">`);
      _push(ssrRenderComponent(unref(ArrowLeft), { class: "icon" }, null, _parent));
      _push(` Back to Articles </a></nav><div class="hero-image">`);
      if (tutorialData.value.image) {
        _push(`<img${ssrRenderAttr("src", tutorialData.value.image)}>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="article-content"><h1 class="category">${ssrInterpolate(tutorialData.value.category)}</h1><h1 class="title">${ssrInterpolate(tutorialData.value.title)}</h1><div class="metadata"><div class="metadata-item">`);
      _push(ssrRenderComponent(unref(Calendar), { class: "icon" }, null, _parent));
      _push(`<span>${ssrInterpolate(formatDate(tutorialData.value.date))}</span></div><div class="metadata-item">`);
      _push(ssrRenderComponent(unref(User), { class: "icon" }, null, _parent));
      _push(`<span>${ssrInterpolate(tutorialData.value.author)}</span></div><div class="metadata-item">`);
      _push(ssrRenderComponent(unref(Clock), { class: "icon" }, null, _parent));
      _push(`<span>${ssrInterpolate(tutorialData.value.reading_time)} min read</span></div></div><div class="rich-content">${(_a = processedContent.value) != null ? _a : ""}</div></div></article><div class="adsterra-container"></div></main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/tutorial/tutorial.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tutorial-D8Ji6R6Z.mjs.map
