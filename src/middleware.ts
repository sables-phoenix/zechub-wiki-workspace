import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

const localizedLocales: ReadonlySet<string> = new Set(locales.filter((locale) => locale !== defaultLocale));

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/internal-locale" || pathname.startsWith("/internal-locale/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const first = pathname.split("/").filter(Boolean)[0];
  if (!first || !localizedLocales.has(first)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/internal-locale${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|brand|icon.svg|opengraph-image|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
