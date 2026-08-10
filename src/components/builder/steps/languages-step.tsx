"use client";

import * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Languages as LanguagesIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  languagesSchema,
  type LanguagesFormValues,
} from "@/lib/validations/resume-schema";
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

const LANGUAGE_LEVELS = [
  { value: "basic", label: "Dasar" },
  { value: "conversational", label: "Percakapan" },
  { value: "fluent", label: "Lancar" },
  { value: "native", label: "Bahasa Ibu" },
] as const;

interface LanguagesStepProps {
  formId: string;
  onValid: () => void;
}

export function LanguagesStep({ formId, onValid }: LanguagesStepProps) {
  const languages = useResumeStore((s) => s.data.languages);
  const setLanguages = useResumeStore((s) => s.setLanguages);

  const { control, register, handleSubmit, watch } =
    useForm<LanguagesFormValues>({
      resolver: zodResolver(languagesSchema),
      defaultValues: { languages },
      mode: "onBlur",
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      setLanguages((values.languages ?? []) as typeof languages);
    });
    return () => subscription.unsubscribe();
  }, [watch, setLanguages]);

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
              placeholder="Nama bahasa, contoh: Bahasa Inggris"
              {...register(`languages.${index}.name` as const)}
              className="flex-1"
            />
            <Controller
              control={control}
              name={`languages.${index}.level` as const}
              render={({ field: selectField }) => (
                <Select value={selectField.value} onValueChange={selectField.onChange}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_LEVELS.map((level) => (
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
              aria-label="Hapus bahasa"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      {fields.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          <LanguagesIcon className="h-8 w-8" />
          <p className="text-sm">Belum ada bahasa ditambahkan.</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          append({ id: generateId(), name: "", level: "conversational" })
        }
      >
        <Plus className="h-4 w-4" />
        Tambah Bahasa
      </Button>
    </form>
  );
}
