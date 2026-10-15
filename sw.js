/* Keeps a copy of the whole app on the device so it opens without signal.
   It always opens from that copy straight away. When there is signal it asks the server, in the background,
   whether a file has changed (an unchanged file costs almost no data). A changed page is saved for next time
   and the open page is told, so it can offer to reload. */
const CACHE = 'bybel-app';
const FILES = ['./', 'index.html', 'leesregister.html', 'manifest.webmanifest',
               'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  // fetched past the browser's own short-term cache, so a fresh upload is really what gets kept
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(u =>
    fetch(new Request(u, { cache: 'reload' })).then(r => r.ok ? c.put(u, r) : null).catch(() => null))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
const stamp = r => r && (r.headers.get('etag') || r.headers.get('last-modified'));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const kept = await cache.match(req, { ignoreSearch: true });
    const ask = req.mode === 'navigate' ? fetch(req.url, { cache: 'no-cache' }) : fetch(req, { cache: 'no-cache' });
    const fresh = ask.then(async res => {
      if (res.ok) {
        await cache.put(req, res.clone());
        if (req.mode === 'navigate' && kept && stamp(kept) && stamp(res) && stamp(kept) !== stamp(res)) {
          for (const c of await self.clients.matchAll()) c.postMessage({ type: 'updated' });
        }
      }
      return res;
    }).catch(() => null);
    if (kept) { e.waitUntil(fresh); return kept; }
    return (await fresh) || (req.mode === 'navigate' && await cache.match('./')) ||
           new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }));
});
