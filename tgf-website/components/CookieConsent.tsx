'use client';
import React from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const c = localStorage.getItem('tgf_consent');
    if (!c) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('tgf_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('tgf_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur px-4 py-3">
      <div className="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          We use minimal cookies to improve your experience. You can accept or decline.
        </p>
        <div className="flex gap-2">
          <button onClick={decline} className="rounded border px-3 py-1 text-sm text-gray-700">
            Decline
          </button>
          <button onClick={accept} className="rounded bg-brand px-3 py-1 text-sm text-white">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

