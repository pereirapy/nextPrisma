import { Dictionary } from '@/types/app';
import { siteConfig } from '@/config/site';

type SiteFooterProps = {
  dictionary: Dictionary;
};
export function SiteFooter({ dictionary }: SiteFooterProps) {
  return (
    <footer className="flex h-14 bg-slate-400 text-center">
      <span className="m-auto align-middle text-sm">
        <span className="font-bold italic">{siteConfig.name}</span>{' '}
        {dictionary.footer.registered}
      </span>
    </footer>
  );
}
