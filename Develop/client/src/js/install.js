// Grab button for click event 
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    
    event.preventDefault();

    let deferredPrompt = event; 

    //Update UI to notify the usr they add to home screen 
    butInstall.style.visibility='visible';

    //when the install button is clicked 
    butInstall.addEventListener('click', async ()=> {
        // Hide the app 
        butInstall.style.visibility = 'hidden';

        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt 
        const { outcome } = await deferredPrompt.userChoice; 

        // Send analytics about install 
        console.log(`User response to install: ${outcome}`);
        // Clear the prompt 
        deferredPrompt = null; 
    });
    // log installation 
    console.log('PWA installable');
});


window.addEventListener('appinstalled', (event) => {

    console.log('PWA has benn installed', event); 
});

// Comment for test push 