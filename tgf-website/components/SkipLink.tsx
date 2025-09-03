import React from 'react';

export default function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 z-50 rounded bg-brand px-3 py-2 text-white"
    >
      Skip to content
    </a>
  );
}

