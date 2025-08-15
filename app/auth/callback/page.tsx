"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.error("No session found after OAuth");
        router.push("/auth?error=oauth");
        return;
      }

      const role = searchParams.get("role");
      const userId = session.user.id;
      const fullName = session.user.user_metadata.full_name || null;

      const { data: profile, error: checkError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking profile:", checkError);
        return;
      }

      if (!profile) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: userId,
            full_name: fullName,
            role: role,
            is_setup_complete: false,
          },
        ]);

        if (insertError) {
          console.error("Error creating profile:", insertError);
          return;
        }

        if (role === "employer") return router.push("/employer/setup");
        if (role === "employee") return router.push("/employee/setup");
      } else {
        if (profile.role === "employer") {
          if (!profile.is_setup_complete) return router.push("/employer/setup");
          return router.push("/employer/dashboard");
        }

        if (profile.role === "employee") {
          if (!profile.is_setup_complete) return router.push("/employee/setup");
          return router.push("/employee/dashboard");
        }

        if (profile.role === "admin") {
          return router.push("/admin");
        }
      }

      // Fallback
      router.push("/");
    };

    handleLogin();
  }, [router, searchParams]);

  return <p>Signing you in...</p>;
}
