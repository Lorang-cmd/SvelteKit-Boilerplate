import { browser } from '$app/environment';

export function scrollIntersection() {
  if (!browser) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
      }
      // The following line has been removed to prevent the animation from triggering twice
      // else {
      //   entry.target.classList.remove('is-inview');
      // }
    });
  }, { threshold: 1 });

  const scrollElements = document.querySelectorAll('[data-scroll]');
  scrollElements.forEach((el) => observer.observe(el));

  return () => {
    scrollElements.forEach((el) => observer.unobserve(el));
  };
}