"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ResumeData } from "@/types/resume";
import { ModernTemplate } from "@/components/preview/templates/modern-template";
import { ClassicTemplate } from "@/components/preview/templates/classic-template";
import { MinimalTemplate } from "@/components/preview/templates/minimal-template";

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="aspect-[1/1.414] w-full overflow-hidden rounded-md border bg-white shadow-sm">
      <div className="h-full w-full overflow-y-auto thin-scrollbar" id="resume-preview-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={data.template}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            {data.template === "modern" && <ModernTemplate data={data} />}
            {data.template === "classic" && <ClassicTemplate data={data} />}
            {data.template === "minimal" && <MinimalTemplate data={data} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
