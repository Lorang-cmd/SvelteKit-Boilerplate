<script lang="ts">
  import '../lib/styles/global.css';
  import '../lib/styles/utilities.css';
  import { scrollDirection } from '$lib/scroll/scroll-direction';
  import { scrollMinimum } from '$lib/scroll/scroll-minimum';
  import { scrollIntersection } from '$lib/scroll/scroll-intersection';
  import Gdpr from '$lib/gdpr/Gdpr.svelte';
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

</script>
<Gdpr />
<slot /> 







