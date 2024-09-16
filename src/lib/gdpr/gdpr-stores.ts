import { writable } from 'svelte/store';
export const trackingConsent = writable(false);
//export const advertisementConsent = writable(false);
//export const marketingConsent = writable(false);
export const cookieConsentSeen = writable();
export const allowTracking = writable(false);
//export const allowAdvertising = writable(false);
//export const allowMarketing = writable(false);