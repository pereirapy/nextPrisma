import { NextResponse, type NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from './app/i18n/settings';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // locales are readonly
  const locales = i18n.locales as unknown as string[];

  // Use negotiator and intl-locale matcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);

  // RSC pathname workaround, since ATM we can't access pathname in RSC
  requestHeaders.set('x-current-pathname', pathname);

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    );
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders, // Overridden headers (including our x-current-pathname)
    },
  });
}

export const config = {
  // Matcher ignoring `/api /_next/` `/images /manifest.json`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|manifest.json).*)',
  ],
};
