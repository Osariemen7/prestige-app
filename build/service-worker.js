// public/service-worker.js

const CACHE_NAME = 'my-react-app-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        // Add the paths of your static assets to be cached
        '/',
        '/index.html',
        '/manifest.json',
        // Add other static assets like CSS, JS, images, etc.
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
