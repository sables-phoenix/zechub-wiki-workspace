import { useSyncExternalStore } from "react";
import { isEmbedded } from "@/lib/embedded";

const subscribe = () => () => {};
const getServerSnapshot = () => false;

export function useIsEmbedded(): boolean {
  return useSyncExternalStore(subscribe, isEmbedded, getServerSnapshot);
}
