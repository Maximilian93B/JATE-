import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner"></div>
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();
if (typeof editor === 'undefined') {
  loadSpinner();
}

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('/src-sw.js');

    wb.addEventListener('activated', (event) => {
      // Event for when the service worker has activated
      console.log('Service worker activated');
    });

    wb.register().then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(err => {
      console.error('ServiceWorker registration failed: ', err);
    });
  });
} else {
  console.error('Service workers are not supported in this browser.');
}
