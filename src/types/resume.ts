export type TemplateId = "modern" | "classic" | "minimal";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  summary: string;
  photoUrl?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description?: string;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export type LanguageLevel =
  | "basic"
  | "conversational"
  | "fluent"
  | "native";

export interface LanguageItem {
  id: string;
  name: string;
  level: LanguageLevel;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  certificates: CertificateItem[];
  languages: LanguageItem[];
  portfolio: PortfolioItem[];
  template: TemplateId;
}

export const RESUME_STEPS = [
  "personal-info",
  "education",
  "experience",
  "skills",
  "certificates",
  "languages",
  "portfolio",
  "template",
] as const;

export type ResumeStep = (typeof RESUME_STEPS)[number];

export interface StepMeta {
  id: ResumeStep;
  label: string;
  description: string;
}

export const STEP_META: StepMeta[] = [
  {
    id: "personal-info",
    label: "Informasi Pribadi",
    description: "Data diri dan ringkasan profesional",
  },
  {
    id: "education",
    label: "Pendidikan",
    description: "Riwayat pendidikan formal",
  },
  {
    id: "experience",
    label: "Pengalaman Kerja",
    description: "Riwayat pekerjaan dan pencapaian",
  },
  {
    id: "skills",
    label: "Skill",
    description: "Kemampuan teknis dan non-teknis",
  },
  {
    id: "certificates",
    label: "Sertifikat",
    description: "Sertifikasi dan pelatihan",
  },
  {
    id: "languages",
    label: "Bahasa",
    description: "Kemampuan bahasa asing",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    description: "Proyek dan karya terbaik",
  },
  {
    id: "template",
    label: "Template",
    description: "Pilih tampilan CV kamu",
  },
];
