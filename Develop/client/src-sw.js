const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');


precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});



registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache CSS + JS
registerRoute(
  // Match CSS and JavaScript files
  ({request}) => request.destination === 'style' || request.destination === 'script',

  new StaleWhileRevalidate({
    cacheName: 'css-js-cache',
    plugins:[
      new CacheableResponsePlugin({
        statuses: [0,200], // cache successful responses
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Number of entires 
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
      })
    ]
  })
);

// Cache Images 
registerRoute(
   // Match image files
   ({request}) => request.destination === 'image',
   
   CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses:[0,200],
      }),
      new ExpirationPlugin({
        maxEntries: 60, // 60 entires in the cache
        maxAgeSeconds:60 * 24 * 60 * 60, // Cache for 60 days
      }),
    ],
   })
);

// TODO: Implement asset caching
registerRoute();