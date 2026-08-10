import type { ResumeData } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, skills, certificates, languages, portfolio } = data;

  return (
    <div className="flex min-h-full flex-col gap-6 bg-white px-10 py-10 text-slate-800">
      <header>
        <h1 className="text-3xl font-light tracking-tight">
          {personalInfo.fullName || "Nama Lengkap"}
        </h1>
        <p className="mt-1 text-sm uppercase tracking-widest text-emerald-600">
          {personalInfo.jobTitle || "Judul Profesi"}
        </p>
        <p className="mt-3 text-xs text-slate-500">
          {[personalInfo.email, personalInfo.phone, personalInfo.address, personalInfo.website]
            .filter(Boolean)
            .join("  ·  ")}
        </p>
      </header>

      {personalInfo.summary && (
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
          {personalInfo.summary}
        </p>
      )}

      {experience.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Pengalaman
          </h2>
          <div className="mt-3 flex flex-col gap-4">
            {experience.map((item) => (
              <div key={item.id} className="grid grid-cols-4 gap-3">
                <span className="col-span-1 text-xs text-slate-400">
                  {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                </span>
                <div className="col-span-3">
                  <p className="text-sm font-medium">
                    {item.position} <span className="text-slate-400">— {item.company}</span>
                  </p>
                  {item.description && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Pendidikan
          </h2>
          <div className="mt-3 flex flex-col gap-3">
            {education.map((item) => (
              <div key={item.id} className="grid grid-cols-4 gap-3">
                <span className="col-span-1 text-xs text-slate-400">
                  {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                </span>
                <div className="col-span-3">
                  <p className="text-sm font-medium">{item.degree}</p>
                  <p className="text-xs text-slate-500">{item.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Skill
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skills.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Bahasa
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {languages.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {certificates.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Sertifikat
          </h2>
          <div className="mt-3 flex flex-col gap-1 text-xs text-slate-600">
            {certificates.map((item) => (
              <p key={item.id}>
                {item.name} <span className="text-slate-400">— {item.issuer}, {item.issueDate}</span>
              </p>
            ))}
          </div>
        </section>
      )}

      {portfolio.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Portfolio
          </h2>
          <div className="mt-3 flex flex-col gap-2 text-xs text-slate-600">
            {portfolio.map((item) => (
              <p key={item.id}>
                <span className="font-medium text-slate-800">{item.title}</span>
                {item.description && <> — {item.description}</>}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
