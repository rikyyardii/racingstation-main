module.exports = {
  apps: [
    {
      name: "racingstation-main",
      script: "npm",
      args: "run start",
      watch: false,
    },
  ],
};

// DENGAN FUNGSI RESTART OTOMATIS //
// module.exports = {
//   apps: [
//     {
//       name: "racingstation-main",
//       script: "node",
//       args: "--max-old-space-size=4048 ./server/index.mjs",
//       watch: false,
//       exec_mode: "fork", // atau "cluster"
//       cron_restart: "0 0 * * *", // Restart setiap jam 00:00
//       wait_ready: true,
//       listen_timeout: 5000, // Waktu tunggu sebelum dianggap siap (dalam ms)
//     },
//   ],
// };
