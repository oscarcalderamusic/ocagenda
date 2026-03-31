var CACHE='oc-agenda-v9';
var FILES=['./','./index.html','./cotizar.html','./manifest.json','./icons/icon-192.svg','./icons/icon-512.svg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){
  var u=e.request.url;
  if(u.includes('fonts.g')||u.includes('cdnjs.')||u.includes('api.qrserver')){e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request)}));return}
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request)}))
});
