"use client"

import { useState } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/order-status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency, formatDate } from "@/lib/config"
import { OrderStatus, type PaymentStatus, type Order } from "@/lib/types"
import { Search, CreditCard, Send, Loader2 } from "lucide-react"

interface AgentOrdersListProps {
  orders: Order[]
}

export function AgentOrdersList({ orders: initialOrders }: AgentOrdersListProps) {
  const { t } = useI18n()
  const { toast } = useToast()
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customerId?.includes(search) || order._id?.includes(search)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleMarkSentToLab = async (orderId: string) => {
    setLoadingOrderId(orderId)
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: OrderStatus.SENT_TO_LAB }),
      })

      if (res.ok) {
        setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: OrderStatus.SENT_TO_LAB } : o)))
        toast({
          title: t.common.success,
          description: "Order marked as sent to lab",
        })
      } else {
        throw new Error("Failed to update")
      }
    } catch {
      toast({
        title: t.common.error,
        description: "Failed to update order status",
        variant: "destructive",
      })
    } finally {
      setLoadingOrderId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.agent.myOrders}</h1>
        <p className="text-muted-foreground">View and manage all your soil test orders</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Customer ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.common.all}</SelectItem>
                <SelectItem value={OrderStatus.PAYMENT_PENDING}>{t.orderStatus.PAYMENT_PENDING}</SelectItem>
                <SelectItem value={OrderStatus.PAID}>{t.orderStatus.PAID}</SelectItem>
                <SelectItem value={OrderStatus.SENT_TO_LAB}>{t.orderStatus.SENT_TO_LAB}</SelectItem>
                <SelectItem value={OrderStatus.UNDER_TESTING}>{t.orderStatus.UNDER_TESTING}</SelectItem>
                <SelectItem value={OrderStatus.COMPLETED}>{t.orderStatus.COMPLETED}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>All soil test orders you have created</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>{t.dashboard.noData}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>{t.form.acres}</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>{t.common.status}</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>{t.common.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
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
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {order.status === OrderStatus.PAYMENT_PENDING && (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/dashboard/agent/orders/${order._id}/payment`}>
                                <CreditCard className="h-4 w-4 mr-1" />
                                Pay
                              </Link>
                            </Button>
                          )}
                          {order.status === OrderStatus.PAID && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkSentToLab(order._id!)}
                              disabled={loadingOrderId === order._id}
                            >
                              {loadingOrderId === order._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-1" />
                                  {t.agent.markSentToLab}
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
