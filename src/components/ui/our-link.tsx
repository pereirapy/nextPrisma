'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export type OurLinkHrefClick =
  | { href: string; onClick?: () => void }
  | { href?: string; onClick: () => void };

export type OurLinkProps = {
  children: string | React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  OurLinkHrefClick;

export function OurLink({
  href,
  onClick,
  children,
  className,
  ...rest
}: OurLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      {...rest}
      href={href || ''}
      onClick={() => onClick?.()}
      className={cn(
        `text-primary hover:text-foreground/80 h-9 px-4 py-2 underline-offset-4 transition-colors hover:underline ${className}`,
        pathname?.includes(href || '')
          ? 'text-foreground'
          : 'text-foreground/60',
      )}>
      {children}
    </Link>
  );
}
