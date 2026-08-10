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

export function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, skills, certificates, languages, portfolio } = data;

  return (
    <div className="flex min-h-full flex-col bg-white px-10 py-8 text-slate-800">
      <header className="border-b-2 border-slate-800 pb-4 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          {personalInfo.fullName || "Nama Lengkap"}
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-600">
          {personalInfo.jobTitle || "Judul Profesi"}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {[personalInfo.email, personalInfo.phone, personalInfo.address]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-5">
        {personalInfo.summary && (
          <section>
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Ringkasan
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Pengalaman Kerja
            </h2>
            <div className="mt-2 flex flex-col gap-4">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold">
                      {item.position || "Posisi"}, {item.company}
                    </p>
                    <span className="text-xs text-slate-500">
                      {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                    </span>
                  </div>
                  {item.location && (
                    <p className="text-xs italic text-slate-500">{item.location}</p>
                  )}
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

        {education.length > 0 && (
          <section>
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Pendidikan
            </h2>
            <div className="mt-2 flex flex-col gap-3">
              {education.map((item) => (
                <div key={item.id} className="flex items-baseline justify-between">
                  <div>
                    <p className="text-sm font-semibold">{item.degree || "Gelar"}</p>
                    <p className="text-xs text-slate-500">{item.institution}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section>
              <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
                Skill
              </h2>
              <ul className="mt-2 flex flex-col gap-1 text-xs text-slate-600">
                {skills.map((item) => (
                  <li key={item.id}>
                    {item.name} — {SKILL_LEVEL_LABEL[item.level]}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
                Bahasa
              </h2>
              <ul className="mt-2 flex flex-col gap-1 text-xs text-slate-600">
                {languages.map((item) => (
                  <li key={item.id}>
                    {item.name} — {LANGUAGE_LEVEL_LABEL[item.level]}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {certificates.length > 0 && (
          <section>
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Sertifikat
            </h2>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-slate-600">
              {certificates.map((item) => (
                <li key={item.id}>
                  {item.name} — {item.issuer} ({item.issueDate})
                </li>
              ))}
            </ul>
          </section>
        )}

        {portfolio.length > 0 && (
          <section>
            <h2 className="border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest text-slate-700">
              Portfolio
            </h2>
            <div className="mt-2 flex flex-col gap-2">
              {portfolio.map((item) => (
                <div key={item.id} className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">{item.title}</span>
                  {item.url && <span> — {item.url}</span>}
                  {item.description && <p className="mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
