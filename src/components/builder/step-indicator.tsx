"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { RESUME_STEPS, STEP_META, type ResumeStep } from "@/types/resume";
import { useResumeStore } from "@/store/resume-store";

export function StepIndicator() {
  const currentStep = useResumeStore((s) => s.currentStep);
  const setCurrentStep = useResumeStore((s) => s.setCurrentStep);
  const currentIndex = RESUME_STEPS.indexOf(currentStep);

  const handleStepClick = (step: ResumeStep, index: number) => {
    if (index <= currentIndex) {
      setCurrentStep(step);
    }
  };

  return (
    <nav aria-label="Langkah pembuatan CV" className="w-full">
      <ol className="flex flex-col gap-1">
        {STEP_META.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentIndex;
          const isClickable = index <= currentIndex;

          return (
            <li key={step.id}>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => handleStepClick(step.id, index)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                  isActive && "bg-primary/10 text-primary font-medium",
                  !isActive && isClickable && "hover:bg-accent",
                  !isClickable && "cursor-not-allowed opacity-50"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                    isActive && "border-primary bg-primary text-primary-foreground",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    !isActive && !isCompleted && "border-muted-foreground/40"
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </span>
                <span className="flex flex-col">
                  <span>{step.label}</span>
                  <span className="hidden text-xs font-normal text-muted-foreground lg:block">
                    {step.description}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
