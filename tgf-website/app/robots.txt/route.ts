export async function GET() {
  const base = process.env.SITE_URL || 'https://tgf.example.org';
  const content = `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
}

