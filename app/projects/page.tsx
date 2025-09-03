'use client';
import React from 'react';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import Card from '@/components/ui/Card';

export const metadata = { title: 'Projects' };

type Project = {
  slug: string;
  title: string;
  region: string;
  country: string;
  type: string;
  summary: string;
};

export default function ProjectsPage() {
  const { data } = useSWR<Project[]>('/api/projects', fetcher);
  const [region, setRegion] = React.useState('');
  const [ptype, setPtype] = React.useState('');

  const regions = Array.from(new Set((data || []).map((p) => p.region))).sort();
  const types = Array.from(new Set((data || []).map((p) => p.type))).sort();

  const filtered = (data || []).filter(
    (p) => (!region || p.region === region) && (!ptype || p.type === ptype)
  );

  return (
    <div className="container space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="flex gap-4">
        <label className="text-sm">
          Region
          <select className="ml-2 rounded border p-1" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">All</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Type
          <select className="ml-2 rounded border p-1" value={ptype} onChange={(e) => setPtype(e.target.value)}>
            <option value="">All</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {filtered.map((p) => (
          <Card key={p.slug} href={`/projects/${p.slug}`}>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.country} • {p.type}</p>
            <p className="mt-2 text-sm">{p.summary}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

