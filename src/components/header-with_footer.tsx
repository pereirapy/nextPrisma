import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Locale } from '@/app/i18n/settings';
import { ReactNode } from 'react';
import { Dictionary } from '@/types/app';
import { H1 } from './ui/typographies';

export default function HeaderWithFooter({
	currentLanguage,
	dictionary,
	children,
	title,
}: {
	dictionary: Dictionary;
	currentLanguage: Locale;
	children: ReactNode;
	title?: string;
}) {
	return (
		<div className="container">
			<SiteHeader
				dictionary={dictionary}
				currentLanguage={currentLanguage}
			/>
			<div
				className="mt-4 mb-4"
				style={{ minHeight: '400px' }}>
				{title && <H1 className="mt-16 mb-16 text-center">{title}</H1>}
				{children}
			</div>
			<SiteFooter />
		</div>
	);
}
