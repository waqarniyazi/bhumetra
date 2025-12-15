import { z } from "zod"
import { UserRole, EntityStatus, LeadSource, Language } from "@/lib/types"

// Address Schema
export const addressSchema = z.object({
  line1: z.string().optional(),
  village: z.string().min(1, "Village is required"),
  tehsil: z.string().optional(),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pinCode: z.string().optional(),
})

// Phone validation (Indian mobile)
const phoneRegex = /^[6-9]\d{9}$/
export const phoneSchema = z.string().regex(phoneRegex, "Invalid phone number")

// Farmer Schema
export const farmerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: phoneSchema,
  email: z.string().email().optional().or(z.literal("")),
  address: addressSchema,
  landSizeInAcres: z.number().positive().optional(),
  language: z.nativeEnum(Language).default(Language.EN),
  createdByAgentId: z.string().optional(),
})

// Agent Schema
export const agentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: phoneSchema,
  region: z.string().min(2, "Region is required"),
  status: z.nativeEnum(EntityStatus).default(EntityStatus.ACTIVE),
})

// Lab Tech Schema
export const labTechSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: phoneSchema,
  labName: z.string().min(2, "Lab name is required"),
  status: z.nativeEnum(EntityStatus).default(EntityStatus.ACTIVE),
})

// Lead Schema
export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: phoneSchema,
  village: z.string().optional(),
  district: z.string().optional(),
  acres: z.number().positive().optional(),
  preferredCrop: z.string().optional(),
  source: z.nativeEnum(LeadSource).default(LeadSource.WEBSITE),
})

// Contact Message Schema
export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Order Creation Schema
export const createOrderSchema = z.object({
  farmerId: z.string().min(1, "Farmer is required"),
  agentId: z.string().min(1, "Agent is required"),
  acres: z.number().positive("Acres must be positive"),
})

// Soil Parameters Schema
export const soilParamsSchema = z.object({
  pH: z.number().min(0).max(14).optional(),
  EC: z.number().min(0).optional(),
  OC: z.number().min(0).optional(),
  N: z.number().min(0).optional(),
  P: z.number().min(0).optional(),
  K: z.number().min(0).optional(),
  micronutrients: z
    .object({
      zinc: z.number().min(0).optional(),
      iron: z.number().min(0).optional(),
      manganese: z.number().min(0).optional(),
      copper: z.number().min(0).optional(),
      boron: z.number().min(0).optional(),
    })
    .optional(),
  texture: z.string().optional(),
  remarks: z.string().optional(),
})

// Soil Report Schema
export const soilReportSchema = z.object({
  orderId: z.string().min(1),
  customerId: z.string().min(1),
  soilParams: soilParamsSchema,
  reportPdfUrl: z.string().url().optional(),
  aiRecommendations: z
    .object({
      summary: z.string().optional(),
      crops: z.array(z.string()).optional(),
      fertilizer: z.string().optional(),
      organic: z.string().optional(),
      irrigation: z.string().optional(),
    })
    .optional(),
})

// Login Schema
export const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

// Signup Schema
export const signupSchema = z
  .object({
    email: z.string().email().optional(),
    phone: phoneSchema,
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.nativeEnum(UserRole),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// Global Config Schema
export const globalConfigSchema = z.object({
  businessName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  whatsApp: z.string().min(1),
  officeAddress: z.string().min(1),
  baseTestPricePerAcre: z.number().positive(),
  commission: z.object({
    agent: z.number().min(0).max(100),
    lab: z.number().min(0).max(100),
    franchise: z.number().min(0).max(100),
    platform: z.number().min(0).max(100),
  }),
})
