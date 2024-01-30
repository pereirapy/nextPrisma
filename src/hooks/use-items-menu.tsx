'use client';

import { usePathname, useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { signOut } from 'next-auth/react';
import { Locale } from '@/app/i18n/settings';
import { Dictionary } from '@/types/app';
import { OurLink, OurLinkHrefClick } from '@/components/ui/our-link';
import { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

export type ItemMenu = {
	label: string;
} & OurLinkHrefClick;

export type UseItemsMenu = {
	loggedIn: ItemMenu[];
	notLoggedIn: ItemMenu[];
};

type UseItemsMenuProps = {
	currentLanguage: Locale;
	dictionary: Dictionary;
};

export const renderItemsMenu = (item: ItemMenu, key: number) =>
	item.href ? (
		<OurLink
			key={item.href}
			href={item.href}>
			{item.label}
		</OurLink>
	) : (
		item.onClick && (
			<OurLink
				key={item.href || key}
				onClick={item.onClick}>
				{item.label}
			</OurLink>
		)
	);

interface IMobileLinkProps extends LinkProps {
	onOpenChange?: () => void;
	children: React.ReactNode;
	className?: string;
}

type MobileLinkProps = IMobileLinkProps & OurLinkHrefClick;

export function MobileLink({
	href,
	onClick,
	onOpenChange,
	className,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	return (
		<OurLink
			href={href}
			onClick={() => {
				onOpenChange?.();
				if(href && href !== '') router.push(href.toString());
				else if (onClick) onClick();
			}}
			className={cn('flex items-center')}
			{...props}>
			{children}
		</OurLink>
	);
}

export function useItemsMenu({
	currentLanguage,
	dictionary,
}: UseItemsMenuProps): UseItemsMenu {

	const signInLink = {
		href: `/${currentLanguage}${routes.signIn}`,
		label: dictionary.common.signIn,
	};

	const rankingLink = {
		href: `/${currentLanguage}${routes.ranking}`,
		label: dictionary.itemsMenu.ranking,
	};

	const pointsLink = {
		href: `/${currentLanguage}${routes.points}`,
		label: dictionary.itemsMenu.points,
	};

	const signOutButton = {
		onClick: () =>
			signOut({
				callbackUrl: `/${currentLanguage}${routes.signIn}`,
				redirect: true,
			}),

		label: dictionary.common.signOut,
	};

	return {
		loggedIn: [pointsLink, rankingLink, signOutButton],
		notLoggedIn: [signInLink, rankingLink],
	};
}
