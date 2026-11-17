"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type ParentTheme = "paper" | "vault";

function isParentTheme(value: unknown): value is ParentTheme {
  return value === "paper" || value === "vault";
}

export function EmbeddedThemeBridge() {
  const { setTheme, resolvedTheme } = useTheme();
  const parentOrigin = useRef<string | null>(null);
  const setThemeRef = useRef(setTheme);

  useEffect(() => {
    setThemeRef.current = setTheme;
  }, [setTheme]);

  useEffect(() => {
    if (window.self === window.top) return;

    const params = new URLSearchParams(window.location.search);
    const origin = params.get("parentOrigin");
    if (!origin) return;
    parentOrigin.current = origin;

    const initial = params.get("theme");
    if (isParentTheme(initial)) {
      setThemeRef.current(initial === "paper" ? "light" : "dark");
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== window.parent) return;
      if (!event.data || event.data.type !== "zechub:theme") return;
      const theme = event.data.theme;
      if (!isParentTheme(theme)) return;
      setThemeRef.current(theme === "paper" ? "light" : "dark");
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const origin = parentOrigin.current;
    if (!origin || !resolvedTheme) return;
    window.parent.postMessage(
      {
        type: "zechub:theme",
        theme: resolvedTheme === "dark" ? "vault" : "paper",
      },
      origin,
    );
  }, [resolvedTheme]);

  return null;
}
