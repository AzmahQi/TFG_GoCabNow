import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
export { default } from "next-auth/middleware";

// Function to extract locale from request headers
function getLocale(request) {
  try {
    const negotiatorHeaders = Object.fromEntries(request.headers);
    const locales = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (error) {
    console.error("Error extracting locale:", error);
    throw new NextResponse.Error("Internal Server Error", { status: 500 });
  }
}

// Function to check if the path should be excluded
function shouldExcludePath(path) {
  const excludedPaths = ["/manifest.json", "/favicon.ico"];
  return excludedPaths.some((excludedPath) => path === excludedPath);
}

// Function to check if the path is missing a supported locale prefix
function isMissingLocalePrefix(path, supportedLocales) {
  return supportedLocales.every(
    (locale) => !path.startsWith(`/${locale}/`) && path !== `/${locale}`
  );
}

// Function to construct the redirected path with the detected locale
function constructRedirectPath(locale, originalPath) {
  return `/${locale}${originalPath.startsWith("/") ? "" : "/"}${originalPath}`;
}

// Middleware for handling i18n and locale-based redirects
export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (shouldExcludePath(pathname)) {
    return;
  }

  if (isMissingLocalePrefix(pathname, i18n.locales)) {
    try {
      let existingLang = request.cookies.get('lang');
      let redirectPath;
      // If the lang cookie is not set, or the path is missing the locale prefix
      if (!existingLang) {
        const locale = getLocale(request);
        redirectPath = constructRedirectPath(locale, pathname);
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }else {
        redirectPath = constructRedirectPath(existingLang.value, pathname);
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }

      // If the lang cookie is already set, proceed without redirection
    } catch (error) {
      // Handle errors from getLocale function or cookie-related operations
      return error;
    }
  }
}

// Configuration for the middleware, excluding specific paths from matching
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
