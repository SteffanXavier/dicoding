importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/reference.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/teams.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },

    { url: '/assets/icon/favicon.ico', revision: '1' },
    { url: '/assets/icon/logo-512x512.png', revision: '1' },
    { url: '/assets/icon/logo-192x192.png', revision: '1' },
    { url: '/assets/icon/logo.png', revision: '1' },
    { url: '/assets/profile.jpg', revision: '1' },
    { url: '/assets/slider1.jpg', revision: '1' },
    { url: '/assets/slider2.jpg', revision: '1' },
    { url: '/assets/slider3.jpg', revision: '1' },

    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
], {
    ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: '/assets/icon/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Champion League Platform', options)
    );
});