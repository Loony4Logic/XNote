import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  console.log("🚀 ~ file: routes.ts:9 ~ GET ~ request:", request);
  const requestUrl = new URL(request.url);
  console.log("🚀 ~ file: routes.ts:11 ~ GET ~ requestUrl:", requestUrl);
  const code = requestUrl.searchParams.get("code");
  console.log("🚀 ~ file: routes.ts:13 ~ GET ~ code:", code);

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    console.log("🚀 ~ file: routes.ts:17 ~ GET ~ supabase:", supabase);
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
