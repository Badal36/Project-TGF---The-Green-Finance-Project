export type AnalyticsEvent = {
  name: string;
  props?: Record<string, unknown>;
};

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('tgf_consent') === 'accepted';
}

export function track(event: AnalyticsEvent) {
  if (!hasConsent()) return;
  // Simple console-based stub
  // eslint-disable-next-line no-console
  console.log('[analytics]', event.name, event.props || {});
}

export function trackPageview(path: string) {
  track({ name: 'pageview', props: { path } });
}

