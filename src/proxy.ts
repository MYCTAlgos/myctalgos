import { NextRequest, NextResponse } from "next/server";

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;

  const decoded = atob(auth.slice(6));
  const separatorIndex = decoded.indexOf(":");
  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);

  return (
    user === process.env.SITE_ACCESS_USER &&
    pass === process.env.SITE_ACCESS_PASSWORD
  );
}

export function proxy(request: NextRequest) {
  const gateEnabled =
    process.env.VERCEL_ENV === "production" &&
    process.env.SITE_ACCESS_PASSWORD;

  if (!gateEnabled || isAuthorized(request)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="MYCTAlgos Preview"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
