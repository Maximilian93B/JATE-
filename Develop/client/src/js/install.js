
// Install  PWA
// Grab button for click event 
const butInstall = document.getElementById('buttonInstall');


// Initialize deferredPrompt for late use to show install browser prompt
let deferredPrompt


// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    
    event.preventDefault();
    deferredPrompt = event; 

    //Update UI to notify the usr they add to home screen 
    butInstall.style.visibility='visible';

    // Verify Instal promo is shown 
    console.log('PWA installation prompt displayed');
});

butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Hide the app provided install promotion.
        butInstall.classList.toggle = 'hidden', true;

        // Show the install prompt.
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt.
        const { outcome } = await deferredPrompt.userChoice;

        // Optionally, send analytics event with the response.
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, so reset it.
        deferredPrompt = null;
    }
});

window.addEventListener('appinstalled', (event) => {
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Send analytics event to indicate successful installation
    console.log('PWA has been installed', event);
});