const CACHE="melvsa-member-services-shell-v6.1";
const ASSETS=["./manifest.webmanifest?v=6","./icons/melvsa-180.png?v=6","./icons/melvsa-192.png?v=6","./icons/melvsa-512.png?v=6"];
self.addEventListener("install",event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener("activate",event=>{event.waitUntil((async()=>{for(const key of await caches.keys()){if(key!==CACHE)await caches.delete(key)}await self.clients.claim()})())});
self.addEventListener("fetch",event=>{const u=new URL(event.request.url);if(u.origin===self.location.origin&&event.request.mode!=="navigate"){event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)))}});