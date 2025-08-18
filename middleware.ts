import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const protectedRoutes = ["/employee", "/employer", "/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const accessToken = req.cookies.get("sb-access-token")?.value;
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (pathname.startsWith("/admin") && profile.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/employer") && profile.role !== "employer") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/employee") && profile.role !== "employee") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/employee/:path*", "/employer/:path*", "/admin/:path*"],
};
