import React from 'react';
import projects from '@/data/projects.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return (
    <div className="container space-y-4">
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="text-gray-600">{project.country} • {project.type}</p>
      <p className="max-w-3xl">{project.description}</p>

      <section>
        <h2 className="text-xl font-semibold">Impact</h2>
        <ul className="list-disc pl-5">
          <li><strong>CO₂e avoided:</strong> {project.impact.co2e_per_year} t/y</li>
          <li><strong>Beneficiaries:</strong> {project.impact.beneficiaries.toLocaleString()}</li>
          <li><strong>Financing amount:</strong> ${'{'}project.impact.financing_usd.toLocaleString(){'}'}</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Resources</h2>
        <ul className="list-disc pl-5">
          <li><a href="/api/projects" className="text-brand">Project dataset</a></li>
          <li><a href="/api/impact?format=csv" className="text-brand">Impact CSV</a></li>
        </ul>
      </section>
    </div>
  );
}

