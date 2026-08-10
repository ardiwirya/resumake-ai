import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  jobTitle: z.string().min(2, "Judul profesi minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(6, "Nomor telepon tidak valid"),
  address: z.string().min(2, "Alamat wajib diisi"),
  website: z.string().url("URL tidak valid").optional().or(z.literal("")),
  linkedin: z.string().url("URL tidak valid").optional().or(z.literal("")),
  summary: z
    .string()
    .min(10, "Ringkasan minimal 10 karakter")
    .max(600, "Ringkasan maksimal 600 karakter"),
  photoUrl: z.string().optional().or(z.literal("")),
});

export const educationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(2, "Nama institusi wajib diisi"),
  degree: z.string().min(2, "Gelar/jenjang wajib diisi"),
  fieldOfStudy: z.string().optional().or(z.literal("")),
  startDate: z.string().min(4, "Tanggal mulai wajib diisi"),
  endDate: z.string().optional().or(z.literal("")),
  isCurrent: z.boolean().optional(),
  description: z.string().optional().or(z.literal("")),
});

export const educationSchema = z.object({
  education: z.array(educationItemSchema),
});

export const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(2, "Nama perusahaan wajib diisi"),
  position: z.string().min(2, "Posisi wajib diisi"),
  location: z.string().optional().or(z.literal("")),
  startDate: z.string().min(4, "Tanggal mulai wajib diisi"),
  endDate: z.string().optional().or(z.literal("")),
  isCurrent: z.boolean().optional(),
  description: z.string().optional().or(z.literal("")),
});

export const experienceSchema = z.object({
  experience: z.array(experienceItemSchema),
});

export const skillItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nama skill wajib diisi"),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
});

export const skillsSchema = z.object({
  skills: z.array(skillItemSchema),
});

export const certificateItemSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Nama sertifikat wajib diisi"),
  issuer: z.string().min(2, "Penerbit wajib diisi"),
  issueDate: z.string().min(4, "Tanggal terbit wajib diisi"),
  credentialUrl: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

export const certificatesSchema = z.object({
  certificates: z.array(certificateItemSchema),
});

export const languageItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nama bahasa wajib diisi"),
  level: z.enum(["basic", "conversational", "fluent", "native"]),
});

export const languagesSchema = z.object({
  languages: z.array(languageItemSchema),
});

export const portfolioItemSchema = z.object({
  id: z.string(),
  title: z.string().min(2, "Judul proyek wajib diisi"),
  description: z.string().optional().or(z.literal("")),
  url: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

export const portfolioSchema = z.object({
  portfolio: z.array(portfolioItemSchema),
});

export const templateSchema = z.object({
  template: z.enum(["modern", "classic", "minimal"]),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type EducationFormValues = z.infer<typeof educationSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type SkillsFormValues = z.infer<typeof skillsSchema>;
export type CertificatesFormValues = z.infer<typeof certificatesSchema>;
export type LanguagesFormValues = z.infer<typeof languagesSchema>;
export type PortfolioFormValues = z.infer<typeof portfolioSchema>;
export type TemplateFormValues = z.infer<typeof templateSchema>;
