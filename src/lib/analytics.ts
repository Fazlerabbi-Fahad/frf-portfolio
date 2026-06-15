import ReactGA from "react-ga4";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const analyticsEnabled = Boolean(GA_ID);

export function initAnalytics() {
  if (!analyticsEnabled) return;
  ReactGA.initialize(GA_ID);
}

export function trackPageview(path: string) {
  if (!analyticsEnabled) return;
  ReactGA.send({ hitType: "pageview", page: path });
}