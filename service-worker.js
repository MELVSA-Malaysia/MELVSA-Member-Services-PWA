const CACHE="melvsa-member-services-shell-v2";
const ASSETS=["./manifest.webmanifest","./icons/melvsa-180.png","./icons/melvsa-192.png","./icons/melvsa-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener("fetch",e=>{
  if(e.request.mode==="navigate"){
    e.respondWith(fetch(e.request).catch(()=>caches.match("./index.html")));
    return;
  }
  const u=new URL(e.request.url);
  if(u.origin===self.location.origin)e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});