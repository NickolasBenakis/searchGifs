let CACHE_NAME = 'searchGifs';
// let urlsToCache = ['/', '/public'];
var urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/asset-manifest.json',
    '/static/css/main.21fa07b5.chunk.css',
    '/static/js/2.fb910c13.chunk.js',
    '/static/js/main.85bea854.chunk.js',
    '/static/media/gif.a4178ff8.svg'
];

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    let cacheWhitelist = ['searchGifs'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches
            .match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request).then(response => {
                    if (response.status === 404) {
                        return caches.match('index.html');
                    }
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
            })
            .catch(error => {
                console.log('show OFFLINE PAGE', error);
                return caches.open(CACHE_NAME).then(cache => {
                    return cache.match('/');
                });
            })
    );
});
