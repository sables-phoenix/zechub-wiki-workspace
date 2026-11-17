export type ParentInterface = "classic" | "reader" | "desktop";

export function getParentOrigin(): string | null {
  if (typeof window === "undefined" || window.self === window.top) return null;
  const value = new URLSearchParams(window.location.search).get("parentOrigin");
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isEmbedded(): boolean {
  return getParentOrigin() !== null;
}

export function requestParentInterface(id: ParentInterface): boolean {
  const origin = getParentOrigin();
  if (!origin) return false;
  window.parent.postMessage({ type: "zechub:switch-interface", interface: id }, origin);
  return true;
}
