export default function serviceworker() {
    if ('serviceWorker' in navigator) {
        const swUrl = `${window.location.origin}/SW.js`;
        navigator.serviceWorker.register(swUrl)
            .then((response) => {
                console.log("Service worker registered successfully:", response);
            })
            .catch((error) => {
                console.log("Failed to register service worker:", error);
            });
    } else {
        console.log("Service workers are not supported in this browser.");
    }
}
