"use client";
import { useColorMode } from "@/components/ui/color-mode";
import React from "react";

export function PageBackgroundSync() {
  const { colorMode } = useColorMode();
  const pageBg = colorMode === "dark" ? "#6B4F27" : "#EADDCA";

  React.useEffect(() => {
    document.body.style.backgroundColor = pageBg;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [pageBg]);

  return null;
}
