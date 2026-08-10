import Link from "next/link";
import {
  ArrowRight,
  Download,
  LayoutTemplate,
  Save,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: LayoutTemplate,
    title: "Banyak Template",
    description:
      "Pilih dari beberapa template CV profesional yang siap pakai dan mudah disesuaikan.",
  },
  {
    icon: Sparkles,
    title: "Live Preview",
    description:
      "Lihat hasil CV secara langsung setiap kali kamu mengetik, tanpa perlu refresh.",
  },
  {
    icon: Download,
    title: "Export PDF",
    description:
      "Unduh CV dalam format PDF berkualitas tinggi, siap dikirim ke perusahaan impian.",
  },
  {
    icon: Save,
    title: "Auto Save",
    description:
      "Data kamu otomatis tersimpan di perangkat sehingga tidak akan hilang secara tiba-tiba.",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description:
      "Tampilan optimal di desktop, tablet, maupun smartphone.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="container flex flex-col items-center gap-6 py-20 text-center">
          <span className="rounded-full border px-4 py-1 text-xs font-medium text-muted-foreground">
            Portfolio Project — Front-End Developer
          </span>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Bangun CV Profesional dalam Hitungan Menit
          </h1>
          <p className="max-w-xl text-balance text-muted-foreground sm:text-lg">
            AI Resume Builder membantu kamu membuat CV modern dengan live
            preview, banyak pilihan template, dan export PDF sekali klik.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/builder">
                Mulai Membuat CV
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/builder">Lihat Contoh Template</Link>
            </Button>
          </div>
        </section>

        <section className="container pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-muted">
                <CardHeader>
                  <feature.icon className="mb-2 h-6 w-6 text-primary" />
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} AI Resume Builder. Dibuat oleh Ardi Wirya.</p>
          <p>Dibangun dengan Next.js, TypeScript, dan Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
