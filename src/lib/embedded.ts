export type ParentInterface = "classic" | "reader" | "desktop";

const PARENT_ORIGIN_KEY = "zechub-parent-origin";

function rememberParentOrigin(origin: string): void {
  try {
    window.sessionStorage.setItem(PARENT_ORIGIN_KEY, origin);
  } catch {
    return;
  }
}

function storedParentOrigin(): string | null {
  try {
    const stored = window.sessionStorage.getItem(PARENT_ORIGIN_KEY);
    return stored ? new URL(stored).origin : null;
  } catch {
    return null;
  }
}

export function getParentOrigin(): string | null {
  if (typeof window === "undefined" || window.self === window.top) return null;
  const value = new URLSearchParams(window.location.search).get("parentOrigin");
  if (value) {
    try {
      const origin = new URL(value).origin;
      rememberParentOrigin(origin);
      return origin;
    } catch {
      return null;
    }
  }
  return storedParentOrigin();
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
