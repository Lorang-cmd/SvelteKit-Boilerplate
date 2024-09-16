

<script lang="ts">
 import { onMount } from 'svelte';
 import { 
    cookieConsentSeen,
    trackingConsent,
   // advertisementConsent,
   // marketingConsent,
    allowTracking,
   // allowMarketing
   // allowAdvertising
  } from './gdpr-stores';
  import { allowAll, denyAll, setSelectedConsent } from './gdpr-functions';

  onMount(() => {
    $cookieConsentSeen = localStorage.getItem('cookie-banner-seen') === 'true';
    $trackingConsent = localStorage.getItem('tracking-cookie-consent') === 'true';
   // $advertisementConsent = localStorage.getItem('advertisement-cookie-consent') === 'true';
   // $marketingConsent = localStorage.getItem('marketing-cookie-consent') === 'true';
  });

    let showOptions = false;
    let containerHeight = '260px';

function handleAllowAll() {
    allowAll(true, true, true);
    $cookieConsentSeen = true;
  }

  function handleDenyAll() {
    denyAll();
    $cookieConsentSeen = true;
  }

  function handleSaveClose() {
    setSelectedConsent();
    $cookieConsentSeen = true;
  }
  
  function toggleOptions() {
  showOptions = !showOptions;
  containerHeight = showOptions ? '200px' : '260px';
}
</script>

{#if !$cookieConsentSeen}
<div id="gdpr" class="gdpr position-fixed t-0 l-0 z-7000 w-100 d-flex align-items-end justify-content-end overflow-hidden pointer-events-none">
    <div class="gdpr__container w-100 d-flex flex-nowrap align-items-end overflow-hidden" style="height:{containerHeight}; transition: height 0.25s;">
        <div class="gdpr__wrap gdpr__homeWrap d-grid column-gap-20 row-gap-10"  aria-hidden={showOptions} style="transform: translateX({showOptions ? '-100%' : '0'}); transition: transform 0.25s; height: 260px;">
            <p class="gdpr__title col-span-2 col-span-xl-3 fz-14 fz-xl-18 fw-500 lh-142 lh-xl-111 m-0">We use cookies to analyze site usage and marketing efforts.</p>
            <p class="gdpr__text col-span-2 col-span-xl-3 fz-12 lh-150 fz-xl-14 lh-xl-142 m-0 mb-15 mb-xl-30">
                We use cookies and similar technologies to personalize the content of the website and improve the user experience. By clicking on "Accept All", you consent to this use, as detailed in our 
                <a href="/">Privacy Policy</a>. To modify your preferences or withdraw your consent, please update your cookie usage preferences.
            </p>
            <button class="btn gdpr__moreBtn col-span-2 col-span-xl-1 align-self-xl-center justify-self-start mb-20 mb-xl-0 --link --link-uppercase" aria-label="Customize your experience"
            on:click={toggleOptions}
            >
                <span class="btn__label" aria-hidden="true">Customize your experience</span>
                <span class="btn__icon --chevron-right" aria-hidden="true">
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9C2.33333 7.66667 5 5 5 5L1 1" stroke="currentColor"></path>
                        </svg>
                </span>
            </button>
            <button class="btn gdpr__rejectBtn align-self-center justify-self-end justify-self-md-start gray-400 --link --link-uppercase" aria-label="Close & deny"
            on:click={handleDenyAll}
            >
                <span class="btn__label" aria-hidden="true">Close & deny</span>
            </button>
            <button class="btn gdpr__acceptBtn align-self-center --cta --cta-black --cta-small" aria-label="Allow all"
            on:click={handleAllowAll}
            >
                <span class="btn__bg" aria-hidden="true"></span>
                <span class="btn__label" aria-hidden="true">Allow all</span>
            </button>
        </div>
        <div class="gdpr__wrap gdpr__optionsWrap d-flex grid-gap-20 grid-gap-md-30 flex-column justify-content-start"  aria-hidden={showOptions} style="transform: translateX({showOptions ? '-100%' : '0'}); transition: transform 0.25s; height: 200px;">
            <div class="flex-grow-1">
                <button class="btn gdpr__backBtn --link --link-uppercase --link-icon-left" aria-label="back"
                  on:click={toggleOptions}
                >
                    <span class="btn__label" aria-hidden="true">Back</span>
                    <span class="btn__icon --chevron-left" aria-hidden="true"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1C4.33333 2.66667 1 6 1 6L6 11" stroke="currentColor"></path>
                        </svg>
                    </span>
                </button>
            </div>
            <div class="flex-grow-0 d-flex flex-column grid-gap-20 grid-gap-xl-30">
                <div class="gdpr__option">
                    <label class="gdpr__input d-flex align-items-center grid-gap-12 position-relative">
                        <input type="checkbox" bind:checked={$allowTracking} class="position-absolute t-0 l-0 visibility-hidden pointer-events-none">
                        <span class="gdpr__input__toggle" aria-hidden="true"></span>
                        <span class="gdpr__input__text fz-14 fz-xl-18 fw-500 lh-142 lh-xl-111">Accept analytical cookies?</span>
                    </label>
                    <p class="gdpr__option__text fz-12 fz-xl-14 lh-150 lh-xl-142 m-0 mt-10">
                        We use Google Analytics to better understand our users’ Web preferences and interests.
                    </p>
                </div>
            </div>
            <div class="flex-grow-0 d-flex flex-row-reverse align-items-center grid-gap-20">
                <button class="btn gdpr__saveCloseBtn --cta --cta-black --cta-small" aria-label="Save & close"
                on:click={handleSaveClose}
                >
                    <span class="btn__bg" aria-hidden="true"></span>
                    <span class="btn__label" aria-hidden="true">Save &amp; close</span>
                </button>
            </div>
        </div>
    </div>
</div>
{/if}


