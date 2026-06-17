// Nama cache untuk menyimpan data agar aplikasi bisa dibuka offline
const CACHE_NAME = 'e-arvy-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Proses Instalasi Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache berhasil dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Proses Fetch (Menghindari error saat offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan file dari cache jika ada, jika tidak, ambil dari internet
        return response || fetch(event.request);
      })
  );
});