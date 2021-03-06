const version = "SimpleDiceVer.2.1";
self.addEventListener("install",e=>{
    e.waitUntil(
        caches.open(version).then(cache=>{
            return cache.addAll([
                "./index.html",
                "./diceAudio.mp3",
                "./main.css",
                "./main.js",
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