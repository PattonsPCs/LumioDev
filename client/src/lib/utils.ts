import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Size-based pricing
export function getPriceBySize(size: string): number {
  const sizeUpper = size.toUpperCase();
  if (sizeUpper === "XXL") {
    return 65;
  } else if (sizeUpper === "XXXL") {
    return 70;
  } else if (sizeUpper === "XXXXL") {
    return 75;
  } else {
    // S-XL (includes XS, S, M, L, XL)
    return 60;
  }
}