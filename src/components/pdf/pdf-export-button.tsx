"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumePDFDocument } from "@/components/pdf/resume-pdf-document";
import type { ResumeData } from "@/types/resume";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="w-full">
        <Loader2 className="h-4 w-4 animate-spin" />
        Menyiapkan PDF...
      </Button>
    ),
  }
);

interface PDFExportButtonProps {
  data: ResumeData;
}

export function PDFExportButton({ data }: PDFExportButtonProps) {
  const fileName = `CV-${(data.personalInfo.fullName || "resume")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()}.pdf`;

  return (
    <PDFDownloadLink
      document={<ResumePDFDocument data={data} />}
      fileName={fileName}
      className="w-full"
    >
      {
        (({ loading }: { loading: boolean }) => (
          <Button className="w-full" disabled={loading} type="button">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {loading ? "Menyiapkan PDF..." : "Export PDF"}
          </Button>
        )) as unknown as ReactNode
      }
    </PDFDownloadLink>
  );
}
