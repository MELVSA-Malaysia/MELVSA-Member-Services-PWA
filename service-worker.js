const CACHE="melvsa-member-services-shell-v5";
const ASSETS=["./manifest.webmanifest?v=5","./icons/melvsa-180.png?v=5","./icons/melvsa-192.png?v=5","./icons/melvsa-512.png?v=5"];
self.addEventListener("install",event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener("activate",event=>{event.waitUntil((async()=>{for(const key of await caches.keys()){if(key!==CACHE)await caches.delete(key)}await self.clients.claim()})())});
self.addEventListener("fetch",event=>{const url=new URL(event.request.url);if(url.origin===self.location.origin&&event.request.mode!=="navigate"){event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)))}});