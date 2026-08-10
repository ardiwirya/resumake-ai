import { generateId } from "@/lib/utils";
import type { ResumeData } from "@/types/resume";

export function getDummyResumeData(): ResumeData {
  return {
    personalInfo: {
      fullName: "Ardi Wirya",
      jobTitle: "Frontend Engineer",
      email: "ardi.wirya@example.com",
      phone: "+62 812-3456-7890",
      address: "Medan, Sumatera Utara, Indonesia",
      website: "https://ardiwirya.dev",
      linkedin: "https://linkedin.com/in/ardiwirya",
      summary:
        "Frontend Engineer dengan 4+ tahun pengalaman membangun aplikasi web modern menggunakan React dan Next.js. Fokus pada performa, aksesibilitas, dan pengalaman pengguna yang konsisten di berbagai perangkat.",
      photoUrl: "",
    },
    education: [
      {
        id: generateId(),
        institution: "Universitas Sumatera Utara",
        degree: "S1 Teknik Informatika",
        fieldOfStudy: "Rekayasa Perangkat Lunak",
        startDate: "2016",
        endDate: "2020",
        isCurrent: false,
        description:
          "Fokus pada pengembangan aplikasi web dan struktur data. Aktif di organisasi himpunan mahasiswa.",
      },
    ],
    experience: [
      {
        id: generateId(),
        company: "PT Teknologi Nusantara",
        position: "Senior Frontend Developer",
        location: "Jakarta, Indonesia (Remote)",
        startDate: "2022",
        endDate: "",
        isCurrent: true,
        description:
          "Memimpin pengembangan dashboard internal menggunakan Next.js dan TypeScript. Menurunkan waktu muat halaman sebesar 40% melalui optimasi rendering dan code splitting.",
      },
      {
        id: generateId(),
        company: "Startup Digital Kreatif",
        position: "Frontend Developer",
        location: "Medan, Indonesia",
        startDate: "2020",
        endDate: "2022",
        isCurrent: false,
        description:
          "Membangun landing page dan sistem admin untuk lebih dari 15 klien menggunakan React, Tailwind CSS, dan REST API.",
      },
    ],
    skills: [
      { id: generateId(), name: "React & Next.js", level: "expert" },
      { id: generateId(), name: "TypeScript", level: "advanced" },
      { id: generateId(), name: "Tailwind CSS", level: "expert" },
      { id: generateId(), name: "UI/UX Design", level: "intermediate" },
      { id: generateId(), name: "Node.js", level: "intermediate" },
    ],
    certificates: [
      {
        id: generateId(),
        name: "Next.js Application Developer",
        issuer: "Vercel",
        issueDate: "2023",
        credentialUrl: "https://vercel.com/certificate",
      },
      {
        id: generateId(),
        name: "Google UX Design Professional Certificate",
        issuer: "Google (Coursera)",
        issueDate: "2022",
        credentialUrl: "https://coursera.org/certificate",
      },
    ],
    languages: [
      { id: generateId(), name: "Bahasa Indonesia", level: "native" },
      { id: generateId(), name: "Bahasa Inggris", level: "fluent" },
    ],
    portfolio: [
      {
        id: generateId(),
        title: "AI Resume Builder",
        description:
          "Aplikasi pembuat CV modern dengan live preview dan export PDF menggunakan Next.js 15.",
        url: "https://github.com/ardiwirya/ai-resume-builder",
      },
      {
        id: generateId(),
        title: "E-commerce Dashboard",
        description:
          "Dashboard admin untuk mengelola produk, pesanan, dan laporan penjualan secara real-time.",
        url: "https://github.com/ardiwirya/ecommerce-dashboard",
      },
    ],
    template: "modern",
  };
}
