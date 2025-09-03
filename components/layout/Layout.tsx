import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main id="content" className="flex-1 container py-8">
        {children}
      </main>
    </div>
  );
}

