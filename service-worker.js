// Service worker — Le Carnet
// Stratégie : "cache d'abord, réseau en secours", avec mise en cache à la volée
// de toutes les ressources (y compris les polices et bibliothèques externes)
// pour un fonctionnement complet hors-ligne après une première visite en ligne.

const CACHE_NAME = 'le-carnet-cache-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Ne pas intercepter les requêtes non-GET (ex: rien ici n'en émet, mais par sécurité)
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((networkResponse) => {
          // On met en cache la réponse (y compris les réponses "opaques" des CDN externes)
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, copy).catch(() => {});
          });
          return networkResponse;
        })
        .catch(() => {
          // Hors-ligne et pas en cache : pour une navigation, on retombe sur la page d'accueil
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('', { status: 408, statusText: 'Hors-ligne' });
        });
    })
  );
});
