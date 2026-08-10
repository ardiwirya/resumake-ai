import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function formatDateRange(
  startDate: string,
  endDate: string,
  isCurrent?: boolean
): string {
  if (!startDate) return "";
  const end = isCurrent ? "Sekarang" : endDate || "-";
  return `${startDate} - ${end}`;
}
