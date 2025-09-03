import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="container py-8 text-sm text-gray-600">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} The Green Finance Project. All rights reserved.
          </p>
          <nav aria-label="Footer">
            <ul className="flex gap-4">
              <li>
                <Link href="/privacy" className="hover:text-brand">
                  Privacy
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

