export default function serviceworker() {
    // Ensure service worker is supported
    if ('serviceWorker' in navigator) {
      // This runs after the page has loaded
      window.addEventListener('load', function() {
        // Use window.location.origin to get the base URL
        let swUrl = `${window.location.origin}/SW.js`;
  
        // Register the service worker
        navigator.serviceWorker.register(swUrl)
          .then((registration) => {
            console.log('Service Worker registration successful:', registration.scope);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    } else {
      console.log('Service Worker is not supported in this browser.');
    }
  }
  