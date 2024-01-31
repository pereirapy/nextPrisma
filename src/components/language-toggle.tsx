'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Language } from 'grommet-icons';
import { useTheme } from 'next-themes';

import { DropdownMenuItems, DropdownMenuItemsProps } from './dropdown-menu-items';
import { Dictionary } from '@/types/app';
import { Locale } from '@/lib/i18n/settings';
import { getCurrentTheme, setPreferredLanguage } from '@/utils/app';

export function LanguageToggle({
  dictionary,
  currentLanguage,
}: {
  dictionary: Dictionary;
  currentLanguage: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme: currentTheme, systemTheme } = useTheme();
  const theme = getCurrentTheme({ currentTheme, systemTheme });

  const setNewPathname = (newLanguage: Locale) => {
    if (!pathname) return;
    const newPathname = pathname?.replace(
      String(currentLanguage),
      String(newLanguage),
    );
    setPreferredLanguage(newLanguage);
    router.replace(newPathname);
  };

  const dropdownMenuItems: DropdownMenuItemsProps = {
    label: dictionary.languages.label,
    icon: (
        <Language color={theme === 'light' || systemTheme === 'dark' ? 'plain' : 'white'} />
    ),
    items: [
      {
        label: dictionary.languages.english,
        onClick: () => setNewPathname('en'),
      },
      {
        label: dictionary.languages.portuguese,
        onClick: () => setNewPathname('pt'),
      },
    ],
  };

  return <DropdownMenuItems {...dropdownMenuItems} />;
}
