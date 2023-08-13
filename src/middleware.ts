import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
// import type { Database } from '@/lib/database.types'
let count = 0;

export async function middleware(req: NextRequest) {
  count += 1;
  try {
    console.log(
      count,
      "🚀 ~ file: middleware.ts:10 ~ middleware ~ req:",
      req.nextUrl.pathname
    );
    const res = NextResponse.next();
    const path = req.nextUrl.pathname;

    const supabase = createMiddlewareClient({ req, res });
    const { data, error } = await supabase.auth.getSession();
    console.log(
      count,
      "🚀 ~ file: middleware.ts:15 ~ middleware ~ error:",
      error
    );
    // console.log(
    //   count,
    //   "🚀 ~ file: middleware.ts:15 ~ middleware ~ data:",
    //   data
    // );

    if (path === "/") {
      if (data && data?.session)
        return NextResponse.redirect(new URL("/dashboard", req.url));
      else {
        return res;
      }
    }

    // protected routes
    if (path.startsWith("/dashboard") || path.startsWith("/studyroom")) {
      if (!data?.session) {
        return NextResponse.redirect(new URL("/", req.url));
      } else {
        return res;
      }
    }

    if (error) {
      console.log(
        count,
        "🚀 ~ file: middleware.ts:39 ~ middleware ~ error:",
        error
      );
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  } catch (error) {
    console.log(
      count,
      "🚀 ~ file: middleware.ts:48 ~ middleware ~ error:",
      error
    );
  }
}
