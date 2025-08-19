import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id) 
    .single();

  if (!profile) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth"; 
    return NextResponse.redirect(url);
  }

  const role = profile.role; 
  const path = request.nextUrl.pathname;

  if (role === "employee" && !path.startsWith("/employee")) {
    return NextResponse.redirect(new URL("/employee", request.url));
  }

  if (role === "employer" && !path.startsWith("/employer")) {
    return NextResponse.redirect(new URL("/employer", request.url));
  }

  if (role === "admin" && !path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/employee/:path*", "/employer/:path*", "/admin/:path*"],
};
