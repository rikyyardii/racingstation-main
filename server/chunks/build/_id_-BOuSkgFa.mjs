import { ref, computed, reactive, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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
    const showScheduleManager = computed(() => {
      return true;
    });
    const allSessionOptions = {
      f1: [
        { value: "Free Practice 1 F1", text: "FP1 (F1)" },
        { value: "Free Practice 2 F1", text: "FP2 (F1)" },
        { value: "Free Practice 3 F1", text: "FP3 (F1)" },
        { value: "Qualifying F1", text: "Qualifying (F1)" },
        { value: "Race F1", text: "Race (F1)" }
      ],
      f1Sprint: [
        { value: "Free Practice 1 F1", text: "FP1 (F1)" },
        { value: "Sprint Qualifying F1", text: "Sprint Qualifying (F1)" },
        { value: "Sprint Race F1", text: "Sprint (F1)" },
        { value: "Qualifying F1", text: "Qualifying (F1)" },
        { value: "Race F1", text: "Race (F1)" }
      ],
      motogp: [
        { value: "Free Practice 1 MotoGP", text: "FP1 (MotoGP)" },
        { value: "Practice MotoGP", text: "Practice (MotoGP)" },
        { value: "Free Practice 2 MotoGP", text: "FP2 (MotoGP)" },
        { value: "Qualifying MotoGP", text: "Qualifying (MotoGP)" },
        { value: "Sprint Race MotoGP", text: "Sprint (MotoGP)" },
        { value: "Warm Up", text: "Warm Up (MotoGP)" },
        { value: "Race MotoGP", text: "Race (MotoGP)" }
      ],
      other: [
        { value: "Race FIA WEC", text: "Race (WEC)" },
        { value: "Match", text: "Match (All Football)" }
      ]
    };
    const sessionSchedules = reactive({
      f1: {},
      f1Sprint: {},
      motogp: {},
      other: {}
    });
    const currentSessionSchedules = ref([]);
    const getSessionType = () => {
      const eventType = stream.value.event_type;
      if (eventType === "(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)") {
        return "f1";
      } else if (eventType === "(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)") {
        return "f1Sprint";
      } else if (eventType === "(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)") {
        return "motogp";
      } else {
        return "other";
      }
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
    const getSessionLabel = (sessionValue) => {
      const sessionType = getSessionType();
      const session = allSessionOptions[sessionType].find((s) => s.value === sessionValue);
      return session ? session.text : sessionValue;
    };
    const initializeSessionSchedules = () => {
      const sessionType = getSessionType();
      console.log("Initializing session schedules for type:", sessionType);
      const orderedOptions = allSessionOptions[sessionType] || [];
      if (sessionSchedules[sessionType] && Object.keys(sessionSchedules[sessionType]).length > 0) {
        currentSessionSchedules.value = orderedOptions.map((option) => {
          const savedSession = sessionSchedules[sessionType][option.value];
          return {
            value: option.value,
            text: option.text,
            startTime: (savedSession == null ? void 0 : savedSession.startTime) || null,
            endTime: (savedSession == null ? void 0 : savedSession.endTime) || null
          };
        });
        console.log("Using existing session schedules with preserved order:", currentSessionSchedules.value);
        return;
      }
      const sessions = orderedOptions.map((session) => ({
        value: session.value,
        text: session.text,
        startTime: null,
        endTime: null
      }));
      const scheduleObj = {};
      sessions.forEach((session) => {
        scheduleObj[session.value] = {
          text: session.text,
          startTime: session.startTime,
          endTime: session.endTime
        };
      });
      sessionSchedules[sessionType] = scheduleObj;
      currentSessionSchedules.value = sessions;
      console.log("Created new ordered session schedules:", currentSessionSchedules.value);
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
          text: getSessionLabel(selectedSession),
          startTime: stream.value.scheduled_enable_time,
          endTime: stream.value.scheduled_disable_time
        };
      } else {
        const sessionSchedule = sessionSchedules[sessionType][selectedSession];
        console.log("Found session schedule:", sessionSchedule);
        if (sessionSchedule) {
          if (sessionSchedule.startTime) {
            stream.value.scheduled_enable_time = sessionSchedule.startTime;
            console.log("Setting enable time from session:", sessionSchedule.startTime);
          }
          if (sessionSchedule.endTime) {
            stream.value.scheduled_disable_time = sessionSchedule.endTime;
            console.log("Setting disable time from session:", sessionSchedule.endTime);
          }
        }
      }
    };
    const filteredSessionOptions = ref([]);
    const updateSessionOptions = () => {
      const sessionType = getSessionType();
      console.log("Updating session options for type:", sessionType);
      filteredSessionOptions.value = allSessionOptions[sessionType] || [];
      const validValues = filteredSessionOptions.value.map((option) => option.value);
      if (!validValues.includes(stream.value.session_name)) {
        stream.value.session_name = validValues[0] || "";
        updateScheduleFromSessionSelection();
      }
      initializeSessionSchedules();
    };
    const { API_URL } = useRuntimeConfig().public;
    useSeoMeta({
      title: "Edit Streaming",
      ogTitle: "Edit Streaming"
    });
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
              text: getSessionLabel(stream.value.session_name),
              startTime: null,
              endTime: null
            };
          }
          if (newEnableTime !== void 0) {
            console.log(`Watched change to enable time: ${newEnableTime}`);
            sessionSchedules[sessionType][stream.value.session_name].startTime = newEnableTime;
          }
          if (newDisableTime !== void 0) {
            console.log(`Watched change to disable time: ${newDisableTime}`);
            sessionSchedules[sessionType][stream.value.session_name].endTime = newDisableTime;
          }
          const updatedSession = currentSessionSchedules.value.find((s) => s.value === stream.value.session_name);
          if (updatedSession) {
            if (newEnableTime !== void 0)
              updatedSession.startTime = newEnableTime;
            if (newDisableTime !== void 0)
              updatedSession.endTime = newDisableTime;
          }
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-wrapper" }, _attrs))} data-v-4d8f24c6><header data-v-4d8f24c6><div class="header-content" data-v-4d8f24c6><h1 class="logo" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-4d8f24c6><img${ssrRenderAttr("src", _imports_0)} alt="RacingStation Logo" class="logo-image" data-v-4d8f24c6> Dashboard </h1></div></header><div class="container" data-v-4d8f24c6><h2 class="black-text" data-v-4d8f24c6>Edit Livestream</h2><form data-v-4d8f24c6><div data-v-4d8f24c6><label for="title" data-v-4d8f24c6>Title</label><input type="text"${ssrRenderAttr("value", stream.value.title)} id="title" required data-v-4d8f24c6></div><div class="form-group" data-v-4d8f24c6><label for="category" data-v-4d8f24c6>Category:</label><select id="category" required data-v-4d8f24c6><option value="Motorsport" data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Motorsport") : ssrLooseEqual(stream.value.category, "Motorsport")) ? " selected" : ""}>Motorsport</option><option value="Football" data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.category) ? ssrLooseContain(stream.value.category, "Football") : ssrLooseEqual(stream.value.category, "Football")) ? " selected" : ""}>Football</option></select></div><div data-v-4d8f24c6><label for="event" data-v-4d8f24c6>Live Event</label><input type="text"${ssrRenderAttr("value", stream.value.event)} id="event" data-v-4d8f24c6></div><div data-v-4d8f24c6><label for="event_type" data-v-4d8f24c6>Tipe Race Week</label><select id="event_type" data-v-4d8f24c6><option value="" data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.event_type) ? ssrLooseContain(stream.value.event_type, "") : ssrLooseEqual(stream.value.event_type, "")) ? " selected" : ""}>kosong (Race WEC dan lainnya)</option><option value="(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)" data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.event_type) ? ssrLooseContain(stream.value.event_type, "(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)") : ssrLooseEqual(stream.value.event_type, "(The link will remain the same for all sessions in this race week including FP1, FP2, FP3, Qualifying, and Race)")) ? " selected" : ""}>Normal (F1)</option><option value="(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)" data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.event_type) ? ssrLooseContain(stream.value.event_type, "(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)") : ssrLooseEqual(stream.value.event_type, "(The link will remain the same for all sessions in this race week including FP1, Sprint Qualifying, Sprint Race, Qualifying, and Race)")) ? " selected" : ""}>Sprint (F1)</option><option value="(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)" data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.event_type) ? ssrLooseContain(stream.value.event_type, "(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)") : ssrLooseEqual(stream.value.event_type, "(The link will remain the same for all sessions in this race week including FP1, Practice, FP2, Qualifying, Sprint, Warm Up and Race)")) ? " selected" : ""}>Normal (MotoGP)</option></select></div><div data-v-4d8f24c6><label for="excerpt" data-v-4d8f24c6>Excerpt</label><input type="text"${ssrRenderAttr("value", stream.value.excerpt)} id="excerpt" required data-v-4d8f24c6></div><div data-v-4d8f24c6><label for="link" data-v-4d8f24c6>Link 1</label><input type="text"${ssrRenderAttr("value", stream.value.link)} id="link" required data-v-4d8f24c6></div><div data-v-4d8f24c6><label for="link2" data-v-4d8f24c6>Link 2</label><input type="text"${ssrRenderAttr("value", stream.value.link2)} id="link2" data-v-4d8f24c6></div><div data-v-4d8f24c6><label for="link3" data-v-4d8f24c6>Link 3</label><input type="text"${ssrRenderAttr("value", stream.value.link3)} id="link3" data-v-4d8f24c6></div><div data-v-4d8f24c6><label for="link4" data-v-4d8f24c6>Link 4</label><input type="text"${ssrRenderAttr("value", stream.value.link4)} id="link4" data-v-4d8f24c6></div><div data-v-4d8f24c6><label for="content" data-v-4d8f24c6>Content</label><textarea id="content" required data-v-4d8f24c6>${ssrInterpolate(stream.value.content)}</textarea></div><div class="form-group" data-v-4d8f24c6><label for="session_name" data-v-4d8f24c6>Pilih Sesi</label><select id="session_name" data-v-4d8f24c6><!--[-->`);
      ssrRenderList(filteredSessionOptions.value, (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)} data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.session_name) ? ssrLooseContain(stream.value.session_name, option.value) : ssrLooseEqual(stream.value.session_name, option.value)) ? " selected" : ""}>${ssrInterpolate(option.text)}</option>`);
      });
      _push(`<!--]--></select></div><div class="auto-switch-controls" data-v-4d8f24c6><div class="control-item" data-v-4d8f24c6><label class="toggle-switch" data-v-4d8f24c6><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(_ctx.autoSwitchEnabled) ? ssrLooseContain(_ctx.autoSwitchEnabled, null) : _ctx.autoSwitchEnabled) ? " checked" : ""} data-v-4d8f24c6><span class="slider round" data-v-4d8f24c6></span></label><span class="toggle-label" data-v-4d8f24c6>Auto-switch sessions based on time</span></div>`);
      if (_ctx.autoSwitchEnabled) {
        _push(`<div class="control-item" data-v-4d8f24c6><label class="toggle-switch" data-v-4d8f24c6><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(_ctx.autoSaveOnSessionChange) ? ssrLooseContain(_ctx.autoSaveOnSessionChange, null) : _ctx.autoSaveOnSessionChange) ? " checked" : ""} data-v-4d8f24c6><span class="slider round" data-v-4d8f24c6></span></label><span class="toggle-label" data-v-4d8f24c6>Auto-save when session changes</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showScheduleManager.value) {
        _push(`<div class="schedule-manager-panel" data-v-4d8f24c6><div class="schedule-header" data-v-4d8f24c6><h3 data-v-4d8f24c6>${ssrInterpolate(stream.value.event_type ? "Jadwal Untuk Semua Sesi" : "Jadwal Event")}</h3></div><p class="schedule-info" data-v-4d8f24c6>${ssrInterpolate(stream.value.event_type ? "Atur jadwal untuk semua sesi dalam race week. Jadwal akan otomatis diterapkan saat memilih sesi." : 'Atur jadwal untuk event "Race WEC dan lainnya". Jadwal akan diterapkan ke sesi yang dipilih.')}</p><!--[-->`);
        ssrRenderList(currentSessionSchedules.value, (session, index) => {
          _push(`<div class="session-schedule" data-v-4d8f24c6><h4 data-v-4d8f24c6>${ssrInterpolate(session.text)}</h4><div class="schedule-inputs" data-v-4d8f24c6><div class="time-input" data-v-4d8f24c6><label${ssrRenderAttr("for", `start-${index}`)} data-v-4d8f24c6>Mulai</label><input type="datetime-local"${ssrRenderAttr("id", `start-${index}`)}${ssrRenderAttr("value", session.startTime)} data-v-4d8f24c6></div><div class="time-input" data-v-4d8f24c6><label${ssrRenderAttr("for", `end-${index}`)} data-v-4d8f24c6>Selesai</label><input type="datetime-local"${ssrRenderAttr("id", `end-${index}`)}${ssrRenderAttr("value", session.endTime)} data-v-4d8f24c6></div></div></div>`);
        });
        _push(`<!--]--><button type="button" class="clear-schedule-btn" data-v-4d8f24c6><i class="fas fa-trash-alt" data-v-4d8f24c6></i> Hapus Semua Jadwal</button>`);
        if (stream.value.session_name) {
          _push(`<div class="current-session-schedule" data-v-4d8f24c6><h3 data-v-4d8f24c6>Jadwal Aktif Saat Ini (${ssrInterpolate(getSessionLabel(stream.value.session_name))})</h3><div class="active-schedule-display" data-v-4d8f24c6><div class="schedule-item" data-v-4d8f24c6><span class="schedule-label" data-v-4d8f24c6>Jadwal Enable:</span><span class="schedule-value" data-v-4d8f24c6>${ssrInterpolate(formatDateTime(stream.value.scheduled_enable_time))}</span></div><div class="schedule-item" data-v-4d8f24c6><span class="schedule-label" data-v-4d8f24c6>Jadwal Disable:</span><span class="schedule-value" data-v-4d8f24c6>${ssrInterpolate(formatDateTime(stream.value.scheduled_disable_time))}</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-4d8f24c6><label for="status" data-v-4d8f24c6>Status</label><select id="status" data-v-4d8f24c6><option value="enable" data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "enable") : ssrLooseEqual(stream.value.status, "enable")) ? " selected" : ""}>Enable</option><option value="disable" data-v-4d8f24c6${ssrIncludeBooleanAttr(Array.isArray(stream.value.status) ? ssrLooseContain(stream.value.status, "disable") : ssrLooseEqual(stream.value.status, "disable")) ? " selected" : ""}>Disable</option></select></div>`);
      if (debugMode.value) {
        _push(`<div class="debug-info" data-v-4d8f24c6><h3 data-v-4d8f24c6>Debug Info:</h3><pre data-v-4d8f24c6>${ssrInterpolate(JSON.stringify(sessionSchedules, null, 2))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="buttons-container" data-v-4d8f24c6><button type="submit" class="action-btn update-btn" data-v-4d8f24c6>Update Stream</button><button type="button" class="action-btn cancel-btn" data-v-4d8f24c6>Cancel</button></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rikya/edit_stream/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4d8f24c6"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BOuSkgFa.mjs.map
