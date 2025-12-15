"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { StatsCard } from "@/components/stats-card"
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/order-status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/config"
import type { Order, OrderStatus, PaymentStatus } from "@/lib/types"
import { Plus, ClipboardList, CheckCircle, Clock, IndianRupee } from "lucide-react"

interface AgentOverviewProps {
  stats: {
    totalTests: number
    paidTests: number
    completedTests: number
    pendingPayment: number
  }
  recentOrders: Order[]
}

export function AgentOverview({ stats, recentOrders }: AgentOverviewProps) {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t.agent.title}</h1>
          <p className="text-muted-foreground">{t.dashboard.welcome}</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/agent/create-order">
            <Plus className="mr-2 h-4 w-4" />
            {t.agent.createOrder}
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title={t.dashboard.totalTests} value={stats.totalTests} icon={ClipboardList} />
        <StatsCard title={t.dashboard.pendingTests} value={stats.pendingPayment} icon={Clock} />
        <StatsCard title="Paid Tests" value={stats.paidTests} icon={IndianRupee} />
        <StatsCard title={t.dashboard.completedTests} value={stats.completedTests} icon={CheckCircle} />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.recentOrders}</CardTitle>
          <CardDescription>Your latest soil test orders</CardDescription>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ClipboardList className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>{t.dashboard.noData}</p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard/agent/create-order">{t.agent.createOrder}</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>{t.form.acres}</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{formatDate(order.createdAt!)}</TableCell>
                    <TableCell className="font-mono">{order.customerId || "-"}</TableCell>
                    <TableCell>{order.acres}</TableCell>
                    <TableCell>{formatCurrency(order.amount)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status as OrderStatus} translations={t.orderStatus} />
                    </TableCell>
                    <TableCell>
                      <PaymentStatusBadge
                        status={order.paymentStatus as PaymentStatus}
                        translations={t.paymentStatus}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
