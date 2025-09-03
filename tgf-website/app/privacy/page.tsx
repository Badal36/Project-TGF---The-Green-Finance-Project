import React from 'react';

export const metadata = { title: 'Privacy' };

export default function PrivacyPage() {
  return (
    <div className="container space-y-4">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>
        We value your privacy. This site uses minimal cookies only after you provide consent. Form
        submissions are stored locally during development and are non-durable in serverless
        environments.
      </p>
    </div>
  );
}

