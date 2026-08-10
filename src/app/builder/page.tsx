"use client";

import { Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { StepIndicator } from "@/components/builder/step-indicator";
import { BuilderForm } from "@/components/builder/builder-form";
import { BuilderNav } from "@/components/builder/builder-nav";
import { AutoSaveIndicator } from "@/components/builder/auto-save-indicator";
import { ResumePreview } from "@/components/preview/resume-preview";
import { PDFExportButton } from "@/components/pdf/pdf-export-button";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeStore } from "@/store/resume-store";
import { useHasHydrated } from "@/hooks/use-has-hydrated";

export default function BuilderPage() {
  const data = useResumeStore((s) => s.data);
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm">Memuat data CV kamu...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container flex-1 py-8">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr_420px]">
          {/* Step navigation */}
          <aside className="no-print order-1 lg:order-none">
            <Card>
              <CardContent className="pt-6">
                <StepIndicator />
              </CardContent>
            </Card>
          </aside>

          {/* Active step form */}
          <section className="order-3 flex flex-col gap-4 lg:order-none">
            <Card>
              <CardContent className="pt-6">
                <BuilderNav />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <BuilderForm />
              </CardContent>
            </Card>
          </section>

          {/* Live preview */}
          <aside className="no-print order-2 flex flex-col gap-3 lg:order-none">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Live Preview</h3>
              <AutoSaveIndicator />
            </div>
            <ResumePreview data={data} />
            <PDFExportButton data={data} />
          </aside>
        </div>
      </main>
    </div>
  );
}
