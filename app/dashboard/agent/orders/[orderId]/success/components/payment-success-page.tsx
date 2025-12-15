"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order } from "@/lib/types"
import { CheckCircle, Copy, Tag, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentSuccessPageProps {
  order: Order
}

const PaymentSuccessPage = ({ order }: PaymentSuccessPageProps) => {
  const { t } = useI18n()
  const { toast } = useToast()

  const copyCustomerId = () => {
    navigator.clipboard.writeText(order.customerId || "")
    toast({
      title: "Copied!",
      description: "Customer ID copied to clipboard",
    })
  }

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-green-600">{t.agent.paymentSuccess}</h1>
        <p className="text-muted-foreground mt-2">The order has been confirmed</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t.agent.customerIdGenerated}</CardTitle>
          <CardDescription>Use this ID to label the soil sample</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-accent rounded-lg p-6 mb-4">
            <p className="text-4xl font-mono font-bold tracking-widest">{order.customerId}</p>
          </div>
          <Button variant="outline" onClick={copyCustomerId} className="gap-2 bg-transparent">
            <Copy className="h-4 w-4" />
            Copy Customer ID
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6 text-left">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            {t.agent.sampleLabelInstruction}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Write the Customer ID clearly on the sample bag</li>
            <li>Include the date of collection</li>
            <li>Seal the bag properly</li>
            <li>Send to the lab within 48 hours</li>
          </ol>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href="/dashboard/agent/orders">View All Orders</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/agent/create-order">
            Create Another Order
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
