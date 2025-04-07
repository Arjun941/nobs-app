'use client';

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && typeof window !== 'undefined' && window.workbox) {
      const wb = window.workbox;
      
      // Add event listeners to handle PWA lifecycle
      wb.addEventListener('installed', event => {
        console.log(`PWA installed: ${event.type}`);
      });
      
      wb.addEventListener('controlling', event => {
        console.log(`PWA controlling: ${event.type}`);
      });
      
      wb.addEventListener('activated', event => {
        console.log(`PWA activated: ${event.type}`);
      });
      
      // Send a message to the service worker to skip waiting
      wb.addEventListener('waiting', event => {
        wb.messageSkipWaiting();
      });
      
      // Register the service worker after the page has loaded
      wb.register();
    }
  }, []);

  return null;
}
