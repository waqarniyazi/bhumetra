"use client"

import { useState } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/config"
import type { Order } from "@/lib/types"
import { Search, Eye, CheckCircle } from "lucide-react"

interface CompletedTestsListProps {
  orders: Order[]
}

export function CompletedTestsList({ orders }: CompletedTestsListProps) {
  const { t } = useI18n()
  const [search, setSearch] = useState("")

  const filteredOrders = orders.filter((order) => order.customerId?.includes(search))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.lab.completedTests}</h1>
        <p className="text-muted-foreground">View all completed soil test reports</p>
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

      {/* Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Reports ({filteredOrders.length})</CardTitle>
          <CardDescription>All soil tests with completed reports</CardDescription>
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
                  <TableHead>Completed On</TableHead>
                  <TableHead>{t.form.acres}</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-mono font-medium">{order.customerId}</TableCell>
                    <TableCell>{formatDate(order.updatedAt!)}</TableCell>
                    <TableCell>{order.acres}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t.orderStatus.COMPLETED}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/lab/report/${order._id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          {t.common.view}
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
