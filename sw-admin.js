// Minimal service worker — exists only so Android Chrome allows showNotification().
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
