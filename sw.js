// Service Worker: يعرض الإشعارات ويفتح المنصة عند الضغط عليها
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

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
