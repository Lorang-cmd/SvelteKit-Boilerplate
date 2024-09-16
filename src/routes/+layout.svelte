<script lang="ts">
  import '../lib/styles/global.css';
  import '../lib/styles/utilities.css';
  import { scrollDirection } from '$lib/scroll/scroll-direction';
  import { scrollMinimum } from '$lib/scroll/scroll-minimum';
  import { scrollIntersection } from '$lib/scroll/scroll-intersection';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  onMount(async () => {
  const Splitting = (await import('splitting')).default;
  const splittingOptions = (await import('$lib/utils/splitting-options')).default;
  Splitting();
  splittingOptions();
});

  let currentScrollDirection = 'none';
  let isScrollMinimum = false;

  // Subscribe to the scroll-direction and scroll-minimum store
  if (browser) {
    const unsubscribeScrollDirection  = scrollDirection.subscribe(value => {
      currentScrollDirection = value;
      updateBodyClass();
    });

    const unsubscribeScrollMinimum  = scrollMinimum.subscribe(value => { 
      isScrollMinimum = value;
      updateBodyClass();
    });

    function updateBodyClass() {
       let classes = ['--js-ready']; //Ensure classes applied to the body are always included.
       if (currentScrollDirection !== 'none') classes.push(currentScrollDirection);
       if (isScrollMinimum) classes.push('--js-scroll-min');
       document.body.className = classes.join(' ');
    }

    // Cleanup on component destroy.
    onMount(() => {
      const cleanupScrollIntersection = scrollIntersection();
      return () => {
        unsubscribeScrollDirection();
        unsubscribeScrollMinimum();
        if (cleanupScrollIntersection) {
            cleanupScrollIntersection();

        }
      };
    });
    // Author 
    console.log('Site by Author - https://Author/');
  }

  import Gdpr from '$lib/gdpr/Gdpr.svelte';

</script>
<Gdpr />
<slot /> 



<!--
<h2 class="target page-heading__title " style="--line-total: 1;" data-scroll data-splitting="words" data-text-animation="slidein-by-lines">Modular cabins for simple, sustainable <span class="title-highlight__word title-highlight --font-heading --fs-italic words chars splitting" data-splitting="chars">living</span></h2>
-->







