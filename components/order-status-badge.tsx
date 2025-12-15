import { Badge } from "@/components/ui/badge"
import type { OrderStatus, PaymentStatus } from "@/lib/types"

const orderStatusColors: Record<OrderStatus, string> = {
  PAYMENT_PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  PAID: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  SENT_TO_LAB: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  UNDER_TESTING: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  COMPLETED: "bg-green-100 text-green-800 hover:bg-green-100",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100",
}

const paymentStatusColors: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  SUCCESS: "bg-green-100 text-green-800 hover:bg-green-100",
  FAILED: "bg-red-100 text-red-800 hover:bg-red-100",
  REFUNDED: "bg-gray-100 text-gray-800 hover:bg-gray-100",
}

interface OrderStatusBadgeProps {
  status: OrderStatus
  translations: Record<string, string>
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus
  translations: Record<string, string>
}

export function OrderStatusBadge({ status, translations }: OrderStatusBadgeProps) {
  return <Badge className={orderStatusColors[status]}>{translations[status]}</Badge>
}

export function PaymentStatusBadge({ status, translations }: PaymentStatusBadgeProps) {
  return <Badge className={paymentStatusColors[status]}>{translations[status]}</Badge>
}
