import React from 'react';
import { headers } from 'next/headers';
import { getSubmissions } from '@/lib/submissions';
import projects from '@/data/projects.json';
import { allPosts } from 'contentlayer/generated';

export const metadata = { title: 'Admin' };

function isAuthorized(searchParams: { token?: string }): boolean {
  const admin = process.env.ADMIN_TOKEN;
  if (!admin) return false;
  const h = headers();
  const auth = h.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.slice(7);
    if (token === admin) return true;
  }
  if (searchParams.token && searchParams.token === admin) return true;
  return false;
}

export default function AdminPage({ searchParams }: { searchParams: { token?: string } }) {
  if (!isAuthorized(searchParams)) {
    return (
      <div className="container">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p>Provide a valid token via Authorization header or ?token=</p>
      </div>
    );
  }

  const submissions = getSubmissions();
  return (
    <div className="container space-y-6">
      <h1 className="text-3xl font-bold">Admin</h1>
      <section>
        <h2 className="text-xl font-semibold">Content</h2>
        <ul className="list-disc pl-5">
          <li>Projects: {projects.length}</li>
          <li>Blog posts: {allPosts.length}</li>
          <li>Submissions: {submissions.length}</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Recent Submissions</h2>
        <ul className="space-y-2">
          {submissions.map((s, i) => (
            <li key={i} className="rounded border p-2">
              <div className="text-sm text-gray-600">{new Date(s.createdAt).toLocaleString()}</div>
              <div className="font-medium">{s.name} &lt;{s.email}&gt;</div>
              <div className="text-sm">{s.message}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

