const CACHE_NAME = 'e-arvy-cache-v1';

// Daftar file statis utama yang akan disimpan ke memori perangkat
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  // Jika Anda punya file ikon, hapus tanda // di bawah ini dan sesuaikan namanya:
  // './icon-192.png',
  // './icon-512.png'
];

// 1. Event INSTALL: Menyimpan file-file penting ke Cache saat aplikasi pertama kali diakses
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Membuka cache dan menyimpan aset...');
        return cache.addAll(urlsToCache);
      })
  );
  // Memaksa service worker baru untuk langsung aktif tanpa menunggu halaman ditutup
  self.skipWaiting();
});

// 2. Event ACTIVATE: Membersihkan cache versi lama jika Anda mengubah CACHE_NAME
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Mengambil alih kontrol semua halaman web yang terbuka saat ini
  self.clients.claim();
});

// 3. Event FETCH: Syarat WAJIB PWA. Strategi: Cache First, Fallback to Network
self.addEventListener('fetch', event => {
  // Hanya memproses request dengan metode GET (mengabaikan POST ke API/Cloud)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ditemukan di Cache, langsung tampilkan! (Sangat Cepat)
        if (response) {
          return response;
        }

        // Jika tidak ada di Cache, coba ambil dari internet (Network)
        return fetch(event.request).then(networkResponse => {
          // Validasi respon dari internet
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Simpan file baru dari internet ke dalam Cache untuk digunakan nanti
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              // Hanya men-cache file dari domain aplikasi itu sendiri (menghindari error CDN luar)
              if (event.request.url.startsWith(self.location.origin)) {
                cache.put(event.request, responseToCache);
              }
            });

          return networkResponse;
        });
      }).catch(() => {
        // Jika sedang offline dan file tidak ada di cache, Anda bisa merender halaman fallback offline di sini.
        console.log('[Service Worker] Jaringan terputus dan tidak ada cache.');
      })
// --- EVENT KLIK NOTIFIKASI PWA ---
self.addEventListener('notificationclick', function(event) {
  // 1. Tutup notifikasi setelah diklik
  event.notification.close();

  // 2. Tentukan URL yang akan difokuskan/dibuka (root URL aplikasi Anda)
  const targetUrl = self.location.origin + '/'; // Sesuaikan jika aplikasi ada di dalam sub-folder

  event.waitUntil(
    // Cari semua window/tab browser yang sedang terbuka
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Cek apakah aplikasi e-Arvy sudah terbuka di salah satu window/tab
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        // Jika sudah terbuka, langsung fokuskan (jangan buka tab ganda)
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika aplikasi sedang tertutup penuh, buka window baru
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});