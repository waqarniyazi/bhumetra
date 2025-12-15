"use client"

import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, Eye } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

interface FarmerOverviewProps {
  farmerId: string
  farmerName: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function FarmerOverview({ farmerId, farmerName }: FarmerOverviewProps) {
  const { t } = useI18n()

  const { data, isLoading } = useSWR(`/api/farmers/${farmerId}/orders`, fetcher)

  const orders = data?.orders || []
  const completedCount = orders.filter((o: any) => o.status === "COMPLETED").length
  const pendingCount = orders.filter((o: any) => o.status !== "COMPLETED" && o.status !== "CANCELLED").length

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      PAYMENT_PENDING: { variant: "outline", label: t.orderStatus.PAYMENT_PENDING },
      PAID: { variant: "secondary", label: t.orderStatus.PAID },
      SENT_TO_LAB: { variant: "secondary", label: t.orderStatus.SENT_TO_LAB },
      UNDER_TESTING: { variant: "default", label: t.orderStatus.UNDER_TESTING },
      COMPLETED: { variant: "default", label: t.orderStatus.COMPLETED },
      CANCELLED: { variant: "destructive", label: t.orderStatus.CANCELLED },
    }
    const config = statusMap[status] || { variant: "outline", label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {t.dashboard.welcome}, {farmerName}
        </h1>
        <p className="text-muted-foreground">{t.farmer.title}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.totalTests}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "-" : orders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.pendingTests}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "-" : pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.completedTests}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "-" : completedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle>{t.farmer.myTests}</CardTitle>
          <CardDescription>{t.dashboard.recentOrders}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">{t.common.loading}</p>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground">{t.dashboard.noData}</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order: any) => (
                <div key={order._id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{order.customerId ? `#${order.customerId}` : t.common.pending}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.acres} {t.form.acres} • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    {order.status === "COMPLETED" && (
                      <Link href={`/dashboard/farmer/tests/${order._id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          {t.farmer.viewReport}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {orders.length > 5 && (
                <Link href="/dashboard/farmer/tests">
                  <Button variant="outline" className="w-full bg-transparent">
                    {t.common.view} {t.common.all}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
