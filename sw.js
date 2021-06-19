
const CACHE_NAME = 'v1_cache_programador_fitness',
urlsToCache=[
    './favicon.ico',
    './js/app.js',
    './manifest.json'
]
//INSTALLAR
self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache=>{
            return cache.addAll(urlsToCache).then(()=>self.skipWaiting())
        })
    )
});
//FUNCIONAR SIN CONEXIÓN
self.addEventListener('activate', e=>{
    const cacheWhitelist=[CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cachesNames=>{
            cachesNames.map(cacheName=>{
                //ELIMINA LO QUE YA NO SE NECESITA EN EL CACHE
                if(cacheWhitelist.indexOf(cacheName)===-1)
                {
                    return caches.delete(cacheName)
                }
            })
        })
        .then(()=>self.clients.claim())
    )
});
//ACTUALIZAR RECURSOS DEL NAVEGADOR
self.addEventListener('fetch', event =>{
    //event.respondWith(fetch(event.request))
    event.respondWith(
        caches.match(event.request)
        .then(res=>{
            if(res){
                //RECUPERAR DEL CACHE
                return res
            }
            //Recuperar petición de la URL
            return fetch(event.request)
        })
    )
});