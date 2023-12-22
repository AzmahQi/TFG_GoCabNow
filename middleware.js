import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
export { default } from "next-auth/middleware";

// Function to extract locale from request headers
function getLocale(request) {
  // Transform request headers into a plain object
  const negotiatorHeaders = Object.fromEntries(request.headers);
  const locales = i18n.locales;

  // Use negotiator and intl-localematcher to get the best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

// Middleware for handling i18n and locale-based redirects
export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if the current path is in the list of excluded paths
  const isExcludedPath = [
    '/manifest.json',
    '/favicon.ico',
    // Add other files in `public` if needed
  ].some((excludedPath) => pathname === excludedPath);

  // If the path is excluded, return without further processing
  if (isExcludedPath) {
    return;
  }

  // Check if the current path is missing any supported locale prefix
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If the path is missing a locale prefix, redirect to the appropriate locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Construct the redirected path with the detected locale
    const redirectPath = `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
}

// Configuration for the middleware, excluding specific paths from matching
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};