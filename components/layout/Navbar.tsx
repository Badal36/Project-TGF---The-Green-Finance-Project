'use client';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((o) => !o);

  const links = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/impact', label: 'Impact Data' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold text-brand" aria-label="TGF Home">
          The Green Finance Project
        </Link>
        <button
          className="md:hidden inline-flex items-center justify-center rounded p-2 text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={toggle}
        >
          <span className="sr-only">Toggle menu</span>
          ☰
        </button>
        <nav
          id="primary-nav"
          className={clsx('md:flex gap-6 items-center', open ? 'block' : 'hidden md:block')}
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block py-2 text-gray-700 hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

