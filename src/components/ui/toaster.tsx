"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      position="top-right"
      offset={44}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      closeButton
      toastOptions={{
        classNames: {
          toast: "border border-line bg-paper text-ink shadow-xl",
          title: "text-sm font-medium",
          description: "text-xs text-muted",
          actionButton: "bg-gold text-gold-ink",
          cancelButton: "bg-paper-2 text-ink",
        },
      }}
    />
  );
};

export { Toaster };
