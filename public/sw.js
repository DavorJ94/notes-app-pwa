const STATIC_CACHE_NAME = "static-v1";
const DYNAMIC_CACHE_NAME = "dynamic-v1";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./main.js",
  "./controls/authWithDB.js",
  "./controls/router.js",
  "./images/keep_logo.png",
  "./utils/changeNoteColor.js",
  "./utils/changeNoteColorFromDB.js",
  "./utils/createNewNote.js",
  "./utils/filterNotes.js",
  "./utils/hideAllElements.js",
  "./utils/hideShowForm.js",
  "./utils/modalFunction.js",
  "./utils/removeNote.js",
  "./utils/saveNoteToDB.js",
  "./utils/setupUI.js",
  "./styles.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
  "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
  "https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js",
  "https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js",
  "https://www.gstatic.com/firebasejs/8.9.1/firebase-firestore.js",
];

self.addEventListener("install", (e) => {
  console.log("installed");
  e.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("activate");

  e.waitUntil(
    caches.keys().then((cache) => {
      return Promise.all(
        cache
          .filter(
            (key) => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME
          )
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.url.indexOf("firestore.googleapis.com") !== -1) return;
  if (e.request.url.indexOf("https://www.google.com/images") !== -1) return;
  if (e.request.url.indexOf("https://www.googleapis.com") !== -1) return;
  if (e.request.url.indexOf("https://apis.google.com") !== -1) return;

  e.respondWith(
    caches.match(e.request.url).then((cacheRes) => {
      console.log(e.request.url);
      return (
        cacheRes ||
        fetch(e.request).then(async (response) => {
          const cache = await caches.open(DYNAMIC_CACHE_NAME);
          await cache.put(e.request.url, response.clone());
          limitCache(DYNAMIC_CACHE_NAME, 50);
          return response;
        })
      );
    })
  );
});

function limitCache(name, size) {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        caches.delete(keys[0]).then(limitCache(name, size));
      }
    });
  });
  caches.keys(name).then((keys) => {
    if (keys.length > size) {
    }
  });
}
