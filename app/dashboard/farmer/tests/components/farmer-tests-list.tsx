"use client"

import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

interface FarmerTestsListProps {
  farmerId: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function FarmerTestsList({ farmerId }: FarmerTestsListProps) {
  const { t } = useI18n()

  const { data, isLoading } = useSWR(`/api/farmers/${farmerId}/orders`, fetcher)

  const orders = data?.orders || []

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
        <h1 className="text-2xl font-bold text-foreground">{t.farmer.myTests}</h1>
        <p className="text-muted-foreground">{t.farmer.title}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.farmer.myTests}</CardTitle>
          <CardDescription>
            {orders.length} {t.dashboard.totalTests.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">{t.common.loading}</p>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground">{t.dashboard.noData}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>{t.form.acres}</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: any) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">{order.customerId ? `#${order.customerId}` : "-"}</TableCell>
                    <TableCell>{order.acres}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      {order.status === "COMPLETED" ? (
                        <Link href={`/dashboard/farmer/tests/${order._id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            {t.farmer.viewReport}
                          </Button>
                        </Link>
                      ) : (
                        <span className="text-sm text-muted-foreground">{t.farmer.noReportYet}</span>
                      )}
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
