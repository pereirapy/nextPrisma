'use client';

import * as React from 'react';

import { siteConfig } from '@/config/site';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from './ui/button';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { ViewVerticalIcon, LaptopIcon } from '@radix-ui/react-icons';
import { MobileLink, UseItemsMenu } from '@/hooks/use-items-menu';
import { Locale } from '@/app/i18n/settings';
import { useSession } from 'next-auth/react';
import { routes } from '@/config/routes';


type MobileNavProps = {
	itemsMenu: UseItemsMenu;
	currentLanguage: Locale;
};

export function MobileNav({
	itemsMenu,
	currentLanguage,
}: MobileNavProps) {
	const [open, setOpen] = React.useState(false);
	const { data } = useSession();

	return (
		<Sheet
			open={open}
			onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
					<ViewVerticalIcon className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="pr-0">
				<MobileLink
					href={`/${currentLanguage}${routes.home}`}
					onOpenChange={() => setOpen(false)}>
					<LaptopIcon className="mr-2 h-4 w-4" />
					<span className="font-bold">{siteConfig.name}</span>
				</MobileLink>
				{data
					? itemsMenu.loggedIn.map((item, key) => (
							<MobileLink
								key={item?.href || key}
								href={item?.href || ''}
                onClick={item?.onClick}
								onOpenChange={() => setOpen(false)}>
								{item.label}
							</MobileLink>
					  ))
					: itemsMenu.notLoggedIn.map((item, key) => (
							<MobileLink
								key={item?.href || key}
								href={item?.href || ''}
                onClick={item?.onClick}
								onOpenChange={() => setOpen(false)}>
								{item.label}
							</MobileLink>
					  ))}

				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6"></ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
