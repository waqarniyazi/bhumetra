"use client"

import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, IndianRupee, TrendingUp } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function AdminOverview() {
  const { t } = useI18n()

  const { data: statsData, isLoading: statsLoading } = useSWR("/api/admin/stats", fetcher)
  const { data: ordersData, isLoading: ordersLoading } = useSWR("/api/admin/orders?limit=5", fetcher)

  const stats = statsData || { totalTests: 0, totalRevenue: 0, totalAgents: 0, totalFarmers: 0 }
  const recentOrders = ordersData?.orders || []

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
        <h1 className="text-2xl font-bold text-foreground">{t.admin.title}</h1>
        <p className="text-muted-foreground">{t.dashboard.overview}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.totalTests}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? "-" : stats.totalTests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t.dashboard.revenue}</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? "-" : `₹${(stats.totalRevenue || 0).toLocaleString()}`}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? "-" : stats.totalAgents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? "-" : stats.totalFarmers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.recentOrders}</CardTitle>
          <CardDescription>Latest soil test orders</CardDescription>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            <p className="text-muted-foreground">{t.common.loading}</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-muted-foreground">{t.dashboard.noData}</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div key={order._id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{order.customerId ? `#${order.customerId}` : t.common.pending}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.acres} acres • ₹{order.amount} • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">{getStatusBadge(order.status)}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
