import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
// import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;
  console.log("🚀 ~ file: middleware.ts:10 ~ middleware ~ path:", path);

  const supabase = createMiddlewareClient({ req, res });
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // protected routes
  if (path.startsWith("/dashboard") || path.startsWith("/studyroom")) {
    if (!data.session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (path === "/") {
    if (data.session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return res;
}
