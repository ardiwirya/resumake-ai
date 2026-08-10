import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";
import type { ResumeData } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

const SKILL_LEVEL_LABEL: Record<string, string> = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Mahir",
  expert: "Ahli",
};

const LANGUAGE_LEVEL_LABEL: Record<string, string> = {
  basic: "Dasar",
  conversational: "Percakapan",
  fluent: "Lancar",
  native: "Bahasa Ibu",
};

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, skills, certificates, languages, portfolio } = data;

  return (
    <div className="flex min-h-full flex-col bg-white text-slate-800">
      <header className="bg-blue-600 px-8 py-8 text-white">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || "Nama Lengkap"}</h1>
        <p className="mt-1 text-blue-100">{personalInfo.jobTitle || "Judul Profesi"}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-50">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {personalInfo.address}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" /> {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" /> {personalInfo.linkedin}
            </span>
          )}
        </div>
      </header>

      <div className="grid flex-1 grid-cols-3 gap-6 px-8 py-6">
        <div className="col-span-2 flex flex-col gap-6">
          {personalInfo.summary && (
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Ringkasan
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Pengalaman Kerja
              </h2>
              <div className="flex flex-col gap-4">
                {experience.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-semibold">{item.position || "Posisi"}</p>
                      <span className="text-xs text-slate-500">
                        {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-500">
                      {item.company}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    {item.description && (
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Portfolio
              </h2>
              <div className="flex flex-col gap-3">
                {portfolio.map((item) => (
                  <div key={item.id}>
                    <p className="text-sm font-semibold">{item.title || "Judul Proyek"}</p>
                    {item.url && <p className="text-xs text-blue-600">{item.url}</p>}
                    {item.description && (
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1 flex flex-col gap-6">
          {education.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Pendidikan
              </h2>
              <div className="flex flex-col gap-3">
                {education.map((item) => (
                  <div key={item.id}>
                    <p className="text-sm font-semibold">{item.degree || "Gelar"}</p>
                    <p className="text-xs text-slate-500">{item.institution}</p>
                    <p className="text-xs text-slate-400">
                      {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Skill
              </h2>
              <div className="flex flex-col gap-1.5">
                {skills.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span>{item.name}</span>
                    <span className="text-slate-400">{SKILL_LEVEL_LABEL[item.level]}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Bahasa
              </h2>
              <div className="flex flex-col gap-1.5">
                {languages.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span>{item.name}</span>
                    <span className="text-slate-400">{LANGUAGE_LEVEL_LABEL[item.level]}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certificates.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                Sertifikat
              </h2>
              <div className="flex flex-col gap-2">
                {certificates.map((item) => (
                  <div key={item.id}>
                    <p className="text-xs font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {item.issuer} · {item.issueDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
