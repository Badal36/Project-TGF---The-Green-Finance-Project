import React from 'react';
import { allPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <div className="container prose max-w-none">
      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()} — {post.author || 'TGF Team'}</p>
      <MDXContent />
    </div>
  );
}

