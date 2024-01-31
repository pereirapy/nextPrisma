'use client';

import * as React from 'react';
import { ViewVerticalIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useSession } from 'next-auth/react';
import { GiSoccerKick } from 'react-icons/gi';

import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { Locale } from '@/lib/i18n/settings';
import { MobileLink, UseItemsMenu } from '@/hooks/use-items-menu';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

type MobileNavProps = {
  itemsMenu: UseItemsMenu;
  currentLanguage: Locale;
};

export function MobileNav({ itemsMenu, currentLanguage }: MobileNavProps) {
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
          <GiSoccerKick className="mr-2 h-4 w-4" />
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
