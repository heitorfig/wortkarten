// Choose a cache name
const cacheName = 'wortkarten-v1.1';
let BASE_PATH = '/wortkarten';
let precacheResources = ['/'];
precacheResources = precacheResources.map(url => BASE_PATH + url);

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  console.log('caches', caches)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      console.log('cachedResponse', cachedResponse)
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});
