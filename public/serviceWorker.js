const staticCacheName = 'site-static-v20'
const dynamicCacheName = 'site-dynamic-v21'

const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/img/dish.png',
    '/pages/fallback.html',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
]

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                caches.delete(keys[0]).then(limitCacheSize(name, size))
            }
        })
    })
}

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches
            .open(staticCacheName)
            .then(cache => {
                cache.addAll(assets)
            })
    )
})

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                    .map(key => caches.delete(key))
            )
        })
    )
})


self.addEventListener('fetch', evt => {
    //not including request  to firest
    if (!evt.request.url.includes('firestore.googleapis.com')) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone())
                        limitCacheSize(dynamicCacheName, 15)
                        return fetchRes
                    })
                })
            }).catch(err => {
                if (evt.request.url.includes('.html'))
                    return caches.match('/pages/fallback.html')
            })
        )
    }
})