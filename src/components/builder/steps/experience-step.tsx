"use client";

import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Briefcase } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  experienceSchema,
  type ExperienceFormValues,
} from "@/lib/validations/resume-schema";
import { useResumeStore } from "@/store/resume-store";
import { generateId } from "@/lib/utils";
import { FormField } from "@/components/shared/form-field";
import { RepeatableItemCard } from "@/components/shared/repeatable-item-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ExperienceStepProps {
  formId: string;
  onValid: () => void;
}

export function ExperienceStep({ formId, onValid }: ExperienceStepProps) {
  const experience = useResumeStore((s) => s.data.experience);
  const setExperience = useResumeStore((s) => s.setExperience);

  const { control, register, handleSubmit, watch } =
    useForm<ExperienceFormValues>({
      resolver: zodResolver(experienceSchema),
      defaultValues: { experience },
      mode: "onBlur",
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      setExperience((values.experience ?? []) as typeof experience);
    });
    return () => subscription.unsubscribe();
  }, [watch, setExperience]);

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <RepeatableItemCard
            key={field.id}
            title={`Pengalaman ${index + 1}`}
            onRemove={() => remove(index)}
          >
            <FormField label="Perusahaan" htmlFor={`company-${field.id}`} required>
              <Input
                id={`company-${field.id}`}
                placeholder="PT Teknologi Nusantara"
                {...register(`experience.${index}.company` as const)}
              />
            </FormField>
            <FormField label="Posisi" htmlFor={`position-${field.id}`} required>
              <Input
                id={`position-${field.id}`}
                placeholder="Senior Frontend Developer"
                {...register(`experience.${index}.position` as const)}
              />
            </FormField>
            <FormField label="Lokasi" htmlFor={`location-${field.id}`}>
              <Input
                id={`location-${field.id}`}
                placeholder="Jakarta, Indonesia (Remote)"
                {...register(`experience.${index}.location` as const)}
              />
            </FormField>
            <div className="flex items-end gap-3">
              <FormField label="Tahun Mulai" htmlFor={`start-${field.id}`} required className="flex-1">
                <Input
                  id={`start-${field.id}`}
                  placeholder="2022"
                  {...register(`experience.${index}.startDate` as const)}
                />
              </FormField>
              <FormField label="Tahun Selesai" htmlFor={`end-${field.id}`} className="flex-1">
                <Input
                  id={`end-${field.id}`}
                  placeholder="2024"
                  {...register(`experience.${index}.endDate` as const)}
                />
              </FormField>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id={`current-${field.id}`}
                {...register(`experience.${index}.isCurrent` as const)}
              />
              <Label htmlFor={`current-${field.id}`} className="font-normal">
                Masih bekerja di sini
              </Label>
            </div>
            <FormField
              label="Deskripsi Pekerjaan"
              htmlFor={`desc-${field.id}`}
              className="sm:col-span-2"
            >
              <Textarea
                id={`desc-${field.id}`}
                rows={3}
                placeholder="Tanggung jawab utama dan pencapaian terukur"
                {...register(`experience.${index}.description` as const)}
              />
            </FormField>
          </RepeatableItemCard>
        ))}
      </AnimatePresence>

      {fields.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          <Briefcase className="h-8 w-8" />
          <p className="text-sm">Belum ada pengalaman kerja ditambahkan.</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          append({
            id: generateId(),
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            description: "",
          })
        }
      >
        <Plus className="h-4 w-4" />
        Tambah Pengalaman Kerja
      </Button>
    </form>
  );
}
