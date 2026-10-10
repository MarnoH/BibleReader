/* Keeps a copy of the whole app on the device so it opens without signal.
   Opens from that copy straight away; when there is signal, quietly checks for a newer version
   (an unchanged file costs almost no data) and uses it from the next opening. */
const CACHE = 'bybel-app';
const FILES = ['./', 'index.html', 'leesregister.html', 'manifest.webmanifest',
               'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const kept = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
    if (kept) { e.waitUntil(fresh); return kept; }
    return (await fresh) || (req.mode === 'navigate' && await cache.match('./')) ||
           new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
  }));
});
