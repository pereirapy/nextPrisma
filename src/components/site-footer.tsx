import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="h-14">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Rodrigo Pereira{' '}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4">
            Pereirapy
          </a>
          . The source code is available on{' '}
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
