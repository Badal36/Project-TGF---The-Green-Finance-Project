import React from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import projects from '@/data/projects.json';
import impact from '@/data/impact.json';
import { allPosts } from 'contentlayer/generated';

function ImpactSnapshot() {
  // Simple aggregate: sum CO2 avoided (if present)
  const co2 = impact
    .filter((r) => r.metric === 'co2e_avoided')
    .reduce((acc, r) => acc + (Number(r.value) || 0), 0);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <p className="text-sm text-gray-500">CO₂e avoided</p>
        <p className="text-2xl font-semibold">{co2.toLocaleString()} t/y</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Projects</p>
        <p className="text-2xl font-semibold">{projects.length}</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Blog posts</p>
        <p className="text-2xl font-semibold">{allPosts.length}</p>
      </Card>
    </div>
  );
}

export default function HomePage() {
  const latestProjects = projects.slice(0, 3);
  const posts = [...allPosts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
  return (
    <div className="container space-y-12">
      <section className="mt-8 grid items-center gap-6 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Invest in a greener future</h1>
          <p className="mt-3 text-lg text-gray-700">
            The Green Finance Project connects capital with high-impact, verifiable climate projects.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/projects"><Button>Explore Projects</Button></a>
            <a href="/about"><Button variant="secondary">Learn More</Button></a>
          </div>
        </div>
        <div className="rounded-lg bg-emerald-50 p-8 text-emerald-900">Sustainable finance starts here.</div>
      </section>

      <section aria-labelledby="latest-projects">
        <h2 id="latest-projects" className="mb-4 text-2xl font-semibold">Latest Projects</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {latestProjects.map((p) => (
            <Card key={p.slug} href={`/projects/${p.slug}`}>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.country} • {p.type}</p>
              <p className="mt-2 text-sm">{p.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="recent-posts">
        <h2 id="recent-posts" className="mb-4 text-2xl font-semibold">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} href={`/blog/${post.slug}`}>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
              <p className="mt-2 text-sm">{post.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="impact-snapshot">
        <h2 id="impact-snapshot" className="mb-4 text-2xl font-semibold">Impact Snapshot</h2>
        <ImpactSnapshot />
      </section>
    </div>
  );
}

