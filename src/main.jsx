import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import serviceworker from './Serviceworker.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  serviceworker()
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
  });
}


let deferredPrompt; // Store the event so we can trigger it later
const addToHomeScreenButton = document.getElementById('add-to-home-screen-button');

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser prompt
  e.preventDefault();
  // Save the event for later use
  deferredPrompt = e;

  // Show the "Add to Home Screen" button
  addToHomeScreenButton.style.display = 'block';

  // When the user clicks the button
  addToHomeScreenButton.addEventListener('click', () => {
    // Show the native prompt
    deferredPrompt.prompt();

    // Wait for the user's choice (whether they added the app to the home screen or not)
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log('User choice:', choiceResult.outcome);

      if (choiceResult.outcome === 'accepted') {
        console.log('User added the app to home screen');
      } else {
        console.log('User dismissed the prompt');
      }

      // Reset the deferred prompt (we can’t use it again)
      deferredPrompt = null;
    });
  });
});
