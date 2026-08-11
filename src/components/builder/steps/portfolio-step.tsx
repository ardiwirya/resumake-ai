"use client";

import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, FolderKanban } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  portfolioSchema,
  type PortfolioFormValues,
} from "@/lib/validations/resume-schema";
import { useResumeStore } from "@/store/resume-store";
import { generateId } from "@/lib/utils";
import { FormField } from "@/components/shared/form-field";
import { RepeatableItemCard } from "@/components/shared/repeatable-item-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PortfolioStepProps {
  formId: string;
  onValid: () => void;
}

export function PortfolioStep({ formId, onValid }: PortfolioStepProps) {
  const portfolio = useResumeStore((s) => s.data.portfolio);
  const setPortfolio = useResumeStore((s) => s.setPortfolio);

  const { control, register, handleSubmit, watch } =
    useForm<PortfolioFormValues>({
      resolver: zodResolver(portfolioSchema),
      defaultValues: { portfolio },
      mode: "onBlur",
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "portfolio",
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      setPortfolio((values.portfolio ?? []) as typeof portfolio);
    });
    return () => subscription.unsubscribe();
  }, [watch, setPortfolio]);

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <RepeatableItemCard
            key={field.id}
            title={`Proyek ${index + 1}`}
            onRemove={() => remove(index)}
          >
            <FormField label="Judul Proyek" htmlFor={`title-${field.id}`} required>
              <Input
                id={`title-${field.id}`}
                placeholder="Resumake AI"
                {...register(`portfolio.${index}.title` as const)}
              />
            </FormField>
            <FormField label="URL Proyek" htmlFor={`url-${field.id}`}>
              <Input
                id={`url-${field.id}`}
                placeholder="https://github.com/username/proyek"
                {...register(`portfolio.${index}.url` as const)}
              />
            </FormField>
            <FormField
              label="Deskripsi"
              htmlFor={`desc-${field.id}`}
              className="sm:col-span-2"
            >
              <Textarea
                id={`desc-${field.id}`}
                rows={3}
                placeholder="Jelaskan singkat proyek dan teknologi yang digunakan"
                {...register(`portfolio.${index}.description` as const)}
              />
            </FormField>
          </RepeatableItemCard>
        ))}
      </AnimatePresence>

      {fields.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          <FolderKanban className="h-8 w-8" />
          <p className="text-sm">Belum ada proyek portfolio ditambahkan.</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          append({ id: generateId(), title: "", description: "", url: "" })
        }
      >
        <Plus className="h-4 w-4" />
        Tambah Proyek
      </Button>
    </form>
  );
}
