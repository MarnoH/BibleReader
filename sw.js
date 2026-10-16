/* Keeps the app on the device so it opens without signal.
   - The program files open from the device straight away; when there is signal the server is asked in the
     background whether one has changed (an unchanged file costs almost no data). A changed page is kept for
     next time and the open page is told, so it can offer to reload.
   - Bible texts, library books, cross-references and fonts never change once published (a new edition gets a new file
     name), so they are fetched once, the first time they are used, and then always read from the device. */
const CACHE = 'bybel-app';
const CORE = ['./', 'index.html', 'leesregister.html', 'manifest.webmanifest',
              'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png',
              'fonts/SourceSerif4-Regular.woff2', 'fonts/SourceSerif4-It.woff2', 'fonts/SourceSerif4-Semibold.woff2',
              'data/catalog.json', 'data/base.v1.json', 'data/aov.v1.json', 'boeke.html', 'data/library.json'];
const FIXED = /\/(data\/.+\.v\d+\.json|fonts\/[^/]+\.woff2)$/;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u =>
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
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const kept = await cache.match(req, { ignoreSearch: true });
    if (FIXED.test(url.pathname)) {
      if (kept) return kept;
      const res = await fetch(req);
      if (res.ok) await cache.put(req, res.clone());
      return res;
    }
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
