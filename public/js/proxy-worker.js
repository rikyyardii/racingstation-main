// proxy-worker.js
self.onmessage = async (e) => {
  const response = await fetch(e.data);
  let html = await response.text();

  // Remove sandbox detection scripts
  html = html.replace(/<script([^>]*?)>(.*?)<\/script>/gis, (match, attrs, content) => {
    if (content.includes("sandbox") || content.includes("postMessage")) return "";
    return `<script${attrs}>${content}</script>`;
  });

  postMessage(html);
};
