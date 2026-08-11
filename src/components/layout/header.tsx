import Link from "next/link";
import { FileText } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileText className="h-5 w-5 text-primary" />
          <span>Resumake AI</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/builder"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block"
          >
            Buat CV
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
