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
console.log({pathname, href})
	return (
		<Link
			{...rest}
			href={href || ''}
			onClick={() => onClick?.()}
			className={cn(
				`text-primary underline-offset-4 hover:underline h-9 px-4 py-2 transition-colors hover:text-foreground/80 ${className}`,
				pathname?.includes(href || '')
					? 'text-foreground'
					: 'text-foreground/60'
			)}>
			{children}
		</Link>
	);
}
