// Global configuration defaults and helpers
import type { GlobalConfig, Commission, Language } from "@/lib/types"

// Default configuration (used as fallback)
export const defaultConfig: GlobalConfig = {
  businessName: "Bhumetra",
  email: "info@bhumetra.com",
  phone: "+91 8305366261",
  whatsApp: "+91 8305366261",
  officeAddress: "Bilaspur, Chhattisgarh, India",
  baseTestPricePerAcre: 1500, // INR per acre
  commission: {
    agent: 15, // percentage
    lab: 30,
    franchise: 10,
    platform: 45,
  },
  languagesSupported: ["en", "hi"] as Language[],
}

// Helper to calculate order amount
export function calculateOrderAmount(acres: number, pricePerAcre: number): number {
  return acres * pricePerAcre
}

// Helper to calculate commissions
export function calculateCommissions(amount: number, rates: Commission): Commission {
  return {
    agent: Math.round((amount * rates.agent) / 100),
    lab: Math.round((amount * rates.lab) / 100),
    franchise: Math.round((amount * rates.franchise) / 100),
    platform: Math.round((amount * rates.platform) / 100),
  }
}

// Generate unique 6-digit customer ID
export function generateCustomerId(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Format currency in INR
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
export function formatDate(date: Date | string, locale = "en-IN"): string {
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
