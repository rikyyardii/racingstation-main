#!/bin/bash

# Fungsi untuk memeriksa status tunnel
check_tunnel() {
  curl -s -o /dev/null -w "%{http_code}" https://racingstation.top/api/
}

# Fungsi untuk menjalankan Cloudflared tunnel
start_tunnel() {
  echo "Starting Cloudflared tunnel..."
  cloudflared tunnel run &
  TUNNEL_PID=$!
}

# Fungsi untuk memeriksa dan menunggu koneksi jaringan stabil
wait_for_connection() {
  echo "Checking network connectivity..."
  until curl -s --head http://www.google.com | grep "200 OK" > /dev/null; do
    echo "Network not available. Retrying in 5 seconds..."
    sleep 5
  done
  echo "Network connection established."
}

# Awal menjalankan tunnel
wait_for_connection
start_tunnel

# Loop untuk memantau status tunnel
while true; do
  sleep 30
  HTTP_STATUS=$(check_tunnel)

  if [ "$HTTP_STATUS" -ne 200 ]; then
    echo "Tunnel is down. Restarting..."
    kill $TUNNEL_PID
    wait $TUNNEL_PID 2>/dev/null

    # Tunggu koneksi stabil sebelum memulai ulang tunnel
    wait_for_connection
    start_tunnel
  else
    echo "Tunnel is running fine."
  fi
done