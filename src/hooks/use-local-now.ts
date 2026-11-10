"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let timer: number | null = null;

const schedule = () => {
  if (timer !== null) return;
  const delay = 60_000 - (Date.now() % 60_000);
  timer = window.setTimeout(() => {
    timer = null;
    for (const listener of listeners) listener();
    if (listeners.size > 0) schedule();
  }, delay);
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  schedule();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  };
};

const getSnapshot = () => Math.floor(Date.now() / 60_000);

const getServerSnapshot = () => null;

export function useLocalNow(): Date | null {
  const tick = useSyncExternalStore<number | null>(subscribe, getSnapshot, getServerSnapshot);
  return tick === null ? null : new Date(tick * 60_000);
}
