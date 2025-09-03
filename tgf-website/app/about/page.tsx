import React from 'react';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="container space-y-6">
      <h1 className="text-3xl font-bold">About TGF</h1>
      <p>
        Our mission is to accelerate capital into projects that reduce emissions and improve
        livelihoods. We prioritize transparency, measurable impact, and community benefit.
      </p>
      <section>
        <h2 className="text-xl font-semibold">Team</h2>
        <p>Coming soon.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Partners</h2>
        <p>We collaborate with financial institutions, NGOs, and local communities.</p>
      </section>
    </div>
  );
}

