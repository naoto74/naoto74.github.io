const version = "Ver.1.5";
self.addEventListener("install",e=>{
    e.waitUntil(
        caches.open(version).then(cache=>{
            return cache.addAll([
                "./index.html",
                "./main.css",
                "./manifest.json",
                "./pwa-logo.png",
                "./sw.js"
            ]);
        })
    );
});
self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response || fetch(e.request);
        })
    );
});
self.addEventListener("activate",e=>{  
    e.waitUntil(
        caches.keys().then(cache=>{
            cache.map(name=>{
                if(version !== name) caches.delete(name);
            })
        })
    );
});