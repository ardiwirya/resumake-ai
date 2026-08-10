"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useResumeStore } from "@/store/resume-store";
import type { TemplateId } from "@/types/resume";

const TEMPLATES: {
  id: TemplateId;
  name: string;
  description: string;
  accent: string;
}[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Header berwarna dengan tata letak dua kolom, cocok untuk industri kreatif dan teknologi.",
    accent: "bg-blue-600",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Tampilan formal satu kolom yang cocok untuk industri korporat dan pemerintahan.",
    accent: "bg-slate-800",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Desain bersih dengan banyak white space, fokus pada keterbacaan konten.",
    accent: "bg-emerald-600",
  },
];

interface TemplateStepProps {
  formId: string;
  onValid: () => void;
}

export function TemplateStep({ formId, onValid }: TemplateStepProps) {
  const template = useResumeStore((s) => s.data.template);
  const setTemplate = useResumeStore((s) => s.setTemplate);

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        onValid();
      }}
      className="grid gap-4 sm:grid-cols-3"
    >
      {TEMPLATES.map((item) => {
        const isSelected = template === item.id;
        return (
          <motion.button
            key={item.id}
            type="button"
            whileHover={{ y: -4 }}
            onClick={() => setTemplate(item.id)}
            className={cn(
              "flex flex-col overflow-hidden rounded-lg border text-left transition-shadow",
              isSelected ? "border-primary ring-2 ring-primary" : "border-border"
            )}
          >
            <div className={cn("flex h-32 flex-col justify-end gap-1 p-3", item.accent)}>
              <div className="h-2 w-2/3 rounded bg-white/80" />
              <div className="h-1.5 w-1/2 rounded bg-white/60" />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                {isSelected && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </motion.button>
        );
      })}
    </form>
  );
}
