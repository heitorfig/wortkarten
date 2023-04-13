let CACHE_NAME = 'wortkarten-v1';
let BASE_PATH = '/wortkarten';
let urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];
urlsToCache = urlsToCache.map(url => BASE_PATH + url);

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
