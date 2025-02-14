import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import serviceWorker from './serviceworker.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  serviceWorker()
)

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default install prompt
    e.preventDefault();
    deferredPrompt = e;

    // Show the custom button or modal for installation
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';

    // Handle click on custom install button
    installButton.addEventListener('click', () => {
        // Show the native install prompt
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            console.log('User response to the install prompt:', choiceResult.outcome);
            // Hide the custom prompt after installation
            installButton.style.display = 'none';
            deferredPrompt = null;
        });
    });
});
