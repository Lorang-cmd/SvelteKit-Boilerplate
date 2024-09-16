const isWindow = (obj: any): obj is Window => typeof obj === "object" && obj !== null;

const freeSelf = isWindow(typeof self === "object" && self) ? self : null;
const navigator = freeSelf?.navigator || null;
const userAgent = ((navigator && navigator.userAgent) || "").toLowerCase();
const vendor = (navigator && navigator.vendor || '').toLowerCase();

const comparator: { [key: string]: (a: number, b: number) => boolean } = {
  "<": (a, b) => a < b,
  "<=": (a, b) => a <= b,
  ">": (a, b) => a > b,
  ">=": (a, b) => a >= b,
};

const compareVersion = (version: number, range: string): boolean => {
  const string = range + "";
  const n = +(string.match(/\d+/) || [NaN])[0];
  const op = string.match(/^[<>]=?|/)?.[0] || "";

  return comparator[op] ? comparator[op](version, n) : version === n || n !== n;
};

export const android = (): boolean => /android/.test(userAgent);

export const chrome = (range?: string): boolean => {
  const match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
  return match !== null && !opera() && compareVersion(+match[1], range || "");
};

export const firefox = (range?: string): boolean => {
  const match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
  return match !== null && compareVersion(+match[1], range || "");
};

export const safari = (range?: string): boolean => {
  const match = userAgent.match(/version\/(\d+).+?safari/);
  return match !== null && compareVersion(+match[1], range || "");
};

export const opera = (range?: string): boolean => {
  const match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
  return match !== null && compareVersion(+match[1], range || "");
};

export const ie = (range?: string): boolean => {
  const match = userAgent.match(/(?:msie |trident.+?; rv:)(\d+)/);
  return match !== null && compareVersion(+match[1], range || "");
};

export const edge = (range?: string): boolean => {
  const match = userAgent.match(/edge\/(\d+)/);
  return match !== null && compareVersion(+match[1], range || "");
};

// Additional functions for iOS devices
export const ios = (): boolean => iphone() || ipad() || ipod();

export const ipad = (range?: string): boolean => {
  return safari(range) && !iphone() && !ipod() && navigator?.maxTouchPoints !== undefined && navigator.maxTouchPoints > 1;
};

export const iphone = (range?: string): boolean => {
  const match = userAgent.match(/iphone(?:.+?os (\d+))?/);
  return match !== null && compareVersion(+match[1] || 1, range || "");
};

export const ipod = (range?: string): boolean => {
  const match = userAgent.match(/ipod.+?os (\d+)/);
  return match !== null && compareVersion(+match[1], range || "");
};

export default {
  android,
  chrome,
  firefox,
  safari,
  opera,
  ie,
  edge,
  ios,
  ipad,
  iphone,
  ipod,
};

