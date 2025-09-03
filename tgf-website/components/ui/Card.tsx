import React from 'react';
import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  href?: string;
};

export default function Card({ href, className, children, ...props }: CardProps) {
  const content = (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
        {content}
      </a>
    );
  }
  return content;
}

