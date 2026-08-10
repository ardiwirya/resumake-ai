"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useResumeStore } from "@/store/resume-store";
import { PersonalInfoStep } from "@/components/builder/steps/personal-info-step";
import { EducationStep } from "@/components/builder/steps/education-step";
import { ExperienceStep } from "@/components/builder/steps/experience-step";
import { SkillsStep } from "@/components/builder/steps/skills-step";
import { CertificatesStep } from "@/components/builder/steps/certificates-step";
import { LanguagesStep } from "@/components/builder/steps/languages-step";
import { PortfolioStep } from "@/components/builder/steps/portfolio-step";
import { TemplateStep } from "@/components/builder/steps/template-step";

export const BUILDER_FORM_ID = "resume-step-form";

export function BuilderForm() {
  const currentStep = useResumeStore((s) => s.currentStep);
  const goToNextStep = useResumeStore((s) => s.goToNextStep);

  const stepProps = { formId: BUILDER_FORM_ID, onValid: goToNextStep };

  return (
    <div className="relative min-h-[420px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {currentStep === "personal-info" && <PersonalInfoStep {...stepProps} />}
          {currentStep === "education" && <EducationStep {...stepProps} />}
          {currentStep === "experience" && <ExperienceStep {...stepProps} />}
          {currentStep === "skills" && <SkillsStep {...stepProps} />}
          {currentStep === "certificates" && <CertificatesStep {...stepProps} />}
          {currentStep === "languages" && <LanguagesStep {...stepProps} />}
          {currentStep === "portfolio" && <PortfolioStep {...stepProps} />}
          {currentStep === "template" && <TemplateStep {...stepProps} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
