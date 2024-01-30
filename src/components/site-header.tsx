"use client"

import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Dictionary } from '@/types/app';
import { buttonVariants } from './ui/button';
import {
	GitHubLogoIcon,
	TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { Locale } from '@/app/i18n/settings';
import { useItemsMenu } from '@/hooks/use-items-menu';
import { LanguageToggle } from './language-toggle';

export function SiteHeader({
	dictionary,
	currentLanguage
}: {
	dictionary: Dictionary;
	currentLanguage: Locale
}) {
	const itemsMenu = useItemsMenu({currentLanguage, dictionary})
	return (
		<header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
			<div className="flex h-14 items-center">
				<MainNav itemsMenu={itemsMenu} currentLanguage={currentLanguage} />
				<MobileNav itemsMenu={itemsMenu} currentLanguage={currentLanguage}/>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<nav className="flex items-center">
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer">
							<div
								className={cn(
									buttonVariants({
										variant: 'ghost',
									}),
									'w-9 px-0 mr-2'
								)}>
								<GitHubLogoIcon className="h-4 w-4" />
								<span className="sr-only">GitHub</span>
							</div>
						</Link>
						<Link
							href={siteConfig.links.twitter}
							target="_blank"
							rel="noreferrer">
							<div
								className={cn(
									buttonVariants({
										variant: 'ghost',
									}),
									'w-9 px-0 mr-2'
								)}>
								<TwitterLogoIcon className="h-4 w-4 fill-current" />
								<span className="sr-only">Twitter</span>
							</div>
						</Link>
						<ThemeToggle dictionary={dictionary} />
						<LanguageToggle
            currentLanguage={currentLanguage}
            dictionary={dictionary}
          />

					</nav>
				</div>
			</div>
		</header>
	);
}
