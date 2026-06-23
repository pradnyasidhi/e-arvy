// Ganti nama cache ini jika kamu melakukan perombakan besar di masa depan
const CACHE_NAME = 'earvy-cache-v2'; 
const DYNAMIC_CACHE = 'earvy-dynamic-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// 1. INSTALASI: Paksa Service Worker baru langsung aktif
self.addEventListener('install', (event) => {
  self.skipWaiting(); // <--- KUNCI PENTING: Jangan menunggu tab ditutup
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. AKTIVASI: Hapus semua cache nyangkut dari versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
            console.log('[Service Worker] Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // <--- Ambil alih kontrol tab secara instan
  );
});

// 3. STRATEGI FETCH: Jantung dari sistem pembaruan otomatis
self.addEventListener('fetch', (event) => {
  // A. BYPASS: Jangan pernah cache request ke database Supabase atau Google
  if (event.request.url.includes('supabase.co') || event.request.url.includes('google.com')) {
    return; // Biarkan browser mengurusnya secara real-time
  }

  // B. NETWORK FIRST: Khusus untuk HTML (Biar update versi terbaca)
  if (event.request.mode === 'navigate' || event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Jika sukses ambil dari internet, simpan ke cache
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Jika OFFLINE / internet mati, baru gunakan cache
          return caches.match(event.request); 
        })
    );
    return;
  }

  // C. STALE-WHILE-REVALIDATE: Untuk file Gambar, CSS, Icon (Tampil instan, update di background)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => { /* Abaikan error jika offline */ });

      // Langsung tampilkan yang ada di memori, SAMBIL background narik data baru
      return cachedResponse || fetchPromise; 
    })
  );
});