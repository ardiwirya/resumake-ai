"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useResumeStore } from "@/store/resume-store";
import { RESUME_STEPS, STEP_META } from "@/types/resume";
import { getDummyResumeData } from "@/lib/dummy-data";
import { BUILDER_FORM_ID } from "@/components/builder/builder-form";

export function BuilderNav() {
  const currentStep = useResumeStore((s) => s.currentStep);
  const goToPreviousStep = useResumeStore((s) => s.goToPreviousStep);
  const loadDummyData = useResumeStore((s) => s.loadDummyData);
  const resetResume = useResumeStore((s) => s.resetResume);

  const currentIndex = RESUME_STEPS.indexOf(currentStep);
  const progress = Math.round(((currentIndex + 1) / RESUME_STEPS.length) * 100);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === RESUME_STEPS.length - 1;
  const currentMeta = STEP_META[currentIndex];

  const handleLoadDummy = () => {
    loadDummyData(getDummyResumeData());
    toast.success("Data contoh berhasil dimuat");
  };

  const handleReset = () => {
    resetResume();
    toast.info("Semua data telah direset");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">{currentMeta.label}</h2>
          <p className="text-sm text-muted-foreground">{currentMeta.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleLoadDummy}>
            <Sparkles className="h-4 w-4" />
            Isi Data Contoh
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Progress value={progress} className="flex-1" />
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          Langkah {currentIndex + 1} dari {RESUME_STEPS.length}
        </span>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={isFirstStep}
        >
          <ChevronLeft className="h-4 w-4" />
          Sebelumnya
        </Button>

        <Button type="submit" form={BUILDER_FORM_ID}>
          {isLastStep ? "Selesai" : "Selanjutnya"}
          {!isLastStep && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
