import { NextResponse, type NextRequest } from "next/server";

const GONE_PATTERNS: RegExp[] = [
  /\.php(\/|$)/i,
  /^\/wp-(admin|content|includes|login|json|config|cron)(\/|$)/i,
  /^\/xmlrpc(\/|$)/i,
  /^\/\.env(\/|$)/i,
];

const GONE_BODY =
  "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex, nofollow\"><title>410 Gone</title></head><body><h1>410 Gone</h1><p>This URL has been permanently removed.</p></body></html>";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (GONE_PATTERNS.some((re) => re.test(pathname))) {
    return new NextResponse(GONE_BODY, {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/|api/|images/|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)",
  ],
};
