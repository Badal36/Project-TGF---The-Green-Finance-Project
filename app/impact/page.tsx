'use client';
import React from 'react';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const metadata = { title: 'Impact Data' };

type Row = {
  id: string;
  year: number;
  region: string;
  projectSlug: string;
  metric: string;
  value: number;
  unit: string;
};

export default function ImpactPage() {
  const { data } = useSWR<Row[]>('/api/impact', fetcher);
  const [sortKey, setSortKey] = React.useState<keyof Row>('year');
  const [asc, setAsc] = React.useState(true);

  const sorted = React.useMemo(() => {
    const rows = [...(data || [])];
    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    });
    return rows;
  }, [data, sortKey, asc]);

  function sortBy(k: keyof Row) {
    if (k === sortKey) setAsc(!asc);
    else {
      setSortKey(k);
      setAsc(true);
    }
  }

  return (
    <div className="container space-y-6">
      <h1 className="text-3xl font-bold">Impact Data</h1>
      <a className="text-brand" href="/api/impact?format=csv">Download CSV</a>
      <div className="overflow-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {(['year','region','projectSlug','metric','value','unit'] as (keyof Row)[]).map((k) => (
                <th key={k as string} className="p-2 text-left">
                  <button className="underline" onClick={() => sortBy(k)}>{k}</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.year}</td>
                <td className="p-2">{r.region}</td>
                <td className="p-2">
                  <a className="text-brand" href={`/projects/${r.projectSlug}`}>{r.projectSlug}</a>
                </td>
                <td className="p-2">{r.metric}</td>
                <td className="p-2">{r.value}</td>
                <td className="p-2">{r.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

