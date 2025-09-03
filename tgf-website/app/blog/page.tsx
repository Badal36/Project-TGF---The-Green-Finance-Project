import React from 'react';
import { allPosts } from 'contentlayer/generated';
import Card from '@/components/ui/Card';

export const metadata = { title: 'Blog' };

export default function BlogPage() {
  const posts = [...allPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div className="container space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.slug} href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
            <p className="mt-2 text-sm">{post.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

