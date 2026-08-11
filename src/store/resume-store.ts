import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CertificateItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  PersonalInfo,
  PortfolioItem,
  ResumeData,
  ResumeStep,
  SkillItem,
  TemplateId,
} from "@/types/resume";
import { RESUME_STEPS } from "@/types/resume";

const emptyPersonalInfo: PersonalInfo = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  linkedin: "",
  summary: "",
  photoUrl: "",
};

export const initialResumeData: ResumeData = {
  personalInfo: emptyPersonalInfo,
  education: [],
  experience: [],
  skills: [],
  certificates: [],
  languages: [],
  portfolio: [],
  template: "modern",
};

interface ResumeStoreState {
  data: ResumeData;
  currentStep: ResumeStep;
  lastSavedAt: number | null;
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setCurrentStep: (step: ResumeStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;

  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  setEducation: (list: EducationItem[]) => void;
  setExperience: (list: ExperienceItem[]) => void;
  setSkills: (list: SkillItem[]) => void;
  setCertificates: (list: CertificateItem[]) => void;
  setLanguages: (list: LanguageItem[]) => void;
  setPortfolio: (list: PortfolioItem[]) => void;
  setTemplate: (template: TemplateId) => void;

  loadDummyData: (data: ResumeData) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStoreState>()(
  persist(
    (set, get) => ({
      data: initialResumeData,
      currentStep: "personal-info",
      lastSavedAt: null,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setCurrentStep: (step) => set({ currentStep: step }),

      goToNextStep: () => {
        const idx = RESUME_STEPS.indexOf(get().currentStep);
        const next = RESUME_STEPS[Math.min(idx + 1, RESUME_STEPS.length - 1)];
        set({ currentStep: next });
      },

      goToPreviousStep: () => {
        const idx = RESUME_STEPS.indexOf(get().currentStep);
        const prev = RESUME_STEPS[Math.max(idx - 1, 0)];
        set({ currentStep: prev });
      },

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
          lastSavedAt: Date.now(),
        })),

      setEducation: (list) =>
        set((state) => ({
          data: { ...state.data, education: list },
          lastSavedAt: Date.now(),
        })),

      setExperience: (list) =>
        set((state) => ({
          data: { ...state.data, experience: list },
          lastSavedAt: Date.now(),
        })),

      setSkills: (list) =>
        set((state) => ({
          data: { ...state.data, skills: list },
          lastSavedAt: Date.now(),
        })),

      setCertificates: (list) =>
        set((state) => ({
          data: { ...state.data, certificates: list },
          lastSavedAt: Date.now(),
        })),

      setLanguages: (list) =>
        set((state) => ({
          data: { ...state.data, languages: list },
          lastSavedAt: Date.now(),
        })),

      setPortfolio: (list) =>
        set((state) => ({
          data: { ...state.data, portfolio: list },
          lastSavedAt: Date.now(),
        })),

      setTemplate: (template) =>
        set((state) => ({
          data: { ...state.data, template },
          lastSavedAt: Date.now(),
        })),

      loadDummyData: (data) => set({ data, lastSavedAt: Date.now() }),

      resetResume: () =>
        set({
          data: initialResumeData,
          currentStep: "personal-info",
          lastSavedAt: Date.now(),
        }),
    }),
    {
      name: "resumake-ai-storage",
      partialize: (state) => ({
        data: state.data,
        currentStep: state.currentStep,
        lastSavedAt: state.lastSavedAt,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
