import * as React from 'react';
import { siteConfig } from '@/config/site';
import { routes } from '@/config/routes';
import { useSession } from 'next-auth/react';
import {
	UseItemsMenu,
	renderItemsMenu,
} from '@/hooks/use-items-menu';
import { Locale } from '@/app/i18n/settings';
import { OurLink } from './ui/our-link';
import { GiSoccerKick } from "react-icons/gi";

type MainNavProps = {
	itemsMenu: UseItemsMenu;
	currentLanguage: Locale;
};

export function MainNav({
	itemsMenu,
	currentLanguage,
}: MainNavProps) {
	const { data } = useSession();

	return (
		<div className="mr-4 hidden md:flex">
			<OurLink
				href={`/${currentLanguage}${routes.home}`}
				className="mr-6 flex items-center space-x-2">
				<GiSoccerKick className="h-6 w-6" />{' '}
				<span className="hidden font-bold sm:inline-block">
					{siteConfig.name}
				</span>
			</OurLink>
			<nav className="flex items-center space-x-6 text-sm font-medium">
				{data
					? itemsMenu.loggedIn.map((item, key) =>
							renderItemsMenu(item, key)
					  )
					: itemsMenu.notLoggedIn.map((item, key) =>
							renderItemsMenu(item, key)
					  )}
			</nav>
		</div>
	);
}
