// Service Worker για Codex Criminalis PWA
const CACHE_NAME = 'codex-criminalis-v1.2';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Προσθέτουμε τα εικονίδια όταν τα δημιουργήσουμε
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Εγκατάσταση Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Εγκατάσταση...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Αποθήκευση αρχείων στην cache...');
        return cache.addAll(CACHE_URLS.map(url => new Request(url, {cache: 'reload'})));
      })
      .catch((error) => {
        console.log('Service Worker: Σφάλμα κατά την cache:', error);
      })
  );
  
  // Άμεση ενεργοποίηση νέου service worker
  self.skipWaiting();
});

// Ενεργοποίηση Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ενεργοποίηση...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Διαγραφή παλιών cache versions
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Διαγραφή παλιάς cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Άμεδια ανάληψη ελέγχου όλων των tabs
      return self.clients.claim();
    })
  );
});

// Διαχείριση requests (fetch events)
self.addEventListener('fetch', (event) => {
  // Μόνο για GET requests
  if (event.request.method !== 'GET') return;
  
  // Παράβλεψη chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Αν βρέθηκε στην cache, επίστρεψε το
        if (cachedResponse) {
          console.log('Service Worker: Serving από cache:', event.request.url);
          return cachedResponse;
        }
        
        // Αλλιώς, κάνε fetch από το δίκτυο
        return fetch(event.request)
          .then((response) => {
            // Έλεγχος αν η απάντηση είναι έγκυρη
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone την απάντηση για την cache
            const responseToCache = response.clone();
            
            // Προσθήκη στην cache για μελλοντική χρήση
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            console.log('Service Worker: Serving από δίκτυο:', event.request.url);
            return response;
          })
          .catch((error) => {
            console.log('Service Worker: Fetch απέτυχε:', error);
            
            // Εάν είναι offline και ζητάει HTML σελίδα, δώσε την κύρια σελίδα
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
            
            // Για άλλα αρχεία, δώσε offline σελίδα ή placeholder
            return new Response(
              JSON.stringify({
                error: 'Δεν υπάρχει σύνδεση στο διαδίκτυο',
                offline: true
              }),
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache'
                }
              }
            );
          });
      })
  );
});

// Διαχείριση push notifications (προαιρετικό)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push event received');
  
  const options = {
    body: event.data ? event.data.text() : 'Νέα ενημέρωση διαθέσιμη!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Άνοιγμα εφαρμογής',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Κλείσιμο',
        icon: '/icons/close-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Codex Criminalis', options)
  );
});

// Διαχείριση κλικ σε notifications
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received');
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync (για μελλοντική χρήση)
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Εδώ μπορείς να προσθέσεις λογική για συγχρονισμό δεδομένων
      console.log('Background sync completed')
    );
  }
});

// Μήνυμα για debug
console.log('Service Worker: Loaded successfully');

// Periodic Background Sync (για browsers που το υποστηρίζουν)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(
      // Συγχρονισμός περιεχομένου κάθε X ώρες
      console.log('Periodic sync: Content updated')
    );
  }
});