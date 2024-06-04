"use client";

import { clientSessionToken } from "@/lib/https";
import { useState } from "react";

export default function AppProvider({
  children,
  inititalSessionToken = "",
}: {
  children: React.ReactNode;
  inititalSessionToken?: string;
}) {
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = inititalSessionToken;
    }
  });
  return <>{children}</>;
}
