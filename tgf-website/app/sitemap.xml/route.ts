import { NextResponse } from 'next/server';
import projects from '@/data/projects.json';
import { allPosts } from 'contentlayer/generated';

export async function GET() {
  const base = process.env.SITE_URL || 'https://tgf.example.org';
  const urls: string[] = [
    '/',
    '/about',
    '/projects',
    '/impact',
    '/blog',
    '/contact',
    '/privacy',
  ];
  urls.push(...projects.map((p) => `/projects/${p.slug}`));
  urls.push(...allPosts.map((p) => `/blog/${p.slug}`));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `<url><loc>${base}${u}</loc></url>`) 
    .join('\n')}\n</urlset>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}

