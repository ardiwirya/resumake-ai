"use client";

import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, GraduationCap } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  educationSchema,
  type EducationFormValues,
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

interface EducationStepProps {
  formId: string;
  onValid: () => void;
}

export function EducationStep({ formId, onValid }: EducationStepProps) {
  const education = useResumeStore((s) => s.data.education);
  const setEducation = useResumeStore((s) => s.setEducation);

  const { control, register, handleSubmit, watch } =
    useForm<EducationFormValues>({
      resolver: zodResolver(educationSchema),
      defaultValues: { education },
      mode: "onBlur",
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      setEducation((values.education ?? []) as typeof education);
    });
    return () => subscription.unsubscribe();
  }, [watch, setEducation]);

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <RepeatableItemCard
            key={field.id}
            title={`Pendidikan ${index + 1}`}
            onRemove={() => remove(index)}
          >
            <FormField label="Institusi" htmlFor={`institution-${field.id}`} required>
              <Input
                id={`institution-${field.id}`}
                placeholder="Universitas Sumatera Utara"
                {...register(`education.${index}.institution` as const)}
              />
            </FormField>
            <FormField label="Gelar / Jenjang" htmlFor={`degree-${field.id}`} required>
              <Input
                id={`degree-${field.id}`}
                placeholder="S1 Teknik Informatika"
                {...register(`education.${index}.degree` as const)}
              />
            </FormField>
            <FormField label="Bidang Studi" htmlFor={`field-${field.id}`}>
              <Input
                id={`field-${field.id}`}
                placeholder="Rekayasa Perangkat Lunak"
                {...register(`education.${index}.fieldOfStudy` as const)}
              />
            </FormField>
            <div className="flex items-end gap-3">
              <FormField label="Tahun Mulai" htmlFor={`start-${field.id}`} required className="flex-1">
                <Input
                  id={`start-${field.id}`}
                  placeholder="2016"
                  {...register(`education.${index}.startDate` as const)}
                />
              </FormField>
              <FormField label="Tahun Selesai" htmlFor={`end-${field.id}`} className="flex-1">
                <Input
                  id={`end-${field.id}`}
                  placeholder="2020"
                  {...register(`education.${index}.endDate` as const)}
                />
              </FormField>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id={`current-${field.id}`}
                {...register(`education.${index}.isCurrent` as const)}
              />
              <Label htmlFor={`current-${field.id}`} className="font-normal">
                Masih menempuh pendidikan ini
              </Label>
            </div>
            <FormField
              label="Deskripsi"
              htmlFor={`desc-${field.id}`}
              className="sm:col-span-2"
            >
              <Textarea
                id={`desc-${field.id}`}
                rows={3}
                placeholder="Prestasi, organisasi, atau kegiatan relevan"
                {...register(`education.${index}.description` as const)}
              />
            </FormField>
          </RepeatableItemCard>
        ))}
      </AnimatePresence>

      {fields.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          <GraduationCap className="h-8 w-8" />
          <p className="text-sm">Belum ada riwayat pendidikan ditambahkan.</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          append({
            id: generateId(),
            institution: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            description: "",
          })
        }
      >
        <Plus className="h-4 w-4" />
        Tambah Pendidikan
      </Button>
    </form>
  );
}
