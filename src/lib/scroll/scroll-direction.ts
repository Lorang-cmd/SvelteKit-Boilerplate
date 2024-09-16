import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createScrollDirectionStore() {
  const { subscribe, set } = writable('none');
  let lastScrollTop = 0;

  if (browser) {
    window.addEventListener('scroll', () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        set('--js-scroll-down');
      } else if (st < lastScrollTop) {
        set('--js-scroll-up');
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }, false);
  }

  return { subscribe };
}

export const scrollDirection = createScrollDirectionStore();