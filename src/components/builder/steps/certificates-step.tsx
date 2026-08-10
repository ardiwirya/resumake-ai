"use client";

import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Award } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  certificatesSchema,
  type CertificatesFormValues,
} from "@/lib/validations/resume-schema";
import { useResumeStore } from "@/store/resume-store";
import { generateId } from "@/lib/utils";
import { FormField } from "@/components/shared/form-field";
import { RepeatableItemCard } from "@/components/shared/repeatable-item-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CertificatesStepProps {
  formId: string;
  onValid: () => void;
}

export function CertificatesStep({ formId, onValid }: CertificatesStepProps) {
  const certificates = useResumeStore((s) => s.data.certificates);
  const setCertificates = useResumeStore((s) => s.setCertificates);

  const { control, register, handleSubmit, watch } =
    useForm<CertificatesFormValues>({
      resolver: zodResolver(certificatesSchema),
      defaultValues: { certificates },
      mode: "onBlur",
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      setCertificates((values.certificates ?? []) as typeof certificates);
    });
    return () => subscription.unsubscribe();
  }, [watch, setCertificates]);

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <RepeatableItemCard
            key={field.id}
            title={`Sertifikat ${index + 1}`}
            onRemove={() => remove(index)}
          >
            <FormField label="Nama Sertifikat" htmlFor={`name-${field.id}`} required>
              <Input
                id={`name-${field.id}`}
                placeholder="Next.js Application Developer"
                {...register(`certificates.${index}.name` as const)}
              />
            </FormField>
            <FormField label="Penerbit" htmlFor={`issuer-${field.id}`} required>
              <Input
                id={`issuer-${field.id}`}
                placeholder="Vercel"
                {...register(`certificates.${index}.issuer` as const)}
              />
            </FormField>
            <FormField label="Tahun Terbit" htmlFor={`date-${field.id}`} required>
              <Input
                id={`date-${field.id}`}
                placeholder="2023"
                {...register(`certificates.${index}.issueDate` as const)}
              />
            </FormField>
            <FormField label="URL Sertifikat" htmlFor={`url-${field.id}`}>
              <Input
                id={`url-${field.id}`}
                placeholder="https://..."
                {...register(`certificates.${index}.credentialUrl` as const)}
              />
            </FormField>
          </RepeatableItemCard>
        ))}
      </AnimatePresence>

      {fields.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          <Award className="h-8 w-8" />
          <p className="text-sm">Belum ada sertifikat ditambahkan.</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          append({
            id: generateId(),
            name: "",
            issuer: "",
            issueDate: "",
            credentialUrl: "",
          })
        }
      >
        <Plus className="h-4 w-4" />
        Tambah Sertifikat
      </Button>
    </form>
  );
}
