import { Locale, i18n } from "@/app/i18n/settings";
import { LOCAL_STORAGE_APP_LANGUAGE } from "./constants";
import { OurFetchParams } from "@/types/app";

export const setPreferredLanguage = (lang: Locale) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_APP_LANGUAGE, lang);
};

export const getPreferredLanguage = () => {
  if (typeof window === 'undefined') return i18n.defaultLocale;
  return localStorage.getItem(LOCAL_STORAGE_APP_LANGUAGE) || i18n.defaultLocale;
};

export const getCurrentTheme = ({ currentTheme, systemTheme }: { currentTheme?: string, systemTheme?: string }) => {
  const defaultTheme = 'light';
  return currentTheme === 'system'
    ? systemTheme || defaultTheme
    : currentTheme || defaultTheme;
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || window?.location?.origin || 'http://localhost:3000'}${path}`;
}

export function absoluteApiUrl(path: string) {
  return absoluteUrl(`/api/${path}`);
}


export async function ourFetch({ path, data, method }: OurFetchParams) {
  const result = await fetch(absoluteApiUrl(path), {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-type': 'application/json',
    },
    //test
    cache: 'no-store',
  });
  const dataJson = await result.json();
  return { result, data: dataJson };
}
