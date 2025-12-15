// Enums and Types for Bhumetra

export enum UserRole {
  FARMER = "FARMER",
  AGENT = "AGENT",
  LAB_TECH = "LAB_TECH",
  ADMIN = "ADMIN",
}

export enum OrderStatus {
  PAYMENT_PENDING = "PAYMENT_PENDING",
  PAID = "PAID",
  SENT_TO_LAB = "SENT_TO_LAB",
  UNDER_TESTING = "UNDER_TESTING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum EntityStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum LeadSource {
  WEBSITE = "WEBSITE",
  AGENT = "AGENT",
  OTHER = "OTHER",
}

export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  CONVERTED = "CONVERTED",
}

export enum Language {
  EN = "en",
  HI = "hi",
}

// Address type
export interface Address {
  line1?: string
  village: string
  tehsil?: string
  district: string
  state: string
  pinCode?: string
}

// Commission structure
export interface Commission {
  agent: number
  lab: number
  franchise: number
  platform: number
}

// Soil parameters
export interface SoilParams {
  pH?: number
  EC?: number // Electrical Conductivity
  OC?: number // Organic Carbon
  N?: number // Nitrogen
  P?: number // Phosphorus
  K?: number // Potassium
  micronutrients?: {
    zinc?: number
    iron?: number
    manganese?: number
    copper?: number
    boron?: number
  }
  texture?: string
  remarks?: string
}

// AI Recommendations
export interface AIRecommendations {
  summary?: string
  crops?: string[]
  fertilizer?: string
  organic?: string
  irrigation?: string
}

// Base document interface
export interface BaseDocument {
  _id?: string
  createdAt?: Date
  updatedAt?: Date
}

// User
export interface User extends BaseDocument {
  role: UserRole
  email?: string
  phone?: string
  passwordHash?: string
  linkedEntityId: string
}

// Farmer
export interface Farmer extends BaseDocument {
  name: string
  phone: string
  email?: string
  address: Address
  landSizeInAcres?: number
  language: Language
  createdByAgentId?: string
}

// Agent
export interface Agent extends BaseDocument {
  name: string
  phone: string
  region: string
  status: EntityStatus
}

// Lab Technician
export interface LabTech extends BaseDocument {
  name: string
  phone: string
  labName: string
  status: EntityStatus
}

// Admin
export interface Admin extends BaseDocument {
  name: string
  email: string
  phone?: string
}

// Order (Soil Test)
export interface Order extends BaseDocument {
  customerId?: string // 6-digit unique ID generated after payment
  farmerId: string
  agentId: string
  labTechId?: string
  acres: number
  amount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  commission: Commission
  razorpayOrderId?: string
  razorpayPaymentId?: string
}

// Soil Report
export interface SoilReport extends BaseDocument {
  orderId: string
  customerId: string
  soilParams: SoilParams
  reportPdfUrl?: string
  aiRecommendations?: AIRecommendations
}

// Lead
export interface Lead extends BaseDocument {
  name: string
  phone: string
  village?: string
  district?: string
  acres?: number
  preferredCrop?: string
  source: LeadSource
  status: LeadStatus
}

// Contact Message
export interface ContactMessage extends BaseDocument {
  name: string
  phone?: string
  email?: string
  message: string
  isRead: boolean
}

// Global Config
export interface GlobalConfig extends BaseDocument {
  businessName: string
  email: string
  phone: string
  whatsApp: string
  officeAddress: string
  baseTestPricePerAcre: number
  commission: Commission
  languagesSupported: Language[]
}
