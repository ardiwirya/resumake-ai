"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { useResumeStore } from "@/store/resume-store";

export function AutoSaveIndicator() {
  const lastSavedAt = useResumeStore((s) => s.lastSavedAt);
  const [label, setLabel] = React.useState<string>("");

  React.useEffect(() => {
    if (!lastSavedAt) return;

    const updateLabel = () => {
      const seconds = Math.round((Date.now() - lastSavedAt) / 1000);
      if (seconds < 5) setLabel("Baru saja disimpan");
      else if (seconds < 60) setLabel(`Disimpan ${seconds} detik lalu`);
      else setLabel(`Disimpan ${Math.round(seconds / 60)} menit lalu`);
    };

    updateLabel();
    const interval = setInterval(updateLabel, 5000);
    return () => clearInterval(interval);
  }, [lastSavedAt]);

  if (!lastSavedAt) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
      {label}
    </div>
  );
}
