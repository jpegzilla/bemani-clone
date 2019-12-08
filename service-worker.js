const FILES_TO_CACHE = ["./"];

const GAME_VERSION = "1v000";
const CACHE_NAME = "jpegzilla_1v000";
const cacheWhitelist = [CACHE_NAME];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log("[ServiceWorker] Pre-caching offline page");
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        caches.keys().then(keyList => {
          return Promise.all(
            keyList.map(key => {
              if (cacheWhitelist.indexOf(key) === -1) {
                console.log("[ServiceWorker] removing old key in cache: ", key);
                return caches.delete(key);
              }
            })
          );
        });
      })
  );
});
