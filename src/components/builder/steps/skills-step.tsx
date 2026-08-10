"use client";

import * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Wrench } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { skillsSchema, type SkillsFormValues } from "@/lib/validations/resume-schema";
import { useResumeStore } from "@/store/resume-store";
import { generateId } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SKILL_LEVELS = [
  { value: "beginner", label: "Pemula" },
  { value: "intermediate", label: "Menengah" },
  { value: "advanced", label: "Mahir" },
  { value: "expert", label: "Ahli" },
] as const;

interface SkillsStepProps {
  formId: string;
  onValid: () => void;
}

export function SkillsStep({ formId, onValid }: SkillsStepProps) {
  const skills = useResumeStore((s) => s.data.skills);
  const setSkills = useResumeStore((s) => s.setSkills);

  const { control, register, handleSubmit, watch } = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: { skills },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  React.useEffect(() => {
    const subscription = watch((values) => {
      setSkills((values.skills ?? []) as typeof skills);
    });
    return () => subscription.unsubscribe();
  }, [watch, setSkills]);

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} className="flex flex-col gap-3">
      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2"
          >
            <Input
              placeholder="Nama skill, contoh: React.js"
              {...register(`skills.${index}.name` as const)}
              className="flex-1"
            />
            <Controller
              control={control}
              name={`skills.${index}.level` as const}
              render={({ field: selectField }) => (
                <Select value={selectField.value} onValueChange={selectField.onChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              aria-label="Hapus skill"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      {fields.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          <Wrench className="h-8 w-8" />
          <p className="text-sm">Belum ada skill ditambahkan.</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => append({ id: generateId(), name: "", level: "intermediate" })}
      >
        <Plus className="h-4 w-4" />
        Tambah Skill
      </Button>
    </form>
  );
}
