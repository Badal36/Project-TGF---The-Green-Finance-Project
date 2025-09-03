import fs from 'fs';
import path from 'path';
import projects from '../data/projects.json' assert { type: 'json' };
import { allPosts } from 'contentlayer/generated';

const base = process.env.SITE_URL || 'https://tgf.example.org';

function build() {
  const urls = ['/', '/about', '/projects', '/impact', '/blog', '/contact', '/privacy'];
  urls.push(...projects.map((p) => `/projects/${p.slug}`));
  urls.push(...allPosts.map((p) => `/blog/${p.slug}`));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `<url><loc>${base}${u}</loc></url>`) 
    .join('\n')}\n</urlset>`;
  const out = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, xml, 'utf8');
  console.log('Generated public/sitemap.xml');
}

build();

