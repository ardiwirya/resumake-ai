"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  type PersonalInfoFormValues,
} from "@/lib/validations/resume-schema";
import { useResumeStore } from "@/store/resume-store";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfoStepProps {
  formId: string;
  onValid: () => void;
}

export function PersonalInfoStep({ formId, onValid }: PersonalInfoStepProps) {
  const personalInfo = useResumeStore((s) => s.data.personalInfo);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: "onBlur",
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      updatePersonalInfo(values as PersonalInfoFormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonalInfo]);

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onValid)}
      className="grid gap-4 sm:grid-cols-2"
    >
      <FormField label="Nama Lengkap" htmlFor="fullName" required error={errors.fullName?.message}>
        <Input id="fullName" placeholder="Ardi Wirya" {...register("fullName")} />
      </FormField>

      <FormField label="Judul Profesi" htmlFor="jobTitle" required error={errors.jobTitle?.message}>
        <Input id="jobTitle" placeholder="Frontend Engineer" {...register("jobTitle")} />
      </FormField>

      <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
        <Input id="email" type="email" placeholder="nama@email.com" {...register("email")} />
      </FormField>

      <FormField label="Nomor Telepon" htmlFor="phone" required error={errors.phone?.message}>
        <Input id="phone" placeholder="+62 812-3456-7890" {...register("phone")} />
      </FormField>

      <FormField label="Alamat" htmlFor="address" required error={errors.address?.message}>
        <Input id="address" placeholder="Kota, Provinsi, Negara" {...register("address")} />
      </FormField>

      <FormField label="Website" htmlFor="website" error={errors.website?.message}>
        <Input id="website" placeholder="https://portofolio.dev" {...register("website")} />
      </FormField>

      <FormField label="LinkedIn" htmlFor="linkedin" error={errors.linkedin?.message}>
        <Input id="linkedin" placeholder="https://linkedin.com/in/username" {...register("linkedin")} />
      </FormField>

      <FormField
        label="Ringkasan Profesional"
        htmlFor="summary"
        required
        error={errors.summary?.message}
        className="sm:col-span-2"
      >
        <Textarea
          id="summary"
          rows={4}
          placeholder="Ceritakan secara singkat pengalaman dan keahlian utamamu..."
          {...register("summary")}
        />
      </FormField>
    </form>
  );
}
