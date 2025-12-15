"use client"

import { useState } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/config"
import type { OrderStatus, Order } from "@/lib/types"
import { Search, FileEdit } from "lucide-react"

interface PendingSamplesListProps {
  orders: Order[]
}

export function PendingSamplesList({ orders }: PendingSamplesListProps) {
  const { t } = useI18n()
  const [search, setSearch] = useState("")

  const filteredOrders = orders.filter((order) => order.customerId?.includes(search))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.lab.pendingSamples}</h1>
        <p className="text-muted-foreground">Enter soil test results for pending samples</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Customer ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Samples Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Samples ({filteredOrders.length})</CardTitle>
          <CardDescription>Note: Farmer personal details are hidden for privacy</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>{t.dashboard.noData}</p>
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
                {filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-mono font-medium text-lg">{order.customerId}</TableCell>
                    <TableCell>{formatDate(order.createdAt!)}</TableCell>
                    <TableCell>{order.acres}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status as OrderStatus} translations={t.orderStatus} />
                    </TableCell>
                    <TableCell>
                      <Button size="sm" asChild>
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
