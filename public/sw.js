const CACHE_NAME = 'kisaan-rakshak-v1';
const DYNAMIC_CACHE = 'kisaan-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
                    .map((name) => caches.delete(name))
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Cache Strategy for TFJS Models (Google Storage / TFHub)
    if (url.hostname.includes('storage.googleapis.com') || url.hostname.includes('tfhub.dev')) {
        event.respondWith(
            caches.open(DYNAMIC_CACHE).then((cache) => {
                return cache.match(event.request).then((response) => {
                    return response || fetch(event.request).then((fetchRes) => {
                        cache.put(event.request, fetchRes.clone());
                        return fetchRes;
                    });
                });
            })
        );
        return;
    }

    // Cache Strategy for API Calls (Weather, etc. - Network First, falling back to cache if offline)
    if (url.pathname.includes('/api/')) {
        // Similar logic or Network First
    }

    // Default: Stale-While-Revalidate for other resources
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchRes) => {
                return caches.open(DYNAMIC_CACHE).then((cache) => {
                    // Only cache http/https requests
                    if (event.request.url.startsWith('http')) {
                        cache.put(event.request, fetchRes.clone());
                    }
                    return fetchRes;
                });
            });
        }).catch(() => {
            // Fallback for HTML pages if offline
            if (event.request.mode === 'navigate') {
                return caches.match('/index.html');
            }
        })
    );
});
