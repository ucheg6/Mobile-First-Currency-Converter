const cacheName = 'v1';
const cacheFiles = [
    '/',
    '/index.html',
    '/styles.css',
    '/scripts/script.js',
    '/idb/lib/idb.js',
    '/scripts/db.js'
    
]

self.addEventListener('install', (event) => {
    console.log('[service worker] Installed')
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Service worker caching cached files!!');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', (event) =>{
    console.log('[service worker] Activated!!!')
    event.waitUntil(
        caches.keys().then(
            (cacheNames) => {
                return Promise.all(cacheNames.map(
                    (thisCacheName) => {
                    if(thisCacheName !== cacheName) {
                        console.log('[Service Worker] removing old Cache', thisCacheName);
                        return caches.delete(thisCacheName);
    
                    }

                }))
                
            }
        )
    )
})

self.addEventListener('fetch', (event) => {
    console.log('[service worker] Fetching!!!', event.request.url)
    event.respondWith(
        caches.match(event.request).then(
            (response) => {
                if(response) {
                    console.log('[Service Worker] found in Cache', event.request.url);
                    return response  
                }
                let requestClone = event.request.clone();
                fetch(requestClone)
                .then((response) => {
                    if(!response){
                        console.log('[Service Worker] No response from fetch');
                        return response;
                    }
                    let responseClone = response.clone();
                    caches.open(cacheName).then((cache) => {
                        console.log('Service worker caching cached files!!');
                        cache.put(event.request, responseClone);
                        return response;
                    })

                })
                .catch((err) => console.log('[ServiceWorker] Error fetching and caching new data', err))
            }
        )
    )
})