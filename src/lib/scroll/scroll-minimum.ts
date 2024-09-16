import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const SCROLL_MINIMUM = 0; // Adjust this value as needed
const SCROLL_MINIMUM_CLASSNAME = '--js-scroll-min';

function createScrollMinimumStore() {
  const { subscribe, set } = writable(false);
  let hasScrolledAboveThreshold = false;

  if (browser) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const threshold = y > SCROLL_MINIMUM;

      if (threshold && !hasScrolledAboveThreshold) {
        hasScrolledAboveThreshold = true;
        set(true);
        document.body.classList.add(SCROLL_MINIMUM_CLASSNAME);
      } else if (!threshold && hasScrolledAboveThreshold) {
        hasScrolledAboveThreshold = false;
        set(false);
        document.body.classList.remove(SCROLL_MINIMUM_CLASSNAME);
      }
    }, false);
  }

  return { subscribe };
}

export const scrollMinimum = createScrollMinimumStore();