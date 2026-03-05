// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) { return twMerge(clsx(inputs)); }

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export function formatDuration(hours) {
  if (hours < 1) return `${Math.round(hours * 60)} daqiqa`;
  return `${hours} soat`;
}

export const LEVEL_LABELS = { BEGINNER: "Boshlang'ich", INTERMEDIATE: "O'rta", ADVANCED: "Ilg'or" };
export const LEVEL_COLORS = { BEGINNER: "text-teal-400 bg-teal-400/10", INTERMEDIATE: "text-gold-DEFAULT bg-gold-DEFAULT/10", ADVANCED: "text-red-400 bg-red-400/10" };
