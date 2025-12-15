"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/config"
import type { Order, Farmer } from "@/lib/types"
import { Loader2, Smartphone, CreditCard, Banknote } from "lucide-react"

interface PaymentPageProps {
  order: Order
  farmer: Farmer
}

const PaymentPage = ({ order, farmer }: PaymentPageProps) => {
  const { t } = useI18n()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Simulate payment for demo purposes
  // In production, this would integrate with Razorpay
  const handlePayment = async () => {
    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mark order as paid
      const res = await fetch(`/api/orders/${order._id}/pay`, {
        method: "POST",
      })

      if (res.ok) {
        toast({
          title: t.agent.paymentSuccess,
          description: "Customer ID has been generated",
        })
        router.push(`/dashboard/agent/orders/${order._id}/success`)
      } else {
        throw new Error("Payment failed")
      }
    } catch {
      toast({
        title: t.common.error,
        description: "Payment failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Payment</h1>
        <p className="text-muted-foreground">Complete payment for soil test order</p>
      </div>

      {/* Order Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t.agent.orderSummary}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Farmer</span>
            <span className="font-medium">{farmer.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone</span>
            <span className="font-medium">{farmer.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location</span>
            <span className="font-medium">
              {farmer.address.village}, {farmer.address.district}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Land Area</span>
            <span className="font-medium">{order.acres} acres</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Total Amount</span>
            <span className="font-bold text-primary">{formatCurrency(order.amount)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* In production, this would show Razorpay payment widget */}
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="h-16 justify-start gap-4 bg-transparent"
              onClick={handlePayment}
              disabled={loading}
            >
              <Smartphone className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">UPI Payment</p>
                <p className="text-sm text-muted-foreground">GPay, PhonePe, Paytm</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-16 justify-start gap-4 bg-transparent"
              onClick={handlePayment}
              disabled={loading}
            >
              <CreditCard className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">Card Payment</p>
                <p className="text-sm text-muted-foreground">Debit/Credit Card</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-16 justify-start gap-4 bg-transparent"
              onClick={handlePayment}
              disabled={loading}
            >
              <Banknote className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">Cash Payment</p>
                <p className="text-sm text-muted-foreground">Mark as paid (cash collected)</p>
              </div>
            </Button>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 py-4">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing payment...</span>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Note: In production, this will integrate with Razorpay for secure payments.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentPage
