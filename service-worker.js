const CACHE="melvsa-member-services-shell-v3";
const ASSETS=["./manifest.webmanifest?v=3","./icons/melvsa-180.png?v=3","./icons/melvsa-192.png?v=3","./icons/melvsa-512.png?v=3"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener("fetch",e=>{if(e.request.mode==="navigate"){e.respondWith(fetch(e.request));return;}const u=new URL(e.request.url);if(u.origin===self.location.origin)e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
