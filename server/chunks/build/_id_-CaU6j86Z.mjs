import { ref, computed, reactive, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { b as _export_sfc, c as useRouter, d as useRoute, u as useRuntimeConfig, _ as _imports_0 } from './server.mjs';
import { u as useSeoMeta } from './index-CFzRD-82.mjs';
import { DateTime } from 'luxon';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const debugMode = ref(false);
    const stream = ref({
      title: "",
      category: "",
      event: "",
      excerpt: "",
      link: "",
      link2: "",
      link3: "",
      link4: "",
      content: "",
      event_type: "",
      session_name: "",
      scheduled_enable_time: null,
      scheduled_disable_time: null,
      status: ""
    });
    const eventCategories = ref([]);
    const allSessionOptions = ref({});
    const filteredSessionOptions = ref([]);
    const showScheduleManager = computed(() => {
      return true;
    });
    const sessionSchedules = reactive({});
    const currentSessionSchedules = ref([]);
    const { API_URL } = useRuntimeConfig().public;
    const getSessionType = () => {
      const eventType = stream.value.event_type;
      const matchingCategory = eventCategories.value.find((cat) => cat.event_type_description === eventType);
      if (matchingCategory) {
        return matchingCategory.name;
      }
      return "other";
    };
    const formatDateTime = (datetimeStr) => {
      if (!datetimeStr)
        return "Belum diatur";
      try {
        const dt = DateTime.fromISO(datetimeStr);
        return dt.setZone("Asia/Jakarta").toFormat("dd MMM yyyy, HH:mm");
      } catch (e) {
        console.error("Error formatting datetime:", e);
        return datetimeStr;
      }
    };
    const initializeSessionSchedules = () => {
      const sessionType = getSessionType();
      console.log("Initializing session schedules for type:", sessionType);
      const orderedOptions = allSessionOptions.value[sessionType] || [];
      if (!sessionSchedules[sessionType]) {
        sessionSchedules[sessionType] = {};
      }
      currentSessionSchedules.value = orderedOptions.map((option) => {
        const existingSession = sessionSchedules[sessionType][option.session_name];
        if (!existingSession) {
          sessionSchedules[sessionType][option.session_name] = {
            session_name: option.session_name,
            startTime: null,
            endTime: null
          };
        }
        return {
          session_name: option.session_name,
          session_order: option.session_order,
          startTime: sessionSchedules[sessionType][option.session_name].startTime,
          endTime: sessionSchedules[sessionType][option.session_name].endTime
        };
      });
      console.log("Initialized session schedules:", currentSessionSchedules.value);
      console.log("Session schedules object:", sessionSchedules[sessionType]);
    };
    const updateScheduleFromSessionSelection = () => {
      const selectedSession = stream.value.session_name;
      if (!selectedSession)
        return;
      const sessionType = getSessionType();
      console.log(`Updating schedule from selection: ${selectedSession}, type: ${sessionType}`);
      if (!sessionSchedules[sessionType]) {
        sessionSchedules[sessionType] = {};
      }
      if (!sessionSchedules[sessionType][selectedSession]) {
        console.log("Session not found in schedules, creating new entry");
        sessionSchedules[sessionType][selectedSession] = {
          session_name: selectedSession,
          startTime: stream.value.scheduled_enable_time,
          endTime: stream.value.scheduled_disable_time
        };
      } else {
        const sessionSchedule = sessionSchedules[sessionType][selectedSession];
        console.log("Found session schedule:", sessionSchedule);
        if (sessionSchedule) {
          stream.value.scheduled_enable_time = sessionSchedule.startTime;
          stream.value.scheduled_disable_time = sessionSchedule.endTime;
          console.log("Updated stream times from session schedule");
        }
      }
    };
    const updateSessionOptions = () => {
      const sessionType = getSessionType();
      console.log("Updating session options for type:", sessionType);
      filteredSessionOptions.value = allSessionOptions.value[sessionType] || [];
      const validValues = filteredSessionOptions.value.map((option) => option.session_name);
      if (!validValues.includes(stream.value.session_name)) {
        stream.value.session_name = validValues[0] || "";
        updateScheduleFromSessionSelection();
      }
      initializeSessionSchedules();
    };
    watch(() => stream.value.event_type, updateSessionOptions);
    watch(
      () => [stream.value.scheduled_enable_time, stream.value.scheduled_disable_time],
      ([newEnableTime, newDisableTime]) => {
        if (stream.value.session_name) {
          const sessionType = getSessionType();
          if (!sessionSchedules[sessionType]) {
            sessionSchedules[sessionType] = {};
          }
          if (!sessionSchedules[sessionType][stream.value.session_name]) {
            sessionSchedules[sessionType][stream.value.session_name] = {
              session_name: stream.value.session_name,
              startTime: null,
              endTime: null
            };
          }
          if (newEnableTime !== void 0) {
            console.log(`Watched change to enable time: ${newEnableTime}`);
            sessionSchedules[sessionType][stream.value.session_name].startTime = newEnableTime;
            const updatedSession = currentSessionSchedules.value.find((s) => s.session_name === stream.value.session_name);
            if (updatedSession) {
              updatedSession.startTime = newEnableTime;
            }
          }
          if (newDisableTime !== void 0) {
            console.log(`Watched change to disable time: ${newDisableTime}`);
            sessionSchedules[sessionType][stream.value.session_name].endTime = newDisableTime;
            const updatedSession = currentSessionSchedules.value.find((s) => s.session_name === stream.value.session_name);
            if (updatedSession) {
              updatedSession.endTime = newDisableTime;
            }
          }
        }
      }
    );
    useSeoMeta({
      title: "Edit Streaming",
      ogTitle: "Edit Streaming"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-c0a2993c><header data-v-c0a2993c><div class="header-content" data-v-c0a2993c><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-c0a2993c><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-c0a2993c> Dashboard </h1></div></header><div class="container" data-v-c0a2993c><h2 class="black-text" data-v-c0a2993c>Edit Livestream</h2><form data-v-c0a2993c><div data-v-c0a2993c><label for="title" data-v-c0a2993c>Title</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" required data-v-c0a2993c></div><div class="form-group" data-v-c0a2993c><label for="category" data-v-c0a2993c>Category</label><select id="category" required data-v-c0a2993c><option value="Motorsport" data-v-c0a2993c${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Motorsport") : ssrLooseEqual(stream.value.category, "Motorsport")) ? " selected" : ""}>Motorsport</option><option value="Football" data-v-c0a2993c${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Football") : ssrLooseEqual(stream.value.category, "Football")) ? " selected" : ""}>Football</option><option value="Basketball" data-v-c0a2993c${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Basketball") : ssrLooseEqual(stream.value.category, "Basketball")) ? " selected" : ""}>Basketball</option><option value="Other" data-v-c0a2993c${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Other") : ssrLooseEqual(stream.value.category, "Other")) ? " selected" : ""}>Other</option></select></div><div data-v-c0a2993c><label for="event" data-v-c0a2993c>Live Event</label><input type="text"${ssrRenderAttr("value", stream.value.event)} id="event" data-v-c0a2993c></div><div data-v-c0a2993c><label for="event_type" data-v-c0a2993c>Tipe Race Week</label><select id="event_type" data-v-c0a2993c><!--[-->`);
      ssrRenderList(eventCategories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.event_type_description)} data-v-c0a2993c${ssrIncludeBooleanAttr(Array.isArray(stream.value.event_type) ? ssrLooseContain(stream.value.event_type, category.event_type_description) : ssrLooseEqual(stream.value.event_type, category.event_type_description)) ? " selected" : ""}>${ssrInterpolate(category.name.toUpperCase())} - ${ssrInterpolate(category.description)}</option>`);
      });
      _push(`<!--]--></select></div><div data-v-c0a2993c><label for="excerpt" data-v-c0a2993c>Excerpt</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" required data-v-c0a2993c></div><div data-v-c0a2993c><label for="link" data-v-c0a2993c>Link 1</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" required data-v-c0a2993c></div><div data-v-c0a2993c><label for="link2" data-v-c0a2993c>Link 2</label><input type="text"${ssrRenderAttr("value", stream.value.link2)} id="link2" data-v-c0a2993c></div><div data-v-c0a2993c><label for="link3" data-v-c0a2993c>Link 3</label><input type="text"${ssrRenderAttr("value", stream.value.link3)} id="link3" data-v-c0a2993c></div><div data-v-c0a2993c><label for="link4" data-v-c0a2993c>Link 4</label><input type="text"${ssrRenderAttr("value", stream.value.link4)} id="link4" data-v-c0a2993c></div><div data-v-c0a2993c><label for="content" data-v-c0a2993c>Content</label><textarea id="content" required data-v-c0a2993c>${ssrInterpolate(stream.value.content)}</textarea></div><div class="form-group" data-v-c0a2993c><label for="session_name" data-v-c0a2993c>Pilih Sesi</label><select id="session_name" data-v-c0a2993c><!--[-->`);
      ssrRenderList(filteredSessionOptions.value, (option) => {
        _push(`<option${ssrRenderAttr("value", option.session_name)} data-v-c0a2993c${ssrIncludeBooleanAttr(Array.isArray(stream.value.session_name) ? ssrLooseContain(stream.value.session_name, option.session_name) : ssrLooseEqual(stream.value.session_name, option.session_name)) ? " selected" : ""}>${ssrInterpolate(option.session_name)}</option>`);
      });
      _push(`<!--]--></select></div>`);
      if (showScheduleManager.value) {
        _push(`<div class="schedule-manager-panel" data-v-c0a2993c><div class="schedule-header" data-v-c0a2993c><h3 data-v-c0a2993c>${ssrInterpolate(stream.value.event_type ? "Jadwal Untuk Semua Sesi" : "Jadwal Event")}</h3></div><p class="schedule-info" data-v-c0a2993c>${ssrInterpolate(stream.value.event_type ? "Atur jadwal untuk semua sesi dalam race week. Jadwal akan otomatis diterapkan saat memilih sesi." : 'Atur jadwal untuk event "Race WEC dan lainnya". Jadwal akan diterapkan ke sesi yang dipilih.')}</p><!--[-->`);
        ssrRenderList(currentSessionSchedules.value, (session, index) => {
          _push(`<div class="session-schedule" data-v-c0a2993c><h4 data-v-c0a2993c>${ssrInterpolate(session.session_name)}</h4><div class="schedule-inputs" data-v-c0a2993c><div class="time-input" data-v-c0a2993c><label${ssrRenderAttr("for", `start-${index}`)} data-v-c0a2993c>Mulai</label><input type="datetime-local"${ssrRenderAttr("id", `start-${index}`)}${ssrRenderAttr("value", session.startTime)} data-v-c0a2993c></div><div class="time-input" data-v-c0a2993c><label${ssrRenderAttr("for", `end-${index}`)} data-v-c0a2993c>Selesai</label><input type="datetime-local"${ssrRenderAttr("id", `end-${index}`)}${ssrRenderAttr("value", session.endTime)} data-v-c0a2993c></div></div></div>`);
        });
        _push(`<!--]--><button type="button" class="clear-schedule-btn" data-v-c0a2993c><i class="fas fa-trash-alt" data-v-c0a2993c></i> Hapus Semua Jadwal</button>`);
        if (stream.value.session_name) {
          _push(`<div class="current-session-schedule" data-v-c0a2993c><h3 data-v-c0a2993c>Jadwal Aktif Saat Ini (${ssrInterpolate(stream.value.session_name)})</h3><div class="active-schedule-display" data-v-c0a2993c><div class="schedule-item" data-v-c0a2993c><span class="schedule-label" data-v-c0a2993c>Jadwal Enable:</span><span class="schedule-value" data-v-c0a2993c>${ssrInterpolate(formatDateTime(stream.value.scheduled_enable_time))}</span></div><div class="schedule-item" data-v-c0a2993c><span class="schedule-label" data-v-c0a2993c>Jadwal Disable:</span><span class="schedule-value" data-v-c0a2993c>${ssrInterpolate(formatDateTime(stream.value.scheduled_disable_time))}</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-c0a2993c><label for="status" data-v-c0a2993c>Status</label><select id="status" data-v-c0a2993c><option value="enable" data-v-c0a2993c${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-c0a2993c${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div>`);
      if (debugMode.value) {
        _push(`<div class="debug-info" data-v-c0a2993c><h3 data-v-c0a2993c>Debug Info:</h3><pre data-v-c0a2993c>${ssrInterpolate(JSON.stringify(sessionSchedules, null, 2))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="buttons-container" data-v-c0a2993c><button type="submit" class="action-btn update-btn" data-v-c0a2993c>Update Stream</button><button type="button" class="action-btn cancel-btn" data-v-c0a2993c>Cancel</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c0a2993c"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CaU6j86Z.mjs.map
