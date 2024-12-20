module.exports = {
  apps: [
    {
      name: "cloudflare-tunnel",
      script: "./start_tunnel.sh",
      interpreter: "/bin/bash", // Menentukan interpreter untuk shell script
      watch: false,
    },
    {
      name: "racingstation-main",
      script: "npm",
      args: "run start",
      watch: false,
    },
  ],
};
