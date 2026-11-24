// Service Worker: يعرض الإشعارات ويفتح المنصة عند الضغط عليها
const CACHE = 'platform-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
));

// الشبكة أولاً دائماً (مفيش نسخة قديمة)، والكاش بس لو النت قاطع. بيانات سوبابيز وأي موقع تاني مش بتتخزن.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(res => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}); }
    return res;
  }).catch(() => caches.match(req).then(r => r || (req.mode === 'navigate' ? caches.match('student.html') : undefined) || Response.error())));
});

// جاهز للإشعارات الخارجية (Web Push) لو فعّلت السيرفر لاحقًا
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data.json(); } catch (err) {}
  e.waitUntil(self.registration.showNotification(d.title || 'امتحان جديد 📝', {
    body: d.body || 'تم نشر امتحان جديد على المنصة',
    dir: 'rtl', lang: 'ar', tag: 'new-exam', renotify: true,
    data: { url: d.url || './' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
