import Cookies from 'js-cookie';
import { get } from 'svelte/store';
import {
	trackingConsent,
	cookieConsentSeen,
//	advertisementConsent,
//	marketingConsent,
//	allowAdvertising,
	allowTracking,
// allowMarketing
} from './gdpr-stores';

export function setTrackingAllowedCookie() {
	Cookies.set('tracking-cookie-consent', 'true', { expires: 365 });
	trackingConsent.set(true);
}

export function setTrackingDisallowedCookie() {
	Cookies.set('tracking-cookie-consent', 'false', { expires: 365 });
	trackingConsent.set(false);
}

//export function setAdvertisementAllowedCookie() {
//	Cookies.set('advertising-cookie-consent', 'true', { expires: 365 });
//	advertisementConsent.set(true);
//}

//export function setAdvertismentDisallowedCookie() {
//	Cookies.set('advertising-cookie-consent', 'false', { expires: 365 });
//	advertisementConsent.set(false);
//}

//export function setAMarketingAllowedCookie() {
//	Cookies.set('marketing-cookie-consent', 'true', { expires: 365 });
//	marketingConsent.set(true);
//}

//export function setMarketingDisallowedCookie() {
//	Cookies.set('marketing-cookie-consent', 'false', { expires: 365 });
//	marketingConsent.set(false);
//}

export function setCookieConsentSeen() {
	Cookies.set('cookie-banner-seen', 'true', { expires: 365 });
	cookieConsentSeen.set(true);
}

export function resetSelection() {
	allowTracking.set(false);
//	allowAdvertising.set(false);
//	allowMarketing.set(false);
}

export function setSelectedConsent() {
	//	const tmpAd = get(allowAdvertising);
		const tmpTrack = get(allowTracking);
	//	const tmpMark = get(allowMarketing);
	//if (tmpAd === false) {
	//	setAdvertismentDisallowedCookie();
	//}
	//if (tmpAd === true) {
	//	setAdvertisementAllowedCookie();
	//}
	if (tmpTrack === false) {
		setTrackingDisallowedCookie();
	}
	if (tmpTrack === true) {
		setTrackingAllowedCookie();
	}
	//if (tmpMark === false) {
	//	setMarketingDisallowedCookie();
	//}
	//if (tmpMark === true) {
	//	setAMarketingAllowedCookie();
	//}
	resetSelection();
	setCookieConsentSeen();
}

export function allowAll(
	showMarketingOption = true,
	showAdvertisingOption = true,
	showTrackingOption = true
) {
	setCookieConsentSeen();
	if (showTrackingOption) {
		setTrackingAllowedCookie();
	}
	//if (showAdvertisingOption) {
	//	setAdvertisementAllowedCookie();
	//}
	//if (showMarketingOption) {
	//	setAMarketingAllowedCookie();
	//}
	resetSelection();
}

export function denyAll() {
	setCookieConsentSeen();
	setTrackingDisallowedCookie();
	//setAdvertismentDisallowedCookie();
	//setMarketingDisallowedCookie();
	resetSelection();
}