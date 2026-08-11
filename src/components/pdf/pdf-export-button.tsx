"use client";

import * as React from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/types/resume";

interface PDFExportButtonProps {
  data: ResumeData;
}

export default function PDFExportButton({ data }: PDFExportButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fileName = `CV-${(data.personalInfo.fullName || "resume")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()}.pdf`;

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Dynamic import HANYA DIEKSEKUSI saat tombol diklik.
      // Ini menyembunyikan @react-pdf dari Turbopack secara sempurna.
      const { pdf } = await import("@react-pdf/renderer");
      const { ResumePDFDocument } =
        await import("@/components/pdf/resume-pdf-document");

      // 2. Generate PDF menjadi Blob di client-side
      const blob = await pdf(<ResumePDFDocument data={data} />).toBlob();

      // 3. Buat URL sementara dan paksa browser untuk mendownloadnya
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // 4. Bersihkan memori
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal membuat PDF:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      disabled={loading}
      onClick={handleDownload}
      type="button"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {loading
        ? "Menyiapkan PDF..."
        : error
          ? "Gagal membuat PDF"
          : "Export PDF"}
    </Button>
  );
}
