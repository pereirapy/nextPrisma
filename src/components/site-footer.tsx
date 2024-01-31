import { siteConfig } from '@/config/site';
import { Dictionary } from '@/types/app';

type SiteFooterProps = {
	dictionary: Dictionary;
};
export function SiteFooter({ dictionary }: SiteFooterProps) {
	return (
		<footer className="h-14 flex bg-slate-400 text-center">
				<span className="m-auto text-sm align-middle">
					<span className='font-bold italic'>{siteConfig.name}</span>{' '}{dictionary.footer.registered} 
				</span>
		</footer>
	);
}
