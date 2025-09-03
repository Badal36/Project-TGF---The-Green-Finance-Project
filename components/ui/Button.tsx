import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export default function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variants: Record<string, string> = {
    primary: 'bg-brand text-white hover:bg-emerald-700 focus-visible:ring-brand',
    secondary: 'bg-white text-brand border border-brand hover:bg-emerald-50 focus-visible:ring-brand',
    ghost: 'bg-transparent text-brand hover:bg-emerald-50 focus-visible:ring-brand',
  };
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

