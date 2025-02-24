let CACHE_NAME = 'codePwa-v2';

let urlCache = [
    '/',
    '/@react-refresh',
    '/@vite/client',
    '/article',
    '/home',
    '/logo192.png',
    '/manifest.json',
    '/node_modules/.vite/deps/react-dom_client.js?v=831d9976',
    '/node_modules/.vite/deps/react.js?v=831d9976',
    '/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=831d9976',
    '/src/main.jsx?t=1736458527283',
    '/static/js/main.chunk.js',
    '/static/js/vendors~main.chunk.js',
    '/static/media/logo.6ce24c58.svg',
    '/sw.js',
    '/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    '/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    '/ajax/libs/font-awesome/6.7.1/css/all.min.css',
    '/src/main.jsx',
    '/static/js/bundle.js',
    '/src/serviceworker.js',
    '/src/index.css',
    '/node_modules/vite/dist/client/env.mjs',
    '/src/App.jsx',
    '/src/App.css',
    '/src/Components/UserDashboard/Dashboard.jsx',
    '/src/Components/UserLogin/Login.jsx',
    '/src/Components/Navbar/Navbar.jsx',
    '/src/Components/UserDashboard/Dashboard.css',
    '/src/assets/Sandtimer.gif?import',
    '/src/assets/sandtimerNew.png?import',
    '/src/assets/man.png?import',
    '/src/assets/women.png?import',
    '/src/assets/game%20icon%201.png?import',
    '/src/assets/game%20icon%202.png?import',
    '/src/assets/game%20icon%203.png?import',
    '/src/assets/game%20icon%204.png?import',
    '/src/assets/game%20icon%205.png?import',
    '/src/assets/game%20icon%206.png?import',
    '/src/assets/peoples.png?import',
    '/src/assets/Calling.gif?import',
    '/src/assets/Thank%20You.gif?import',
    '/src/Components/UserLogin/Login.css',
    '/src/Components/Navbar/Navbar.css',
    '/src/Components/Data.json?import',
    '/src/assets/user.jpg?import',
    '/src/assets/user.jpg',
    '/src/assets/obg.gif',
    '/src/main.jsx?t=1736694765055',
    '/src/main.jsx?t=1736696572353',
    '/src/serviceworker.js?t=1736694909699',
    '/public/manifest.json',
    '/dashboard',
    '/Logo192.png',
];

// Install event: Cache critical resources
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Cache opened successfully.");
            return cache.addAll(urlCache);
        }).catch((error) => {
            console.error("Failed to open cache:", error);
        })
    );
});

// Fetch event: Serve cached resources or network fallback
this.addEventListener('fetch', (event) => {
    console.log(`Fetching: ${event.request.url}`);
    
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                console.log(`Serving from cache: ${event.request.url}`);
                return cachedResponse;
            }
            
            console.log(`Fetching from network: ${event.request.url}`);
            return fetch(event.request).catch((error) => {
                console.error("Failed to fetch:", error);
                return caches.match('/offline.html'); // Provide an offline page
            });
        }).catch((error) => {
            console.error("Error in fetch event:", error);
            return caches.match('/offline.html'); // Default fallback
        })
    );
});

