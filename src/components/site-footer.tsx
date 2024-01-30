import { siteConfig } from '@/config/site';
import { Dictionary } from '@/types/app';

type SiteFooterProps = {
	dictionary: Dictionary;
};
export function SiteFooter({ dictionary }: SiteFooterProps) {
	return (
		<footer className="h-14">
			<div className="flex flex-col items-center justify-between gap-4 md:h-24">
				<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
					{dictionary.footer.buildFor} {siteConfig.name}.{' '}
					{dictionary.footer.sourceCode}{' '}
					<a
						href={siteConfig.links.github}
						target="_blank"
						rel="noreferrer"
						className="font-medium underline underline-offset-4">
						GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
}
