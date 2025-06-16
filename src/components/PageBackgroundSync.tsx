"use client";
import React from "react";

export function PageBackgroundSync() {
  const pageBg = "#EADDCA";

  React.useEffect(() => {
    document.body.style.backgroundColor = pageBg;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [pageBg]);

  return null;
}
