"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { StatsCard } from "@/components/stats-card"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/config"
import type { OrderStatus, Order } from "@/lib/types"
import { FlaskConical, Clock, CheckCircle, ClipboardList, FileEdit } from "lucide-react"

interface LabOverviewProps {
  stats: {
    pendingSamples: number
    underTesting: number
    completedToday: number
    totalCompleted: number
  }
  recentPending: Order[]
}

export function LabOverview({ stats, recentPending }: LabOverviewProps) {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.lab.title}</h1>
        <p className="text-muted-foreground">{t.dashboard.welcome}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title={t.lab.pendingSamples} value={stats.pendingSamples} icon={FlaskConical} />
        <StatsCard title="Under Testing" value={stats.underTesting} icon={Clock} />
        <StatsCard title="Completed Today" value={stats.completedToday} icon={CheckCircle} />
        <StatsCard title={t.dashboard.completedTests} value={stats.totalCompleted} icon={ClipboardList} />
      </div>

      {/* Pending Samples */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t.lab.pendingSamples}</CardTitle>
            <CardDescription>Samples waiting for testing or results entry</CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/lab/pending">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentPending.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FlaskConical className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>No pending samples</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>{t.form.acres}</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPending.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-mono font-medium">{order.customerId}</TableCell>
                    <TableCell>{formatDate(order.createdAt!)}</TableCell>
                    <TableCell>{order.acres}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status as OrderStatus} translations={t.orderStatus} />
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/lab/report/${order._id}`}>
                          <FileEdit className="h-4 w-4 mr-1" />
                          {t.lab.enterResults}
                        </Link>
                      </Button>
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
