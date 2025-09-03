import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import data from '@/data/impact.json';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const format = url.searchParams.get('format');
  if (format === 'csv') {
    const csvPath = path.join(process.cwd(), 'data', 'impact.csv');
    const csv = fs.readFileSync(csvPath, 'utf8');
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="impact.csv"',
      },
    });
  }
  return NextResponse.json(data);
}

