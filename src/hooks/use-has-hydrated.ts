"use client";

import * as React from "react";
import { useResumeStore } from "@/store/resume-store";

/**
 * Returns true once the persisted Zustand store has finished rehydrating
 * from localStorage. Use this to avoid rendering mismatched content
 * between server and client on first paint.
 */
export function useHasHydrated() {
  const hasHydrated = useResumeStore((s) => s.hasHydrated);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && hasHydrated;
}
