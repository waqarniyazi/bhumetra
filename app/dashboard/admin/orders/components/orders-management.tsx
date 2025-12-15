"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Eye } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function OrdersManagement() {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const { data, isLoading } = useSWR("/api/admin/orders", fetcher)
  const orders = data?.orders || []

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = order.customerId?.includes(searchTerm) || order._id.includes(searchTerm)
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
        <h1 className="text-2xl font-bold text-foreground">{t.admin.ordersReports}</h1>
        <p className="text-muted-foreground">View all orders and their details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>{orders.length} total orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by Customer ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">{t.common.all}</SelectItem>
                <SelectItem value="PAYMENT_PENDING">{t.orderStatus.PAYMENT_PENDING}</SelectItem>
                <SelectItem value="PAID">{t.orderStatus.PAID}</SelectItem>
                <SelectItem value="SENT_TO_LAB">{t.orderStatus.SENT_TO_LAB}</SelectItem>
                <SelectItem value="UNDER_TESTING">{t.orderStatus.UNDER_TESTING}</SelectItem>
                <SelectItem value="COMPLETED">{t.orderStatus.COMPLETED}</SelectItem>
                <SelectItem value="CANCELLED">{t.orderStatus.CANCELLED}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground">{t.common.loading}</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-muted-foreground">{t.dashboard.noData}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>{t.form.acres}</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>{t.common.status}</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>{t.common.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order: any) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">#{order.customerId || "-"}</TableCell>
                    <TableCell>{order.acres}</TableCell>
                    <TableCell>₹{order.amount}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {t.common.view}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Customer ID: #{selectedOrder?.customerId || "-"}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t.form.acres}</p>
                  <p className="font-medium">{selectedOrder.acres}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">₹{selectedOrder.amount}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t.common.status}</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <Badge variant={selectedOrder.paymentStatus === "SUCCESS" ? "default" : "outline"}>
                    {t.paymentStatus[selectedOrder.paymentStatus as keyof typeof t.paymentStatus]}
                  </Badge>
                </div>
              </div>

              {/* Commission Breakdown */}
              <div className="rounded-lg border p-4">
                <h4 className="mb-3 font-medium">Commission Breakdown</h4>
                <div className="grid gap-2 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Agent</p>
                    <p className="font-medium">{selectedOrder.commission?.agent}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lab</p>
                    <p className="font-medium">{selectedOrder.commission?.lab}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Franchise</p>
                    <p className="font-medium">{selectedOrder.commission?.franchise}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Platform</p>
                    <p className="font-medium">{selectedOrder.commission?.platform}%</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Created: {new Date(selectedOrder.createdAt).toLocaleString()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
