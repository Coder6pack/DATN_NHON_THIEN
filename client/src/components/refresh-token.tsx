"use client";
import { checkAndRefreshToken } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UNAUTHENTICATED_PATH = [
  "/login",
  "/logout",
  "/refresh-token",
  "/register",
];

export default function RefreshToken() {
  const pathname = usePathname();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return;

    let interval: NodeJS.Timeout | null = null;

    const refresh = () => {
      checkAndRefreshToken({
        onSuccess: ({ accessToken, refreshToken }) => {
          console.log("Tokens refreshed successfully");
        },
        onError: () => {
          setError("Failed to refresh token");
          if (interval) clearInterval(interval);
          router.push("/login");
        },
      });
    };

    refresh(); // Gọi lần đầu
    const TIMEOUT = 540000; // 9 phút, giả sử accessToken sống 10 phút
    interval = setInterval(refresh, TIMEOUT);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pathname, router]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
}
